# Showcase Application

An interactive showcase application and live demo hub for exploring the experimental dashboards in this monorepo.

---

## 📖 Overview & Motivation

The **Showcase Application** (`@experimental-dashboards/showcase`) serves as the central live demonstration portal for the monorepo. It aggregates multiple dashboard experiments into a unified, responsive interface where developers can interactively test and preview various layout techniques, CSS specifications, and data visualization architectures.

### Key Features

- **🧭 Multi-Experiment Navigation:** Browse and switch between different dashboard experiments via the sidebar.
- **🔀 Multi-View Demonstrations:** Seamlessly switch between static topology diagrams and interactive dynamic draggable views.
- **📱 Responsive Viewport Simulator:** Test how dashboard layouts adapt across Desktop, Tablet (`768px`), and Mobile (`375px`) viewport constraints.
- **🚀 GitHub Pages Deployment:** Built with Parcel using base public URL prefixing for automated GitHub Pages hosting.

---

## 🏗️ Architecture & Directory Structure

```text
apps/showcase/
├── index.html                  # Main showcase shell & layout
├── app/
│   ├── app.css                 # Showcase styling & responsive stage rules
│   ├── app.js                  # Viewport switcher & interactive view router
│   └── reset.css               # Base CSS resets
├── demos/                      # Standalone demo sub-applications
│   └── css-anchoring/          # CSS Anchor Positioning demos
│       ├── static.html         # Static topology connection demo
│       ├── static.css          # Multi-anchor gradient connectors
│       ├── dynamic.html        # Interactive draggable demo
│       ├── dynamic.css         # Directional modifier classes for gradient wires
│       └── dynamic.js          # Pointer event & topological quadrant detection
├── resources/                  # Favicons and static assets
├── eslint.config.js            # Package ESLint configuration (extends root)
├── package.json                # Package workspace configuration & scripts
└── README.md                   # Application documentation
```

---

## ⚙️ Technical Approach & Parcel Setup

### 1. Parcel Multi-Entry Bundling

The application is bundled using [Parcel](https://parceljs.org/). All demo HTML pages are declared as entries to ensure asset hashing and dependency isolation:

```json
{
  "scripts": {
    "start": "parcel index.html demos/css-anchoring/*.html --port 3555 --https",
    "dev:build": "parcel build index.html demos/css-anchoring/*.html --dist-dir dist --public-url /experimental-dashboards/"
  }
}
```

### 2. Base Path Resolution for GitHub Pages

Because GitHub Pages serves the site under `/experimental-dashboards/`, the JavaScript controller dynamically resolves the current base path to ensure routing and iframe navigation function identically in local development (`/`) and on production GitHub Pages (`/experimental-dashboards/`):

```javascript
const basePath = window.location.pathname.endsWith('/')
  ? window.location.pathname
  : window.location.pathname.substring(
      0,
      window.location.pathname.lastIndexOf('/') + 1,
    );
```

---

## 🚀 Getting Started

### Run Local Development Server

Run the showcase application locally with Parcel on port 3555 (with HTTPS):

```bash
# From the monorepo root:
npm start
# or:
npm --workspace=@experimental-dashboards/showcase start

# Or directly from this directory:
npm start
```

Open your browser at `https://localhost:3555`.

### Build for Production

To compile the application for deployment (output generated in `dist/`):

```bash
# From the monorepo root:
npm --workspace=@experimental-dashboards/showcase run dev:build

# Or directly from this directory:
npm run dev:build
```

---

## 🧰 Available Scripts

| Script                | Description                                                                       |
| :-------------------- | :-------------------------------------------------------------------------------- |
| `npm start`           | Starts local development server with HTTPS on port `3555`                         |
| `npm run dev:build`   | Builds production assets to `dist/` with `--public-url /experimental-dashboards/` |
| `npm run dev:linting` | Runs ESLint validation across application files                                   |
| `npm run dev:clean`   | Removes `.parcel-cache` and `dist/` build output                                  |

---

## 🌐 GitHub Pages Deployment

The showcase application is automatically deployed to GitHub Pages via the [`.github/workflows/deploy-pages.yml`](../../.github/workflows/deploy-pages.yml) workflow upon each push to the `main` branch.

Live demo URL: **`https://rochejul.github.io/experimental-dashboards/`**

---

## 🤝 Contributing

- [Guidelines](../../docs/GUIDELINES.md)
- [Contributing Guidelines](../../docs/CONTRIBUTING.md)
- [Code of Conduct](../../docs/CODE_OF_CONDUCT.md)
