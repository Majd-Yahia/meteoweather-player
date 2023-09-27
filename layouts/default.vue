<template>
    <div>
        <sidebar-layout></sidebar-layout>
        <div class="flex flex-1 flex-col md:pl-64">
			<main class="flex-1">
				<div class="py-6">
					<div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
						<h1 class="text-2xl font-semibold text-gray-900">Dashboard</h1>
					</div>
					<div class="mx-auto max-w-7xl px-4 sm:px-6 md:px-8">
                        <div class="py-4 mx-auto w-full flex justify-center items-center">
                            <NuxtPage />
						</div>
					</div>
				</div>
			</main>
		</div>
    </div>
</template>
  
<style lang="scss">
.full-width {
    width: 100%;
    height: 100vh;
    margin: 0;
    padding: 0;
}
</style>