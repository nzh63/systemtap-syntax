import * as assert from 'assert';

import * as vscode from 'vscode';
import * as AutoCompletion from '../../AutoCompletion';

let token: vscode.CancellationToken = { isCancellationRequested: false, onCancellationRequested: () => new vscode.Disposable(() => { }) };

suite('Auto Completion', () => {
    let documentAfterProbe = vscode.workspace.openTextDocument({
        language: 'systemtap',
        content: 'probe '
    });
    test('After probe', async () => {
        let document = await documentAfterProbe;
        await vscode.window.showTextDocument(document);
        let completion = AutoCompletion.provideCompletionItemsAfterProbe(document, new vscode.Position(0, 6), token, { triggerKind: vscode.CompletionTriggerKind.TriggerCharacter, triggerCharacter: ' ' });
        assert.notEqual(0, completion.filter(i => i.label === 'begin').length);
        assert.notEqual(0, completion.filter(i => i.label === 'end').length);
        assert.notEqual(0, completion.filter(i => i.label === 'kprocess').length);
        assert.notEqual(0, completion.filter(i => i.label === 'tcp').length);
        assert.notEqual(0, completion.filter(i => i.label === 'syscall').length);
        assert.notEqual(0, completion.filter(i => i.label === 'vfs').length);
        assert.notEqual(0, completion.filter(i => i.label === 'kernel').length);
        assert.notEqual(0, completion.filter(i => i.label === 'module').length);
        assert.notEqual(0, completion.filter(i => i.label === 'process').length);
        assert.notEqual(0, completion.filter(i => i.label === 'timer').length);
    });

    let documentAfterProbeKprocess = vscode.workspace.openTextDocument({
        language: 'systemtap',
        content: 'probe kprocess.'
    });
    test('After probe - kprocess', async () => {
        let document = await documentAfterProbeKprocess;
        await vscode.window.showTextDocument(document);
        let completion = AutoCompletion.provideCompletionItemsAfterProbe(document, new vscode.Position(0, 15), token, { triggerKind: vscode.CompletionTriggerKind.TriggerCharacter, triggerCharacter: '.' });
        assert.notEqual(0, completion.filter(i => i.label === 'create').length);
        assert.notEqual(undefined, completion.filter(i => i.label === 'create')[0].documentation);
        assert.notEqual(0, completion.filter(i => i.label === 'exit').length);
        assert.notEqual(undefined, completion.filter(i => i.label === 'exit')[0].documentation);
        assert.notEqual(0, completion.filter(i => i.label === 'release').length);
        assert.notEqual(undefined, completion.filter(i => i.label === 'release')[0].documentation);
    });

    let documentAfterProbeTcp = vscode.workspace.openTextDocument({
        language: 'systemtap',
        content: 'probe tcp.'
    });
    test('After probe - tcp', async () => {
        let document = await documentAfterProbeTcp;
        await vscode.window.showTextDocument(document);
        let completion = AutoCompletion.provideCompletionItemsAfterProbe(document, new vscode.Position(0, 10), token, { triggerKind: vscode.CompletionTriggerKind.TriggerCharacter, triggerCharacter: '.' });
        assert.notEqual(0, completion.filter(i => i.label === 'receive').length);
        assert.notEqual(undefined, completion.filter(i => i.label === 'receive')[0].documentation);
        assert.notEqual(0, completion.filter(i => i.label === 'recvmsg').length);
        assert.notEqual(undefined, completion.filter(i => i.label === 'recvmsg')[0].documentation);
    });

    let documentAfterProbeSyscall = vscode.workspace.openTextDocument({
        language: 'systemtap',
        content: 'probe syscall.'
    });
    test('After probe - syscall', async () => {
        let document = await documentAfterProbeSyscall;
        await vscode.window.showTextDocument(document);
        let completion = AutoCompletion.provideCompletionItemsAfterProbe(document, new vscode.Position(0, 14), token, { triggerKind: vscode.CompletionTriggerKind.TriggerCharacter, triggerCharacter: '.' });
        assert.notEqual(0, completion.filter(i => i.label === 'compat_sys_recvmsg').length);
        assert.notEqual(undefined, completion.filter(i => i.label === 'compat_sys_recvmsg')[0].documentation);
        assert.notEqual(0, completion.filter(i => i.label === 'setregid16').length);
        assert.notEqual(undefined, completion.filter(i => i.label === 'setregid16')[0].documentation);
        assert.notEqual(0, completion.filter(i => i.label === 'waitpid').length);
        assert.notEqual(undefined, completion.filter(i => i.label === 'waitpid')[0].documentation);
    });

    let documentAfterProbeVfs = vscode.workspace.openTextDocument({
        language: 'systemtap',
        content: 'probe vfs.'
    });
    test('After probe - vfs', async () => {
        let document = await documentAfterProbeVfs;
        await vscode.window.showTextDocument(document);
        let completion = AutoCompletion.provideCompletionItemsAfterProbe(document, new vscode.Position(0, 10), token, { triggerKind: vscode.CompletionTriggerKind.TriggerCharacter, triggerCharacter: '.' });
        assert.notEqual(0, completion.filter(i => i.label === 'open').length);
        assert.notEqual(undefined, completion.filter(i => i.label === 'open')[0].documentation);
        assert.notEqual(0, completion.filter(i => i.label === 'read').length);
        assert.notEqual(undefined, completion.filter(i => i.label === 'read')[0].documentation);
        assert.notEqual(0, completion.filter(i => i.label === 'write').length);
        assert.notEqual(undefined, completion.filter(i => i.label === 'write')[0].documentation);
    });

    let documentAfterProbeKernel = vscode.workspace.openTextDocument({
        language: 'systemtap',
        content: 'probe kernel.'
    });
    test('After probe - kernel', async () => {
        let document = await documentAfterProbeKernel;
        await vscode.window.showTextDocument(document);
        let completion = AutoCompletion.provideCompletionItemsAfterProbe(document, new vscode.Position(0, 13), token, { triggerKind: vscode.CompletionTriggerKind.TriggerCharacter, triggerCharacter: '.' });
        assert.notEqual(0, completion.filter(i => i.label === 'function').length);
        assert.notEqual(0, completion.filter(i => i.label === 'trace').length);
        assert.notEqual(0, completion.filter(i => i.label === 'statement').length);
    });

    let documentAfterProbeKernelFunction = vscode.workspace.openTextDocument({
        language: 'systemtap',
        content: 'probe kernel.function("*").'
    });
    test('After probe - kernel - function', async () => {
        let document = await documentAfterProbeKernelFunction;
        await vscode.window.showTextDocument(document);
        let completion = AutoCompletion.provideCompletionItemsAfterProbe(document, new vscode.Position(0, 27), token, { triggerKind: vscode.CompletionTriggerKind.TriggerCharacter, triggerCharacter: '.' });
        assert.notEqual(0, completion.filter(i => i.label === 'call').length);
        assert.notEqual(0, completion.filter(i => i.label === 'return').length);
        assert.notEqual(0, completion.filter(i => i.label === 'inline').length);
    });

    let documentAfterProbeKernelStatement = vscode.workspace.openTextDocument({
        language: 'systemtap',
        content: 'probe kernel.statement("*").'
    });
    test('After probe - kernel - statement', async () => {
        let document = await documentAfterProbeKernelStatement;
        await vscode.window.showTextDocument(document);
        let completion = AutoCompletion.provideCompletionItemsAfterProbe(document, new vscode.Position(0, 28), token, { triggerKind: vscode.CompletionTriggerKind.TriggerCharacter, triggerCharacter: '.' });
        assert.notEqual(0, completion.filter(i => i.label === 'absolute').length);
    });

    let documentAfterProbeModel = vscode.workspace.openTextDocument({
        language: 'systemtap',
        content: 'probe module("*").'
    });
    test('After probe - module', async () => {
        let document = await documentAfterProbeModel;
        await vscode.window.showTextDocument(document);
        let completion = AutoCompletion.provideCompletionItemsAfterProbe(document, new vscode.Position(0, 18), token, { triggerKind: vscode.CompletionTriggerKind.TriggerCharacter, triggerCharacter: '.' });
        assert.notEqual(0, completion.filter(i => i.label === 'function').length);
    });

    let documentAfterProbeModelFunction = vscode.workspace.openTextDocument({
        language: 'systemtap',
        content: 'probe module("*").function("*").'
    });
    test('After probe - module - function', async () => {
        let document = await documentAfterProbeModelFunction;
        await vscode.window.showTextDocument(document);
        let completion = AutoCompletion.provideCompletionItemsAfterProbe(document, new vscode.Position(0, 32), token, { triggerKind: vscode.CompletionTriggerKind.TriggerCharacter, triggerCharacter: '.' });
        assert.notEqual(0, completion.filter(i => i.label === 'call').length);
        assert.notEqual(0, completion.filter(i => i.label === 'return').length);
        assert.notEqual(0, completion.filter(i => i.label === 'inline').length);
    });

    let documentAfterProbeProcess = vscode.workspace.openTextDocument({
        language: 'systemtap',
        content: 'probe process("/uer/bin/ls").'
    });
    test('After probe - process', async () => {
        let document = await documentAfterProbeProcess;
        await vscode.window.showTextDocument(document);
        let completion = AutoCompletion.provideCompletionItemsAfterProbe(document, new vscode.Position(0, 29), token, { triggerKind: vscode.CompletionTriggerKind.TriggerCharacter, triggerCharacter: '.' });
        assert.notEqual(0, completion.filter(i => i.label === 'function').length);
    });

    let documentAfterProbeProcessFunction = vscode.workspace.openTextDocument({
        language: 'systemtap',
        content: 'probe process("/uer/bin/ls").function("*").'
    });
    test('After probe - process - function', async () => {
        let document = await documentAfterProbeProcessFunction;
        await vscode.window.showTextDocument(document);
        let completion = AutoCompletion.provideCompletionItemsAfterProbe(document, new vscode.Position(0, 43), token, { triggerKind: vscode.CompletionTriggerKind.TriggerCharacter, triggerCharacter: '.' });
        assert.notEqual(0, completion.filter(i => i.label === 'call').length);
        assert.notEqual(0, completion.filter(i => i.label === 'return').length);
    });

    let documentAfterProbeTimer = vscode.workspace.openTextDocument({
        language: 'systemtap',
        content: 'probe timer.'
    });
    test('After probe - timer', async () => {
        let document = await documentAfterProbeTimer;
        await vscode.window.showTextDocument(document);
        let completion = AutoCompletion.provideCompletionItemsAfterProbe(document, new vscode.Position(0, 12), token, { triggerKind: vscode.CompletionTriggerKind.TriggerCharacter, triggerCharacter: '.' });
        assert.notEqual(0, completion.filter(i => i.label === 's').length);
        assert.notEqual(0, completion.filter(i => i.label === 'ms').length);
        assert.notEqual(0, completion.filter(i => i.label === 'hz').length);
        assert.notEqual(0, completion.filter(i => i.label === 'jiffies').length);
    });
});
