import eslintConfigStudio from "@sanity/eslint-config-studio";
import { defineConfig } from "eslint/config";

export default defineConfig([
  ...eslintConfigStudio,
  {
    settings: {
      react: { version: "19" } // Avoids auto-detection crash
    }
  },
]);

