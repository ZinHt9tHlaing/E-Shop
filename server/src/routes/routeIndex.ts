import { Application, Router } from "express";
import { userRoute } from "./user/userRoute";
import { productRoutes } from "./product/productRoutes";

const _routes: Array<[string, Router]> = [
  ["/api/users/", userRoute],
  ["/api/products", productRoutes],
];

export const routes = (app: Application) => {
  _routes.forEach((route) => {
    const [url, router] = route;
    app.use(url, router);
  });
};
