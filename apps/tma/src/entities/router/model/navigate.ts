import { createEffect } from "effector";
import { navigate as navigateRouter } from "wouter-preact/use-browser-location";

const navigateFx = createEffect<string, unknown>((to) => navigateRouter(to));

export { navigateFx };
