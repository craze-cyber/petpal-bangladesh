import { useEffect, useState, useCallback } from "react";

export type CartItem = {
  id: string;
  name: string;
  brand: string;
  image: string;
  price: number;
  variant?: string;
  qty: number;
};

const KEY = "bpac_cart";
const EVT = "bpac_cart_change";

function read(): CartItem[] {
  if (typeof window === "undefined") return [];
  try { return JSON.parse(localStorage.getItem(KEY) || "[]"); } catch { return []; }
}
function write(items: CartItem[]) {
  localStorage.setItem(KEY, JSON.stringify(items));
  window.dispatchEvent(new Event(EVT));
}

export function useCart() {
  const [items, setItems] = useState<CartItem[]>([]);

  useEffect(() => {
    setItems(read());
    const handler = () => setItems(read());
    window.addEventListener(EVT, handler);
    window.addEventListener("storage", handler);
    return () => {
      window.removeEventListener(EVT, handler);
      window.removeEventListener("storage", handler);
    };
  }, []);

  const add = useCallback((item: Omit<CartItem, "qty">, qty = 1) => {
    const current = read();
    const key = item.id + (item.variant ?? "");
    const idx = current.findIndex((c) => c.id + (c.variant ?? "") === key);
    if (idx >= 0) current[idx].qty += qty;
    else current.push({ ...item, qty });
    write(current);
  }, []);

  const remove = useCallback((id: string, variant?: string) => {
    write(read().filter((c) => !(c.id === id && (c.variant ?? "") === (variant ?? ""))));
  }, []);

  const setQty = useCallback((id: string, qty: number, variant?: string) => {
    const next = read().map((c) =>
      c.id === id && (c.variant ?? "") === (variant ?? "") ? { ...c, qty: Math.max(1, qty) } : c
    );
    write(next);
  }, []);

  const clear = useCallback(() => write([]), []);

  const subtotal = items.reduce((s, i) => s + i.price * i.qty, 0);
  const count = items.reduce((s, i) => s + i.qty, 0);

  return { items, add, remove, setQty, clear, subtotal, count };
}
