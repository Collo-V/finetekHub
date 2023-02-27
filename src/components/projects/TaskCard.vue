<template>
  <div class="shadow-md bg-white py-4 relative rounded-md">
    <div class="float-right relative dropdown-cont w-fit px-4">
      <button class="h-6 w-6">
        <i class="fas fa-ellipsis-vertical"></i>
      </button>
      <div class="dropdown absolute w-150px top-0 left-full bg-white shadow-md">
        <button class="inline-block h-8 text-left w-full px-4 hover:bg-slate-100"></button>
        <button class="inline-block h-8 text-left w-full px-4 hover:bg-slate-100"></button>
        <button class="inline-block h-8 text-left w-full px-4 hover:bg-slate-100"></button>
      </div>
    </div>
    <div class="flex gap-4 px-4">
      <span v-for="index in 2" class="text-3">
        <span class="inline-block w-fit px-2 rounded-pill bg-green-500 text-white" v-if="index === 1">
          Category
        </span>
        <span class="inline-block w-fit px-2 rounded-pill bg-orange-500 text-white" v-else>
          Category
        </span>
      </span>
    </div>
    <div class="mt-2 px-4">
      <h3 class="font-bold">
        {{task.title}}
      </h3>
      <span class="inline-block mt-1 whitespace-nowrap max-w-200px text-ellipsis">
        All the details you need to know about this task. not very long though
      </span>
    </div>
    <div class="activities px-4">
      <h3 class="font-semibold">
        Subtasks
      </h3>
      <ul class="list-none">
        <li v-for="n in 3" :key="n" class="flex gap-2">
          <button class="h-5 w-5 rounded-full border-1px border-slate-400 bg-slate-400" v-if="n === 1" @click="">
            <i class="fas fa-check"></i>
          </button>
          <button class="h-5 w-5 rounded-full border-1px border-slate-400" v-else @click="">
          </button>
          <span>Activity {{n}}</span>
        </li>
      </ul>
    </div>
    <div class="border-t-1px px-2 py-2 pb-0">
      <div class="justify-between">
        <div class="flex members mx-4">
          <span v-for="n in 3">
            <Avatar name="Bro" rounded="true" size="small" class="-ml-3 bg-white" />
          </span>
        </div>
      </div>
    </div>
  </div>

</template>

<script>
import Avatar from "@/components/Avatar";
export default {
  name: "TaskCard",
  components: {Avatar},
  props:['task'],
}
</script>

<style scoped>

</style>
