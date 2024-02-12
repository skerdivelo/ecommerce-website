import { writable } from "svelte/store";
import type { Product } from "../../types/Product";

// Create a writable store with an empty array as the initial state
export const shoppingBag = writable<Product[]>([]);
