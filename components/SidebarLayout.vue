<template>
	<!--
  This example requires updating your template:

  ```
  <html class="h-full bg-gray-100">
  <body class="h-full">
  ```
-->
	<div>


		<!-- Static sidebar for desktop -->
		<div class="hidden md:fixed md:inset-y-0 md:flex md:w-64 md:flex-col">
			<!-- Sidebar component, swap this element with another sidebar if you like -->
			<div class="flex min-h-0 flex-1 flex-col bg-gray-800">
				<div class="flex flex-1 flex-col overflow-y-auto pt-5 pb-4">
					<div class="flex flex-shrink-0 items-center px-4">
						<img class="h-8 w-auto" src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=500"
							alt="Your Company">
					</div>
					<nav class="mt-5 flex-1 space-y-1 px-2">
						<!-- Current: "bg-gray-900 text-white", Default: "text-gray-300 hover:bg-gray-700 hover:text-white" -->
						<NuxtLink href="/"
							class="bg-slate-800 text-white group flex items-center px-2 py-2 text-base font-medium rounded-md">
							<MdiIcon icon="mdiDiscPlayer" class="mr-4" />
							Audio Player
						</NuxtLink>

						<NuxtLink href="/dashboard"
							class="text-white hover:bg-slate-600 hover:bg-opacity-75 group flex items-center px-2 py-2 text-base font-medium rounded-md">
							<!-- Heroicon name: outline/users -->
							<MdiIcon icon="mdiHome" class="mr-4" />
							Dashboard
						</NuxtLink>
					</nav>
				</div>
				<div class="flex flex-shrink-0 bg-gray-700 p-4">
					<a href="#" class="group block w-full flex-shrink-0">
						<div class="flex items-center">
							<div>
								<img class="inline-block h-9 w-9 rounded-full"
									src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
									alt="">
							</div>
							<div class="ml-3">
								<p class="text-sm font-medium text-white">Tom Cook</p>
								<p class="text-xs font-medium text-gray-300 group-hover:text-gray-200">View profile</p>
							</div>
						</div>
					</a>
				</div>
			</div>
		</div>

		<div class="block md:hidden">
			<nav class="flex justify-center items-center mt-5 flex-1 space-y-1 px-2">
				<!-- Current: "bg-gray-900 text-white", Default: "text-gray-300 hover:bg-gray-700 hover:text-white" -->
				<NuxtLink href="/"
					class="text-slate-700 hover:bg-slate-300 group flex items-center px-2 py-2 text-base font-medium rounded-md">
					<MdiIcon icon="mdiDiscPlayer" class="mr-4" />
					Audio Player
				</NuxtLink>

				<NuxtLink href="/dashboard"
					class="text-slate-700 hover:bg-slate-300 hover:bg-opacity-75 group flex items-center px-2 py-2 text-base font-medium rounded-md">
					<!-- Heroicon name: outline/users -->
					<MdiIcon icon="mdiHome" class="mr-4" />
					Dashboard
				</NuxtLink>
			</nav>
		</div>
	</div>
</template>

<script>
export default {
	name: "SidebarLayout",
};
</script>

<style scoped>
.router-link-active {
	font-weight: bold;
	background-color: rgb(101, 111, 122);
}

.router-link-active:hover {
	font-weight: bold;
}
</style>
