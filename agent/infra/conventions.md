# 项目规约

本文档记录 todo-server 项目的文件创建与代码书写规约，所有开发需严格遵守。

## 命名规约

- 文件夹及文件统一以小写 `kebab-case`（小写 + 短横线）形式命名。
  - 正确：`todo.controller.ts`、`error-code.ts`、`login.dto.ts`
  - 错误：`TodoController.ts`、`errorCode.ts`、`LoginDto.ts`

## 分层规约

- 项目代码必须严格分层，常见层级如 `controllers`、`services`、`repositories`、`models`、`routes`、`middlewares` 等。
- 每一层新建一个 `index.ts` 作为该层的统一出口，对外只通过 `index.ts` 暴露成员。
  - 同层之间、跨层引用时，从该层的 `index.ts` 导入，而非直接引用具体文件。

## 环境变量规约

- 项目的环境变量必须抽出作为可配置项，统一在 `src/config/env.ts` 中读取和管理。
- 业务代码禁止直接使用 `process.env`，一律通过 `env` 配置对象访问。
- 敏感信息只写入 `.env`（不提交），并在 `.env.example` 中维护变量清单（可提交）。
