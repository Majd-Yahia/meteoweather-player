export default [
	{
		path: "/",
		name: "index",
		component: () => import(/* webpackChunkName: "main" */ "~/pages/website/Index.vue").then((m) => m.default || m),
	}
];
