# experimental-dashboards

Produces multiple experimental dashboards with various approaches

## Requirements & Toolchain

- **Node.js**: `>=22.0.0` (managed via `.nvmrc` and `volta`)
- **NPM**: `10.9.2` (managed via `packageManager` and `volta`)

## Getting Started

### Installation

```bash
npm install
```

## Tools

### Antigravity

You can install Antigravity with this [help doc](https://antigravity.google/download). To run it, type:

```bash
agy
```

## Commands

- `npm run dev:build`: Build the project over packages
- `npm run dev:check`: Run tests and styling over packages
- `npm run dev:format`: Format files over packages
- `npm run dev:format:check`: Check files format over packages
- `npm run dev:linting`: Lint files over packages
- `npm run dev:styling`: Format and lint files over packages
- `npm run dev:publish`: Publish all the packages on npm registry
- `npm test`: Run tests over packages
- `npm run test:coverage`: Run tests over packages and see coverage reports

## Contributing

- [Guidelines](./docs/GUIDELINES.md)
- [Contributing](./docs/CONTRIBUTING.md)
- [Code of conducts](./docs/CODE_OF_CONDUCTS.md)
