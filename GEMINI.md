# Experimental Dashboards - Gemini Project Context & Rules

This document describes the project architecture, tech stack, directory structure, coding standards, commands, and development workflows for `experimental-dashboards`.

---

## 1. Project Overview

**`experimental-dashboards`** is an experimental monorepo dedicated to exploring various dashboard implementations and modern web platform capabilities (e.g., CSS Anchor Positioning API, custom layouts, web components, etc.).

- **Architecture:** Monorepo based on **NPM Workspaces** (`apps/*`, `packages/*`).
- **Module Format:** ES Modules (`"type": "module"`).
- **Node.js / NPM Versioning:**
  - **Node.js:** `>=22.0.0` (pinned to `22.13.1` in `.nvmrc` and `volta`).
  - **NPM:** `10.9.2` (managed via `packageManager` and `volta`).
  - [Volta](https://volta.sh/) is recommended for deterministic runtime and package manager versions.

---

## 2. Directory Structure

```text
.
├── .husky/                  # Git hooks (commit-msg, pre-commit, pre-push)
├── .vscode/                 # VS Code workspace settings & recommended extensions
├── docs/                    # Contributing guidelines, code of conduct, workflow docs
│   ├── CODE_OF_CONDUCT.md
│   ├── CONTRIBUTING.md
│   └── GUIDELINES.md
├── packages/                # Monorepo packages & experiment modules
│   └── dashboard-css-anchoring/  # Dashboard experiment using CSS Anchor Positioning
│       ├── app/             # Application styles (app.css) and logic (app.js)
│       ├── resources/       # Static assets & icons
│       ├── index.html       # HTML entry point (bundled with Parcel)
│       └── package.json     # Package-specific config & scripts
├── apps/                    # Target directory for full-fledged applications (workspaces)
├── eslint.config.js         # ESLint 9+ flat configuration
├── package.json             # Root monorepo configuration, workspace definitions & scripts
├── .prettierrc              # Code formatting rules
└── GEMINI.md                # AI agent context and workspace rules
```

---

## 3. Workspaces & Package Management

The repository uses native **NPM Workspaces**.

### Creating a New Package

To add a new package under `packages/`:

```bash
npm init -w ./packages/<package-name>
```

### Dependency Management

- **Add dev dependency at root level:**
  ```bash
  npm install --save-dev <dep-name>
  ```
- **Link a workspace package as a dependency to another workspace:**
  ```bash
  npm install --save @experimental-dashboards/<package-name> --workspace=packages/<target-workspace>
  ```
- **Internal / Peer Dependencies:**
  Declare in the target package's `package.json` under `peerDependencies` and `peerDependenciesMeta` (optional).

### Removing a Package

1. Delete the package folder: `rm -rf packages/<package-name>`
2. Remove any related references in `.vscode/settings.json` (e.g., Jest virtual folders).
3. Run `npm install` and update `package-lock.json`.

---

## 4. Coding Standards & Tooling

### Code Formatting

- **Tool:** Prettier
- **Configuration (`.prettierrc`):**
  - Tab width: `2`
  - Semicolons: `true`
  - Single quotes: `true`
- **Commands:**
  - `npm run dev:format`: Checks formatting across all files.
  - `npm run dev:format:check`: Formats and writes fixes.

### Linting

- **Tool:** ESLint (Flat Config via `eslint.config.js`) with `eslint-plugin-prettier`.
- **Target Extensions:** `.js`, `.mjs`, `.ts`, `.tsx`.
- **Command:** `npm run dev:linting`

### Combined Quality Checks

- `npm run dev:styling`: Runs Prettier format check + ESLint.
- `npm run dev:check`: Runs unit tests + styling checks.

---

## 5. Git & Commit Conventions

### Commit Messages (Conventional Commits)

All commit messages must follow the [Conventional Commits](https://www.conventionalcommits.org/) specification (enforced via `@commitlint/cli` and `.husky/commit-msg`):

- `feat: <description>` (new feature)
- `fix: <description>` (bug fix)
- `docs: <description>` (documentation changes)
- `style: <description>` (formatting, whitespace, etc.)
- `refactor: <description>` (code restructuring without feature/fix change)
- `test: <description>` (adding or correcting tests)
- `chore: <description>` (maintenance, build configuration, deps)

### Git Hooks (Husky)

- **`commit-msg`**: Validates commit message format with Commitlint.
- **`pre-commit`**: Runs `npm test`.
- **`pre-push`**: Runs `npm run dev:styling`.

---

## 6. Common NPM Scripts Reference

| Command                                  | Description                                         |
| :--------------------------------------- | :-------------------------------------------------- |
| `npm run dev:build`                      | Builds packages across all workspaces               |
| `npm run dev:check`                      | Runs tests and styling validation across workspaces |
| `npm run dev:styling`                    | Runs formatting check and linting                   |
| `npm run dev:format`                     | Prettier check                                      |
| `npm run dev:format:check`               | Prettier auto-format write                          |
| `npm run dev:linting`                    | ESLint validation across workspaces                 |
| `npm run dev:audit`                      | Runs npm security audit on workspaces and root      |
| `npm test`                               | Runs tests across workspaces                        |
| `npm run test:coverage`                  | Runs tests with coverage reports                    |
| `npm run bump:patch` / `minor` / `major` | Bumps version using `npmversion`                    |
| `npm run dev:publish`                    | Publishes packages to the npm registry              |

---

## 7. Package-Specific Development (e.g. `packages/dashboard-css-anchoring`)

- **Dev Server:** Uses [Parcel](https://parceljs.org/) with HTTPS on port 3555.
- **Run local server:**
  ```bash
  npm --workspace=packages/dashboard-css-anchoring start
  # or cd packages/dashboard-css-anchoring && npm start
  ```
