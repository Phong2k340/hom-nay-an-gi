"use client";

import { useEffect, useMemo, useState } from "react";
import { foodProvider } from "../services/foodProvider";
import { Filters, Food, Meal } from "../types/food";
import { foodForCurrentMeal, mealForCurrentTime, selectFood } from "../utils/randomFood";
import { addDisliked, getDisliked, getHistory, resetDisliked, saveHistory } from "../utils/storage";
import FilterPanel from "./FilterPanel";
import FoodHistory from "./FoodHistory";
import FoodResult from "./FoodResult";
import MealSelector from "./MealSelector";
import RandomAnimation from "./RandomAnimation";

const defaults: Filters = { price: "any", category: "any", flavor: "any", style: "any" };
const rollingNames = ["Phở bò", "Bún chả", "Cơm tấm", "Bánh mì", "Mì Quảng"];

export default function FoodDecider() {
  const foods = useMemo(() => foodProvider.getFoods(), []);
  const [meal, setMeal] = useState<Meal>("lunch");
  const [filters, setFilters] = useState<Filters>(defaults);
  const [result, setResult] = useState<Food | null>(null);
  const [history, setHistory] = useState<string[]>([]);
  const [disliked, setDisliked] = useState<string[]>([]);
  const [rolling, setRolling] = useState(false);
  const [slotLabel, setSlotLabel] = useState("Phở bò");
  const [notice, setNotice] = useState("");
  const [suggestion, setSuggestion] = useState<Food | null>(null);

  useEffect(() => {
    setHistory(getHistory());
    setDisliked(getDisliked());
    setSuggestion(foodForCurrentMeal(foods, mealForCurrentTime()));
  }, []);

  const choose = (auto = false) => {
    const chosenMeal = auto ? mealForCurrentTime() : meal;
    if (auto) { setMeal(chosenMeal); setFilters(defaults); }
    setRolling(true);
    setResult(null);
    setNotice("");
    let index = 0;
    const interval = window.setInterval(() => setSlotLabel(rollingNames[index++ % rollingNames.length]), 130);
    window.setTimeout(() => {
      window.clearInterval(interval);
      const picked = selectFood(foods, chosenMeal, auto ? defaults : filters, disliked, history);
      setSlotLabel(picked.food.name);
      setResult(picked.food);
      setHistory(saveHistory(picked.food.id));
      if (picked.relaxed) setNotice("Khó chiều dữ vậy 😅 Mình nới điều kiện một chút nhé.");
      setRolling(false);
    }, 1850);
  };

  const dislike = () => {
    if (!result) return;
    setDisliked(addDisliked(result.id));
    setNotice("Đã ghi nhớ — lần sau mình né món này nhé.");
    setResult(null);
  };

  const share = async () => {
    if (!result) return;
    const text = "Hôm nay máy bắt tôi ăn " + result.name + " 😂\nBạn thử xem hôm nay ăn gì: " + window.location.href;
    if (navigator.share) { await navigator.share({ title: "Hôm Nay Ăn Gì?", text }); return; }
    await navigator.clipboard.writeText(text);
    setNotice("Đã copy lời mời chia sẻ vào clipboard.");
  };

  const historyFoods = history.map((id) => foods.find((food) => food.id === id)).filter((item): item is Food => Boolean(item));
  const currentMeal = mealForCurrentTime();
  const currentMealLabel = { breakfast: "BỮA SÁNG", lunch: "BỮA TRƯA", dinner: "BỮA TỐI" }[currentMeal];

  return (
    <main className="app-shell">
      <div className="orb orb-coral" /><div className="orb orb-gold" /><div className="grain" />
      <header className="site-header">
        <a className="brand" href="#top" aria-label="Hôm Nay Ăn Gì">
          <span className="brand-mark">🍜</span>
          <span><b>HÔM NAY ĂN GÌ?</b><small>Vietnamese food picker</small></span>
        </a>
        <span className="header-status"><i /> 137+ món để chọn</span>
      </header>

      <section className="hero" id="top">
        <div className="hero-copy">
          <p className="eyebrow">BỮA ĂN HÔM NAY, GIẢI QUYẾT TRONG 3 GIÂY</p>
          <h1>Đói rồi thì<br /><em>để tụi mình chọn.</em></h1>
          <p className="intro">Từ phở nóng buổi sáng đến lẩu cho một buổi tối vui — một món hợp gu đang chờ bạn.</p>
          <div className="hero-points"><span>⚡ Nhanh gọn</span><span>🍲 Chuẩn vị Việt</span><span>📍 Dễ tìm gần bạn</span></div>
        </div>
        <button className="choose-for-me" onClick={() => choose(true)}>
          <span className="magic-icon">✦</span><b>Chọn hộ tôi luôn</b><small>Theo giờ hiện tại của bạn</small><span className="button-arrow">→</span>
        </button>
      </section>

      <section className="picker-card" aria-label="Chọn món ăn">
        <div className="picker-heading"><div><p className="eyebrow">BƯỚC 1</p><h2>Bạn ăn bữa nào?</h2></div><span className="step-count">01 / 02</span></div>
        <MealSelector value={meal} onChange={setMeal} />
        <FilterPanel filters={filters} onChange={setFilters} />
        <div className="random-area">
          <span className="random-caption">Sẵn sàng để món ngon tìm đến bạn?</span>
          <button className="random-button" disabled={rolling} onClick={() => choose()}><span>{rolling ? "ĐANG QUAY..." : "RANDOM MÓN"}</span><b>{rolling ? "✦" : "🎲"}</b></button>
        </div>
        {notice && <p className="notice">{notice}</p>}
        {rolling && <RandomAnimation label={slotLabel} />}
        {result && !rolling && <FoodResult food={result} onAgain={() => choose()} onDislike={dislike} onShare={share} />}
      </section>

      {suggestion && <section className="today">
        <div className="today-icon">✦</div>
        <div><p className="eyebrow">GỢI Ý {currentMealLabel}</p><b>{suggestion.name}</b><small>Vừa chọn theo thời điểm bạn ghé trang.</small></div>
        <button onClick={() => { setResult(suggestion); window.scrollTo({ top: 450, behavior: "smooth" }); }} aria-label={"Xem " + suggestion.name}>Khám phá <span>→</span></button>
      </section>}

      <FoodHistory items={historyFoods} onReset={() => { resetDisliked(); setDisliked([]); setNotice("Đã reset danh sách món đã loại."); }} />
      <footer>Made with <span>♥</span> for Vietnamese food lovers</footer>
    </main>
  );
}
