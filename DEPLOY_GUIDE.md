# 🚀 如何部署在线 Demo (Deployment Guide)

将您的 React Schema Form Lite 部署到公网，让所有人访问，最推荐使用 **Vercel** 或 **Netlify**。它们对开源项目免费，且支持自动化部署。

## 方案 A：使用 Vercel (推荐，速度快)

1.  **注册/登录**：
    访问 [vercel.com](https://vercel.com/)，使用您的 **GitHub 账号** 登录。

2.  **导入项目**：
    - 点击控制台的 **"Add New..."** -> **"Project"**。
    - 在列表中找到您的 `react-schema-form-lite` 仓库，点击 **"Import"**。

3.  **配置与部署**：
    - **Framework Preset**: Vercel 会自动识别为 `Vite` (如果没有，手动选择 Vite)。
    - **Build Command**: `npm run build` (默认)
    - **Output Directory**: `dist` (默认)
    - 点击 **"Deploy"** 按钮。

4.  **等待完成**：
    等待约 1 分钟，烟花撒花 🎉！您会获得一个类似 `https://react-schema-form-lite-xxxxx.vercel.app` 的域名。

---

## 方案 B：使用 GitHub Pages (纯静态)

如果您希望域名是 `yourname.github.io/repo-name`：

1.  打开 `vite.config.ts`，添加 base 路径：
    ```typescript
    export default defineConfig({
      base: '/react-schema-form-lite/', // 仓库名
      plugins: [react()],
      // ...
    })
    ```
2.  提交代码并推送到 GitHub。
3.  在 GitHub 仓库，点击 **Settings** -> **Pages**。
4.  **Source** 选择 `GitHub Actions`。
5.  选择 `Static HTML` 预设，即可自动部署。

---

## 常见问题

*   **Q: 这里改了代码，线上会自动更新吗？**
    A: 会的！Vercel 会监听您的 GitHub 仓库，每次 `git push` 后，它都会自动重新构建并发布。

*   **Q: 部署失败怎么办？**
    A: 检查 Build Logs。通常是因为 typescript 类型检查不通过（如 `tsc -b && vite build` 报错）。确保本地 `npm run build` 能成功即可。
