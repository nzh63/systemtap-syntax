import * as vscode from 'vscode';
import Syscall from './syscall';
import Vfs from './vfs';
import BuildinFunction from './buildinFunction';
import Macro from './macroLike';
import Probe from './probe';

const syscall: vscode.CompletionItem[] = [];
const vfs: vscode.CompletionItem[] = [];
const buildinFunction: vscode.CompletionItem[] = [];
const probe: {[index: string]:vscode.CompletionItem[]} = {};
const macro: vscode.CompletionItem[] = [];

for (const i of Syscall) {
    let name = i.name;
    name = name.replace(/syscall\./, '');
    const action = new vscode.CompletionItem(name);
    action.kind = vscode.CompletionItemKind.Property;
    action.documentation = i.doc;
    syscall.push(action);
    const action_return = new vscode.CompletionItem(name + '.return');
    action_return.kind = vscode.CompletionItemKind.Property;
    action_return.documentation = i.doc;
    syscall.push(action_return);
}

for (const i of Vfs) {
    let name = i.name;
    name = name.replace(/vfs\./, '');
    const action = new vscode.CompletionItem(name);
    action.kind = vscode.CompletionItemKind.Property;
    action.documentation = i.doc;
    vfs.push(action);
    const action_return = new vscode.CompletionItem(name + '.return');
    action_return.kind = vscode.CompletionItemKind.Property;
    action_return.documentation = i.doc;
    vfs.push(action_return);
}

for (const i of BuildinFunction) {
    const name = i.name;
    const action = new vscode.CompletionItem(name);
    action.kind = vscode.CompletionItemKind.Function;
    if (i.doc) action.documentation = new vscode.MarkdownString(i.doc);
    buildinFunction.push(action);
}

for (const i of Macro) {
    const name = i.name;
    const action = new vscode.CompletionItem(name.substr(1));
    action.kind = vscode.CompletionItemKind.Function;
    if (i.doc) action.documentation = new vscode.MarkdownString(i.doc);
    macro.push(action);
}

for (const i of Probe) {
    const fullname = i.name;
    const type = fullname.split('.')[0];
    const name = fullname.replace(type + '.', '');
    probe[type] = probe[type] || [];
    const action = new vscode.CompletionItem(name);
    action.kind = vscode.CompletionItemKind.Property;
    if (i.doc) action.documentation = new vscode.MarkdownString(i.doc);
    probe[type].push(action);
}

export { syscall as syscallAction, vfs as vfsAction, buildinFunction, probe, macro };
