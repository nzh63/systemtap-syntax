import * as vscode from 'vscode';

import BuildinFunctionRaw from './doc/buildinFunction';
import ProbeRaw from './doc/probe';
import syscallRaw from './doc/syscall';
import vfsRaw from './doc/vfs';
import macroRaw from './doc/macroLike';

export function provideHover(
	document: vscode.TextDocument,
	position: vscode.Position,
	token: vscode.CancellationToken
) {
	const word = document.getText(document.getWordRangeAtPosition(position, /[@a-zA-Z0-9_$\.]+/));
	let functionDoc = BuildinFunctionRaw.filter(i => i.name === word);
	if (functionDoc.length) {
		return new vscode.Hover(functionDoc[0].doc);
	}
	let macroDoc = macroRaw.filter(i => i.name === word);
	if (macroDoc.length && macroDoc[0].doc) {
		return new vscode.Hover(macroDoc[0].doc);
	}
	let probenDoc = ProbeRaw.filter(i => i.name === word);
	if (probenDoc.length) {
		return new vscode.Hover(probenDoc[0].doc);
	}
	let syscallnDoc = syscallRaw.filter(i => 'syscall.' + i.name === word || 'syscall.' + i.name + '.return' === word);
	if (syscallnDoc.length) {
		return new vscode.Hover(syscallnDoc[0].doc);
	}
	let vfsDoc = vfsRaw.filter(i => 'vfs.' + i.name === word || 'vfs.' + i.name + '.return' === word);
	if (vfsDoc.length) {
		return new vscode.Hover(vfsDoc[0].doc);
	}
}

export default function setupHoverInformation(context: vscode.ExtensionContext) {
	let hoverProvider = vscode.languages.registerHoverProvider('systemtap', { provideHover });
	context.subscriptions.push(hoverProvider);
}
