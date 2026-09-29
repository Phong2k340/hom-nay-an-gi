export type Meal = "breakfast" | "lunch" | "dinner";
export type PriceRange = "under30" | "30to50" | "50to100" | "any";
export type Category = "noodles" | "rice" | "cake" | "snack" | "vegetarian" | "soup";
export type Flavor = "spicy" | "mild" | "light" | "rich";
export type EatingStyle = "quick" | "filling" | "healthy" | "any";

export interface Food {
  id: string; name: string; description: string; meals: Meal[]; categories: Category[];
  priceMin: number; priceMax: number; flavor: Flavor[]; spicyLevel: number; fillingLevel: number;
  healthyScore: number; popularity: number; image: string; searchKeywords: string[];
}

export interface Filters { price: PriceRange; category: Category | "any"; flavor: Flavor | "any"; style: EatingStyle; }
