# What2Eat v1.1

A lightweight meal-decision website for lunch and evening meals.

## Core logic
`Energy × Available time → suitable meal pool → final random choice`

## What's new in v1.1
- Recently eaten history
- Anti-repetition logic
- Share this meal
- localStorage support
- Improved visual design
- Small chef character in the hero section

## Files
- `index.html` — page structure
- `style.css` — visual design
- `app.js` — interaction logic
- `meals.json` — meal dataset
- `README.md` — setup note
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

## Important
`meals.json` is loaded with `fetch()`. GitHub Pages supports this.

If you only double-click `index.html` locally, some browsers may block loading the JSON file. That does not mean the GitHub Pages version is broken.
