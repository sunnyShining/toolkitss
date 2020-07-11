const OFF = 0
const WARNING = 1
const ERROR = 2

module.exports = {
  parser: '@typescript-eslint/parser',
  extends: [
    'plugin:@typescript-eslint/recommended',
    'plugin:react/recommended',
    'prettier/@typescript-eslint',
    'plugin:prettier/recommended'
  ],
  plugins: [
    '@typescript-eslint',
    'react'
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
    "prefer-rest-params": [ERROR],
    "semi": [ERROR, "never"],
    "@typescript-eslint/explicit-function-return-type": OFF,
    "@typescript-eslint/no-var-requires": OFF,
    "@typescript-eslint/member-delimiter-style": OFF,
    "@typescript-eslint/ban-ts-ignore": OFF,
    "@typescript-eslint/no-explicit-any": OFF,
    "@typescript-eslint/interface-name-prefix": OFF
  }
}
