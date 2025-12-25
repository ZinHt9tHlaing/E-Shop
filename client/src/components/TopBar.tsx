import {
  LogIn,
  ShoppingCart,
  User,
  LogOut,
  CircleUserRound,
} from "lucide-react";
import SearchBox from "../common/SearchBox";
import { Link, useNavigate } from "react-router";
import type { AppDispatch, RootState } from "@/store/store";
import { useDispatch, useSelector } from "react-redux";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { clearUserInfo } from "@/store/slices/auth/auth";
import { toast } from "sonner";
import {
  useCurrentUserQuery,
  useLogoutMutation,
} from "@/store/slices/api/userApi";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";

type TopBarProps = {
  toggleCart: () => void;
};

const TopBar = ({ toggleCart }: TopBarProps) => {
  const userInfo = useSelector((state: RootState) => state.auth.userInfo);
  const { data: currentUser } = useCurrentUserQuery();

  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();

  const [logoutMutation, { isLoading }] = useLogoutMutation();

  const logoutHandler = async () => {
    try {
      const response = await logoutMutation({});
      dispatch(clearUserInfo());
      toast.success(response.data.message);
      navigate("/login");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <main className="text-white bg-black  px-3 py-6">
      <div className="max-w-6xl mx-auto flex items-center justify-between">
        <Link to={"/"}>
          <h1 className="font-bold text-3xl">E-SHOP</h1>
        </Link>
        <SearchBox />
        <div className="flex items-center gap-4">
          <ShoppingCart
            onClick={toggleCart}
            className="cursor-pointer active:scale-90 duration-200"
          />
          {userInfo ? (
            <DropdownMenu>
              <DropdownMenuTrigger className="cursor-pointer">
                {currentUser?.avatar ? (
                  <Avatar className="size-8 border border-gray-400 focus:outline-none">
                    <AvatarImage
                      src={currentUser && currentUser?.avatar?.[0]?.url}
                      loading="lazy"
                      decoding="async"
                    />
                    {!currentUser?.avatar?.[0]?.url && (
                      <AvatarFallback className="text-2xl">
                        {currentUser?.name.slice(0, 1)}
                      </AvatarFallback>
                    )}
                  </Avatar>
                ) : (
                  <CircleUserRound />
                )}
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-36">
                <DropdownMenuLabel className="font-semibold text-center">
                  My Account
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem className="group" asChild>
                  <Link to={"/profile"} className="cursor-pointer">
                    <User
                      className="mr-2 size-4 transition-all duration-300 ease-in-out group-hover:scale-110"
                      aria-hidden="true"
                    />
                    Profile
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem className="group" asChild>
                  <Link to={"/orders"} className="cursor-pointer">
                    <ShoppingCart
                      className="mr-2 size-4 transition-all duration-300 ease-in-out group-hover:scale-110"
                      aria-hidden="true"
                    />
                    Orders
                  </Link>
                </DropdownMenuItem>

                <DropdownMenuSeparator />

                <DropdownMenuItem
                  disabled={isLoading}
                  className="group"
                  onClick={logoutHandler}
                  asChild
                >
                  <Link to="/login" className="text-red-600 cursor-pointer">
                    <LogOut
                      className="mr-2 size-4 text-red-600 transition-all duration-300 group-hover:translate-x-1 group-hover:scale-95"
                      aria-hidden="true"
                    />
                    Logout
                  </Link>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <Link
              to="/login"
              className="cursor-pointer active:scale-90 duration-200"
            >
              <LogIn />
            </Link>
          )}
        </div>
      </div>
    </main>
  );
};

export default TopBar;
