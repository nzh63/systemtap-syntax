import * as assert from 'assert';

import * as vscode from 'vscode';

suite('Signature Help', () => {
    const documentT = vscode.workspace.openTextDocument({
        language: 'systemtap',
        content: ''
    });

    function check(Signature: vscode.SignatureHelp | undefined, parametersCount: number, activeParameter: number) {
        assert.notStrictEqual(Signature, undefined);
        Signature = Signature as vscode.SignatureHelp;
        assert.strictEqual(Signature.signatures[Signature.activeSignature].parameters.length, parametersCount);
        assert.strictEqual(Signature.activeParameter, activeParameter);
    }

    function trigger(document: vscode.TextDocument, position: vscode.Position, triggerCharacter: string) {
        return vscode.commands.executeCommand<vscode.SignatureHelp>(
            'vscode.executeSignatureHelpProvider',
            document.uri,
            position,
            triggerCharacter);
    }

    test('None arg', async () => {
        const document = await documentT;
        await vscode.window.showTextDocument(document);

        let edit = new vscode.WorkspaceEdit();
        edit.delete(document.uri, new vscode.Range(0, 0, document.lineCount, 0));
        edit.insert(document.uri, new vscode.Position(0, 0), 'pid');
        edit.insert(document.uri, new vscode.Position(0, 3), '(');
        await vscode.workspace.applyEdit(edit);
        let Signature = await trigger(document, new vscode.Position(0, 4), '(');
        check(Signature, 0, 0);

        edit = new vscode.WorkspaceEdit();
        edit.insert(document.uri, new vscode.Position(0, 4), ')');
        await vscode.workspace.applyEdit(edit);
        Signature = await trigger(document, new vscode.Position(0, 5), ')');
        assert.strictEqual(undefined, Signature);
    });

    test('One args', async () => {
        const document = await documentT;
        await vscode.window.showTextDocument(document);

        let edit = new vscode.WorkspaceEdit();
        edit.delete(document.uri, new vscode.Range(0, 0, document.lineCount, 0));
        edit.insert(document.uri, new vscode.Position(0, 0), 'task_pid');
        edit.insert(document.uri, new vscode.Position(0, 8), '(');
        await vscode.workspace.applyEdit(edit);
        let Signature = await trigger(document, new vscode.Position(0, 9), '(');
        check(Signature, 1, 0);

        edit = new vscode.WorkspaceEdit();
        edit.insert(document.uri, new vscode.Position(0, 9), 'aaa');
        edit.insert(document.uri, new vscode.Position(0, 12), ')');
        await vscode.workspace.applyEdit(edit);
        Signature = await trigger(document, new vscode.Position(0, 13), ')');
        assert.equal(undefined, Signature);
    });

    test('Two args', async () => {
        const document = await documentT;
        await vscode.window.showTextDocument(document);

        let edit = new vscode.WorkspaceEdit();
        edit.delete(document.uri, new vscode.Range(0, 0, document.lineCount, 0));
        edit.insert(document.uri, new vscode.Position(0, 0), 'fullpath_struct_file');
        edit.insert(document.uri, new vscode.Position(0, 20), '(');
        await vscode.workspace.applyEdit(edit);
        let Signature = await trigger(document, new vscode.Position(0, 21), '(');
        check(Signature, 2, 0);

        edit = new vscode.WorkspaceEdit();
        edit.insert(document.uri, new vscode.Position(0, 21), 'aaa');
        edit.insert(document.uri, new vscode.Position(0, 24), ',');
        await vscode.workspace.applyEdit(edit);
        Signature = await trigger(document, new vscode.Position(0, 25), ',');
        check(Signature, 2, 1);

        edit = new vscode.WorkspaceEdit();
        edit.insert(document.uri, new vscode.Position(0, 25), 'bbb');
        edit.insert(document.uri, new vscode.Position(0, 28), ')');
        await vscode.workspace.applyEdit(edit);
        Signature = await trigger(document, new vscode.Position(0, 29), ')');
        assert.equal(undefined, Signature);
    });
});
