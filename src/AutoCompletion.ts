import * as vscode from 'vscode';

import { syscallAction, vfsAction, buildinFunction, probe as otherProbe, macro } from './doc';

const keyword: vscode.CompletionItem[] = ['global', 'function', 'probe', 'while', 'for', 'foreach', 'in', 'limit', 'for', 'break', 'continue', 'return', 'next', 'delete', 'try', 'catch']
	.map(i => {
		let j = new vscode.CompletionItem(i);
		j.kind = vscode.CompletionItemKind.Keyword;
		return j;
	});
const otherProbeKey = Object.keys(otherProbe).map(i => {
	let j = new vscode.CompletionItem(i);
	j.commitCharacters = ['.'];
	return j;
});

function provideCompletionItems(
	document: vscode.TextDocument,
	position: vscode.Position,
	token: vscode.CancellationToken,
	context: vscode.CompletionContext
) {
	return [...keyword, ...buildinFunction, ...macro];
}

function provideCompletionItemsAfterProbe(
	document: vscode.TextDocument,
	position: vscode.Position,
	token: vscode.CancellationToken,
	context: vscode.CompletionContext
) {
	let input = document.lineAt(position).text.substring(0, position.character);

	let afterProbe: vscode.CompletionItem[] = [];

	let syscall = new vscode.CompletionItem('syscall');
	syscall.commitCharacters = ['.'];
	let afterSyscall: vscode.CompletionItem[] = [];
	if (/syscall\.$/.test(input)) {
		afterSyscall = syscallAction;
	}

	let kernel = new vscode.CompletionItem('kernel');
	kernel.commitCharacters = ['.'];
	let afterKernel: vscode.CompletionItem[] = [];

	if (/kernel\.$/.test(input)) {
		afterKernel = ['function', 'trace', 'statement']
			.map(i => {
				let j = new vscode.CompletionItem(i);
				j.insertText = new vscode.SnippetString(i + '(${1})');
				return j;
			});
	}
	if (/kernel\.function\(".*?(?<!\\)"\)\.$/.test(input)) {
		afterKernel = ['call', 'return', 'inline']
			.map(i => new vscode.CompletionItem(i));
	}
	if (/kernel\.statement\(".*?(?<!\\)"\)\.$/.test(input)) {
		afterKernel = ['absolute']
			.map(i => new vscode.CompletionItem(i));
	}

	let vfs = new vscode.CompletionItem('vfs');
	vfs.commitCharacters = ['.'];
	let afterVfs: vscode.CompletionItem[] = [];

	if (/vfs\.$/.test(input)) {
		afterVfs = vfsAction;
	}

	let _module = new vscode.CompletionItem('module');
	_module.insertText = new vscode.SnippetString('module("${1}")');
	let afterModule: vscode.CompletionItem[] = [];

	if (/module\("[^"]*"\)\.$/.test(input)) {
		let fun = new vscode.CompletionItem('function');
		fun.insertText = new vscode.SnippetString('function("${1}")');
		afterModule = [fun];
	} else if (/module\("[^"]*"\)\.function\("[^"]*"\)\.$/.test(input)) {
		afterModule = ['call', 'return', 'inline']
			.map(i => new vscode.CompletionItem(i));
	}

	let process = new vscode.CompletionItem('process');
	process.insertText = new vscode.SnippetString('process("${1}")');
	let afterProcess: vscode.CompletionItem[] = [];

	if (/process\("[^"]*"\)\.$/.test(input)) {
		let fun = new vscode.CompletionItem('function');
		fun.insertText = new vscode.SnippetString('function("${1}")');
		afterProcess = [fun];
	} else if (/process\("[^"]*"\)\.function\("[^"]*"\)\.$/.test(input)) {
		afterProcess = ['call', 'return']
			.map(i => new vscode.CompletionItem(i));
	}

	let begin = new vscode.CompletionItem('begin');
	let end = new vscode.CompletionItem('end');
	let timer = new vscode.CompletionItem('timer');
	let afterTimer: vscode.CompletionItem[] = [];
	if (/timer\.$/.test(input)) {
		afterTimer = ['s', 'ms', 'us', 'ns', 'hz', 'jiffies']
			.map(i => {
				let j = new vscode.CompletionItem(i);
				j.insertText = new vscode.SnippetString(i + '(${1})');
				return j;
			});
	}
	let afterOther: vscode.CompletionItem[] = [];
	for (const i in otherProbe) {
		if (RegExp(i + '\\.$').test(input)) {
			afterOther = otherProbe[i];
			break;
		}
	}

	if (/probe\s+$/.test(input)) {
		afterProbe = [kernel, syscall, vfs, _module, process, begin, end, timer, ...otherProbeKey];
	}

	return [
		...afterProbe,
		...afterKernel,
		...afterSyscall,
		...afterVfs,
		...afterModule,
		...afterProcess,
		...afterTimer,
		...afterOther
	];
}

export default function setupAutoCompletion(context: vscode.ExtensionContext) {
    let autoCompletion = vscode.languages.registerCompletionItemProvider('systemtap', { provideCompletionItems });
	let autoCompletionMacro = vscode.languages.registerCompletionItemProvider('systemtap', { provideCompletionItems: () => macro }, '@');
	let autoCompletionAfterProbe = vscode.languages.registerCompletionItemProvider('systemtap', { provideCompletionItems: provideCompletionItemsAfterProbe }, ' ', '.');
	context.subscriptions.push(autoCompletion, autoCompletionMacro, autoCompletionAfterProbe);
}
