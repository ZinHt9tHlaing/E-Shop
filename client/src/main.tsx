import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { RouterProvider } from "react-router";
import { router } from "./routes.tsx";
import { Provider } from "react-redux";
import { persistor, store } from "./store/store.ts";
import { Toaster } from "./components/ui/sonner.tsx";
import { PersistGate } from "redux-persist/integration/react";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Provider store={store}>
      <PersistGate persistor={persistor}>
        <Toaster richColors position="top-right" duration={1500} />
        <RouterProvider router={router} />
      </PersistGate>
    </Provider>
  </StrictMode>
);
