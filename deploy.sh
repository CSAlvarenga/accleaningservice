#!/bin/bash
# Build and deploy to GitHub Pages root
# Usage: bash deploy.sh "commit message"

set -e

MSG=${1:-"Deploy: update site"}

# 1. Reset index.html to source entry so Vite reads real source files
sed -i 's|<script type="module" crossorigin src="./assets/index-[^"]*"></script>||g' index.html
sed -i 's|<link rel="stylesheet" crossorigin href="./assets/index-[^"]*\.css">||g' index.html
sed -i 's|<script type="module" src="/src/main.jsx"></script>||g' index.html
# Insert source entry before </head>
sed -i 's|</head>|    <script type="module" src="/src/main.jsx"></script>\n  </head>|' index.html

# 2. Build from real source
npm run build

# 3. Get new asset names
JS=$(ls dist/assets/index-*.js | head -1 | xargs basename)
CSS=$(ls dist/assets/index-*.css | head -1 | xargs basename)

# 4. Copy new assets to root
cp dist/assets/$JS assets/
cp dist/assets/$CSS assets/

# 5. Replace source entry with built references in index.html
sed -i "s|<script type=\"module\" src=\"/src/main.jsx\"></script>|<script type=\"module\" crossorigin src=\"./assets/$JS\"></script>\n    <link rel=\"stylesheet\" crossorigin href=\"./assets/$CSS\">|" index.html

# 6. Commit and push
git add index.html assets/$JS assets/$CSS
git commit -m "$MSG

Co-Authored-By: Claude Sonnet 4.6 <noreply@anthropic.com>"
git push origin main

echo ""
echo "✓ Deployed: $JS"
