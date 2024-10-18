import { ActionFunctionArgs, Form, redirect, useNavigate } from "react-router-dom";
import { Product } from "../schema";
import { deleteProduct } from "../services/Products-services";

export type ProductDetailsProps = {
  product: Product;
};


// eslint-disable-next-line react-refresh/only-export-components
export async function action({params}:ActionFunctionArgs) {

  if(params.id !== undefined) {
    await deleteProduct(+params.id)
    return redirect("/")
  }
}

export default function ProductDetails({ product }: ProductDetailsProps) {

 
  const navigate = useNavigate();
  return (
    <>
      <tr className="border-b ">
        <td className="p-3 text-lg text-gray-800">{product.name}</td>
        <td className="p-3 text-lg text-gray-800">{product.price}</td>
        <td className="p-3 text-lg text-gray-800"></td>
        <td className="p-3 text-lg text-gray-800 ">
          <div className="flex justify-between  gap-3">
            <button
              className="bg-indigo-500 text-white rounded-lg w-full uppercase p-2 text-sm text-center font-semibold"
              onClick={() => navigate(`productos/${product.id}/editar`)}
            >
              Editar
            </button>

            <Form
              method="POST"
              
              action={`productos/${product.id}/eliminar`}
              onSubmit={(e) => {
                if (!confirm("Queres Eliminar Cuchi?")) {
                  e.preventDefault();
                }
              }}
            >
              <input
                type="submit"
                value="Eliminar"
                className="bg-red-500 text-white rounded-lg w-full uppercase p-2 text-sm text-center font-semibold"
              />
            </Form>
          </div>
        </td>
      </tr>
    </>
  );
}
