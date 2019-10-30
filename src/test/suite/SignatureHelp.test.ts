import * as assert from 'assert';

import * as vscode from 'vscode';
import * as SignatureHelp from '../../SignatureHelp';

let token: vscode.CancellationToken = { isCancellationRequested: false, onCancellationRequested: () => new vscode.Disposable(() => { }) };

suite('Signature Help', () => {
    let documentT = vscode.workspace.openTextDocument({
        language: 'systemtap',
        content: ''
    });

    test('None arg', async () => {
        let document = await documentT;
        await vscode.window.showTextDocument(document);

        let StapSignatureHelpProvider = new SignatureHelp.StapSignatureHelpProvider();

        let edit = new vscode.WorkspaceEdit();
        edit.delete(document.uri, new vscode.Range(0, 0, document.lineCount, 0));
        edit.insert(document.uri, new vscode.Position(0, 0), 'pid');
        edit.insert(document.uri, new vscode.Position(0, 3), '(');
        await vscode.workspace.applyEdit(edit);
        let Signature = StapSignatureHelpProvider.provideSignatureHelp(document, new vscode.Position(0, 4), token);
        assert.notEqual(undefined, Signature);
        Signature = Signature as vscode.SignatureHelp;
        assert.equal(0, Signature.signatures[0].parameters.length);
        assert.equal(0, Signature.activeSignature);
        assert.equal(0, Signature.activeParameter);

        edit = new vscode.WorkspaceEdit();
        edit.insert(document.uri, new vscode.Position(0, 4), ')');
        await vscode.workspace.applyEdit(edit);
        Signature = StapSignatureHelpProvider.provideSignatureHelp(document, new vscode.Position(0, 5), token);
        assert.equal(undefined, Signature);
    });

    test('One args', async () => {
        let document = await documentT;
        await vscode.window.showTextDocument(document);

        let StapSignatureHelpProvider = new SignatureHelp.StapSignatureHelpProvider();

        let edit = new vscode.WorkspaceEdit();
        edit.delete(document.uri, new vscode.Range(0, 0, document.lineCount, 0));
        edit.insert(document.uri, new vscode.Position(0, 0), 'task_pid');
        edit.insert(document.uri, new vscode.Position(0, 8), '(');
        await vscode.workspace.applyEdit(edit);
        let Signature = StapSignatureHelpProvider.provideSignatureHelp(document, new vscode.Position(0, 9), token);
        assert.notEqual(undefined, Signature);
        Signature = Signature as vscode.SignatureHelp;
        assert.equal(1, Signature.signatures[0].parameters.length);
        assert.equal(0, Signature.activeSignature);
        assert.equal(0, Signature.activeParameter);

        edit = new vscode.WorkspaceEdit();
        edit.insert(document.uri, new vscode.Position(0, 9), 'aaa');
        edit.insert(document.uri, new vscode.Position(0, 12), ')');
        await vscode.workspace.applyEdit(edit);
        Signature = StapSignatureHelpProvider.provideSignatureHelp(document, new vscode.Position(0, 13), token);
        assert.equal(undefined, Signature);
    });

    test('Two args', async () => {
        let document = await documentT;
        await vscode.window.showTextDocument(document);

        let StapSignatureHelpProvider = new SignatureHelp.StapSignatureHelpProvider();

        let edit = new vscode.WorkspaceEdit();
        edit.delete(document.uri, new vscode.Range(0, 0, document.lineCount, 0));
        edit.insert(document.uri, new vscode.Position(0, 0), 'fullpath_struct_file');
        edit.insert(document.uri, new vscode.Position(0, 20), '(');
        await vscode.workspace.applyEdit(edit);
        let Signature = StapSignatureHelpProvider.provideSignatureHelp(document, new vscode.Position(0, 21), token);
        assert.notEqual(undefined, Signature);
        Signature = Signature as vscode.SignatureHelp;
        assert.equal(2, Signature.signatures[0].parameters.length);
        assert.equal(0, Signature.activeSignature);
        assert.equal(0, Signature.activeParameter);

        edit = new vscode.WorkspaceEdit();
        edit.insert(document.uri, new vscode.Position(0, 21), 'aaa');
        edit.insert(document.uri, new vscode.Position(0, 24), ',');
        await vscode.workspace.applyEdit(edit);
        Signature = StapSignatureHelpProvider.provideSignatureHelp(document, new vscode.Position(0, 25), token);
        assert.notEqual(undefined, Signature);
        Signature = Signature as vscode.SignatureHelp;
        assert.equal(0, Signature.activeSignature);
        assert.equal(1, Signature.activeParameter);

        edit = new vscode.WorkspaceEdit();
        edit.insert(document.uri, new vscode.Position(0, 25), 'bbb');
        edit.insert(document.uri, new vscode.Position(0, 28), ')');
        await vscode.workspace.applyEdit(edit);
        Signature = StapSignatureHelpProvider.provideSignatureHelp(document, new vscode.Position(0, 29), token);
        assert.equal(undefined, Signature);
    });
});
