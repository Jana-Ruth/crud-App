import type { Product } from "../types/Product";


const BASE_URL = "https://fakestoreapi.com/products";

export async function fetchProducts(): Promise<Product[]> {
    const response = await fetch(BASE_URL);
    return response.json()
}

export async function postProduct(product: Omit<Product, "id">) {
    const response = await fetch(BASE_URL, {
        method: "post",
        headers: {"Content-Type": "application/json" },
        body: JSON.stringify(product)
    })
    return response.json();
}

export async function updateProduct(id: number, product: Partial<Product>) {
    const response = await fetch(`${BASE_URL}/${id}`, {
        method: "put",
        headers: {"Content-Type": "application/json" },
        body: JSON.stringify(product),
    } );
    return response.json()
}

export async function deleteProduct(id: number) {
    const response = await fetch(`${BASE_URL}/${id}`, {
        method: "delete",
    })
    return response.json()
}