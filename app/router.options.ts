
import website from "./website.js";
import admin from "./admin.js";

import type { RouterConfig } from '@nuxt/schema'

// https://router.vuejs.org/api/interfaces/routeroptions.html
export default <RouterConfig> {
  routes: (_routes) => [
    ...website,
	...admin
  ],
}