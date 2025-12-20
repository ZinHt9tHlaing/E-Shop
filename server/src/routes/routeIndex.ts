import { Application, Router } from "express";
import { userRoute } from "./user/userRoute";

const _routes: Array<[string, Router]> = [["/api", userRoute]];

export const routes = (app: Application) => {
  _routes.forEach((route) => {
    const [url, router] = route;
    app.use(url, router);
  });
};
