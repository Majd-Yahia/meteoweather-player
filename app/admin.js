export default [
	{
		path: "/admin",
		name: "dashboard",
		component: () => import(/* webpackChunkName: "admin" */ "~/pages/admin/Dashboard.vue").then((m) => m.default || m),
	}
];
