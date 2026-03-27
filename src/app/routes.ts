import { createBrowserRouter } from "react-router";
import { Layout } from "./components/Layout";
import { CatalogPage } from "./components/CatalogPage";
import { ItemDetailPage } from "./components/ItemDetailPage";
import { AddItemPage } from "./components/AddItemPage";
import { UserProfilePage } from "./components/UserProfilePage";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: Layout,
    children: [
      { index: true, Component: CatalogPage },
      { path: "item/:id", Component: ItemDetailPage },
      { path: "add", Component: AddItemPage },
      { path: "profile", Component: UserProfilePage },
    ],
  },
]);
