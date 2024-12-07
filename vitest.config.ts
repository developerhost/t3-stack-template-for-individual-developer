import { defineConfig } from "vitest/config";
import path from "path";
import dotenv from "dotenv";

// GitHub Actionsの場合、Secretsから環境変数が渡されるため .env を読み込まない
if (!process.env.CI) {
  dotenv.config({ path: ".env" });
}

export default defineConfig({
  test: {
    globals: true,
    environment: "node",
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"), // プロジェクト構造に合わせてパスを調整
    },
  },
});
