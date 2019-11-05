import * as assert from 'assert';

import * as vscode from 'vscode';

suite('Auto Completion', () => {
    let documentThenable = vscode.workspace.openTextDocument({
        language: 'systemtap',
        content: ''
    });
    async function AutoCompletionAssert(
        documentContent: string,
        position: vscode.Position,
        list: string[],
        triggerCharacter?: string,
        hasDocument: boolean = false
    ): Promise<void> {
        let document = await documentThenable;
        await vscode.window.showTextDocument(document);
        let edit = new vscode.WorkspaceEdit();
        edit.replace(document.uri, new vscode.Range(0, 0, document.lineCount, 0), documentContent);
        await vscode.workspace.applyEdit(edit);

        let { items: completion } = await vscode.commands.executeCommand(
            'vscode.executeCompletionItemProvider',
            document.uri,
            position,
            triggerCharacter) as { items: vscode.CompletionItem[] };
        for (const label of list) {
            if (hasDocument) {
                assert.ok(completion.some(i => i.label === label && i.documentation !== undefined));
            } else {
                assert.ok(completion.some(i => i.label === label && i.documentation === undefined));
            }
        }
    }

    test('After probe', async () => {
        await AutoCompletionAssert(
            'probe ',
            new vscode.Position(0, 6),
            ['begin', 'end', 'kprocess', 'tcp', 'syscall', 'vfs', 'kernel', 'module', 'process', 'timer'],
            ' ');
    });

    test('After probe - kprocess', async () => {
        await AutoCompletionAssert(
            'probe kprocess.',
            new vscode.Position(0, 15),
            ['create', 'exit', 'release'],
            '.',
            true);
    });

    test('After probe - tcp', async () => {
        await AutoCompletionAssert(
            'probe tcp.',
            new vscode.Position(0, 10),
            ['receive', 'setsockopt', 'recvmsg'],
            '.',
            true);
    });

    test('After probe - syscall', async () => {
        await AutoCompletionAssert(
            'probe syscall.',
            new vscode.Position(0, 14),
            ['compat_sys_recvmsg', 'setregid16', 'waitpid'],
            '.',
            true);
    });

    test('After probe - vfs', async () => {
        await AutoCompletionAssert(
            'probe vfs.',
            new vscode.Position(0, 10),
            ['open', 'read', 'write'],
            '.',
            true);
    });

    test('After probe - kernel', async () => {
        await AutoCompletionAssert(
            'probe kernel.',
            new vscode.Position(0, 13),
            ['function', 'trace', 'statement'],
            '.');
    });

    test('After probe - kernel - function', async () => {
        await AutoCompletionAssert(
            'probe kernel.function("*").',
            new vscode.Position(0, 27),
            ['call', 'return', 'inline'],
            '.');
    });

    test('After probe - kernel - statement', async () => {
        await AutoCompletionAssert(
            'probe kernel.statement("*").',
            new vscode.Position(0, 28),
            ['absolute'],
            '.');
    });

    test('After probe - module', async () => {
        await AutoCompletionAssert(
            'probe module("*").',
            new vscode.Position(0, 18),
            ['function'],
            '.');
    });

    test('After probe - module - function', async () => {
        await AutoCompletionAssert(
            'probe module("*").function("*").',
            new vscode.Position(0, 32),
            ['call', 'return', 'inline'],
            '.');
    });

    test('After probe - process', async () => {
        await AutoCompletionAssert(
            'probe process("/uer/bin/ls").',
            new vscode.Position(0, 29),
            ['function'],
            '.');
    });

    test('After probe - process - function', async () => {
        await AutoCompletionAssert(
            'probe process("/uer/bin/ls").function("*").',
            new vscode.Position(0, 43),
            ['call', 'return'],
            '.');
    });

    test('After probe - timer', async () => {
        await AutoCompletionAssert(
            'probe timer.',
            new vscode.Position(0, 12),
            ['s', 'ms', 'hz', 'jiffies'],
            '.');
    });

    test('Local variables', async () => {
        await AutoCompletionAssert(
            'function foo:string() {\n    b = 0\n    bar = 1\n    baz = 2\n    b',
            new vscode.Position(4, 6),
            ['b', 'bar', 'baz']);
    });

    test('Function arguments', async () => {
        await AutoCompletionAssert(
            'function foo:string(bar, baz:long) { \n    ba',
            new vscode.Position(1, 6),
            ['bar', 'baz']);
    });

    test('Probe values', async () => {
        await AutoCompletionAssert(
            'probe scheduler.process_fork {\n    ch',
            new vscode.Position(1, 6),
            ['child_pid'],
            undefined,
            true);
    });

    test('Global variables', async () => {
        await AutoCompletionAssert(
            'global foo = 1,\n   bar = 3,baz\n    ,b\n\n function main() { b',
            new vscode.Position(4, 20),
            ['b', 'bar', 'baz']);
    });

    test('Function name', async () => {
        await AutoCompletionAssert(
            'function foo:string(bar, baz:long) { }\nfunction bar:string(bar, baz:long) { }\nfunction main() {\nf',
            new vscode.Position(3, 1),
            ['foo']);
    });
});
