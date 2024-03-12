<template>

  <div class="navbar bg-slate-100 mt-2.5 relative">
    <!-- 功能選擇框 值域：新增字段、修改字段等  -->
    <div class="navbar-start">
      <div class="dropdown">
        <select class="select select-bordered w-full max-w-xs" v-model="selected" @change="resetInput">
          <template v-for="(action, index) in NamedActionMap" :key="index">
            <option>{{ action.name }}</option>
          </template>
        </select>
      </div>
    </div>

<!--  title  -->
    <div class="navbar-center">
      <a class="btn btn-ghost text-xl">SQL生成器</a>
    </div>
<!-- 功能按鈕區 -->
    <div class="navbar-end">
      <button class="btn btn-ghost btn-circle" @click="resetInput">
        重置
      </button>
      <button class="btn btn-ghost btn-circle" @click="generate(componentStates, inputData)">
        生成
      </button>
    </div>
<!--  校驗提醒信息  -->
    <div v-if="alterShow" role="alert" class="flex justify-center alert alert-error absolute -top-1/4 left-1/2 -translate-x-1/2 max-h-4 max-w-xs">
      <span>{{alertContent}}</span>
    </div>
  </div>
  <!--  主界面佈局  -->
  <div class="flex flex-col justify-center items-center">
    <div class="grid grid-cols-1 my-0 md:grid-cols-2 xl:grid-cols-3 md:gap-x-16 ">
      <div v-for="(componentState, index) in componentStates" :key="componentKey[index]">
        <LayoutStore :state="componentState" @update-state="updateState" />
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
  </div>
  <div>


    <div class="divider"></div>
    <pre>
      selected is: {{ selected }}
    </pre>
  </div>


  <div class="m-2.5 bg-base-200 border-2 rounded-md shadow-sm">
    <Output :sql-list="sqlList"/>
  </div>
</template>

<script setup>
import LayoutStore from '../components/LayoutStore.vue';
import Output from '../components/Output.vue';
import NamedActionMap from "../components/ActionConfig.js";
import standardize from "../utils/Standardize.js";
import {computed, ref,  reactive} from "vue";
import UniqueID from "../utils/UniqueID.js";
import actionType from "../types/actionType.js";
import dbMap from "../scripts/dbMap.js";

const defaultAction = NamedActionMap.find((item) => item.name === actionType.ADD) || NamedActionMap[0];
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


const alertContent = ref('')
const alterShow = ref(false);

const sqlList = ref([])
const generate = (action, data) => {




  const actionName = activeAction.value.name;

  let shouldReturn = false;

  const layout = componentStates.value.reduce((acc, cur) => {
    acc[cur.id] = cur;
    if(!data.hasOwnProperty(cur.id)) {
      alertContent.value = `请填写表单"${cur.label}"`;
      alterShow.value = true;
      setTimeout(() => {
      alterShow.value = false;
      }, 500)
      shouldReturn = true;
    }
    return acc;
  }, {})

  if (shouldReturn) {
    return;
  }

  console.log(`actionName: ${actionName}\n, layout: ${JSON.stringify(layout, null, 2)}\n, data: ${JSON.stringify(data, null, 2)}`)

  loading.value = true;
  setTimeout(() => {
    loading.value = false;
  }, 500)

  // sqlList.value = buildAddColumnSql(data)



  switch (actionName) {
    case actionType.ADD:
      console.log(`add action: ${dbMap.add(data)}`);
      // sqlList.value = dbMap.add(data);
      break;
    //   addColumn(action, data);
    //   break;
    // case actionType.MODIFY:
    //   modifyColumn(action, data);
    //   break;
    // case actionType.DELETE:
    //   deleteColumn(action, data);
    //   break;
    // case actionType.SELECT:
    //   selectColumn(action, data);
    //   break;
    // default:
    //   break;
  }


  console.log(`生成的sql是: ${JSON.stringify(sqlList.value)}`);
}


const resetInput = () => {
  for (const key in inputData) {
    delete inputData[key]
  }
  freshComponentKey();
}






</script>

<style scoped></style>