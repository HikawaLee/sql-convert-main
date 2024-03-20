<template>

  <div class="navbar bg-slate-100 mt-2.5 mb-2.5 relative">
    <!-- 功能选择框 值域：新增字段、修改字段等  -->
    <div class="navbar-start">
      <div class="dropdown">
<!--        功能选择按钮-->
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

<!--  <div>-->
<!--    <pre>-->
<!--      {{JSON.stringify(inputData, null, 2)}}-->
<!--    </pre>-->
<!--  </div>-->

  <!--  loading组件  -->
  <div v-if="loading" class="flex justify-center">
    <span class="loading loading-infinity loading-lg"></span>
  </div>


  <!--  sql输出组件  -->
  <div v-else class="m-2.5 bg-base-200 border-2 rounded-md shadow-sm">
    <Output :sql-list="sqlList"/>
  </div>


</template>

<script setup>
import LayoutStore from '@/components/LayoutStore.vue';
import Output from '@/components/Output.vue';
import standardize from "@/utils/Standardize.js";
import {computed, ref, reactive} from "vue";
import UniqueID from "@/utils/UniqueID.js";
import sqlBuilder from "@/scripts/sqlBuilder.js";
// region 名称-功能映射表, 存储了功能的名称和对应的功能
// 例如 新增字段-->{name: '新增字段', action: {layout: [{label: '字段名', type: 'text', data: ''}, {label: '字段类型', type: 'text', data: ''}]}}
import NamedActionMap from "@/conf/ActionConfig.js";
// endregion

// 当前选中的功能的名称，用于切换功能
// region 根据当前选中的功能的名称，获取对应的功能配置
const selected = ref(NamedActionMap[0].name)
const activeAction = computed(() => {
  return NamedActionMap.find((item) => item.name === selected.value)
})

// region 组件刷新相关
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
//endregion

//根据获取当前选中的功能获取该功能的组件集合的布局配置
const layoutStates = computed(() => {
  return activeAction.value.action.layout
})

//根据布局配置和组件的key，获取组件的状态
const componentStates = computed(() => {
  return layoutStates.value.map((componentState, index) => {
    return {
      ...standardize(componentState, componentKey.value[index]),
    }
  })
})



//收集子组件的数据---即用户输入的信息, 用于生成sql语句
const inputData = reactive({})


// activeAction.value.action.layout.forEach((state) => {
//   inputData[state.label] = state.data;
// })

/**
 * 组件状态更新函数, 用于收集子组件的数据, 并将其保存到inputData对象中, 由父组件传递给子组件触发使用
 * 收集后的inputData对象格式类似于
 * {
 *   "7_h2tYV1TH": {
 *     "label": "字段类型",
 *     "selected": "STDdate"
 *   },
 *   "5hVziBs67e": {
 *     "label": "是否大表",
 *     "selected": "否"
 *   },
 * }
 * 其中的随机id用于标识不同的组件并保证其唯一性, 方便后续扩展
 * 防止出现配置的布局组件过多并且各个组件的label相同的情况
 * @param data 子组件收集的数据对象, 包含了组件的id, label, selected
 *
 */
const updateState = (data) => {
  inputData[data.id] = {
    label: data.label,
    selected: data.selected
  }
}

//控制loading组件的显示
const loading = ref(false);
//控制alert信息的显示
const alterShow = ref(false);
//alert组件的显示
const alertContent = ref('')

//保存生成的sql语句
const sqlList = ref([])

/**
 * sql生成函数
 * @param data inputData对象, 即子组件收集到数据库传递给父组件后, 父组件再将数据复制到inputData对象中
 */
const generate = (data) => {

  //获取当前选中的功能的名称
  const actionName = activeAction.value.name;

  //region 校验用户输入的数据是否为空
  let shouldReturn = false;
  const layout = componentStates.value.reduce((acc, cur) => {
    acc[cur.id] = cur;
    if (!data.hasOwnProperty(cur.id)) {
      alertContent.value = `请填写表单"${cur.label}"`;
      console.log("请填写表单", cur.label);
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
  //endregion

  loading.value = true;
  setTimeout(() => {
    loading.value = false;
  }, 1000)

  //生成sql语句
  sqlList.value = sqlBuilder.generateSQL(data, actionName);


}

/**
 * 重置输入框, 通过刷新组件的key来实现子组件重新渲染
 * 清空inputData对象, 并清空sqlList数组
 */
const resetInput = () => {
  for (const key in inputData) {
    delete inputData[key]
  }
  sqlList.value = [];
  freshComponentKey();
}



</script>

<style scoped></style>