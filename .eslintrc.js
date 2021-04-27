module.exports = {
    parser: '@babel/eslint-parser',
    env: {
        browser: true,
        es6: true,
    },
    extends: [
        'airbnb',
        'plugin:react-hooks/recommended',
    ],
    rules: {
        'comma-dangle': ['error', {
            arrays: 'always-multiline',
            exports: 'always-multiline',
            functions: 'never',
            imports: 'always-multiline',
            objects: 'always-multiline',
        }],
        'import/no-unresolved': ['error', {
            ignore: ['test-utils'],
        }],
        'import/prefer-default-export': ['off'],
        'max-len': ['error', { code: 120 }],
        'no-else-return': ['error', { allowElseIf: true }],
        'react/jsx-filename-extension': 0,
        'react/jsx-indent-props': ['error', 4],
        'react/jsx-indent': ['error', 4],
        'react/jsx-props-no-spreading': ['off'],
        indent: ['error', 4],
    },
};
