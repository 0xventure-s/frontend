/* eslint-disable react-refresh/only-export-components */
import { ActionFunctionArgs, Form, Link, redirect } from "react-router-dom";
import { createProducts } from "../services/Products-services";

export async function action({ request }: ActionFunctionArgs) {
  const data = Object.fromEntries(await request.formData());

  let error = "";

  if(Object.values(data).includes("")) {
    error = "Peluca Sape"
  }
  if(error.length) {
    return error;
  }

  await createProducts(data)
  return redirect("/")
}

export default function NewProducts() {
  return (
    <>
      <div className="flex justify-between">
        <h1 className="text-4xl font-black text-slate-500">Agregar Producto</h1>
        <Link
          to={"/"}
          className="bg-indigo-500 text-white text-sm font-semibold p-3 rounded-md"
        >
          ← Volver a productos
        </Link>
      </div>

      <Form className="mt-10" method="POST">
        <div className="mb-4">
          <label className="text-gray-800" htmlFor="name">
            Nombre Producto:
          </label>
          <input
            id="name"
            type="text"
            className="mt-2 block w-full p-3 bg-gray-50"
            placeholder="Nombre del Producto"
            name="name"
          />
        </div>
        <div className="mb-4">
          <label className="text-gray-800" htmlFor="price">
            Precio:
          </label>
          <input
            id="price"
            type="number"
            className="mt-2 block w-full p-3 bg-gray-50"
            placeholder="Precio Producto. ej. 200, 300"
            name="price"
          />
        </div>
        <input
          type="submit"
          className="mt-5 w-full bg-indigo-600 p-2 text-white font-bold text-lg cursor-pointer rounded"
          value="Registrar Producto"
        />
      </Form>
    </>
  );
}
