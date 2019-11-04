import * as vscode from 'vscode';

import { syscallAction, vfsAction, buildinFunction, probe as otherProbe, macro } from './doc';
import ProbeRaw from './doc/probe';
import syscallRaw from './doc/syscall';
import vfsRaw from './doc/vfs';

const keyword = ['global', 'function', 'probe', 'while', 'for', 'foreach', 'in', 'limit', 'for', 'break', 'continue', 'return', 'next', 'delete', 'try', 'catch']
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

export function provideCompletionItems(
	document: vscode.TextDocument,
	position: vscode.Position,
	token: vscode.CancellationToken,
	context: vscode.CompletionContext
) {
	const local = provideCompletionItemsInLocal(document, position, token, context);
	return [...local, ...keyword, ...buildinFunction, ...macro];
}

export function provideCompletionItemsInLocal(
	document: vscode.TextDocument,
	position: vscode.Position,
	token: vscode.CancellationToken,
	context: vscode.CompletionContext
) {
	let lineNumber = position.line;
	let line = document.lineAt(lineNumber).text.substr(0, position.character);
	let completion: vscode.CompletionItem[] = [];
	let inLocal = true;
	while (inLocal) {
		if (/function|probe/.test(line)) {
			inLocal = false;
			line = line.substr(Math.max(0, line.lastIndexOf('function'), line.lastIndexOf('probe')));
			processeFunctionArgumentsList();	// function
			processeProbeValuesList();		// probe
		}
		let match = (line.match(/([a-zA-Z0-9_$]+)\s*=/) || [null, null])[1];
		if (match) {
			addItem(match);
			line = line.substr(0, line.lastIndexOf(match));
		} else {
			lineNumber--;
			line = '';
		}
		if (lineNumber >= 0 && line === '') line = document.lineAt(lineNumber).text;
		else if (line === '') inLocal = false;
	}
	return completion;

	function addItem(name: string, detail?: string, doc?: string, type = vscode.CompletionItemKind.Variable) {
		let c = new vscode.CompletionItem(name);
		c.kind = type;
		if (detail) c.detail = detail;
		if (doc) c.documentation = new vscode.MarkdownString(doc);
		completion.push(c);
	}

	function processeFunctionArgumentsList() {
		let argumentsList = (line.match(/^function.*?\((.+?)\)/) || [null, null])[1];
		if (argumentsList) {
			let argument = argumentsList.split(',').map(s => (s.match(/(\S*)\s*:\s*(\S*)/) || [s, s, undefined]) as [string, string, string | undefined]);
			for (const i of argument) {
				addItem(i[1], i[2]);
			}
		}
	}

	function processeProbeValuesList() {
		let probeName = (line.match(/^probe(?:\s+|\/\*.*?\*\/)([a-zA-Z._]+)/) || [null, null])[1];
		if (probeName) {
			let rawDoc = ProbeRaw.filter(i => i.name === probeName);
			if (rawDoc[0]) {
				let match = (rawDoc[0].doc.match(/\*\*Values\*\*\s*([\S\s]*)(?!\*\*)/) || [null, null])[1];
				if (match) {
					let values = match.split('\n');
					for (let i of values) {
						i = i.trim();
						let [, valueName, valueDoc] = (i.match(/^`(.*?)`(.*?)$/) || [undefined, undefined, undefined]);
						if (valueName) {
							addItem(valueName, '', valueDoc);
						}
					}
				}
			}
			rawDoc = syscallRaw.filter(i => 'syscall.' + i.name === probeName);
			rawDoc = [...rawDoc, ...vfsRaw.filter(i => 'vfs.' + i.name === probeName)];
			if (rawDoc.length) {
				let values = rawDoc[0].doc.split(' ');
				for (let i = 0; i < values.length; i++) {
					values[i] = values[i].trim();
					let [, valueName, valueDetail] = (values[i].match(/^(.*?):(.*?)$/) || [undefined, undefined, undefined]);
					if (valueDetail === 'struct') {
						i++;
						valueDetail += ' ' + values[i].trim();
					}
					if (valueName) {
						addItem(valueName, valueDetail);
					}
				}
			}
		}
	}
}

export function provideCompletionItemsMacro(
	document: vscode.TextDocument,
	position: vscode.Position,
	token: vscode.CancellationToken,
	context: vscode.CompletionContext
) {
	if (context.triggerCharacter && context.triggerCharacter == '@')
		return macro;
}
export function provideCompletionItemsAfterProbe(
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
	let autoCompletionMacro = vscode.languages.registerCompletionItemProvider('systemtap', { provideCompletionItems: provideCompletionItemsMacro }, '@');
	let autoCompletionAfterProbe = vscode.languages.registerCompletionItemProvider('systemtap', { provideCompletionItems: provideCompletionItemsAfterProbe }, ' ', '.');
	context.subscriptions.push(autoCompletion, autoCompletionMacro, autoCompletionAfterProbe);
}
