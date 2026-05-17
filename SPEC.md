# HiLaw 个人法律博客 — 项目规格说明书

## 1. Concept & Vision

一个温暖、专业、有温度的法律内容聚合站。弱化个人形象，强化内容价值——让访客感受到这是一个可信赖的法律信息源，而非个人名片。整体气质：亲和但不浅薄，专业但不冰冷，像一位愿意用大白话讲复杂法律问题的老朋友。

---

## 2. Design Language

### 色彩系统（温暖亲和）

| Token | 色值 | 用途 |
|-------|------|------|
| `--color-primary` | `#2B5CE6` | 主色调蓝（信任、专业） |
| `--color-primary-light` | `#EEF2FF` | 浅蓝背景色 |
| `--color-accent` | `#FF7A45` | 强调色橙红（热情、活力） |
| `--color-bg` | `#FAFAFA` | 页面背景 |
| `--color-surface` | `#FFFFFF` | 卡片/内容块背景 |
| `--color-text` | `#1A1A2E` | 主文字 |
| `--color-text-secondary` | `#6B7280` | 次要文字 |
| `--color-border` | `#E5E7EB` | 边框 |
| `--color-tag-bg` | `#F3F4F6` | 标签背景 |

### 字体

- **标题/品牌**：`"Noto Serif SC"`（衬线，有权威感但不老气）
- **正文/UI**：`"Inter"` + `"Noto Sans SC"`（无衬线，现代易读）
- **英文/数字**：`"Inter"` 统一

### 间距系统

- 基础单位：4px
- 常用：8 / 12 / 16 / 24 / 32 / 48 / 64px
- 卡片圆角：8px
- 大区块圆角：12px

### 动效哲学

- 入场动画：fade-up，200ms ease-out，stagger 80ms
- 悬停反馈：scale 1.01，shadow 加深，150ms
- 按钮交互：背景色 150ms 过渡
- 禁止花哨动画——温暖但不轻浮

### 图片策略

- 文章配图：Unsplash 精选（法律/城市/抽象主题）
- 无头像、无个人照片（弱化个人）
- 图标：Lucide Icons（线性风格，统一）

---

## 3. Layout & Structure

### 整体布局

```
┌─────────────────────────────────┐
│           Header                │  固定顶部，logo + 导航 + 搜索
├─────────────────────────────────┤
│         Hero Section            │  简洁，logo + 一句话描述
├─────────────────────────────────┤
│         Content Area            │  主体内容区（三栏）
│  ┌───────────┬─────────────┐   │
│  │  Sidebar  │  Main Feed  │   │
│  └───────────┴─────────────┘   │
├─────────────────────────────────┤
│           Footer               │  版权 + 联系方式（极简）
└─────────────────────────────────┘
```

### 响应式策略

- **≥1200px**：三栏（侧边 + 主内容 + 右侧信息流）
- **768-1199px**：两栏（侧边收起为抽屉 + 主内容）
- **<768px**：单栏（底部导航 + 内容优先）

### 页面结构

#### 首页（弱化个人，内容聚合）
- Hero：站名 "HiLaw" + 一句话法律定位（无个人介绍）
- 内容流（按时间/热度混合）：
  1. 热点新闻（带来源标签，橙色标记）
  2. 新法推送（蓝色标记，"NEW" 图标）
  3. 典型案例（紫色标记，最高法案例卡片）
  4. 最新文章（个人写作，带分类标签）
- 侧边栏：热门分类 + 标签云

#### 分类列表页
- 分类左侧导航（刑事/民商/知产/涉外/公司/互联网/AI/Web3/虚拟货币）
- 右侧：文章卡片列表（标题 + 摘要 + 日期 + 标签）
- 支持按时间/热度排序

#### 文章详情页
- 标题 + 元信息（日期/分类/标签）
- 正文（Markdown 渲染，支持代码块）
- 相关文章推荐
- 评论区（Giscus / Disqus）

#### 关于页
- 仅保留：律师姓名 + 联系方式（邮箱/微信/电话）
- 无个人照片、无履历、无头像

#### 归档页
- 按年份聚合文章列表

### 导航结构

```
HiLaw [Logo]    首页 | 热点新闻 | 新法推送 | 典型案例 | 分类 ▾ | 关于
                               搜索 [🔍]
```

分类下拉：
- 刑事
- 民商
- 知识产权
- 涉外
- 公司
- 互联网
- 人工智能
- Web3
- 虚拟货币

---

## 4. Features & Interactions

### 内容来源

| 类型 | 来源 | 维护方式 |
|------|------|----------|
| 个人文章 | lawmore.cn WordPress REST API | 自动拉取 |
| 热点新闻 | 手动维护（MDX 文件） | 手动发布 |
| 新法推送 | 手动维护（MDX 文件） | 手动发布 |
| 典型案例 | 手动维护（MDX 文件） | 手动发布 |

### 搜索功能

- 前端搜索（Fuse.js，搜索标题 + 摘要）
- 搜索结果高亮关键词

### 标签/分类系统

- 文章多标签支持
- 标签云侧边栏
- 分类筛选

### 交互细节

| 元素 | 默认 | 悬停 | 点击 |
|------|------|------|------|
| 文章卡片 | 白底，浅灰边框 | 阴影加深，scale 1.01 | 跳转详情 |
| 导航链接 | 灰色 | 主色 + 下划线动画 | 跳转 |
| 标签 | 浅灰背景 | 主色背景 | 筛选 |
| 按钮 | 实心主色 | 亮度提升 | 执行操作 |

