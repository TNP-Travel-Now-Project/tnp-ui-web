import { defineConfig } from "@hey-api/openapi-ts";

export default defineConfig({
  input: "swagger.json",

  output: "src/shared/api/generated",

  plugins: [
    "@hey-api/client-axios",
    "@hey-api/sdk",
    "@hey-api/typescript",
  ],
});