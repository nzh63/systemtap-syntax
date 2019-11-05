import * as vscode from 'vscode';

import ProbeRaw from './doc/probe';
import syscallRaw from './doc/syscall';
import vfsRaw from './doc/vfs';

interface VariableInformation {
    name: string,
    position: vscode.Position | null,
    type?: string,
    document?: string | vscode.MarkdownString
}

interface LabelInformation {
    name: string,
    position: vscode.Position,
    kind: "Function" | "GlobalVariable",
    document?: string | vscode.MarkdownString
}

export function findLocalVariableListBefore(
    document: vscode.TextDocument,
    position: vscode.Position,
): VariableInformation[] {
    let lineNumber = position.line;
    let line = document.lineAt(lineNumber).text.substr(0, position.character);
    let variables: VariableInformation[] = [];
    let inLocal = true;
    while (inLocal) {
        if (/function|probe/.test(line)) {
            inLocal = false;
            line = line.substr(Math.max(0, line.lastIndexOf('function'), line.lastIndexOf('probe')));

        }
        let match = (line.match(/([a-zA-Z0-9_$]+)\s*=[^=]*$/) || [null, null])[1];
        if (match) {
            variables.unshift({ name: match, position: new vscode.Position(lineNumber, line.lastIndexOf(match)) });
            line = line.substr(0, line.lastIndexOf(match));
        } else if (inLocal) {
            lineNumber--;
            line = '';
        }
        if (lineNumber >= 0 && line === '') line = document.lineAt(lineNumber).text;
        else if (line === '') inLocal = false;
    }
    processeFunctionArgumentsList();
    processeProbeValuesList();
    return variables;

    function processeFunctionArgumentsList() {
        let argumentsList = (line.match(/^function.*?\((.+?)\)/) || [null, null])[1];
        if (argumentsList) {
            let argument = argumentsList.split(',').map(s => (s.match(/(\S*)\s*:\s*(\S*)/) || [s, s.trim(), undefined]) as [string, string, string | undefined]);
            for (const i of argument) {
                variables.unshift({ name: i[1], type: i[2], position: new vscode.Position(lineNumber, line.indexOf(i[1])) });
            }
        }
    }

    function processeProbeValuesList() {
        let probeName = (line.match(/^probe(?:\s+|\/\*.*?\*\/)([a-zA-Z._]+)/) || [null, null])[1];
        if (probeName) {
            let rawDoc = ProbeRaw.filter(i => i.name === probeName);
            if (rawDoc[0]) {
                let match = (rawDoc[0].doc.match(/\*\*Values\*\*\s*([\S\s]*)(?!\*\*)/) || [null, null])[1];
                if (match) {
                    let values = match.split('\n');
                    for (let i of values) {
                        i = i.trim();
                        let [, valueName, valueDoc] = (i.match(/^`(.*?)`(.*?)$/) || [undefined, undefined, undefined]);
                        if (valueName) {
                            variables.unshift({ name: valueName, document: valueDoc, position: null });
                        }
                    }
                }
            }
            rawDoc = syscallRaw.filter(i => 'syscall.' + i.name === probeName);
            rawDoc = [...rawDoc, ...vfsRaw.filter(i => 'vfs.' + i.name === probeName)];
            if (rawDoc.length) {
                let values = rawDoc[0].doc.split(' ');
                for (let i = 0; i < values.length; i++) {
                    values[i] = values[i].trim();
                    let [, valueName, valueType] = (values[i].match(/^(.*?):(.*?)$/) || [undefined, undefined, undefined]);
                    if (valueType === 'struct') {
                        i++;
                        valueType += ' ' + values[i].trim();
                    }
                    if (valueName) {
                        variables.unshift({ name: valueName, document: valueType, position: null });
                    }
                }
            }
        }
    }
}

export function findGlobalLabel(
    document: vscode.TextDocument,
): LabelInformation[] {
    let globalLabels: LabelInformation[] = [];
    const lineCount = document.lineCount;
    enum State { findKeyword, findSpace, findComma, findName, done };
    let state = State.findKeyword;
    let keyword = null;
    let line: string | null = null;
    for (let i = -1; i < lineCount - 1;) {
        if (line == null || line == '') {
            i++;
            line = document.lineAt(i).text;
        }
        if (state == State.findSpace) state = State.findName;
        let match: (string | null)[] = line.match(/(function|global)(.*)$/) || [null, null, null];
        let _keyword = match[1];
        if (state == State.findKeyword) line = match[2];
        if (_keyword !== null) {
            line = match[2];
            keyword = _keyword;
            state = State.findSpace;
        }
        if (state == State.findSpace) {
            if (line === null) {
                state = State.findKeyword;
            } else {
                if (line !== '') line = (line.match(/\s+(.*)$/) || [null, null])[1];
                if (line !== null) state = State.findName;
            }
        }
        if (state == State.findComma) {
            if (line && line[0] === ',') {
                state = State.findName;
                line = line.substr(1).trim();
            } else {
                if (line) line = line.substr(1).trim();
                continue;
            }
        }
        if (state == State.findName) {
            if (line === null) {
                state = State.findKeyword;
            } else if (line === '') {
                continue;
            } else {
                let match: (string | null)[] = line.match(/^\s*([@a-zA-Z0-9_$]+)(.*)$/) || [null, null, null];
                let name = match[1];
                line = match[2];
                if (name !== null) {
                    globalLabels.push({
                        name: name,
                        position: new vscode.Position(i, document.lineAt(i).text.indexOf(name)),
                        kind: (keyword === 'global' ? 'GlobalVariable' : 'Function'),
                    });
                }
                if (keyword === 'global' && line !== null) {
                    line = line.replace(/^\s*=\s*(-?(0x)?[\da-fA-f]+|".*?")/, '').trim();
                    if (line[0] === ',') {
                        state = State.findName;
                        line = line.substr(1);
                    } else if (line === '') {
                        state = State.findComma;
                    } else {
                        state = State.findKeyword;
                    }
                } else {
                    state = State.findKeyword;
                }

            }
        }
    }
    return globalLabels;
}
