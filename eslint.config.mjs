import eslintJs from "@eslint/js";
import prettierConfig from "@vue/eslint-config-prettier";
import tsEslint from "typescript-eslint";

export default tsEslint.config(
  {
    ignores: ["dist/", "studio/.sanity/", "**/eslint.config.mjs", "**/*.d.ts"],
  },
  eslintJs.configs.recommended,
  tsEslint.configs.recommended,
  prettierConfig,
  {
    rules: {
      "no-console": "off",
      "no-debugger": "off",
      "@typescript-eslint/no-explicit-any": "off",
      "vue/multi-word-component-names": "off",
    },
  }
);
