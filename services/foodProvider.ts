import { foods } from "../data/foods";
import { Food } from "../types/food";

export interface FoodProvider { getFoods(): Food[]; }
export class LocalFoodProvider implements FoodProvider { getFoods() { return foods; } }
export const foodProvider = new LocalFoodProvider();
