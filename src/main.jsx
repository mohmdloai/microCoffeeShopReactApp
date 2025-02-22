import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "bootstrap/dist/css/bootstrap.min.css";
import "../src/styles/index.css";
import MainLayout from "./layout/MainLayout";
import SharedLayout from "./shared/SharedLayout";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <MainLayout />
  </StrictMode>
);
