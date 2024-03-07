<template>
  <div class="navbar bg-slate-100 mt-2.5">
    <div class="navbar-start">
      <div class="dropdown">
        <select class="select select-bordered w-full max-w-xs" v-model="selected" @change="resetInput">
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
      <button class="btn btn-ghost btn-circle" @click="resetInput">
        重置
      </button>
      <button class="btn btn-ghost btn-circle" @click="generate">
        生成
      </button>
    </div>
  </div>
  <div class="flex flex-col justify-center items-center">
    <div class="grid grid-cols-1 my-0 md:grid-cols-2 xl:grid-cols-3 md:gap-x-16 ">
      <div v-for="(layoutState, index) in layoutStates" :key="componentKey[index]">
        <LayoutStore :state="standardize(layoutState)" @update-state="updateState"/>
      </div>
    </div>


  </div>
  <span v-if="loading" class="loading loading-infinity loading-lg"></span>
  <div class="divider"></div>
  <div>
    <pre>
      {{ JSON.stringify(inputData, null, 2) }}
    </pre>
<!-- -&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;-->
<!--    <pre>-->
<!--    {{JSON.stringify(collectArgs)}}-->
<!--    </pre>-->
  </div>
  <div>
    <div class="divider"></div>

    <pre>
      NamedActionMap is: {{ NamedActionMap }}
    </pre>

    <div class="divider"></div>

    <pre>
      activeAction is: {{ activeAction }}
    </pre>



    <div class="divider"></div>
    <pre>
      selected is: {{ selected }}
    </pre>
  </div>
  <div class="m-2.5 bg-base-200 border-2 rounded-md shadow-sm">
    <Output/>
  </div>
</template>

<script setup>
import LayoutStore from '../components/LayoutStore.vue';
import Output from '../components/Output.vue';
import NamedActionMap from "../components/ActionConfig.js";
import standardize from "../utils/Standardize.js";
import {computed, ref, watchEffect, reactive} from "vue";
import {nanoid} from "nanoid";
const defaultAction = NamedActionMap.find((item) => item.name === '修改主键') || NamedActionMap[0];
const selected = ref(defaultAction.name)
const activeAction = computed(() => {
  return NamedActionMap.find((item) => item.name === selected.value) || defaultAction;
})

const layoutStates = computed(() => {
  return activeAction.value.action.layout
})

const componentCnt = activeAction.value.action.layout.length;
const componentKey = ref([]);

// const inputData = ref({})
const inputData = reactive({})
activeAction.value.action.layout.forEach((state) => {
  inputData[state.label] = state.data;
})




const updateState = (data) => {
  console.log("父组件更新了。。。")
  inputData[data.label] = data;
  console.log("新内容为： ", inputData)

}

const loading = ref(false);

const generate = (action) => {
  activeAction.value = action;
  loading.value = true;
  setTimeout(() => {
    loading.value = false;
  }, 500)
}
const resetInput = () => {
  // inputData.value = [];
  for (const key in inputData) {
    delete inputData[key]
  }
  for (let i = 0; i < componentCnt; i++) {
    componentKey.value[i] = nanoid();
  }
}




</script>

<style scoped></style>