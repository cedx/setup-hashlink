Write-Host "Building the project..."
npx tsc --build src/tsconfig.json
npx esbuild lib/Program.js "--banner:js=#!/usr/bin/env node" --bundle --legal-comments=none --log-level=warning --minify --outfile=bin/SetupHashLink.cjs --platform=node
git update-index --chmod=+x bin/SetupHashLink.cjs
