import { redirect } from "@sveltejs/kit";

export function load() {
    throw redirect(307, "/home");
}

//questa serve per fare il redirect a home