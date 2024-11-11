// eslint.config.js
import js from "@eslint/js";
import globals from "globals";

export default [
  {
    files: ["**/*.js"],
    languageOptions: {
      ecmaVersion: 2018,
      sourceType: "module",
      globals: {
        ...globals.node, // Add Node.js globals like `require`, `module`, `exports`
      },
    },
    rules: {
      "no-restricted-globals": ["error", "name", "length"],
      "prefer-arrow-callback": "error",
      "quotes": ["error", "double", { "allowTemplateLiterals": true }],
    },
  },
];
