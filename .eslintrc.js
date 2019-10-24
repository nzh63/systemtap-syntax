module.exports = {
    env: {
        node: true,
        es6: true
    },
    parser: '@typescript-eslint/parser',
    parserOptions: {
        sourceType: 'module'
    },
    plugins: ['@typescript-eslint'],
    extends: ['plugin:@typescript-eslint/eslint-recommended'],
    rules: {
        'semi': 'error'
    },
    globals: {
        BigInt: 'readonly'
    }
}
