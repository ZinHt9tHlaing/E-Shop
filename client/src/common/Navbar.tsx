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
    <nav className="fixed top-0 left-0 right-0 z-50">
      <TopBar toggleCart={toggleCart} />
      <SecondaryBar />
      <CartDrawer isCartOpen={isCartOpen} toggleCart={toggleCart} />
    </nav>
  );
};

export default Navbar;
