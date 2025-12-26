import { createBrowserRouter } from "react-router";
import MainLayout from "./layouts/MainLayout";
import Home from "./pages/common/Home";
import RegisterPage from "./pages/auth/Register";
import LoginPage from "./pages/auth/Login";
import ProductDetails from "./pages/product/ProductDetails";
import IsLogin from "./pages/auth/IsLogin";
import Profile from "./pages/common/Profile";
import ResetPassword from "./pages/auth/ResetPassword";
import ForgotPassword from "./pages/auth/ForgotPassword";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: "register",
        element: <RegisterPage />,
      },
      {
        path: "/login",
        element: <LoginPage />,
      },
      { path: "/forgot-password", element: <ForgotPassword /> },
      {
        path: "/reset-password/:token",
        element: <ResetPassword />,
      },
      {
        path: "/products/:id",
        element: <ProductDetails />,
      },
      {
        path: "/profile",
        element: (
          <IsLogin>
            <Profile />
          </IsLogin>
        ),
      },
    ],
  },
]);
