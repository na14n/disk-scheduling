import { writable } from "svelte/store";

export const variables = writable({
    starting: null,
    ending: null,
    ps: null,
    sp: null,
    armMovement: null,
    steps: 10
})