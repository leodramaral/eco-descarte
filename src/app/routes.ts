import { createHashRouter } from "react-router";
import { Layout } from "./components/Layout";
import { CatalogPage } from "./components/CatalogPage";
import { ItemDetailPage } from "./components/ItemDetailPage";
import { AddItemPage } from "./components/AddItemPage";
import { UserProfilePage } from "./components/UserProfilePage";
import { LoginPage } from "./components/LoginPage";

export const router = createHashRouter([
  {
    path: "/",
    Component: Layout,
    children: [
      { index: true, Component: CatalogPage },
      { path: "login", Component: LoginPage },
      { path: "item/:id", Component: ItemDetailPage },
      { path: "add", Component: AddItemPage },
      { path: "profile", Component: UserProfilePage },
      { path: "profile/:id", Component: UserProfilePage },
    ],
  },
]);
