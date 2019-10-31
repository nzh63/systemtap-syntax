# SystemTap
[![Build Status](https://dev.azure.com/nzh21/nzh21/_apis/build/status/nzh63.systemtap-syntax?branchName=master)](https://dev.azure.com/nzh21/nzh21/_build/latest?definitionId=1&branchName=master)

This package adds language support for SystemTap script.

## Features

- Syntax highlighting
- Auto completion
- Show document when you hover in a build-in function or a probe name
- Signature help for build-in function
- Goto definition

## Known issues

Because of upstream issuse ([microsoft/vscode#64966](https://github.com/microsoft/vscode/issues/34525) & [atom/language-c#146](https://github.com/atom/language-c/issues/146)), we have to use C++ syntax highlight for embedded C code.
