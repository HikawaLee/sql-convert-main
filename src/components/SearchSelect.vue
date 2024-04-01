<template>
  <div class="relative max-w-sm  mx-auto ">
    <div class="bg-white rounded-md flex gap-1 flex-wrap" @click="focusInput" @click.outside="closeSelector">
      <template v-for="(name, id) in selected">
        <div class="bg-blue-200 rounded-md flex items-center">
          <div class="">{{ name }}</div>
          <div @click="remove(id)" class="p-2 select-none rounded-r-md cursor-pointer hover:bg-magma-orange-clear">
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M12.5745 1L1 12.5745" stroke="#FEAD69" stroke-width="2" stroke-linecap="round"/>
              <path d="M1.00024 1L12.5747 12.5745" stroke="#FEAD69" stroke-width="2" stroke-linecap="round"/>
            </svg>
          </div>
        </div>
      </template>
      <div class="flex-1">
        <input type="text" v-model="search" ref="searchInput" @input.debounce="searchOptions" placeholder=" Search"
               class="input input-bordered w-full border-0 focus:border-0 focus:outline-none focus:ring-0 py-1 px-0">
        <div v-show="showSelector" class="absolute left-0 bg-white z-30 w-full rounded-b-md font-medium">
          <div class="p-2 space-y-1">
            <template v-for="(name, id) in options">
              <div v-if="!selected[id]">
                <div @click="select(id, name)"
                     class="bg-blue-200 border-2 border-blue-200 cursor-pointer rounded-md p-2 hover:border-light-blue-1">
                  {{ name }}
                </div>
              </div>
            </template>
            <div v-if="options.length === 0" class="text-gray-500">No result</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {ref, reactive, onMounted} from 'vue';

export default {
  setup() {
    const search = ref('');
    const showSelector = ref(false);
    const selected = reactive({1: 'Chris'});
    const options = reactive({});

    const focusInput = () => {
      // Logic to focus input
    };

    const closeSelector = () => {
      search.value = '';
      showSelector.value = false;
      options = {};
    };

    const remove = (id) => {
      delete selected[id];
      // Dispatch 'selected' event logic
    };

    const searchOptions = () => {
      if (search.value) {
        Object.assign(options, {5: 'Carl', 6: 'Alex', 7: 'Bryan'});
        showSelector.value = true;
      } else {
        showSelector.value = false;
      }
    };

    const select = (id, name) => {
      selected[id] = name;
      closeSelector();
      // Dispatch 'selected' event logic
    };

    onMounted(() => {
      // Mounted hook logic
    });

    return {
      search,
      showSelector,
      selected,
      options,
      focusInput,
      closeSelector,
      remove,
      searchOptions,
      select
    };
  }
};
</script>

