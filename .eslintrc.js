module.exports = {
  root: true,
  env: {
    node: true
  },
  plugins: ['prettier'],
  rules: {
    'prettier/prettier': 'error'
  },
  extends: ['plugin:prettier/recommended'],
  parserOptions: {
    ecmaVersion: 9
  }
}
