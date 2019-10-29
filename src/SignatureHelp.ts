import * as vscode from 'vscode';

import BuildinFunctionRaw from './doc/buildinFunction';
import macroRaw from './doc/macroLike';

class StapSignatureHelpProvider implements vscode.SignatureHelpProvider {
    signature: string | null = null;
    parameters: vscode.ParameterInformation[] = []
    activeParameter = 0;
    maxParameter = 0;
    bracket = 0;
    public provideSignatureHelp(
        document: vscode.TextDocument,
        position: vscode.Position,
        token: vscode.CancellationToken
    ): vscode.SignatureHelp | undefined {
        let lastChar = document.lineAt(position).text.substring(position.character - 1, position.character);

        if (lastChar === '(') this.flashSignature(document, position, token);
        else if (lastChar == ')' && this.bracket === 0) this.signature = null;
        else if (lastChar == ')' && this.bracket > 0) this.bracket--;
        else if (lastChar == ',' && this.bracket === 0) this.activeParameter++;

        if (this.signature === null) return;

        let signatureHelp = new vscode.SignatureHelp();
        signatureHelp.activeSignature = 0;
        signatureHelp.activeParameter = this.activeParameter;
        let signatureInformation = new vscode.SignatureInformation(this.signature);
        signatureInformation.parameters = this.parameters;
        signatureHelp.signatures = [signatureInformation];
        return signatureHelp;
    }
    private flashSignature(
        document: vscode.TextDocument,
        position: vscode.Position,
        token: vscode.CancellationToken
    ): void {
        let line = position.line;
        let input = document.lineAt(line).text.substring(0, position.character - 1);
        while (/^\s*$/.test(input) && line > 0) {
            line--;
            input = document.lineAt(line).text;
        }
        let word = (input.match(/([@a-zA-Z0-9_$\.]+)\s*$/) || [null, null])[1];
        if (word == null) return;

        let newSignature = null;
        let newDoc = null;
        let macroDoc = macroRaw.filter(i => i.name === word);
        if (macroDoc.length && macroDoc[0].doc) {
            newSignature = (macroDoc[0].doc.match(/\*\*Synopsis\*\*[\s\n]*```([\S\s\n]*?)```/) || [null, null])[1];
            newDoc = macroDoc[0].doc;
        }

        let functionDoc = BuildinFunctionRaw.filter(i => i.name === word);
        if (functionDoc.length) {
            newSignature = (functionDoc[0].doc.match(/\*\*Synopsis\*\*[\s\n]*```([\S\s\n]*?)```/) || [null, null])[1];
            newDoc = functionDoc[0].doc;
        }
        if (newSignature) {
            let argDoc = ((newDoc || '').match(/\*\*Arguments\*\*[\s\n]*([\S\s\n]*?)(?=\*\*)/) || [null, null])[1];
            let doc = (argDoc || '').trim().split('\n\n').map(s => (s.match(/^`.*?`(.*)$/) || [null, null])[1]);
            newSignature = newSignature.trim();
            this.parameters = [];
            let i = 0;
            for (const label of newSignature.replace(/^.*\(/, '').replace(/\)$/, '').split(',')) {
                if (doc[i]) {
                    this.parameters.push(new vscode.ParameterInformation(label, doc[i] as string));
                } else {
                    this.parameters.push(new vscode.ParameterInformation(label));
                }
                i++;
            }
            this.maxParameter = (newSignature.match(',') || []).length + 1;
            this.activeParameter = 0;
            this.bracket = 0;
        } else if (this.signature) {
            this.bracket++;
        }
        this.signature = newSignature;
    }
}

export default function setupSignatureHelp(context: vscode.ExtensionContext) {
    let signatureHelpProvider = vscode.languages.registerSignatureHelpProvider(
        'systemtap',
        new StapSignatureHelpProvider(),
        { triggerCharacters: ['('], retriggerCharacters: [',', ')'] }
    );
    context.subscriptions.push(signatureHelpProvider);
}
