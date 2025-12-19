import { useState } from "react";
import SecondaryBar from "../components/SecondaryBar";
import TopBar from "../components/TopBar";
import CartDrawer from "../components/cart/CartDrawer";

const Navbar = () => {
  const [isCartOpen, setIsCartOpen] = useState(false);

  const toggleCart = () => {
    setIsCartOpen((prev) => !prev);
  };

  return (
    <nav>
      <TopBar toggleCart={toggleCart} />
      <SecondaryBar />
      <CartDrawer isCartOpen={isCartOpen} toggleCart={toggleCart} />
    </nav>
  );
};

export default Navbar;
