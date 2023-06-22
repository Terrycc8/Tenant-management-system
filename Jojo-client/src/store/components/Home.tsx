import {
  monitorShoppingCart,
  shoppingCart,
  updateShoppingCart,
} from "../shopping-cart";

export function Home() {
  monitorShoppingCart();
  return (
    <div>
      {shoppingCart.products.map((product) => (
        <div>
          {product.name} x {product.quantity}{" "}
          <button
            onClick={() => {
              product.quantity++;
              updateShoppingCart();
            }}
          >
            add to cart
          </button>
        </div>
      ))}
    </div>
  );
}
