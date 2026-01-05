import { decreaseQuantity, increaseQuantity, removeFromCart } from "@/store/slices/cart/cart";
import type { AppDispatch } from "@/store/store";
import { Minus, Plus, Trash2 } from "lucide-react";
import { useDispatch } from "react-redux";

interface CartItemProps {
  name: string;
  size: string;
  color: string;
  price: number;
  image: string;
  quantity: number;
  productKey: string;
}

function CartItem({
  name,
  size,
  color,
  price,
  image,
  quantity,
  productKey,
}: CartItemProps) {
  const dispatch = useDispatch<AppDispatch>();

  return (
    <div className="flex justify-between border-b pb-4 border-b-gray-200">
      <div className="flex gap-2 items-center">
        <img
          src={image}
          alt={name}
          loading="lazy"
          decoding="async"
          className="size-24 rounded-md"
        />
        <div className="flex flex-col">
          <span className="font-bold">{name}</span>
          <span className="text-xs font-medium text-gray-400">
            size - {size}
          </span>
          <span className="text-xs font-medium text-gray-400">
            color - {color}
          </span>
          <span className="font-bold mt-1 text-lg">${price}</span>
        </div>
      </div>
      <div className="flex items-end flex-col justify-between">
        <button
          onClick={() => dispatch(removeFromCart(productKey))}
          className="text-red-600 cursor-pointer active:scale-90 duration-200"
        >
          <Trash2 className="size-6" />
        </button>
        <div className="flex items-center gap-2">
          <button
            onClick={() => dispatch(decreaseQuantity(productKey))}
            className="bg-black p-2 text-white rounded-md cursor-pointer active:scale-90 duration-200"
          >
            <Minus className="size-4" />
          </button>
          <span className="font-medium">{quantity}</span>
          <button
            onClick={() => dispatch(increaseQuantity(productKey))}
            className="bg-black p-2 text-white rounded-md cursor-pointer active:scale-90 duration-200"
          >
            <Plus className="size-4" />
          </button>
        </div>
      </div>
    </div>
  );
}

export default CartItem;
