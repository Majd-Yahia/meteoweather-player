<template>
  <div class="w-full">
    <div class="px-4 sm:px-6 lg:px-8">
      <div class="sm:flex sm:items-center">
        <div class="sm:flex-auto">
          <h1 class="text-xl font-semibold text-gray-900">Users Activity</h1>
          <p class="mt-2 text-sm text-gray-700">A list of all the users information and Activity</p>
        </div>
        <div class="mt-4 sm:mt-0 sm:ml-16 sm:flex-none">
          <button type="button" @click="clearLogs"
            class="inline-flex items-center justify-center rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 sm:w-auto">
            Clear Logs
          </button>
        </div>
      </div>
      <div class="mt-8 flex flex-col">
        <div class="-my-2 -mx-4 overflow-x-auto sm:-mx-6 lg:-mx-8">
          <div class="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8">
            <div class="overflow-hidden shadow ring-1 ring-black ring-opacity-5 md:rounded-lg">
              <table style="min-height: 600px;" class="min-w-full divide-y divide-gray-300">
                <thead class="bg-gray-50">
                  <tr>
                    <th scope="col" class="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6">
                      Temporary Name
                    </th>
                    <th scope="col" class="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6">
                      Action
                    </th>
                    <th scope="col" class="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">Browser</th>
                    <th scope="col" class="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">Engine</th>
                    <th scope="col" class="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">Default Language
                    </th>
                    <th scope="col" class="relative py-3.5 pl-3 pr-4 sm:pr-6">
                      <span class="sr-only">Action</span>
                    </th>
                  </tr>
                </thead>
                <tbody class="divide-y divide-gray-200 bg-white">
                  <tr v-for="(log, index) in 10" :key="index">
                    <td class="px-3 py-4 text-sm text-gray-900">{{ logs[index]?.name }}</td>
                    <td class="px-3 py-4 text-sm text-gray-900">{{ logs[index]?.action }}</td>
                    <!-- <td class="px-3 py-4 text-sm text-gray-900">{{ logs[index]?.browser }}</td> -->
                    <td class="px-3 py-4 text-sm text-gray-900">{{ logs[index]?.brands[0]?.brand }}</td>
                    <td class="px-3 py-4 text-sm text-gray-900">{{ logs[index]?.brands[2]?.brand }}</td>
                    <td class="px-3 py-4 text-sm text-gray-900">{{ logs[index]?.language }}</td>
                    <td class="relative px-3 py-4 text-right text-sm font-medium">
                      <a v-if="logs[index]?.action" href="#" class="text-indigo-600 hover:text-indigo-900"
                        @click="removeLog(logs[index]?._id)">
                        Remove
                      </a>
                    </td>
                  </tr>
                </tbody>
              </table>
              <div class="flex items-center justify-between border-t border-gray-200 bg-white px-4 py-3 sm:px-6">
                <div class="flex flex-1 justify-between sm:hidden">
                  <a href="#"
                    class="relative inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50">Previous</a>
                  <a href="#"
                    class="relative ml-3 inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50">Next</a>
                </div>
                <div class="hidden sm:flex sm:flex-1 sm:items-center sm:justify-between">
                  <div>
                    <p class="text-sm text-gray-700">
                      Showing
                      <span class="font-medium">
                        {{ paginator.currentPage }}
                      </span>
                      to
                      <span class="font-medium">
                        {{ paginator.lastPage }}
                      </span>
                      of
                      <span class="font-medium">
                        {{ paginator.total }}
                      </span>
                      results
                    </p>
                  </div>
                  <div>
                    <nav class="isolate inline-flex -space-x-px rounded-md shadow-sm" aria-label="Pagination">
                      <a @click="previous"
                        class="relative inline-flex items-center rounded-l-md border border-gray-300 bg-white px-2 py-2 text-sm font-medium text-gray-500 hover:bg-gray-50 focus:z-20">
                        <span class="sr-only">Previous</span>
                        <!-- Heroicon name: mini/chevron-left -->
                        <svg class="h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor"
                          aria-hidden="true">
                          <path fill-rule="evenodd"
                            d="M12.79 5.23a.75.75 0 01-.02 1.06L8.832 10l3.938 3.71a.75.75 0 11-1.04 1.08l-4.5-4.25a.75.75 0 010-1.08l4.5-4.25a.75.75 0 011.06.02z"
                            clip-rule="evenodd" />
                        </svg>
                      </a>
                      <!-- Current: "z-10 bg-indigo-50 border-indigo-500 text-indigo-600", Default: "bg-white border-gray-300 text-gray-500 hover:bg-gray-50" -->
                      <a @click="next"
                        class="relative inline-flex items-center rounded-r-md border border-gray-300 bg-white px-2 py-2 text-sm font-medium text-gray-500 hover:bg-gray-50 focus:z-20">
                        <span class="sr-only">Next</span>
                        <!-- Heroicon name: mini/chevron-right -->
                        <svg class="h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor"
                          aria-hidden="true">
                          <path fill-rule="evenodd"
                            d="M7.21 14.77a.75.75 0 01.02-1.06L11.168 10 7.23 6.29a.75.75 0 111.04-1.08l4.5 4.25a.75.75 0 010 1.08l-4.5 4.25a.75.75 0 01-1.06-.02z"
                            clip-rule="evenodd" />
                        </svg>
                      </a>
                    </nav>
                  </div>
                </div>
              </div>

            </div>
          </div>
        </div>
      </div>
    </div>

  </div>
