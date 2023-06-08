import { useEffect, useState } from "react";

export type ShoppingCart = {
  products: Product[];
};

export type Product = {
  id: number;
  name: string;
  price: number;
  quantity: number;
};

export let shoppingCart: ShoppingCart = {
  products: [],
};

const EVENT_TYPE = "update-shopping-cart";

export function updateShoppingCart() {
  window.dispatchEvent(new Event(EVENT_TYPE));
}

export function monitorShoppingCart() {
  const [state, setState] = useState(0);
  useEffect(() => {
    function inc() {
      setState((state) => state + 1);
    }
    window.addEventListener(EVENT_TYPE, inc);
    return () => {
      window.removeEventListener(EVENT_TYPE, inc);
    };
  }, []);
}
