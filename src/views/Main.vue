<template>

  <div class="navbar bg-slate-100 mt-2.5 mb-2.5 relative">
    <!-- 功能选择框 值域：新增字段、修改字段等  -->
    <div class="navbar-start">
      <div class="dropdown">
<!--        输入重置按钮-->
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
    <!-- 功能按钮区 -->
    <div class="navbar-end">
      <button class="btn btn-ghost btn-circle" @click="resetInput">
        重置
      </button>
      <button class="btn btn-ghost btn-circle" @click="generate(inputData)">
        生成
      </button>
    </div>
    <!--  校验提醒信息  -->
    <div v-if="alterShow" role="alert"
         class="flex justify-center alert alert-error absolute -top-1/4 left-1/2 -translate-x-1/2 max-h-4 max-w-xs">
      <span>{{ alertContent }}</span>
    </div>
  </div>
  <!--  主界面布局  -->
  <div class="flex flex-col justify-center items-center">
    <div class="grid grid-cols-1 my-0 md:grid-cols-2 xl:grid-cols-3 md:gap-x-16 ">
      <div v-for="(componentState, index) in componentStates" :key="componentKey[index]">
        <LayoutStore :state="componentState" @update-state="updateState"/>
      </div>
    </div>
  </div>

  <div v-if="loading" class="flex justify-center">
    <span class="loading loading-infinity loading-lg"></span>
  </div>
  <div v-else class="m-2.5 bg-base-200 border-2 rounded-md shadow-sm">
    <Output :sql-list="sqlList"/>
  </div>


</template>

<script setup>
import LayoutStore from '@/components/LayoutStore.vue';
import Output from '@/components/Output.vue';
import NamedActionMap from "@/conf/ActionConfig.js";
import standardize from "@/utils/Standardize.js";
import {computed, ref, reactive} from "vue";
import UniqueID from "@/utils/UniqueID.js";
import actionType from "@/types/actionType.js";
import sqlBuilder from "@/scripts/sqlBuilder.js";

const defaultAction = NamedActionMap.find((item) => item.name === actionType.ADD) || NamedActionMap[0];

const selected = ref(defaultAction.name) //当前选中的功能，用于切换功能
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
const generate = (data) => {


  const actionName = activeAction.value.name;

  let shouldReturn = false;

  const layout = componentStates.value.reduce((acc, cur) => {
    acc[cur.id] = cur;
    if (!data.hasOwnProperty(cur.id)) {
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


  loading.value = true;
  setTimeout(() => {
    loading.value = false;
  }, 1000)

  // sqlList.value = buildAddColumnSql(data)


  sqlList.value = sqlBuilder.generateSQL(data, actionName);


}


const resetInput = () => {
  for (const key in inputData) {
    delete inputData[key]
  }
  sqlList.value = [];
  freshComponentKey();
}



</script>

<style scoped></style>