module.exports = {
  parser: "@typescript-eslint/parser",
  parserOptions: {
    sourceType: "module",
    ecmaFeatures: {
      jsx: true,
    },
    project: "./tsconfig.json",
  },
  extends: [
    "airbnb-typescript",
    "eslint:recommended",
    "plugin:react/recommended",
    "plugin:react-hooks/recommended",
    "plugin:@typescript-eslint/recommended",
  ],
  plugins: ["react", "react-hooks", "@typescript-eslint", "prettier", "import"],
  settings: {
    react: {
      version: "detect",
    },
    "import/resolver": {
      typescript: {
        // paths: "./tsconfig.json",
        // alwaysTryTypes: true,
      },
    },
    // "import/extensions": [".js", ".jsx", ".ts", ".tsx"],
    // "import/parsers": {
    //   "@typescript-eslint/parser": [".ts", ".tsx"],
    // },
    // "import/resolver": {
    //   node: {
    //     extensions: [".js", ".jsx", ".ts", ".tsx"],
    //   },
    // },
  },
  rules: {
    "react-hooks/rules-of-hooks": "error",
    "react-hooks/exhaustive-deps": "error",
    "@typescript-eslint/semi": ["off"],
    "react/prop-types": "off",
    "@typescript-eslint/explicit-function-return-type": "off",
    "@typescript-eslint/explicit-module-boundary-types": "off",
    "@typescript-eslint/no-explicit-any": "off",
    "prettier/prettier": [
      "warn",
      {},
      { usePrettierrc: true, endOfLine: "auto" },
    ],
    "import/extensions": [
      "error",
      "ignorePackages",
      {
        js: "never",
        jsx: "never",
        ts: "never",
        tsx: "never",
      },
    ],
    "no-use-before-define": "off",
    "@typescript-eslint/no-use-before-define": ["error"],
    "react/jsx-filename-extension": ["warn", { extensions: [".tsx", ".jsx"] }],
    "no-shadow": "off",
    "@typescript-eslint/no-shadow": ["error"],
    "@typescript-eslint/explicit-function-return-type": ["warn"],
    "@typescript-eslint/quotes": ["off"],
    "max-len": ["warn", { code: 100, ignoreComments: true, ignoreUrls: true }],
    "import/prefer-default-export": "off",
  },
};
