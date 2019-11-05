import * as vscode from 'vscode';

import { findLocalVariableListBefore, findGlobalLabel } from './Syntax';

export function provideDefinition(
    document: vscode.TextDocument,
    position: vscode.Position,
    token: vscode.CancellationToken
): vscode.Location[] {
    let definition = findInGlobal(document, position, token);
    if (!definition) {
        definition = findInLocal(document, position, token);
    }
    if (definition)
        return [definition];
    else
        return [];
}

export function findInGlobal(
    document: vscode.TextDocument,
    position: vscode.Position,
    token: vscode.CancellationToken
): vscode.Location | void {
    const word = document.getText(document.getWordRangeAtPosition(position, /[@a-zA-Z0-9_$]+/));
    const globalLabels = findGlobalLabel(document);
    for (const i of globalLabels) {
        if (i.name === word) {
            return new vscode.Location(document.uri, i.position);
        }
    }
}

export function findInLocal(
    document: vscode.TextDocument,
    position: vscode.Position,
    token: vscode.CancellationToken
): vscode.Location | void {
    const word = document.getText(document.getWordRangeAtPosition(position, /[@a-zA-Z0-9_$]+/));
    const variables = findLocalVariableListBefore(document, document.lineAt(position.line).range.end);
    for (const i of variables) {
        if (i.name === word) {
            if (i.position !== null) {
                return new vscode.Location(document.uri, i.position);
            }
            break;
        }
    }
}

export default function setupGotoDefinition(context: vscode.ExtensionContext) {
    let hoverProvider = vscode.languages.registerDefinitionProvider('systemtap', { provideDefinition });
    context.subscriptions.push(hoverProvider);
}