### 错误/空状态

- 无文章：显示插图 + "暂无文章" 提示
- 加载中：骨架屏（skeleton）
- 搜索无结果："没有找到相关文章试试其他关键词？"

---

## 5. Component Inventory

### Header
- Logo（"HiLaw" 文字 logo，衬线字体）
- 主导航（首页/热点/新法/案例/分类下拉）
- 搜索图标（点击展开搜索框）
- 移动端：汉堡菜单

### HeroSection
- 站名大字
- 一句话描述："法律新闻 · 专业评论 · 新法解读"
- 无背景图，纯色/渐变底色

### ArticleCard
- 标题（加粗）
- 摘要（2行截断）
- 日期 + 分类标签 + 阅读量
- 状态：默认/悬停/加载中

### NewsCard（热点新闻/新法/典型案例）
- 左侧色带标记（橙/蓝/紫）
- 类型标签
- 标题 + 摘要
- 来源 + 时间

### CategoryNav
- 垂直列表（PC 端侧边栏）
- 当前分类高亮
- 移动端：底部 TabBar 或抽屉

### TagCloud
- 标签块（背景 + 文字）
- 热门标签放大

### Footer
- 版权信息（"© 2025 HiLaw"）
- 联系方式（极简，邮箱）

### SearchModal
- 全屏遮罩 + 中央搜索框
- 实时搜索建议
- 键盘支持（↑↓ 选择，Enter 跳转，Esc 关闭）

---

## 6. Technical Approach

### 框架与工具

| 层 | 选型 | 理由 |
|----|------|------|
| 框架 | **Astro 4** | 静态生成，性能极佳，内容管理友好 |
| UI | **Vanilla CSS + CSS Variables** | 轻量，无框架包袱，高度可控 |
| 搜索 | **Fuse.js** | 前端模糊搜索，无需后端 |
| 内容 | **Astro Content Collections** | MDX 管理文章，类型安全 |
| WP 数据 | **WordPress REST API** | 拉取 lawmore.cn 文章列表与全文 |
| 部署 | **GitHub Pages** | 免费，CI 自动部署 |

### 项目结构

```
hilaw/
├── public/
│   └── fonts/
├── src/
│   ├── components/      # UI 组件
│   │   ├── Header.astro
│   │   ├── Footer.astro
│   │   ├── ArticleCard.astro
│   │   ├── NewsCard.astro
│   │   ├── CategoryNav.astro
│   │   └── SearchModal.astro
│   ├── layouts/
│   │   ├── BaseLayout.astro
│   │   └── ArticleLayout.astro
│   ├── pages/
│   │   ├── index.astro          # 首页
│   │   ├── about.astro         # 关于页
│   │   ├── archive.astro        # 归档页
│   │   ├── news/
│   │   │   ├── index.astro      # 热点新闻列表
│   │   │   └── [slug].astro     # 新闻详情
│   │   ├── laws/
│   │   │   ├── index.astro      # 新法推送列表
│   │   │   └── [slug].astro     # 新法详情
│   │   ├── cases/
│   │   │   ├── index.astro      # 典型案例列表
│   │   │   └── [slug].astro     # 案例详情
│   │   ├── articles/
│   │   │   ├── index.astro      # 文章列表（按分类）
│   │   │   ├── [category].astro # 分类页
│   │   │   └── [slug].astro     # 文章详情
│   │   └── tags/
│   │       └── [tag].astro      # 标签页
│   ├── content/
│   │   ├── config.ts            # 内容集合定义
│   │   ├── news/                # 热点新闻 MDX
│   │   ├── laws/                # 新法推送 MDX
│   │   └── cases/               # 典型案例 MDX
│   ├── styles/
│   │   └── global.css           # 全局样式 + CSS 变量
│   └── utils/
│       └── wp.ts                # WordPress API 工具
├── astro.config.mjs
├── package.json
├── tsconfig.json
└── README.md
```

### GitHub Actions CI/CD

`.github/workflows/deploy.yml`：
- push 到 `main` 分支时触发
- 安装依赖 → `npm run build`
- 输出到 `dist/`
- 部署到 GitHub Pages

### 内容管理流程

1. **个人文章**：Astro Build 时通过 REST API 拉取 WP 文章，生成静态页
2. **新闻/新法/案例**：在 `src/content/` 下写 MDX 文件，Git 提交即发布

### 性能目标

- Lighthouse ≥ 95
- First Contentful Paint < 1.5s
- 完全静态，无运行时依赖

---

## 7. 内容来源详细说明

### 个人文章（WordPress 拉取）

- 端点：`https://www.lawmore.cn/wp-json/wp/v2/posts`
- 认证：Application Password（`user: muOM yCRK tkVj MlaY Y0Mc FR84`）
- 分类 ID：
  - 12 刑事 / 15 民商 / 24 知产 / 32 涉外
  - 30 互联网犯罪 / 29 刑事辩护 / 31 医疗纠纷 / 33 热点评论

### 手动维护内容（MDX）

每篇文章 frontmatter 格式：
```yaml
---
title: 文章标题
date: 2025-05-17
category: 刑事
tags: [网络犯罪, 区块链]
source: 最高人民法院
excerpt: 摘要文字
---
```

---

*本文档为开发基准，如有调整需同步更新。*