</template>

<script lang="ts" setup>
import { ref, onMounted, onBeforeUnmount, watch } from 'vue'
import { connectToSocket, socket, disconnectFromChannel } from '~/composables/useSocket'

type SocketResponse = {
  action: string,
  success: boolean,
}

const route = useRoute()
const router = useRouter()
const channelName = ref("event")
const logs = ref<any[]>([]);
const url = ref("http://localhost:3000/logs");

const paginator = ref({
  currentPage: (route.query.page ? Number(route.query.page) : 1) as number | null,
  hasNextPage: true as Boolean,
  hasPrevPage: true as Boolean,
  lastPage: 1 as number,
  perPage: 10 as number,
  next: 1 as number | null,
  prev: 1 as number | null,
  slNo: 1 as number,
  total: 1 as number,
})



async function fetchLogs() {
  try {
    const response = await fetch(`${url.value}?page=${paginator.value.currentPage}&perPage=${paginator.value.perPage}`)
    const jsonResponse = await response.json()

    logs.value = jsonResponse.data
    paginator.value = jsonResponse.paginator

  } catch (error) {
    console.error('An error occurred:', error)
  }
}

// Initial fetching
onMounted(async () => {
  await fetchLogs()

  connectToSocket().then((resp) => {

    if (socket.value) {
      socket.value.on(channelName.value, (response: SocketResponse) => {
        if (response.success) {
          useNuxtApp().$toast.info(`New Action: ${response.action}`, { autoClose: 500 });

          if (logs.value.length >= paginator.value.perPage) {
            logs.value.splice(-1); // Remove the oldest element from the beginning of the array
          }

          logs.value = [response, ...logs.value]
        }
      });
    }
  })
    .catch((error) => {
      console.error(error)
    })
})

// Watch for query parameter changes and reflect those in your component state

watch(
  () => route.query,
  async (newVal, oldVal) => {
    if (newVal.page || newVal.perPage) {
      paginator.value.currentPage = newVal.page ? Number(newVal.page) : 1;
      paginator.value.perPage = newVal.perPage ? Number(newVal.perPage) : 10;
      await fetchLogs();
    }
  },
  { deep: true }
);

onBeforeUnmount(() => {
  disconnectFromChannel(channelName.value)
})


const next = () => {
  if (!paginator.value.currentPage) { return; }
  // Increment the current page number
  const nextPage = paginator.value.currentPage + 1
  if (nextPage <= paginator.value.lastPage) {
    paginator.value.currentPage = nextPage

    // Update the URL to reflect the new state
    router.push({
      query: {
        ...route.query,
        page: nextPage
      }
    })
  }
};

const previous = () => {
  if (!paginator.value.currentPage) { return; }

  // Decrement the current page number
  const prevPage = paginator.value.currentPage - 1
  if (prevPage >= 1) {
    paginator.value.currentPage = prevPage

    // Update the URL to reflect the new state
    router.push({
      query: {
        ...route.query,
        page: prevPage
      }
    })
  }
};

const removeLog = async (logId: string) => {
  try {
    const response = await fetch(`${url.value}/${logId}/remove`, { method: 'DELETE' })
    if (response.status == 204) {
      await fetchLogs()
      useNuxtApp().$toast.success('Log was removed');
    }
    if (response.status == 500) {
      useNuxtApp().$toast.error('Something went wrong');
    }

  } catch (error) {
    useNuxtApp().$toast.info('Something went wrong');
  }
}

const clearLogs = async () => {
  try {
    const response = await fetch(`${url.value}/clear`)
    if (response.status == 204) {
      await fetchLogs()
      useNuxtApp().$toast.success('Logs were cleared');
    }
    if (response.status == 500) {
      useNuxtApp().$toast.error('Something went wrong');
    }

  } catch (error) {
    useNuxtApp().$toast.info('Something went wrong');
  }
}
</script>

<style scoped>
.test {}
</style>
