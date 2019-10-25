import * as vscode from 'vscode';
import Syscall from './syscall';
import Vfs from './vfs';
import BuildinFunction from './buildinFunction';
import Probe from './probe';

let syscall: vscode.CompletionItem[] = [];
let vfs: vscode.CompletionItem[] = [];
let buildinFunction: vscode.CompletionItem[] = [];
let probe: {[index: string]:vscode.CompletionItem[]} = {};

for (const i of Syscall as string[]) {
    let name = i.split(' ')[0];
    name = name.replace(/syscall\./, '');
    let action = new vscode.CompletionItem(name);
    action.documentation = i.replace(' — ', '\n');
    syscall.push(action);
    let action_return = new vscode.CompletionItem(name + '.return');
    action_return.documentation = i.replace(' — ', '\n');
    syscall.push(action_return);
}

for (const i of Vfs as string[]) {
    let name = i.split(' ')[0];
    name = name.replace(/vfs\./, '');
    let action = new vscode.CompletionItem(name);
    action.documentation = i.replace(' — ', '\n');
    vfs.push(action);
    let action_return = new vscode.CompletionItem(name + '.return');
    action_return.documentation = i.replace(' — ', '\n');
    vfs.push(action_return);
}

for (const i of BuildinFunction) {
    let name = i.name;
    let action = new vscode.CompletionItem(name);
    action.documentation = new vscode.MarkdownString(i.doc);
    buildinFunction.push(action);
}

for (const i of Probe) {
    let fullname = i.name;
    let type = fullname.split('.')[0];
    let name = fullname.replace(type + '.', '');
    probe[type] = probe[type] || [];
    let action = new vscode.CompletionItem(name);
    action.documentation = new vscode.MarkdownString(i.doc);
    probe[type].push(action);
}

export { syscall as syscallAction, vfs as vfsAction, buildinFunction, probe };
