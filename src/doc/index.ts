import * as vscode from 'vscode';
import Syscall from './syscall';
import Vfs from './vfs';
import BuildinFunction from './buildinFunction';

let syscall: vscode.CompletionItem[] = [];
let vfs: vscode.CompletionItem[] = [];
let buildinFunction: vscode.CompletionItem[] = [];

for (const i of Syscall as string[]) {
    let name = i.split(' ')[0];
    name = name.replace(/syscall\./, '');
    let action = new vscode.CompletionItem(name);
    action.documentation = i;
    syscall.push(action);
    let action_return = new vscode.CompletionItem(name + '.return');
    action_return.documentation = i;
    syscall.push(action_return);
}

for (const i of Vfs as string[]) {
    let name = i.split(' ')[0];
    name = name.replace(/vfs\./, '');
    let action = new vscode.CompletionItem(name);
    action.documentation = i;
    vfs.push(action);
    let action_return = new vscode.CompletionItem(name + '.return');
    action_return.documentation = i;
    vfs.push(action_return);
}

for (const i of BuildinFunction as string[]) {
    let name = i.split(' ')[0];
    name = name.replace(/function::/, '');
    let action = new vscode.CompletionItem(name);
    action.documentation = i;
    buildinFunction.push(action);
}

export { syscall as syscallAction, vfs as vfsAction, buildinFunction };
