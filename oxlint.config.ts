import { defineConfig } from "oxlint";

export default defineConfig({
  plugins: ["typescript", "unicorn", "vue"],
  env: {
    browser: true,
    es2022: true,
  },
  categories: {
    correctness: "error",
    suspicious: "warn",
    pedantic: "warn",
    perf: "warn",
    style: "warn",
    restriction: "warn",
  },
  rules: {
    "no-console": "warn",
    "unicorn/filename-case": ["warn", { cases: { kebabCase: true, pascalCase: true } }],
  },
});
