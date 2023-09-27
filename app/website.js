export default [
	{
		path: "/",
		name: "index",
		component: () => import(/* webpackChunkName: "main" */ "~/pages/website/Index.vue").then((m) => m.default || m),
	},
	{
		path: "/dashboard",
		name: "dashboard",
		component: () => import(/* webpackChunkName: "admin" */ "~/pages/website/Dashboard.vue").then((m) => m.default || m),
	}
];
