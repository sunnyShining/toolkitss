module.exports = {
  parser: '@typescript-eslint/parser',
  extends: [
    'plugin:react/recommended',
    'plugin:@typescript-eslint/recommended',
  ],
  plugins: [
    '@typescript-eslint'
  ],
  settings: {
    "react": {
      "version": "^16.12.0"
    }
  },
  parserOptions: {
    ecmaVersion: 2018,
    sourceType: 'module',
    ecmaFeatures: {
      jsx: true,
    },
  },
  rules: {
    // @fixable 必须使用 === 或 !==，禁止使用 == 或 !=，与 null 比较时除外
    'eqeqeq': [
      'error',
      'always',
      {
        null: 'ignore'
      }
    ],
    "prefer-rest-params": ["error"],
    "semi": ["error", "never"],
    "@typescript-eslint/indent": ["error", 2],
    "quotes": ["error", "single"],
    "@typescript-eslint/explicit-function-return-type": "off",
    "@typescript-eslint/no-var-requires": "off",
    "@typescript-eslint/member-delimiter-style": "off",
    "@typescript-eslint/ban-ts-ignore": "off",
    "@typescript-eslint/no-explicit-any": "off",
    "@typescript-eslint/interface-name-prefix": "off"
  }
}
