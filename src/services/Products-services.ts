import { number, parse, pipe, safeParse, string, transform } from "valibot";
import {
  DraftProductSchema,
  Product,
  ProductSchema,
  ProductsSchema,
} from "../schema";
import axios from "axios";
import { toBoolean } from "../utils";

export type ProductData = {
  [k: string]: FormDataEntryValue;
};

export async function createProducts(data: ProductData) {
  const result = safeParse(DraftProductSchema, {
    name: data.name,
    price: +data.price,
  });

  if (result.success) {
    const url = `${import.meta.env.VITE_API_URL}/api/productos`;
    await axios.post(url, {
      name: result.output.name,
      price: result.output.price,
    });
  }
}

export async function getProduct() {
  const url = `${import.meta.env.VITE_API_URL}/api/productos`;
  const { data } = await axios.get(url);

  const result = safeParse(ProductsSchema, data.data);
  if (result.success) {
    return result.output;
  }
}

export async function getProductsByID(id: Product["id"]) {
  try {
    const url = `${import.meta.env.VITE_API_URL}/api/productos/${id}`;
    const { data } = await axios.get(url);
    const result = safeParse(ProductSchema, data.data); // Explicar porque uso ese schema

    if (result.success) {
      return result.output;
    } else {
      throw new Error("Hubo un error");
    }
  } catch (error) {
    console.log(error);
  }
}

export async function updateProduct(data: ProductData, id: Product["id"]) {
  try {
    const NumberSchema = pipe(string(), transform(Number), number());
    const result = safeParse(ProductSchema, {
      id,
      name: data.name,
      price: parse(NumberSchema, data.price),
      availability: toBoolean(data.availability.toString()),
    });

    if (result.success) {
      const url = `${import.meta.env.VITE_API_URL}/api/productos/${id}`;
      await axios.put(url, result.output);
    }
  } catch (error) {
    console.log(error);
  }
}


export async function deleteProduct(id:Product["id"]){
  const url = `${import.meta.env.VITE_API_URL}/api/productos/${id}`;
  await axios.delete(url)


}