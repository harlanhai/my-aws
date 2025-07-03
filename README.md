# 京程一灯DApp架构设计指南

一个基于 React 和 TypeScript 的去中心化应用程序（DApp），集成了 MetaMask SDK 用于区块链交互。

## 🚀 技术栈

- **前端框架**: React 19.1.0
- **语言**: TypeScript
- **样式**: Tailwind CSS 4.1.8
- **构建工具**: Webpack 5
- **包管理器**: pnpm 10.9
- **区块链集成**: MetaMask SDK
- **代码质量**: ESLint + Prettier + Husky
- **测试**: Jest + BackstopJS (UI回归测试)

## 📦 环境要求

- Node.js (推荐 20.x 或更高版本)
- pnpm 10+

## 🛠️ 安装

```bash
# 克隆项目
git clone <your-repo-url>
cd my-ai-dapp

# 安装依赖
pnpm install
```

## 🚀 运行项目

### 开发环境

```bash
# 启动开发服务器（带热重载）
pnpm run client:serve

# 构建开发版本
pnpm run client:dev

# 构建生产版本
pnpm run client:prod
```

开发服务器将在 `http://localhost:3003` 启动（端口可能不同，请查看终端输出）。

### 生产构建

```bash
# 构建生产版本
pnpm run client:prod
```

构建后的文件将输出到 `dist/` 目录。

## 🧪 测试

```bash
# 运行单元测试
pnpm test
```

## 🔧 代码质量

项目配置了完整的代码质量工具链：

### ESLint & Prettier

```bash
# 检查代码风格
pnpm run lint

# 自动修复代码风格问题
pnpm run lint:fix
```

### Git Hooks (Husky)

项目已配置 Husky，会在提交代码时自动运行代码检查：

- **pre-commit**: 自动运行 ESLint 检查和修复
- **commit-msg**: 检查提交信息格式（如果配置了 commitlint）

## 🔌 MetaMask 集成

项目集成了 MetaMask SDK，支持：

- 钱包连接和断开
- 账户管理
- 交易签名
- 网络切换

基本使用示例：

```typescript
import { MetaMaskSDK } from '@metamask/sdk';

const sdk = new MetaMaskSDK({
  dappMetadata: {
    name: 'AI DApp',
    url: window.location.href,
  }
});

// 连接钱包
const accounts = await sdk.connect();
```

## 🎨 样式系统

使用 Tailwind CSS 4.1.8 作为样式框架，支持：

- 响应式设计
- 深色模式
- 自定义主题
- 组件样式复用

## 🔨 开发工具配置

### VSCode 推荐插件

- ESLint
- Prettier - Code formatter
- Tailwind CSS IntelliSense
- TypeScript and JavaScript Language Features

### 推荐的 VSCode 设置

```json
{
  "editor.formatOnSave": true,
  "editor.defaultFormatter": "esbenp.prettier-vscode",
  "editor.codeActionsOnSave": {
    "source.fixAll.eslint": true
  }
}
```

## 📝 开发规范

### 提交信息规范

推荐使用约定式提交格式：

```
feat: 添加新功能
fix: 修复bug
docs: 更新文档
style: 代码格式化
refactor: 重构代码
test: 添加测试
chore: 构建过程或辅助工具的变动
```

### 代码风格

- 使用 TypeScript 进行类型检查
- 遵循 Airbnb TypeScript 代码规范
- 使用 Prettier 进行代码格式化
- 组件使用函数式组件和 Hooks

## 🐛 故障排除

### 常见问题

1. **安装依赖失败**

   ```bash
   # 清除缓存后重新安装
   pnpm store prune
   pnpm install
   ```

2. **类型检查错误**

   ```bash
   # 重新生成类型文件
   pnpm run lint:fix
   ```

3. **MetaMask 连接问题**
   - 确保浏览器已安装 MetaMask 扩展
   - 检查网络连接
   - 确认 DApp 域名在 MetaMask 中已授权

## 🤝 贡献指南

1. Fork 本仓库
2. 创建特性分支 (`git checkout -b feature/AmazingFeature`)
3. 提交更改 (`git commit -m 'Add some AmazingFeature'`)
4. 推送到分支 (`git push origin feature/AmazingFeature`)
5. 创建 Pull Request

## 📄 许可证

本项目采用 ISC 许可证 - 查看 [LICENSE](LICENSE) 文件了解详情。

## 📞 联系方式

如有问题或建议，请通过以下方式联系：

- 创建 Issue
- 发送邮件到：[harlanhxh@gmail.com]

---
