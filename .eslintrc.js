module.exports = {
  root: true,
  env: {
    node: true,
  },
  extends: [
    "plugin:vue/vue3-essential",
    "eslint:recommended",
    "@vue/typescript/recommended",
    "@vue/prettier",
    "@vue/prettier/@typescript-eslint"
  ],
  parserOptions: {
    ecmaVersion: 2020,
  },
  rules: {
    'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    'no-mixed-operators':
      process.env.NODE_ENV === 'production' ? 'error' : 'off',
    camelcase: 'off',
    'no-console': 'off',
    'vue/no-unused-components': 'off',
    'vue/require-valid-default-prop': 'off',
    'vue/component-name-in-template-casing': ['error', 'PascalCase'],
    'vue/no-static-inline-styles': ['error', {
      'allowBinding': false
    }],
    'vue/html-closing-bracket-newline': ['error', {
      'singleline': 'never',
      'multiline': 'always'
    }],
    'vue/html-indent': ['error', 2, {
      'attribute': 1,
      'baseIndent': 1,
      'closeBracket': 0,
      'alignAttributesVertically': true,
      'ignores': []
    }],
    'vue/html-closing-bracket-spacing': ['error', {
      'startTag': 'never',
      'endTag': 'never',
      'selfClosingTag': 'always'
    }],
    'vue/html-end-tags': 'error',
    'vue/html-quotes': ['error', 'double', { 'avoidEscape': false }],
    'vue/attributes-order': ['error', {
      'order': [
        'DEFINITION',
        'GLOBAL',
        'UNIQUE',
        'OTHER_ATTR',
        'LIST_RENDERING',
        'RENDER_MODIFIERS',
        'CONDITIONALS',
        'EVENTS',
        'OTHER_DIRECTIVES',
        'TWO_WAY_BINDING',
        'CONTENT'
      ],
      'alphabetical': false
    }],
    'vue/component-tags-order': ['error', {
      'order': ['template', 'script', 'style']
    }],
    'vue/order-in-components': ['error', {
      'order': [
        'el',
        'name',
        'parent',
        'functional',
        ['delimiters', 'comments'],
        ['components', 'directives', 'filters'],
        'extends',
        'mixins',
        'inheritAttrs',
        'model',
        ['props', 'propsData'],
        'fetch',
        'asyncData',
        'data',
        'watch',
        'computed',
        'methods',
        'LIFECYCLE_HOOKS',
        'head',
        ['template', 'render'],
        'renderError'
      ]
    }],
    'vue/padding-line-between-blocks': ['error'],
    'vue/no-use-v-if-with-v-for': ['error']
  }
};
