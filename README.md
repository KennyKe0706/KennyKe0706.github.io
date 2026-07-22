# Kenny Ke — Personal Portfolio

Personal academic and project portfolio for Zixuan (Kenny) Ke. The site presents a concise academic profile, implementation-focused case studies, and live demos for selected software projects.

## Live site

[kennyke0706.github.io](https://kennyke0706.github.io/)

## Technology

- Astro 7 and strict TypeScript
- Native CSS
- Markdown Content Collections
- Astro Sitemap
- Playwright
- ESLint and Prettier
- GitHub Actions and GitHub Pages

The public site is statically generated. It does not use React, a database, a backend server, authentication, analytics, or client-side state management.

## Local development

Requirements:

- Node.js 22.12 or newer
- npm

```bash
npm install
npm run dev
```

Astro starts the development server at `http://localhost:4321` by default.

## Quality checks

```bash
npm run format:check
npm run lint
npm run check
npm run build
```

Install Playwright's Chromium browser once, then run the end-to-end suite against the production preview:

```bash
npx playwright install chromium
npm run test:e2e
```

## Project structure

```text
public/                     Static files copied to the site root
src/components/             Shared Astro UI components
src/content/projects/       Markdown project case studies
src/layouts/                Shared metadata and project layouts
src/pages/                  File-based routes, including 404 and projects
src/scripts/                Progressive-enhancement browser code
src/styles/                 Design tokens and page styles
tests/                      Playwright end-to-end tests
.github/workflows/          Continuous integration and Pages deployment
```

Project metadata is validated by the schema in `src/content.config.ts`. Adding a case study requires a Markdown file with verified project facts, a real repository URL, and a local project image.

## Content policy

Project descriptions are based on public source code, repository documentation, and actual project screenshots. Live demos are first-party snapshots of the public project implementations hosted within this site. The site intentionally avoids placeholder links, skill percentages, unverified academic details, and invented development stories. The detailed filtering decisions are recorded in [`docs/IMPLEMENTATION_SCOPE.md`](docs/IMPLEMENTATION_SCOPE.md).

## Deployment

Pull requests run formatting, linting, Astro diagnostics, production build, and Playwright checks. Changes merged to `main` are built and deployed to GitHub Pages through the Astro deployment workflow.
