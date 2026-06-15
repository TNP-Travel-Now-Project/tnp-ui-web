import { defineConfig } from '@hey-api/openapi-ts'

export default defineConfig({
  input: process.env.BE_SWAGGER_URL || 'http://localhost:5246/swagger/v1/swagger.json',
  output: 'src/shared/api/generated',
  plugins: ['@hey-api/client-axios', '@hey-api/sdk', '@hey-api/typescript'],
})
