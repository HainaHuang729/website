# HH / Personal Archive

原创科研现代主义个人档案网站。采用 Next.js App Router 风格的 Vinext、React、TypeScript、Tailwind CSS；动画使用 CSS 和 IntersectionObserver。Sites starter 自带的组件依赖保持原状，网站仅使用笔记筛选所需的 Select。

## 本地运行

需要 Node.js 22.13 或更新版本。

```sh
npm install
npm run dev
```

`npm run build` 生成 Cloudflare Worker 与静态资源。`npm start` 运行构建后的 Worker。`npx tsc --noEmit` 检查类型。

本地服务运行时，执行 `node --experimental-strip-types scripts/check.mjs` 检查全部路由、内部链接、报告字段和组合筛选。

执行 `node --experimental-strip-types scripts/check-motion.mjs` 检查显现逻辑：各图形独立触发、键盘聚焦、动态切换 reduced-motion、深链接、浏览器能力回退与卸载清理。此检查不依赖浏览器。

本地服务运行时，执行 `node --experimental-strip-types scripts/check-language.mjs` 检查两种语言下的 16 个页面、正文与元信息翻译、筛选文案、章节锚点，以及语言 Cookie 和重定向。

## 内容替换

- `data/site.ts`：姓名缩写、标题、主题、简介、当前探索、邮箱、GitHub、CV。
- `data/zh.json`：英文原文对应的简体中文译文。修改英文内容后同步更新对应键；日期、公式、编号与网址保持原值。
- `data/site.ts` 的 `heroNote`、`workingNote` 和 `closing`：首屏行动线索、工作方式和深色结尾的文字。
- `data/research.ts`、`data/projects.ts`：研究及项目，以及报告的 context/question/method/system/results/reflection/links。每条记录通过 slug 生成独立页面。
- 每条报告的 `nextStep`：拟进行的下一次实验，显示在项目展示和报告反思部分。它表示计划，不代表已经取得的结果。
- `data/notes.ts`：笔记正文、日期、分类与标签；筛选选项从内容生成。
- `data/visuals.ts`：图片、图注与方向。把图片放在 `public/images/`，并把 `image` 设置成 `/images/文件名.jpg`，填写准确的 alt、日期和地点。
- 项目的 `image` 为空时使用明确标注为 illustrative 的 SVG 示意图。Visual Archive 缺图时使用中性占位。内容支持本地资源地址，不需要外部图片服务。

**目前内容均为示例。** 未提供真实履历、研究数据、摄影及联系信息，不应将示例作为已完成的个人成果发布。换成真实内容后，可移除相应页面里的 SAMPLE / EXAMPLE 提示；不要为未知信息编造日期或链接。

## 页面

`/`、`/profile`、`/research`、`/research/[slug]`、`/projects`、`/projects/[slug]`、`/notes`、`/notes/[slug]`、`/visuals`、`/contact`，以及 404。

导航编号是档案类别编号；首页小节编号是该页的阅读顺序。报告章节编号在每篇报告内独立计数。图形使用对应记录编号，不包含随机装饰数据。

## 设计与无障碍

颜色、尺寸、动效曲线集中在 `app/globals.css`。桌面、平板和移动端有独立排版规则。提供键盘焦点、跳转正文、菜单 Escape 关闭、焦点预览、图片说明、筛选空状态和 reduced-motion 支持；无 JavaScript 时正文与链接仍可阅读。

右上角提供“中文 / EN”切换，默认保留原有英文。语言选择通过站内 Cookie 保存一年，页面在服务端直接生成所选语言，刷新或访问详情页时不会闪回另一种语言。切换链接在禁用 JavaScript 时仍可使用；启用 JavaScript 时还会保留当前查询参数与文章锚点。两种语言共用现有网址和筛选内部值，中文使用独立的字体回退、字距与行高。

首页从明亮档案逐渐进入深炭色结尾。三色带在首屏出现，结尾以缩小版本呼应；轨迹图形为原创抽象几何，不使用游戏资产。工程信息来自具体模型与记录，参数图形均保留 illustrative 标记。

三原色使用复古红 `#B84B3E`、黄 `#D6A62E`、蓝 `#4D8F9C`，彩带统一按红—黄—蓝排列；首屏、图表参数栏与深色结尾相互呼应。安全橙 `#DF5A2E` 继续用于交互提示。彩色色块保留原色，小字使用相应深色墨色，黄色标签搭配炭黑文字。

动效沿阅读顺序展开：三色带分段伸展、标题分行入场、章节横线展开、图像揭示与 SVG 曲线绘制。支持原生 scroll timeline 的浏览器会让首尾装饰轨迹随滚动轻移；其他浏览器保留静态图形。图片与图表独立观察，避免长章节过早播放；键盘聚焦立即显示内容，系统切换为减少动态效果时停止动画并显示完整内容。无新增动画依赖。

标题使用 Jost，技术标签使用 IBM Plex Mono；两种字体本地存放于 `public/fonts/`，总字体体积约 41 KB，无外部运行时字体请求。两者均使用 SIL OFL 1.1 授权，许可和来源文件随字体保留。正文使用系统无衬线字体，CJK 与缺失符号由系统字体回退。

## 在线入口与其他站点

[访问个人主页](https://hh-personal-archive.xiaoxuesheng729.chatgpt.site)（公开访问）。

站点架构与维护方式见 [SITE-NETWORK.md](SITE-NETWORK.md)。此项目构建为 Worker，不能将源码直接作为 GitHub Pages 静态目录发布。
