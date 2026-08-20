import nextVitals from "eslint-config-next/core-web-vitals";
import nextTypescript from "eslint-config-next/typescript";

const eslintConfig = [
  {
    ignores: [
      ".next/**",
      "node_modules/**",
      ".venv/**",
      "taskmanager/**",
      "instance/**",
      "playwright-report/**",
      "test-results/**",
      "*.db",
    ],
  },
  ...nextVitals,
  ...nextTypescript,
];

export default eslintConfig;