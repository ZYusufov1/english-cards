module.exports = {
    root: true,
    env: {
        browser: true,
        es2021: true,
        node: true
    },
    parser: 'vue-eslint-parser',
    parserOptions: {
        parser: '@typescript-eslint/parser',
        ecmaVersion: 2021,
        sourceType: 'module'
    },
    plugins: ['vue', '@typescript-eslint'],
    extends: [
        'plugin:vue/vue3-essential',
        'plugin:@typescript-eslint/recommended'
    ],
    ignorePatterns: ['dist/', 'coverage/', 'node_modules/'],
    overrides: [
        {
            files: ['*.ts', '*.tsx', '*.vue'],
            rules: {
                // TypeScript
                'no-unused-vars': ['warn', { argsIgnorePattern: '^_' }],
                '@typescript-eslint/no-unused-vars': ['warn', { argsIgnorePattern: '^_' }],
                '@typescript-eslint/explicit-function-return-type': 'warn',

                // Vue-specific
                'vue/multi-word-component-names': 'off',
                'vue/html-self-closing': ['warn', {
                    html: { void: 'always', normal: 'never', component: 'always' }
                }],
                'vue/attribute-hyphenation': ['warn', 'never'],
                'vue/order-in-components': 'warn',

                // Code style
                'semi': ['warn', 'never'],
                'quotes': ['error', 'single', { avoidEscape: true }],
                'vue/html-quotes': ['error', 'double'],
                'comma-dangle': ['warn', 'only-multiline'],
                'no-multiple-empty-lines': ['warn', { max: 1 }],
                'indent': ['error', 4, {
                    SwitchCase: 1,
                    ignoredNodes: ['TemplateLiteral']
                }],
                'vue/html-indent': ['error', 4]
            }
        }
    ]
}
