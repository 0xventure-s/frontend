/* eslint-disable react-refresh/only-export-components */
import { Link, useLoaderData } from "react-router-dom";
import { getProduct } from "../services/Products-services";
import { Product } from "../schema";
import ProductDetails from "../components/ProductDetails";

export async function loader() {
  const products = await getProduct();

  return products;
}

export default function Products() {
  const products = useLoaderData() as Product[];

  return (
    <>
      <div className="flex justify-between">
        <h1 className="text-4xl font-black text-slate-500">Productos</h1>
        <Link
          to={"/nuevo/producto"}
          className="bg-indigo-500 text-white text-sm font-semibold p-3 rounded-md"
        >
          + Agregar Productos{" "}
        </Link>
      </div>
      <div className="p-2">
        <table className="w-full mt-5 table-auto">
          <thead className="bg-slate-800 text-white">
            <tr>
              <th className="p-2">Producto</th>
              <th className="p-2">Precio</th>
              <th className="p-2">Disponibilidad</th>
              <th className="p-2">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {products.map((product) => (
              <ProductDetails key={product.id} product={product} />
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}
