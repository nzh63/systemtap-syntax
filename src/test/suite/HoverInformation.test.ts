import * as assert from 'assert';

import * as vscode from 'vscode';

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

    async function check(position: vscode.Position, hasInfo: boolean = true) {
        let document = await documentT;
        await vscode.window.showTextDocument(document);
        let infoList  = await vscode.commands.executeCommand(
            'vscode.executeHoverProvider',
            document.uri,
            position) as vscode.Hover[];
            assert.ok(hasInfo !== (infoList.length === 0));
    }

    test('Probe name', async () => {
        await check(new vscode.Position(0, 12));
        await check(new vscode.Position(0, 18));
        await check(new vscode.Position(1, 12));
        await check(new vscode.Position(1, 18));
    });
    test('build-in fuiction', async () => {
        await check(new vscode.Position(3, 12));
        await check(new vscode.Position(3, 19));
    });
    test('Space', async () => {
        await check(new vscode.Position(3, 0), false);
        await check(new vscode.Position(5, 16), false);
    });
});
