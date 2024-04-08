<script setup>
import {ref} from 'vue'
import UniqueID  from "@/utils/UniqueID.js";
import dbConf from "@/types/dbConf.js";

const componentID = UniqueID();

const emits = defineEmits(['updateTargetList']);
//存储用户输入的多个值为数组
const multipleAns = ref([dbConf.mysql, dbConf.oracle]) //多选框默认选中的值《 默认选中mysql和oracle

//目标数据库的候选列表
const targetDBs = ref([
  dbConf.mysql,
  dbConf.oracle,
])

//v-model绑定的数据输入组件的change事件
const updateDB = () => {
  let data = multipleAns.value;
  //将收集到的数据更新到父组件的状态中, 以便父组件可以使用
  const targetDBConf = {
    id: componentID,
    label: dbConf.dbType,
    selected: data
  }
  emits('updateTargetList', targetDBConf)
}

updateDB()



</script>

<template>
  <div class="form-control w-full max-w-md dropdown dropdown-bottom dropdown-hover">

    <label class="form-control w-full max-w-md">
      <div class="label " TABINDEX="0">
        <!--        <span class="label-text">目标数据库 </span>-->
        <span v-if="true" class="text-red-500 text-sm -mb-1">*</span>
      </div>
      <input class="input input-md input-bordered relative flex" v-model="multipleAns" readonly :placeholder="dbConf.dbType"
             @change="updateDB">
      <div class="label">
        <span class="label-text-alt">{{dbConf.dbType}}</span>
      </div>
    </label>

    <ul tabindex="0" class="dropdown-content  z-[1] menu  shadow rounded-box w-full bg-slate-50">

      <template v-for="(val, index) in targetDBs" :key="index">
        <label class="label cursor-pointer ">
          <div class="label">{{ val }}</div>
          <input type="checkbox" :value="val" v-model="multipleAns" @change="updateDB"

                 class="checkbox checkbox-primary"/>
        </label>
      </template>
    </ul>
  </div>
</template>

<style scoped>

</style>