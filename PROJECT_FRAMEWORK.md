# What2Eat v1 — Product Framework

## Core problem
What2Eat is for the moment when someone needs lunch or an evening meal but does not want to spend mental energy deciding what to eat.

It is not a recipe search engine, delivery comparison site, or grocery marketplace.

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

The wheel is not the recommendation algorithm. It is the final decision ritual after unsuitable meals are removed.

## Removed from v1
- Budget
- Cooking mood
- “I can't be bothered to cook”
- Student budget mode
- Reset
- Breakfast
- Future-feature cards

## Current page structure
1. Brand + product statement
2. Energy selection
3. Time selection
4. Filtered wheel
5. Meal result
6. Accept / spin again
7. Recent picks

## Current technology
GitHub Pages + HTML + CSS + JavaScript + JSON

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
- friend groups / rooms
- shared meal sessions
- shared shopping lists
- who buys what
- real-time updates

A real backend such as Supabase or Firebase would be appropriate at that stage.

## Product principle
Do not turn What2Eat into another interface that asks users too many questions.

**Tell us how you feel and how much time you have. We remove bad options. The wheel makes the final choice.**
