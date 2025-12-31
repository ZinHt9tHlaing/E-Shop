import { createBrowserRouter } from "react-router";
import MainLayout from "./layouts/MainLayout";
import Home from "./pages/common/Home";
import RegisterPage from "./pages/auth/Register";
import LoginPage from "./pages/auth/Login";
import ProductDetails from "./pages/product/ProductDetails";
import Profile from "./pages/common/Profile";
import ResetPassword from "./pages/auth/ResetPassword";
import ForgotPassword from "./pages/auth/ForgotPassword";
import ProductFilter from "./pages/product/ProductFilter";
import ProductCreate from "./pages/admin/ProductCreate";
import IsLogin from "./pages/protector/IsLogin";
import IsAdmin from "./pages/protector/IsAdmin";
import Panel from "./pages/admin/Panel";
import ErrorPage from "./pages/ErrorPage";
import ProductUpdate from "./pages/admin/ProductUpdate";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    errorElement: <ErrorPage />,
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
        path: "/product/:id",
        element: <ProductDetails />,
      },
      {
        path: "/products/filter",
        element: <ProductFilter />,
      },
      {
        path: "/profile",
        element: (
          <IsLogin>
            <Profile />
          </IsLogin>
        ),
      },
      {
        path: "/admin",
        element: (
          <IsAdmin>
            <Panel />
          </IsAdmin>
        ),
        children: [
          {
            path: "/admin/create-product",
            element: <ProductCreate />,
          },
          {
            path: "/admin/edit-product/:id",
            element: <ProductUpdate />,
          },
        ],
      },
    ],
  },
]);
