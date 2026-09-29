"use client";
import { useEffect, useMemo, useState } from "react";
import { foodProvider } from "../services/foodProvider";
import { Filters, Food, Meal } from "../types/food";
import { foodOfDay, mealForCurrentTime, selectFood } from "../utils/randomFood";
import { addDisliked, getDisliked, getHistory, resetDisliked, saveHistory } from "../utils/storage";
import MealSelector from "./MealSelector";
import FilterPanel from "./FilterPanel";
import RandomAnimation from "./RandomAnimation";
import FoodResult from "./FoodResult";
import FoodHistory from "./FoodHistory";

const defaults: Filters = { price: "any", category: "any", flavor: "any", style: "any" };
const rollingNames = ["Phở bò", "Bún chả", "Cơm tấm", "Bánh mì", "Mì Quảng"];
export default function FoodDecider() {
  const foods = useMemo(() => foodProvider.getFoods(), []); const [meal, setMeal] = useState<Meal>("lunch"); const [filters, setFilters] = useState<Filters>(defaults);
  const [result, setResult] = useState<Food | null>(null); const [history, setHistory] = useState<string[]>([]); const [disliked, setDisliked] = useState<string[]>([]); const [rolling, setRolling] = useState(false); const [slotLabel, setSlotLabel] = useState("Phở bò"); const [notice, setNotice] = useState("");
  useEffect(() => { setHistory(getHistory()); setDisliked(getDisliked()); }, []);
  const choose = (auto = false) => { const chosenMeal = auto ? mealForCurrentTime() : meal; if (auto) { setMeal(chosenMeal); setFilters(defaults); } setRolling(true); setResult(null); setNotice(""); let index = 0; const interval = window.setInterval(() => { setSlotLabel(rollingNames[index++ % rollingNames.length]); }, 130); window.setTimeout(() => { window.clearInterval(interval); const picked = selectFood(foods, chosenMeal, auto ? defaults : filters, disliked, history); setSlotLabel(picked.food.name); setResult(picked.food); setHistory(saveHistory(picked.food.id)); if (picked.relaxed) setNotice("Khó chiều dữ vậy 😅 Mình nới điều kiện một chút nhé."); setRolling(false); }, 1850); };
  const dislike = () => { if (!result) return; setDisliked(addDisliked(result.id)); setNotice("Đã ghi nhớ — lần sau mình né món này nhé."); setResult(null); };
  const share = async () => { if (!result) return; const text = `Hôm nay máy bắt tôi ăn ${result.name} 😂\nBạn thử xem hôm nay ăn gì: ${window.location.href}`; if (navigator.share) await navigator.share({ title: "Hôm Nay Ăn Gì?", text }); else { await navigator.clipboard.writeText(text); setNotice("Đã copy lời mời chia sẻ vào clipboard."); } };
  const items = history.map(id => foods.find(food => food.id === id)).filter((item): item is Food => Boolean(item)); const today = foodOfDay(foods);
  return <main><div className="glow one" /><div className="glow two" /><header><div className="brand-mark">🍜</div><div><h1>HÔM NAY ĂN GÌ?</h1><p>Đừng nghĩ nữa. Để máy chọn hộ.</p></div><span className="header-pill">Made for bụng đói</span></header><section className="hero"><div><p className="eyebrow">ĐỪNG ĐỂ CÁI BỤNG CHỜ LÂU</p><h2>Một cú chạm,<br/><em>một bữa ngon.</em></h2><p className="intro">Chọn bữa ăn, hoặc cứ để tụi mình lo từ A đến Z.</p></div><button className="choose-for-me" onClick={() => choose(true)}><span>🤷</span><b>Chọn hộ tôi luôn</b><small>Dựa theo giờ hiện tại</small></button></section><section className="panel"><MealSelector value={meal} onChange={setMeal} /><FilterPanel filters={filters} onChange={setFilters} /><button className="random-button" disabled={rolling} onClick={() => choose()}>{rolling ? "ĐANG QUAY..." : "🎲 RANDOM MÓN"}<small>{rolling ? "Sắp có rồi!" : "Để vận may quyết định"}</small></button>{notice && <p className="notice">{notice}</p>}{rolling && <RandomAnimation label={slotLabel} />}{result && !rolling && <FoodResult food={result} onAgain={() => choose()} onDislike={dislike} onShare={share} />}</section><section className="today"><div className="today-icon">🔥</div><div><p className="eyebrow">MÓN ĂN HÔM NAY</p><b>{today.name}</b><small>Cả cộng đồng đang cùng khám phá món này.</small></div><span>→</span></section><FoodHistory items={items} onReset={() => { resetDisliked(); setDisliked([]); setNotice("Đã reset danh sách món đã loại."); }} /><footer>Được làm bằng tình yêu với ẩm thực Việt Nam <span>♥</span></footer></main>;
}
