import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Hôm Nay Ăn Gì? - Random Món Ăn Việt Nam",
  description: "Không biết hôm nay ăn gì? Random ngay món ăn Việt Nam cho bữa sáng, trưa hoặc tối và tìm món trên GrabFood hoặc ShopeeFood.",
  keywords: ["hôm nay ăn gì", "ăn gì hôm nay", "random món ăn", "random đồ ăn", "bữa sáng ăn gì", "bữa trưa ăn gì", "bữa tối ăn gì", "món ăn Việt Nam"],
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="vi"><body>{children}</body></html>;
}
