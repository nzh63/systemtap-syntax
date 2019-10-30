import * as assert from 'assert';

import * as vscode from 'vscode';
import * as HoverInformation from '../../HoverInformation';

let token: vscode.CancellationToken = { isCancellationRequested: false, onCancellationRequested: () => new vscode.Disposable(() => { }) };

suite('Hover Information', () => {
    let documentT = vscode.workspace.openTextDocument({
        language: 'systemtap',
        content:
`probe kprocess.exec { printtask("kprocess.exec") }
probe syscall.exit { printtask("syscall.exit") }
function printtask(name) {
    t = pid2task(pid())
    father = @cast(t, "task_struct" , "kernel<linux/sched.h>" )->parent
    printf("%d[%s]/%d[%s]\t%s\n", task_pid(t), task_execname(t), task_pid(father), task_execname(father), name)
}
`
    });

    test('Probe name', async () => {
        let document = await documentT;
        await vscode.window.showTextDocument(document);
        assert.notEqual(undefined, HoverInformation.provideHover(document, new vscode.Position(0, 12), token));
        assert.notEqual(undefined, HoverInformation.provideHover(document, new vscode.Position(0, 18), token));
        assert.notEqual(undefined, HoverInformation.provideHover(document, new vscode.Position(1, 12), token));
        assert.notEqual(undefined, HoverInformation.provideHover(document, new vscode.Position(1, 18), token));
    });
    test('build-in fuiction', async () => {
        let document = await documentT;
        await vscode.window.showTextDocument(document);
        assert.notEqual(undefined, HoverInformation.provideHover(document, new vscode.Position(3, 12), token));
        assert.notEqual(undefined, HoverInformation.provideHover(document, new vscode.Position(3, 19), token));
    });
    test('Space', async () => {
        let document = await documentT;
        await vscode.window.showTextDocument(document);
        assert.equal(undefined, HoverInformation.provideHover(document, new vscode.Position(3, 0), token));
        assert.equal(undefined, HoverInformation.provideHover(document, new vscode.Position(5, 16), token));
    });
});
