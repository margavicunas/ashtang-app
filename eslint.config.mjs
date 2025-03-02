// @ts-check
import stylistic from '@stylistic/eslint-plugin'

import withNuxt from './.nuxt/eslint.config.mjs'

export default withNuxt([
  {
    plugins: {
      '@stylistic': stylistic
    },
    rules: {
      'vue/multi-word-component-names': 'warn',
      'vue/no-multiple-template-root': 'error',
      'vue/no-v-html': 'warn',
      'vue/component-name-in-template-casing': ['error', 'PascalCase'],
      'no-console': ['warn', { allow: ['warn', 'error'] }],
      'no-debugger': 'warn',
      'no-unused-vars': 'warn',
      '@stylistic/semi': ['error', 'never'],
      '@stylistic/quotes': ['error', 'single'],
      '@stylistic/indent': ['error', 2],
      '@stylistic/max-len': ['warn', { code: 100 }],
      'import/order': ['error', {
        'groups': [
          'builtin',
          'external',
          'internal',
          'parent',
          'sibling',
          'index'
        ],
        'newlines-between': 'always'
      }]
    }
  }
])
