# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm run dev      # Start development server
npm run build    # Production build
npm run start    # Start production server
npm run lint     # Run ESLint (next lint)
```

No test suite is configured.

## Architecture

This is a **Next.js 14 portfolio site** using the App Router, TypeScript, and SCSS. It is based on the `@once-ui-system/magic-portfolio` template.

### Content & Configuration

All portfolio customization lives in `src/app/resources/`:
- **`config.js`** — site-wide settings: i18n toggle, routes, visual effects (background mask, gradient, dots), theme (dark, emerald brand), display options
- **`content.js`** — portfolio data: person info, work experience, projects, education, achievements, social links, tech stack icons
- **`content-i18n.js`** — localized version of content (used when `i18n: true` in config)
- **`renderContent.js`** — selects between `content.js` and `content-i18n.js` at runtime

To update portfolio content, edit `content.js`. To change visual/theme settings, edit `config.js`.

### Routing

The app uses a `[locale]` dynamic segment at `src/app/[locale]/` to support i18n (currently disabled via `config.js`). Routes are defined in `config.js` under `routes`. Protected routes require a password via `src/pages/api/authenticate.ts` and are enforced by `src/components/RouteGuard.tsx`.

### Design System (`src/once-ui/`)

A bundled custom UI library with 40+ components. Key layout primitives: `Flex`, `Grid`. Animation effects: `RevealFx`, `LetterFx`, `SparkleFx`, `GlitchFx`. These components use CSS custom properties and SCSS modules defined in `src/once-ui/styles/`. Prefer using existing once-ui components over writing new styled elements.

### Styling

- SCSS with PostCSS (custom media queries via `postcss-custom-media`, breakpoints from `src/once-ui/styles/breakpoints.scss`)
- Path alias `@/*` maps to `src/*`
- Global styles and design tokens in `src/once-ui/styles/`

### MDX Support

Blog and work pages support MDX. `next.config.mjs` enables `.md` and `.mdx` as page extensions. MDX component mappings are in `src/components/mdx.tsx`.

### OG Images

Generated dynamically at `src/app/og/` using Next.js image response.
