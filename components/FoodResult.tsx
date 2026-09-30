import { foodImages } from "../data/foodImages";
import { Food } from "../types/food";

const fallbackImage = "https://images.unsplash.com/photo-1559314809-0d155014e29e?auto=format&fit=crop&w=1200&q=85";
const mealNames = { breakfast: "sáng", lunch: "trưa", dinner: "tối" };

export default function FoodResult({ food, onAgain, onDislike, onShare }: { food: Food; onAgain: () => void; onDislike: () => void; onShare: () => void }) {
  const query = encodeURIComponent(food.searchKeywords[0]);
  const hasMatchedPhoto = Boolean(foodImages[food.name]);
  const photoNote = hasMatchedPhoto
    ? "Ảnh tra cứu theo tên món • nhìn cho đỡ thèm thôi nha"
    : "Ảnh minh họa chống đói • món thật có thể ngon theo cách riêng 😋";

  return (
    <article className="result-card">
      <div className="result-image">
        <img src={food.image} alt={food.name} onError={(event) => { event.currentTarget.onerror = null; event.currentTarget.src = fallbackImage; }} />
        <span>✨ MÁY CHỌN RỒI</span>
        <p className={"photo-note " + (hasMatchedPhoto ? "matched" : "illustration")}>📷 {photoNote}</p>
      </div>
      <div className="result-copy">
        <p className="eyebrow">Món dành cho bạn</p>
        <h2>🍜 {food.name}</h2>
        <p className="description">{food.description}</p>
        <div className="facts">
          <span>⏰ Hợp bữa {food.meals.map((item) => mealNames[item]).join(" / ")}</span>
          <span>💰 {food.priceMin.toLocaleString("vi-VN")} – {food.priceMax.toLocaleString("vi-VN")}đ</span>
          <span>🔥 {food.popularity >= 9 ? "Rất phổ biến" : "Được yêu thích"}</span>
          <span>🌶️ {food.spicyLevel > 1 ? "Có vị cay" : "Không cay"}</span>
        </div>
        <div className="delivery">
          <a href={"https://food.grab.com/vn/vi/search?search=" + query} target="_blank" rel="noreferrer">Tìm trên GrabFood ↗</a>
          <a href={"https://shopeefood.vn/ha-noi/food/search?keyword=" + query} target="_blank" rel="noreferrer">Tìm trên ShopeeFood ↗</a>
        </div>
        <div className="result-actions">
          <button className="outline" onClick={onDislike}>✕ Không thích món này</button>
          <button className="outline" onClick={onShare}>📤 Chia sẻ</button>
          <button className="again" onClick={onAgain}>🎲 Món khác</button>
        </div>
      </div>
    </article>
  );
}
