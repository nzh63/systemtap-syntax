import * as assert from 'assert';

import * as vscode from 'vscode';

suite('Goto Definition', () => {
    const documentT = vscode.workspace.openTextDocument({
        language: 'systemtap',
        content:
            `global DEAD=-1,
        RUNNING=1
      , QUEUED=2, SLEEPING=3

global run_time,
       queued_time, sleep_time
     , iowait_time
global pid_state, pid_names
function aaa:long(bbb:string) {
    DEAD = 5
    RUNNING = 3
    SLEEPING = 5
    iowait_time = 6
    run_time = 6
    queued_time = 8
    pid_state = 2
}
function xxx(bb:string, ccc) {
    bb = 6
    ccc = 0
    return aaa()
}
function a() {
    myname = 5
    print(myname)
}
probe begin {
    myname = 5
    print(myname)
    for (i = 0; i < 6; i++) {
        print(i)
    }
}
`
    });

    async function check(document: vscode.TextDocument, x: number, y: number, x0: number, y0: number) {
        const pos: vscode.Location[] = await vscode.commands.executeCommand('vscode.executeDefinitionProvider', document.uri, new vscode.Position(x, y)) as vscode.Location[];
        assert.notEqual(undefined, pos[0]);
        assert.ok(pos.some(i => i.range.start.line == x0 && i.range.start.character == y0));
    }

    test('Ver name - global', async () => {
        const document = await documentT;
        await vscode.window.showTextDocument(document);

        await check(document, 9, 5, 0, 7);
        await check(document, 10, 5, 1, 8);
        await check(document, 11, 5, 2, 18);
        await check(document, 12, 5, 6, 7);
        await check(document, 13, 5, 4, 7);
        await check(document, 14, 5, 5, 7);
        await check(document, 15, 5, 7, 7);
    });

    test('Ver name - local', async () => {
        const document = await documentT;
        await vscode.window.showTextDocument(document);

        await check(document, 24, 10, 23, 4);
        await check(document, 28, 13, 27, 4);
        await check(document, 30, 14, 29, 9);
    });

    test('Function name', async () => {
        const document = await documentT;
        await vscode.window.showTextDocument(document);

        await check(document, 20, 14, 8, 9);
    });

    test('Function arguments', async () => {
        const document = await documentT;
        await vscode.window.showTextDocument(document);

        await check(document, 18, 5, 17, 13);
        await check(document, 19, 5, 17, 24);
    });
});
