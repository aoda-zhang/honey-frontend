module.exports ={
  parser: "@typescript-eslint/parser",
  parserOptions: {
    project: 'tsconfig.json',
    tsconfigRootDir: __dirname,
    sourceType: 'module'
},
  ignorePatterns: [".eslintrc.js"],
  extends: [
    "eslint:recommended",
    "airbnb-typescript",
    "plugin:@typescript-eslint/recommended",
    "plugin:react/recommended",
    "plugin:react-hooks/recommended",
    "prettier"
  ],
  plugins: ["react", "react-hooks","@typescript-eslint","import"],
  env: {
    "browser": true,
    "node": true
  },
  settings: {
    react: {
      version: "detect"
    },
    "import/resolver": {
      "typescript": {}
    }
  },
  rules: {
    "no-var": "error",
    "@typescript-eslint/no-explicit-any": "off",
    "@typescript-eslint/explicit-module-boundary-types": "off",
    "react-hooks/rules-of-hooks": "error",
    "react-hooks/exhaustive-deps": "error",
    "react/prop-types": "off",
    "react/jsx-filename-extension": "warn",
    "@typescript-eslint/no-unused-vars": ["warn"],
    "react/jsx-uses-react": "warn",
    "react/react-in-jsx-scope": "warn",
    "@typescript-eslint/ban-ts-comment": "warn",
    'import/extensions': [
      'error',
      'ignorePackages',
      {
          js: 'never',
          jsx: 'never',
          ts: 'never',
          tsx: 'never'
      }
  ],
  }
}
