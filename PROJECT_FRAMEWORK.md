# What2Eat v1.1.2 — Product Framework

## Core problem
What2Eat exists for the moment when someone needs lunch or an evening meal, but does not want to spend mental energy deciding what to eat.

It reduces decision cost.

## Core model
**Energy × Available Time → Suitable meal pool → Random final choice**

Energy:
- 😌 I'm fine → effort up to 3
- 😵 Pretty tired → effort up to 2
- 💀 Completely done → effort 1 only

Time:
- ⚡ 10 min
- 🕐 20 min
- 🍳 30+ min

The wheel is not the recommendation algorithm.
It is the final decision ritual after unsuitable meals have been removed.

## v1.1.2 updates
- Added **Recently eaten**
- Recently accepted meals are stored in `localStorage`
- Recent meals are temporarily deprioritised to avoid repetition
- Added **Share this meal**
- Share uses Web Share API where available
- Clipboard fallback is used if native sharing is unavailable
- Added a small chef character to strengthen product identity

## Removed from v1
- Budget
- Cooking mood
- Quick preset buttons
- Reset
- Breakfast
- Future-feature cards

## Current page structure
1. Brand + product statement
2. Little chef identity card
3. Energy selection
4. Time selection
5. Filtered wheel
6. Result card
7. Accept / spin again / share
8. Recently eaten

## Current technology
GitHub Pages + HTML + CSS + JavaScript + JSON + localStorage

## Future direction
### V2 — Meal execution
After a meal is chosen:
- fridge ingredients
- missing ingredient detection
- nearby shop search
- Maps / Places integration

### V3 — Shared cooking
After a meal is chosen:
- accounts
- meal rooms
- shared ingredient lists
- who buys what
- real-time coordination

A real backend such as Supabase or Firebase would be appropriate at that stage.

## Product principle
Do not turn What2Eat into another interface that asks users too many questions.

**Tell us how you feel and how much time you have. We remove bad options. The wheel makes the final choice.**


## v1.1.2 wheel correction
- The wheel now renders one slice for every current candidate meal.
- Meal names and emoji are no longer printed on the wheel.
- The wheel centre is intentionally text-free except for a small cutlery symbol.
- Candidate count remains visible outside the wheel in the match summary.


## v1.1.2
- Removed the wheel label layer entirely.
- Added cache-busting query strings for CSS and JS.
- The wheel now displays colour slices only.
