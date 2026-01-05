import { ShoppingCart, X } from "lucide-react";
import CartItem from "./CartItem";
import { useDispatch, useSelector } from "react-redux";
import type { RootState } from "@/store/store";
import { clearCart, toggleCart } from "@/store/slices/cart/cart";
import { Button } from "../ui/button";

function CartDrawer() {
  const dispatch = useDispatch();

  const products = useSelector((store: RootState) => store.cart.items);
  const isCartOpen = useSelector((state: RootState) => state.cart.isCartOpen);
  const productInCart = useSelector(
    (state: RootState) => state.cart.items.length
  );

  const handleClearCart = () => {
    dispatch(clearCart());
    dispatch(toggleCart());
  };

  return (
    <div
      className={`bg-white fixed top-0 right-0 w-[75%] md:w-[70%] lg:w-[35%] xl:w-[25%] transform transition-transform duration-300 z-50 p-4 h-screen overflow-y-scroll border-l-2 border-l-gray-200 ${
        isCartOpen ? "translate-x-0" : "translate-x-full"
      }`}
    >
      <div className="flex justify-end w-full cursor-pointer">
        <X onClick={() => dispatch(toggleCart())} />
      </div>
      <div className=" mt-4 mb-8 flex items-center justify-between">
        <h2 className="text-2xl font-bold">YOUR CART</h2>
        {productInCart > 2 && (
          <Button
            size={"sm"}
            variant={"destructive"}
            onClick={handleClearCart}
            className="cursor-pointer active:scale-95 duration-150"
          >
            Clear All
          </Button>
        )}
      </div>
      <div className="space-y-4">
        {products.map((product, index) => (
          <CartItem
            key={index}
            name={product.name}
            price={product.price}
            color={product.color}
            size={product.size}
            image={product.image}
            quantity={product.quantity}
            productKey={product.key!}
          />
        ))}
      </div>

      {products.length === 0 && (
        <div className="flex flex-col items-center justify-center h-[70%] text-center gap-4">
          <div className="w-20 h-20 rounded-full bg-gray-100 flex items-center justify-center">
            <ShoppingCart className="w-10 h-10 text-gray-400" />
          </div>

          <h3 className="text-lg font-semibold">Your cart is empty</h3>

          <p className="text-sm text-gray-500 max-w-56">
            Looks like you haven’t added anything to your cart yet.
          </p>

          {/* <button
            onClick={toggleCart}
            className="flex items-center gap-2 mt-2 px-4 py-2 border border-black rounded-md
            hover:bg-black hover:text-white transition"
          >
            Continue Shopping
            <ArrowRight size={16} />
          </button> */}
        </div>
      )}

      {products.length > 0 && (
        <button className="bg-black w-full py-2 md:py-4 text-white rounded-md cursor-pointer active:scale-95 duration-200">
          Go to Checkout
        </button>
      )}
    </div>
  );
}

export default CartDrawer;
