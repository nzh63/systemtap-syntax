import * as vscode from 'vscode';

import setupAutoCompletion from './AutoCompletion';
import setupHoverInformation from './HoverInformation';
import setupSignatureHelp from './SignatureHelp';

// this method is called when your extension is activated
// your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {
	setupAutoCompletion(context);
	setupHoverInformation(context);
	setupSignatureHelp(context);
}
// this method is called when your extension is deactivated
export function deactivate() { }
