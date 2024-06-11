<script setup>

import { ref } from 'vue'
import TypeOptions from '@/scripts/dataType_mapping.js'
import bizOptions from "@/scripts/dataType_mapping.js";
import {getType} from "@/scripts/mysql_func.js";
const options = ref([])
for (let key in TypeOptions) {
  options.value.push(key)
}
const singleAns = ref('')


const mysqlType = computed(() => {
  if(singleAns.value === '') {
    return ''
  }
  const {stdType, length, precision} = bizOptions[singleAns.value]
  return getType(stdType, length, precision)
})


const updateConfig = () => {

}


</script>

<template>
  <div  class="form-control w-full max-w-xl [&::-webkit-calendar-picker-indicator]:opacity-0">
    <label class="form-control w-full max-w-xl">
      <div class="label">
        <span class="label-text">业务类型转为数据库类型</span>
      </div>
      <input class="input input-bordered border-0"
             list="HeadlineActArtist"
             id="HeadlineAct"
             v-model.trim="singleAns" @change="updateConfig"/>
      <datalist name="HeadlineAct" id="HeadlineActArtist">
        <template v-for="(val, index) in options" :key="index">
          <option :value=val>{{ val }}</option>
        </template>
      </datalist>


    </label>
  </div>

  <div class="mockup-window border border-base-300 m-2 mt-4 bg-transparent" style="background: rgba(255,255,255,0.05); backdrop-filter: blur(15px);
              border-top: 1px solid rgba(255, 255, 255, 0.2); border-left: 1px solid rgba(255, 255, 255, 0.2);
    box-shadow: 5px 5px 30px rgba(0,0,0,0.2)">
    <div class="flex justify-center px-4 py-16 border-t border-base-300">
      {{mysqlType === '' ? '请选择业务类型' : mysqlType}}
    </div>
  </div>


</template>



<style scoped>

</style>