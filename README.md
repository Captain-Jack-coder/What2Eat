# What2Eat v1.1.2

A lightweight meal-decision website for lunch and evening meals.

## Core logic
`Energy × Available time → suitable meal pool → final random choice`

## What's new in v1.1.2
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


## v1.1.2 wheel correction
- The wheel now renders one slice for every current candidate meal.
- Meal names and emoji are no longer printed on the wheel.
- The wheel centre is intentionally text-free except for a small cutlery symbol.
- Candidate count remains visible outside the wheel in the match summary.


## v1.1.2
- Removed the wheel label layer entirely.
- Added cache-busting query strings for CSS and JS.
- The wheel now displays colour slices only.
