module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  extends: [
    'airbnb',
    'airbnb-typescript',
  ],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 12,
    sourceType: 'module',
    project: './tsconfig.json',
  },
  plugins: [
    'react',
    '@typescript-eslint',
    'simple-import-sort',
  ],
  rules: {
    'max-len': ['error', { code: 120 }],
    'no-use-before-define': 'off',
    '@typescript-eslint/no-use-before-define': ['error'],
    'react/jsx-filename-extension': [1, { extensions: ['.tsx'] }],
    'import/extensions': [
      'error',
      'ignorePackages',
      {
        ts: 'never',
        tsx: 'never',
      },
    ],
    "import/prefer-default-export": "off",
    "react/jsx-props-no-spreading": "off",
    "react/require-default-props": "off",
    "simple-import-sort/imports": [
      "warn",
      {
          "groups": [
              // Side effect imports.
              ["^\\u0000"],
              // React and react-* libs and other packages
              ["^react$", "^react-.*", ".*react$", "^@.*", "^"],
              // app imports
              ["^config.*"],
              ["^layouts.*"],
              ["^pages.*"],
              ["^shared.*"],
              ["^features.*"],
              ["^utils.*"],
              ["^assets.*"],
              // Anything that starts with a dot.
              ["^\\..+", "^\\.$"]
          ]
      }
  ]
  },
  settings: {
    'import/parsers': {
      '@typescript-eslint/parser': ['.ts', '.tsx'],
    },
    'import/resolver': {
      typescript: {},
    },
  },
};
