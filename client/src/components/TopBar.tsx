import {
  LogIn,
  ShoppingCart,
  User,
  LogOut,
  CircleUserRound,
  Search,
  X,
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
import { useEffect, useState } from "react";
import { apiSlice } from "@/store/slices/apiSlice";

type TopBarProps = {
  toggleCart: () => void;
};

const TopBar = ({ toggleCart }: TopBarProps) => {
  const [mobileSearchOpen, setMobileSearchOpen] = useState(false);

  const userInfo = useSelector((state: RootState) => state.auth.userInfo);
  const { data: currentUser, isError } = useCurrentUserQuery();

  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();

  const [logoutMutation, { isLoading }] = useLogoutMutation();

  useEffect(() => {
    if (isError) {
      dispatch(clearUserInfo());
      navigate("/");
    }
  }, [isError]);

  const logoutHandler = async () => {
    try {
      const response = await logoutMutation({});
      dispatch(clearUserInfo());
      toast.success(response.data.message);
      dispatch(apiSlice.util.resetApiState()); // Reset and clean out the API state
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <main className="text-white bg-black px-3 py-6">
      <div className="max-w-6xl mx-auto flex items-center justify-between">
        <Link to={"/"}>
          <h1 className="font-bold text-xl sm:text-2xl lg:text-3xl">E-SHOP</h1>
        </Link>
        {/* Desktop Search */}
        <div className="hidden sm:flex flex-1 mx-4">
          <SearchBox />
        </div>

        {/* Mobile Search Icon */}
        <div className="flex sm:hidden flex-1 justify-center  overflow-x-hidden">
          <button
            onClick={() => setMobileSearchOpen(!mobileSearchOpen)}
            className="p-2 cursor-pointer rounded-full hover:bg-gray-700 active:scale-95 duration-150"
          >
            <Search className="size-6" />
          </button>
        </div>
        <div className="flex items-center gap-4">
          <ShoppingCart
            onClick={toggleCart}
            className="cursor-pointer active:scale-90 duration-200"
          />
          {userInfo ? (
            <DropdownMenu>
              <DropdownMenuTrigger className="cursor-pointer">
                {currentUser?.avatar ? (
                  <Avatar className="size-7 sm:size-8 border border-gray-400 focus:outline-none">
                    <AvatarImage
                      src={currentUser && currentUser?.avatar?.[0]?.url}
                      loading="lazy"
                      decoding="async"
                    />
                    {!currentUser?.avatar?.[0]?.url && (
                      <AvatarFallback className="text-sm sm:text-lg">
                        {currentUser?.name.slice(0, 1)}
                      </AvatarFallback>
                    )}
                  </Avatar>
                ) : (
                  <CircleUserRound className="size-6 sm:size-7" />
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
              className="size-6 sm:size-7 cursor-pointer active:scale-90 duration-200"
            >
              <LogIn />
            </Link>
          )}
          {currentUser?.role === "admin" && (
            <Link
              to={"/admin/dashboard"}
              className="bg-yellow-500 p-2 text-black font-medium text-sm rounded-md active:scale-95 duration-150"
            >
              {/* Mobile */}
              <span className="sm:hidden">Dashboard</span>

              {/* Tablet & Desktop */}
              <span className="hidden sm:inline">Go to dashboard</span>
            </Link>
          )}
        </div>
      </div>
      {/* Mobile Search Bar */}
      {mobileSearchOpen && (
        <div className="sm:hidden fixed top-0 left-0 w-full bg-black p-4 z-50 shadow-md flex items-center justify-center">
          <SearchBox />
          <button
            onClick={() => setMobileSearchOpen(false)}
            className="ml-2 p-2 rounded-full cursor-pointer hover:bg-gray-700 active:scale-95 duration-150"
          >
            <X />
          </button>
        </div>
      )}
    </main>
  );
};

export default TopBar;
