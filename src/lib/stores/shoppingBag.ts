import { writable } from "svelte/store";
import type { Product } from "../../types/Product";

export const shoppingBag = writable<Product[]>([]);
