const HISTORY_KEY = "hnag-history";
const DISLIKED_KEY = "hnag-disliked";

const read = (key: string): string[] => { try { return JSON.parse(localStorage.getItem(key) ?? "[]") as string[]; } catch { return []; } };
export const getHistory = () => typeof window === "undefined" ? [] : read(HISTORY_KEY);
export const getDisliked = () => typeof window === "undefined" ? [] : read(DISLIKED_KEY);
export const saveHistory = (id: string) => { const next = [id, ...getHistory().filter(item => item !== id)].slice(0, 10); localStorage.setItem(HISTORY_KEY, JSON.stringify(next)); return next; };
export const addDisliked = (id: string) => { const next = [...new Set([...getDisliked(), id])]; localStorage.setItem(DISLIKED_KEY, JSON.stringify(next)); return next; };
export const resetDisliked = () => localStorage.removeItem(DISLIKED_KEY);
