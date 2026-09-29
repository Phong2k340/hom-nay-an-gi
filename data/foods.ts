import { Category, Flavor, Food, Meal } from "../types/food";

type Seed = [string, Meal[], Category[], number, number, Flavor[], number, number, number, number];
const img = "https://images.unsplash.com/photo-1559314809-0d155014e29e?auto=format&fit=crop&w=1200&q=85";
const seeds: Seed[] = [
  ["Phở bò",["breakfast","lunch","dinner"],["noodles","soup"],40000,65000,["rich","mild"],1,8,7,10], ["Phở gà",["breakfast","lunch"],["noodles","soup"],35000,55000,["light","mild"],0,7,8,9],
  ["Bún bò Huế",["breakfast","lunch","dinner"],["noodles","soup"],40000,65000,["spicy","rich"],3,8,7,10], ["Bún chả Hà Nội",["lunch","dinner"],["noodles"],40000,70000,["rich","mild"],0,8,6,10],
  ["Bún riêu",["breakfast","lunch"],["noodles","soup"],35000,55000,["light","rich"],1,7,7,9], ["Bún ốc",["breakfast","lunch"],["noodles","soup"],40000,65000,["rich","mild"],1,7,7,7],
  ["Bún mọc",["breakfast","lunch"],["noodles","soup"],35000,55000,["light","mild"],0,7,7,7], ["Bún cá",["breakfast","lunch"],["noodles","soup"],35000,55000,["light","mild"],1,7,8,8],
  ["Miến gà",["breakfast","lunch"],["noodles","soup"],35000,55000,["light","mild"],0,7,8,8], ["Miến lươn",["breakfast","lunch"],["noodles","soup"],40000,70000,["rich","mild"],1,7,7,7],
  ["Hủ tiếu Nam Vang",["breakfast","lunch"],["noodles","soup"],40000,65000,["rich","mild"],0,8,7,10], ["Mì Quảng",["breakfast","lunch"],["noodles"],40000,65000,["rich","mild"],1,8,7,9],
  ["Cao lầu",["lunch","dinner"],["noodles"],45000,70000,["rich","mild"],0,8,6,8], ["Bánh canh cua",["breakfast","lunch"],["noodles","soup"],40000,70000,["rich","mild"],1,8,7,9],
  ["Bánh đa cua",["breakfast","lunch"],["noodles","soup"],35000,60000,["rich","mild"],1,7,7,8], ["Cơm tấm sườn",["lunch","dinner"],["rice"],40000,70000,["rich","mild"],0,9,6,10],
  ["Cơm gà",["lunch","dinner"],["rice"],40000,65000,["rich","mild"],0,8,7,9],
  ["Cơm rang dưa bò",["lunch","dinner"],["rice"],35000,60000,["rich","mild"],0,8,5,8], ["Cơm thịt kho",["lunch","dinner"],["rice"],35000,60000,["rich","mild"],0,9,6,8],
  ["Cơm cá kho",["lunch","dinner"],["rice"],35000,65000,["rich","mild"],1,8,7,8], ["Cơm gà xối mỡ",["lunch","dinner"],["rice"],40000,70000,["rich"],0,9,5,9],
  ["Cơm niêu",["lunch","dinner"],["rice"],50000,100000,["rich"],0,9,6,8], ["Xôi xéo",["breakfast"],["rice","cake"],20000,35000,["rich","mild"],0,7,6,9],
  ["Xôi gà",["breakfast"],["rice"],30000,50000,["rich","mild"],0,8,6,8], ["Xôi thịt",["breakfast"],["rice"],25000,45000,["rich"],0,8,6,8],
  ["Xôi khúc",["breakfast"],["rice","cake"],15000,30000,["mild"],0,6,7,7], ["Bánh mì thịt",["breakfast","lunch"],["cake"],20000,35000,["rich","mild"],0,7,6,10],
  ["Bánh mì pate",["breakfast","lunch"],["cake"],18000,30000,["rich","mild"],0,6,6,8], ["Bánh mì trứng",["breakfast","lunch"],["cake"],15000,30000,["mild"],0,6,7,8],
  ["Bánh cuốn",["breakfast","lunch"],["cake"],25000,45000,["light","mild"],0,6,8,9], ["Bánh giò",["breakfast","lunch"],["cake"],15000,30000,["mild"],0,6,6,8],
  ["Bánh bao",["breakfast","lunch"],["cake"],18000,35000,["mild"],0,6,6,8], ["Bánh mì chảo",["breakfast","lunch"],["cake"],35000,60000,["rich"],0,8,6,9],
  ["Cháo sườn",["breakfast","dinner"],["soup"],20000,40000,["light","mild"],0,6,8,8], ["Cháo lòng",["breakfast","lunch"],["soup"],30000,50000,["rich"],0,7,5,7],
  ["Cháo gà",["breakfast","dinner"],["soup"],30000,55000,["light","mild"],0,7,8,8], ["Cháo trai",["breakfast","dinner"],["soup"],25000,45000,["light"],0,6,8,7],
  ["Bún đậu mắm tôm",["lunch","dinner"],["noodles"],35000,70000,["rich"],0,8,5,10], ["Nem nướng",["lunch","dinner"],["cake"],35000,65000,["rich","mild"],0,7,6,8],
  ["Bánh xèo",["lunch","dinner"],["cake"],40000,80000,["rich"],0,8,6,9], ["Bánh khọt",["lunch","dinner"],["cake"],35000,65000,["rich"],0,7,6,8],
  ["Gỏi cuốn",["lunch","dinner"],["cake","vegetarian"],25000,50000,["light","mild"],0,5,10,9], ["Bò kho",["breakfast","lunch","dinner"],["soup"],40000,70000,["rich","mild"],0,8,6,9],
  ["Bò né",["breakfast","lunch","dinner"],["rice"],45000,80000,["rich"],0,9,6,8], ["Bò lúc lắc",["lunch","dinner"],["rice"],60000,100000,["rich"],0,8,6,8],
  ["Gà nướng",["lunch","dinner"],["rice"],50000,100000,["rich"],0,9,6,9], ["Gà rang",["lunch","dinner"],["rice"],40000,80000,["rich"],1,8,6,8],
  ["Gà chiên mắm",["lunch","dinner"],["rice"],40000,80000,["rich"],1,8,5,9], ["Cá kho tộ",["lunch","dinner"],["rice"],35000,70000,["rich"],1,8,7,8],
  ["Thịt kho trứng",["lunch","dinner"],["rice"],35000,65000,["rich"],0,9,6,9], ["Canh chua cá",["lunch","dinner"],["soup"],40000,80000,["light","mild"],1,7,8,8],
  ["Lẩu Thái",["dinner"],["soup"],80000,100000,["spicy","rich"],3,10,6,10], ["Lẩu bò",["dinner"],["soup"],80000,100000,["rich"],1,10,6,9],
  ["Lẩu gà lá é",["dinner"],["soup"],80000,100000,["spicy","rich"],2,10,7,9], ["Lẩu riêu cua",["dinner"],["soup"],80000,100000,["rich","mild"],1,10,7,9],
  ["Mì cay",["lunch","dinner"],["noodles","soup"],35000,60000,["spicy","rich"],4,8,5,9], ["Mì trộn",["lunch","dinner"],["noodles"],30000,55000,["spicy","rich"],2,7,5,9],
  ["Cơm trộn",["lunch","dinner"],["rice"],40000,70000,["spicy","rich"],2,8,7,8], ["Bánh tráng trộn",["lunch","dinner"],["snack"],20000,40000,["spicy","rich"],2,5,4,10],
  ["Bánh tráng nướng",["lunch","dinner"],["snack"],15000,35000,["rich"],1,5,4,9], ["Nem chua rán",["lunch","dinner"],["snack"],30000,60000,["rich"],0,6,4,9],
  ["Khoai tây chiên",["lunch","dinner"],["snack"],25000,45000,["rich"],0,5,3,9], ["Chân gà sả tắc",["lunch","dinner"],["snack"],30000,60000,["spicy","rich"],3,6,4,9],
  ["Ốc len xào dừa",["dinner"],["snack"],40000,80000,["rich"],1,6,5,8], ["Súp cua",["breakfast","lunch","dinner"],["soup"],25000,45000,["light","mild"],0,6,8,9],
  ["Cơm chay",["lunch","dinner"],["rice","vegetarian"],30000,55000,["light","mild"],0,7,10,8], ["Bún chay",["breakfast","lunch"],["noodles","vegetarian"],30000,50000,["light","mild"],0,7,10,8],
  ["Phở chay",["breakfast","lunch"],["noodles","vegetarian"],30000,50000,["light","mild"],0,7,10,8], ["Gỏi ngó sen",["lunch","dinner"],["vegetarian"],35000,60000,["light"],0,5,10,7],
  ["Đậu hũ sốt cà",["lunch","dinner"],["rice","vegetarian"],25000,45000,["mild","light"],0,7,9,7], ["Nấm kho tiêu",["lunch","dinner"],["rice","vegetarian"],30000,50000,["rich"],1,7,9,7],
  ["Bún thịt nướng",["lunch","dinner"],["noodles"],40000,65000,["rich","mild"],0,8,7,10], ["Bún nem nướng",["lunch","dinner"],["noodles"],40000,65000,["rich","mild"],0,8,7,8],
  ["Bún mắm",["lunch","dinner"],["noodles","soup"],45000,70000,["rich"],1,8,6,8], ["Bún thái",["lunch","dinner"],["noodles","soup"],40000,65000,["spicy","rich"],3,8,6,8],
  ["Mì vịt tiềm",["lunch","dinner"],["noodles","soup"],50000,80000,["rich"],0,8,7,7], ["Cơm sườn bì chả",["lunch","dinner"],["rice"],45000,75000,["rich"],0,9,6,10],
  ["Cơm bò xào",["lunch","dinner"],["rice"],40000,70000,["rich"],1,8,6,8], ["Cơm chiên hải sản",["lunch","dinner"],["rice"],40000,70000,["rich"],0,8,5,8],
  ["Cá viên chiên",["lunch","dinner"],["snack"],20000,40000,["rich"],1,5,4,8], ["Há cảo hấp",["breakfast","lunch"],["cake"],25000,50000,["light","mild"],0,5,7,8],
  ["Hoành thánh",["breakfast","lunch"],["noodles","soup"],35000,60000,["light","mild"],0,7,7,8], ["Bánh ướt lòng gà",["breakfast","lunch"],["cake"],35000,60000,["rich","mild"],0,7,7,8],
  ["Bánh bèo",["breakfast","lunch"],["cake"],25000,45000,["light","mild"],1,5,7,7], ["Bánh nậm",["breakfast","lunch"],["cake"],15000,30000,["light","mild"],0,4,8,6],
  ["Chè đậu xanh",["lunch","dinner"],["snack","vegetarian"],15000,30000,["mild"],0,3,7,7], ["Sinh tố bơ",["breakfast","lunch"],["snack","vegetarian"],25000,45000,["mild"],0,4,8,8]
];

export const foods: Food[] = seeds.map(([name, meals, categories, min, max, flavor, spicyLevel, fillingLevel, healthyScore, popularity], index) => ({
  id: `food-${index + 1}`, name, meals, categories, priceMin: min, priceMax: max, flavor, spicyLevel, fillingLevel, healthyScore, popularity, image: img,
  description: `${name} là lựa chọn quen thuộc, đậm chất ẩm thực Việt và dễ tìm trên các ứng dụng giao đồ ăn.`, searchKeywords: [name, name.toLowerCase()]
}));
