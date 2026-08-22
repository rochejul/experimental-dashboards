# Experimental Dashboards

A monorepo exploring various dashboard architectures, interactive data visualizations, and modern web platform capabilities (e.g., CSS Anchor Positioning API, custom layouts, web components, and more).

---

## 📦 Packages & Experiments

| Package                                                                          | Path                               | Description                                                                                                                        |
| :------------------------------------------------------------------------------- | :--------------------------------- | :--------------------------------------------------------------------------------------------------------------------------------- |
| **[@experimental-dashboards/css-anchoring](./packages/dashboard-css-anchoring)** | `packages/dashboard-css-anchoring` | Dashboard relational node connections using the native **CSS Anchor Positioning API** and pure CSS gradient wires (no SVG/Canvas). |

---

## 🏗️ Monorepo Structure

The repository is organized using native **NPM Workspaces**:

```text
.
├── packages/                # Monorepo packages & experimental modules
│   └── dashboard-css-anchoring/  # CSS Anchor Positioning dashboard experiment
├── apps/                    # Target directory for full-fledged dashboard applications
├── docs/                    # Contributing guides, architecture guidelines & code of conduct
│   ├── CODE_OF_CONDUCT.md
│   ├── CONTRIBUTING.md
│   └── GUIDELINES.md
├── .husky/                  # Git hooks (Commitlint & Pre-push checks)
├── eslint.config.js         # ESLint 9+ flat configuration
├── package.json             # Root monorepo workspace configuration & scripts
├── .prettierrc              # Code formatting configuration
└── README.md                # Root project documentation
```

---

## 🛠️ Prerequisites & Toolchain

- **Node.js**: `>=22.0.0` (pinned to `22.13.1` in `.nvmrc` and `volta`)
- **NPM**: `10.9.2` (managed via `packageManager` and `volta`)
- **[Volta](https://volta.sh/)**: Recommended for deterministic Node.js and NPM runtime versions

---

## 🚀 Getting Started

### 1. Install Dependencies

Install all dependencies across all workspaces from the monorepo root:

```bash
npm install
```

### 2. Run an Experiment

To run a specific package experiment locally:

```bash
# Run the CSS Anchoring dashboard (Parcel HTTPS on port 3555)
npm --workspace=packages/dashboard-css-anchoring start
```

---

## 🧰 Available Scripts

| Script                     | Description                                             |
| :------------------------- | :------------------------------------------------------ |
| `npm run dev:build`        | Builds packages across all workspaces                   |
| `npm run dev:check`        | Runs unit tests and styling checks (Prettier + ESLint)  |
| `npm run dev:styling`      | Validates formatting (Prettier) and runs ESLint         |
| `npm run dev:format`       | Checks code formatting across all files                 |
| `npm run dev:format:check` | Automatically formats and writes fixes across all files |
| `npm run dev:linting`      | Runs ESLint validation across workspaces                |
| `npm run dev:audit`        | Runs security audit across workspaces and root          |
| `npm test`                 | Runs tests across workspaces                            |
| `npm run test:coverage`    | Runs tests with coverage reports across workspaces      |
| `npm run dev:publish`      | Publishes packages to the NPM registry                  |

---

## 🤖 Antigravity

Antigravity can be used with this repository for pair programming and agentic workflows. You can install Antigravity via the [download guide](https://antigravity.google/download).

To launch the CLI:

```bash
agy
```

---

## 🤝 Contributing & Conventions

- All commit messages must follow the [Conventional Commits](https://www.conventionalcommits.org/) specification (enforced via Husky and Commitlint).
- Code formatting is enforced via **Prettier** and linting via **ESLint Flat Config**.

For detailed guides, please refer to:

- [Guidelines](./docs/GUIDELINES.md)
- [Contributing Guidelines](./docs/CONTRIBUTING.md)
- [Code of Conduct](./docs/CODE_OF_CONDUCT.md)
