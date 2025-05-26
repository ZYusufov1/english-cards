import { globalIgnores } from 'eslint/config'
import { defineConfigWithVueTs, vueTsConfigs } from '@vue/eslint-config-typescript'
import pluginVue from 'eslint-plugin-vue'

export default defineConfigWithVueTs(
    {
        name: 'app/files-to-lint',
        files: ['**/*.{ts,mts,tsx,vue}'],
    },

    globalIgnores(['**/dist/**', '**/coverage/**', '**/node_modules/**']),

    pluginVue.configs['flat/essential'],
    vueTsConfigs.recommended,

    {
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
)
