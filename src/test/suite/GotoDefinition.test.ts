import * as assert from 'assert';

import * as vscode from 'vscode';
import * as GotoDefinition from '../../GotoDefinition';

let token: vscode.CancellationToken = { isCancellationRequested: false, onCancellationRequested: () => new vscode.Disposable(() => { }) };

suite('Goto Definition', () => {
    let documentT = vscode.workspace.openTextDocument({
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
function xxx(bb:string) {
    return aaa()
}
`
    });

    function check(document: vscode.TextDocument, x: number, y: number, x0: number, y0: number) {
        let pos = GotoDefinition.provideDefinition(document, new vscode.Position(x, y), token);
        assert.notEqual(undefined, pos[0]);
        assert.equal(x0, pos[0].range.start.line);
        assert.equal(y0, pos[0].range.start.character);
    }

    test('Ver name', async () => {
        let document = await documentT;
        await vscode.window.showTextDocument(document);

        check(document, 9, 5, 0, 7);
        check(document, 10, 5, 1, 8);
        check(document, 11, 5, 2, 18);
        check(document, 12, 5, 6, 7);
        check(document, 13, 5, 4, 7);
        check(document, 14, 5, 5, 7);
        check(document, 15, 5, 7, 7);
    });

    test('Function name', async () => {
        let document = await documentT;
        await vscode.window.showTextDocument(document);

        check(document, 18, 14, 8, 9);
    });
});
