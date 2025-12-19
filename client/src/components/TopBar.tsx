import { ShoppingCart, User } from "lucide-react";
import SearchBox from "../common/SearchBox";
import { Link } from "react-router";

type TopBarProps = {
  toggleCart: () => void;
};

const TopBar = ({ toggleCart }: TopBarProps) => {
  return (
    <main className="text-white bg-black max-w-6xl mx-auto px-3 py-5">
      <div className="flex items-center justify-between">
        <Link to={"/"}>
          <h1 className="font-bold text-3xl">E-SHOP</h1>
        </Link>
        <SearchBox />
        <div className="flex items-center gap-4">
          <ShoppingCart
            onClick={toggleCart}
            className="cursor-pointer active:scale-90 duration-200"
          />
          <User className="cursor-pointer active:scale-90 duration-200" />
        </div>
      </div>
    </main>
  );
};

export default TopBar;
