import { writable } from "svelte/store";
import type { Product } from "../../types/Product";

export const shoppingBag = writable<Product[]>([]);

//function that gets the shoppingBag
export const getShoppingBag = () => {
    return shoppingBag;
};
