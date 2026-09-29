import { Food, Filters, Meal } from "../types/food";

export const selectFood = (foods: Food[], meal: Meal, filters: Filters, disliked: string[], recent: string[]) => {
  const available = foods.filter(food => !disliked.includes(food.id) && !recent.slice(0, 3).includes(food.id));
  const base = available.length ? available : foods.filter(food => !disliked.includes(food.id));
  const matches = base.filter(food => food.meals.includes(meal) &&
    (filters.price === "any" || (filters.price === "under30" ? food.priceMax < 30000 : filters.price === "30to50" ? food.priceMin <= 50000 && food.priceMax >= 30000 : food.priceMin <= 100000 && food.priceMax >= 50000)) &&
    (filters.category === "any" || food.categories.includes(filters.category)) &&
    (filters.flavor === "any" || food.flavor.includes(filters.flavor)) &&
    (filters.style === "any" || filters.style === "quick" ? filters.style === "any" || food.fillingLevel <= 7 : filters.style === "filling" ? food.fillingLevel >= 7 : food.healthyScore >= 8));
  const pool = matches.length ? matches : base.filter(food => food.meals.includes(meal));
  const total = pool.reduce((sum, food) => sum + food.popularity + (food.meals.includes(meal) ? 7 : 0), 0);
  let cursor = Math.random() * total;
  const chosen = pool.find(food => (cursor -= food.popularity + 7) <= 0) ?? pool[0];
  return { food: chosen, relaxed: matches.length === 0 };
};

export const mealForCurrentTime = (): Meal => { const hour = new Date().getHours(); return hour >= 5 && hour < 10.5 ? "breakfast" : hour >= 10.5 && hour < 14 ? "lunch" : "dinner"; };
export const foodOfDay = (foods: Food[]) => { const d = new Date(); const seed = d.getFullYear() * 372 + (d.getMonth() + 1) * 31 + d.getDate(); return foods[seed % foods.length]; };
