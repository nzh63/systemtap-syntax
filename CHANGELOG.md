# Change Log

## v0.4.2

- Remove duplicate in auto completion list.
- Add global variables and function name to auto completion list.
- Goto definition can find function arguments now.

## v0.4.1

- Goto definition can find local variables now.
- Auto completion can provide local variables, function arguments and probe values as suggestions.

## v0.4.0

- Add goto definition.

## v0.3.10

- Fix syntax highlight of embedded C code. (See ([microsoft/vscode#64966](https://github.com/microsoft/vscode/issues/34525) & [atom/language-c#146](https://github.com/atom/language-c/issues/146)) for more information)
- Build-in functions without argument will not show "None" as document.
- Let VSCode decided where to break line.
- Processe `@defined` as a function-like macro.

## v0.3.9

- Fix document of build-in function which has two or moresynopsis.
- Macro won't show unneeded duplicate in auto completion list.

## v0.3.8

- Add some macro and build-in function.
- Add hover information for macro.
- Show signature info while inputting a build-in function.

## v0.3.7

- Fix highlighting bugs of funcion's retuen type.
- Add macro.
- Change document format.

## v0.3.6

- Fix hover information.
- Fix document for `.return`.

## v0.3.5

- Fix document.

## v0.3.4

- Add hover information.
- Add input '.' to commit some auto completion word.

## v0.3.3

- Document in more detail.
- now VSCode will processe `%{`, `%}`, `%(`, `%)` as a whole.

## v0.3.2

- Fix highlighting bugs of funcion declaration with space.
- Fix highlighting bugs of funcion declaration or probe declaration with comment.

## v0.3.1

- Add more probe tags.

## v0.3.0

- Auto completion.
- Fix some highlighting bugs.

## v0.2.0

- Support embedded C.

## v0.1.1

- Fix bug while opening a C file.

## v0.1.0

- Initial release.
