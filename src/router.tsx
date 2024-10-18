import { createBrowserRouter } from "react-router-dom";
import Layout from "./layout/Layout";
import Products, { loader as ProductsLoader } from "./views/Products";
import NewProducts, { action as NewProductAction } from "./views/NewProducts";
import EditProduct, {
  action as EditProductAction,
  loader as editProductLoader,
} from "./views/EditProduct";
import { action as DeleteProductAction } from "./components/ProductDetails";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        index: true,
        element: <Products />,
        loader: ProductsLoader,
      },

      {
        path: "/nuevo/producto",
        element: <NewProducts />,
        action: NewProductAction,
      },

      {
        path: "productos/:id/editar", //ROA PATTERN
        element: <EditProduct />,
        loader: editProductLoader,
        action: EditProductAction,
      },

      {
        path: "productos/:id/eliminar",
        action: DeleteProductAction,
      },
    ],
  },
]);
