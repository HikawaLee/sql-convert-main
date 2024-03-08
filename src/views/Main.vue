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
      <div v-for="(layoutState, index) in componentStates" :key="componentKey[index]">
        <LayoutStore :state="layoutState" @update-state="updateState"/>
        <span>当前组件key: {{componentKey[index]}}</span>
        <div class="divider"></div>
      </div>
    </div>


  </div>
  <span v-if="loading" class="loading loading-infinity loading-lg"></span>

  <div class="divider"></div>
  <div>
    <pre>
      inputData is:
      {{ JSON.stringify(inputData, null, 2) }}
    </pre>
<!-- -&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;-->
<!--    <pre>-->
<!--    {{JSON.stringify(collectArgs)}}-->
<!--    </pre>-->
  </div>
  <div class="divider"></div>
  <pre>
    componentState is: {{ JSON.stringify(componentStates, null, 2) }}
  </pre>
  <div>

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
import {computed, ref,  reactive} from "vue";
import UniqueID from "../utils/UniqueID.js";
const defaultAction = NamedActionMap.find((item) => item.name === '修改主键') || NamedActionMap[0];
const selected = ref(defaultAction.name)
const activeAction = computed(() => {
  return NamedActionMap.find((item) => item.name === selected.value) || defaultAction;
})


const componentCnt = computed(() => {
  return activeAction.value.action.layout.length;
})

const componentKey = ref([]);

const freshComponentKey = () => {
  for (let i = 0; i < componentCnt.value; i++) {
    componentKey.value[i] = UniqueID();
  }
}
freshComponentKey();

const layoutStates = computed(() => {
  return activeAction.value.action.layout
})

const componentStates = computed(() => {
  return layoutStates.value.map((state, index) => {
    return {
      ...standardize(state, componentKey.value[index]),
    }
  })
})




const inputData = reactive({})
activeAction.value.action.layout.forEach((state) => {
  inputData[state.label] = state.data;
})


const updateState = (data) => {
  // inputData[data.label] = data;
  inputData[data.id] = {
    label: data.label,
    selected: data.selected

  }
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
  for (const key in inputData) {
    delete inputData[key]
  }
  freshComponentKey();
}






</script>

<style scoped></style>