# 作品集改造：可执行范围

这份文件是原始《Kenny Ke 个人作品集网站完整改造报告》的核验版。实施原则是：只发布能够由现有网站、公开仓库或实际运行结果证明的内容，不使用占位链接，也不编造个人材料。

## 本次保留并实施

- Astro 静态站点生成与严格 TypeScript 配置
- 原生 CSS，并保留现有深色学术视觉语言
- Markdown Content Collections 管理项目资料
- 首页、项目列表、两个项目详情页和自定义 404 页面
- 每页独立 title、description、canonical、Open Graph 与 JSON-LD
- 自动 sitemap、现有 robots.txt、Google 站点验证文件和 favicon
- Astro Check、ESLint、Prettier、Playwright 与生产构建检查
- GitHub Actions 持续检查及 GitHub Pages 自动部署
- 完整 README 和本地开发说明
- 只基于公开源码与 README 撰写的项目功能、技术实现和限制
- 能从公开仓库或项目实际运行取得的真实截图
- 用户确认的 LinkedIn 公开主页，用于 Contact 与结构化数据

## 删除或改写的项目

| 原报告项目                      | 本次处理                   | 原因                                                     |
| ------------------------------- | -------------------------- | -------------------------------------------------------- |
| `resume.pdf`、Résumé 导航与测试 | 删除                       | 未提供经过确认的简历文件                                 |
| LinkedIn                        | 保留                       | 用户已提供并确认公开主页 `zixuan-ke-50094a328`           |
| 第三个项目                      | 删除                       | 没有指定可核验项目                                       |
| Live Demo 按钮                  | 暂不显示                   | 两个仓库均未配置公开 Demo 地址；不使用示例链接           |
| “Incoming student” 文案         | 不采用                     | 入学时间和正式项目身份未得到确认；沿用现有的中性学术表述 |
| 项目中的个人挑战、Bug 复盘      | 删除                       | 代码能说明实现，但不能证明作者当时的主观过程             |
| 未经代码验证的算法标签          | 删除或改成源码可证明的表述 | 避免为了关键词夸大项目深度                               |
| 简历下载、Demo 的验收项         | 删除                       | 对应素材不存在                                           |
| Vitest                          | 删除                       | 当前站点没有值得单元测试的纯业务函数                     |
| React、筛选器、主题切换、博客   | 延后                       | 两个项目不需要筛选，现阶段加入会增加体积与维护成本       |
| `legacy/` 旧站副本              | 不保留在最终树中           | Git 历史已经提供完整回退能力，重复副本只会制造维护分叉   |

## 内容边界

- Academic Profile 只展示现有网站已经确认的 University of Toronto St. George、Computer Science、算法与系统兴趣。
- LinkedIn 仅作为用户提供的公开联系链接使用，不抓取或转述其中未经确认的经历。
- 技术列表只保留现有项目和主页已有证据支持的 Python、C++、JavaScript、HTML、CSS 与 Git。
- Chemistry Equation Balancer 的解析、矩阵、精确分数行化简和限制来自该仓库 README 与源码。
- Go Game 的功能、规则和限制仅采用该仓库 README 与源码可以确认的部分。
- 项目截图必须来自公开仓库附件或项目实际运行页面。

## 最终验收

- `npm run check`
- `npm run lint`
- `npm run format:check`
- `npm run build`
- `npm run test:e2e`
- 320、375、768、1024、1440 像素视口无横向溢出
- JavaScript 关闭时核心内容仍然可见
- GitHub Actions 部署成功，公开 URL 返回本次构建内容
