import SecondaryBar from "../components/SecondaryBar";
import TopBar from "../components/TopBar";
import CartDrawer from "../components/cart/CartDrawer";

const Navbar = () => {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50">
      <TopBar  />
      <SecondaryBar />
      <CartDrawer />
    </nav>
  );
};

export default Navbar;
