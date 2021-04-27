module.exports = {
    extends: 'stylelint-config-standard',
    ignoreFiles: [
        'coverage/**',
        'node_modules/**',
    ],
    rules: {
        indentation: 4,
        'at-rule-no-unknown': [true, {
            ignoreAtRules: ['include'],
        }],
        'font-family-no-missing-generic-family-keyword': [true, {
            ignoreFontFamilies: ['/.*Font Awesome.*/']
        }],
        'selector-pseudo-class-no-unknown': [true, {
            ignorePseudoClasses: ['global'],
        }],
        'unit-disallowed-list': ['px'],
    },
};
