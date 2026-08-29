/*
The WHY of this file:

  ### Root Cause

  When Parcel was configured in raw mode (@parcel/transformer-raw), it treated CSS files as opaque assets without resolving dependencies. As a result:

  1. The @import url(./reset.css); statement remained as-is in the generated CSS bundle within dist/.
  2. The reset.css file was neither inlined nor copied to the expected relative location in the dist/ distribution folder.
  3. The browser encountered a 404 error when attempting to load reset.css.
  ──────
  ### Applied Solution

  We set up a PostCSS configuration combined with Parcel to:

  • Automatically resolve and inline @import rules (such as reset.css) at build time;
  • Accept experimental syntax such as @container anchored(...) without failing (unlike Lightning CSS's strict parser);
  • Emit the complete CSS directly to the browser without unwanted transformations.

  #### Configured Files:

  1. .parcelrc:
    {
      "extends": "@parcel/config-default",
      "transformers": {
        "*.css": ["@parcel/transformer-postcss"]
      },
      "packagers": {
        "*.css": "@parcel/packager-raw"
      },
      "optimizers": {
        "*.css": []
      }
    }

  2. postcss.config.cjs:
  A lightweight plugin that resolves and replaces @import at-rules with the referenced CSS file contents.
  ──────
  ### Result

  • reset.css is now directly inlined into each generated CSS bundle (e.g. dist/static.*.css, dist/position-fallbacks.*.css, etc.).
  • Builds (npm --workspace=@experimental-dashboards/css-anchoring run dev:build), npm start, and styling validation (npm run dev:styling) now work seamlessly.
*/

const fs = require('fs');
const path = require('path');
const postcss = require('postcss');

const inlineImportPlugin = () => ({
  postcssPlugin: 'inline-imports',
  Once(root) {
    root.walkAtRules('import', (atRule) => {
      const match = atRule.params.match(
        /^(?:url\(['"]?|['"])([^'")]+)(?:['"]?\)|['"])/,
      );
      if (match) {
        const importPath = match[1];
        const currentFile = atRule.source?.input?.file;
        if (currentFile) {
          const resolvedPath = path.resolve(
            path.dirname(currentFile),
            importPath,
          );
          if (fs.existsSync(resolvedPath)) {
            const content = fs.readFileSync(resolvedPath, 'utf8');
            atRule.replaceWith(postcss.parse(content, { from: resolvedPath }));
          }
        }
      }
    });
  },
});
inlineImportPlugin.postcss = true;

module.exports = {
  plugins: [inlineImportPlugin()],
};
