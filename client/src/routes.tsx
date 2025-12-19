import { createBrowserRouter } from "react-router";
import MainLayout from "./layouts/MainLayout";
import  Home from "./pages/common/Home";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    children: [
      {
        index: true,
        element: <Home />,
      },
    ],
  },
]);
