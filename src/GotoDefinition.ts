import * as vscode from 'vscode';

function provideDefinition(
    document: vscode.TextDocument,
    position: vscode.Position,
    token: vscode.CancellationToken
): vscode.Location[] {
    const word = document.getText(document.getWordRangeAtPosition(position, /[@a-zA-Z0-9_$]+/));
    const lineCount = document.lineCount;
    enum State { findKeyword, findSpace, findComma, findName, done };
    let state = State.findKeyword;
    let definitionPosition;
    let keyword = null;
    let line: string | null = null;
    for (let i = -1; i < lineCount;) {
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
                if (!name || name === word) {
                    definitionPosition = new vscode.Position(i, document.lineAt(i).text.indexOf(word));
                    break;
                } else {
                    if (keyword == 'global' && line !== null) {
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
    }
    if (definitionPosition)
        return [new vscode.Location(document.uri, definitionPosition)];
    else
        return [];
}

export default function setupGotoDefinition(context: vscode.ExtensionContext) {
    let hoverProvider = vscode.languages.registerDefinitionProvider('systemtap', { provideDefinition });
    context.subscriptions.push(hoverProvider);
}
