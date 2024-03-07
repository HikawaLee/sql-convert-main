<template>


  <div class="navbar bg-base-100">
    <div class="navbar-start">
      <div class="dropdown">
        <select class="select select-bordered w-full max-w-xs" v-model="selected" @change="">
          <template v-for="(action, index) in NamedActionMap" :key="index">
            <option>{{ action.name }}</option>
          </template>
        </select>
      </div>
    </div>
    <div class="navbar-center">
      <a class="btn btn-ghost text-xl">SQL生成器</a>
    </div>
    <div class="navbar-end">
      <button class="btn btn-ghost btn-circle" @click="reset">
        重置
      </button>
      <button class="btn btn-ghost btn-circle" @click="generate">
        生成
      </button>
    </div>
  </div>


  <div class="flex flex-col justify-center items-center">




    <div class="grid grid-cols-3 gap-x-24">
      <div v-for="(layoutState, index) in layoutStates" :key="index">

        <LayoutStore :state="standardize(layoutState)" />

      </div>

    </div>

  </div>






  <!-- <span v-if="loading" class="loading loading-infinity loading-lg"></span> -->

  <div class="m-2.5 bg-base-200 border-2 rounded-md shadow-sm">
    <Output />
  </div>
</template>

<script setup>
import LayoutStore from '../components/LayoutStore.vue';
import Output from '../components/Output.vue';
import actions from "../components/ActionConfig.js";
import standardize from "../utils/Standardize.js";
import { computed, ref } from "vue";

const NamedActionMap = actions.map((action) => {
  return {
    name: action.desc,
    action: action
  }
})

const defaultAction = NamedActionMap[0];
const selected = ref(defaultAction.name)
const activeAction = computed(() => {
  return NamedActionMap.find((item) => item.name === selected.value) || defaultAction;
})

const layoutStates = computed(() => {
  return activeAction.value.action.layout
})


const loading = ref(false);

const generate = (action) => {
  activeAction.value = action;
  loading.value = true;
  setTimeout(() => {
    loading.value = false;
  }, 500)
}

const reset = () => {
  activeAction.value = defaultAction;
}

</script>

<style scoped></style>