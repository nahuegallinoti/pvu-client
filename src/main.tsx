import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Root from "./routes/root";
import Plants from "./components/Plants/plants";
import Decorations from "./components/Decorations/decorations";
import Calculator from "./components/Calculator/calculator";
import Coordinates from "./components/Coordinates/coordinates";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Calculator />,
  },
  {
    path: "/calculator",
    element: <Calculator />,
  },
  {
    path: "/plants",
    element: <Plants />,
  },
  {
    path: "/decorations",
    element: <Decorations />,
  },
  {
    path: "/coordinates",
    element: <Coordinates />,
  },
]);

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <Root />
    <RouterProvider router={router} />
  </React.StrictMode>
);
