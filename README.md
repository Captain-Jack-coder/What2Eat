# What2Eat

A lightweight meal-decision website for lunch and evening meals.

## Core logic
`Energy × Available time → suitable meal pool → final random choice`

## Files
- `index.html` — page structure
- `style.css` — visual design
- `app.js` — interaction logic
- `meals.json` — meal dataset
- `PROJECT_FRAMEWORK.md` — product framework

## GitHub Pages
Upload all files to the root of your repository:

What2Eat/
- index.html
- style.css
- app.js
- meals.json
- README.md
- PROJECT_FRAMEWORK.md

Then use:
Settings → Pages → Deploy from a branch → main → /(root)

Note: `meals.json` is loaded with `fetch()`. GitHub Pages supports this. Some browsers may block it if you only double-click `index.html` locally.
