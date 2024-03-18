<template>


  <div class="divider divider-horizontal"/>

<!--  数据输入组件仓库， 存储各个数据输入组件-->
  <div class="flex w-full p-2.5">

<!--    input输入框-->
    <div v-if="props.state.type === 'input'" class="form-control w-full max-w-xl">
      <label class="form-control w-full max-w-xl">
        <div class="label">
          <span class="label-text">{{ props.state.label }}</span>
          <span v-if="props.state.required" class="text-red-500">*</span>
        </div>
        <input class="input input-bordered" v-model.trim="singleAns" @change="updateConfig" :placeholder="props.state.placeholder"/>
        <div class="label">
          <span class="label-text-alt">{{ props.state.desc }}</span>
        </div>
      </label>
    </div>

<!--    select选择框, 多选一-->
    <div v-if="props.state.type === 'select'" class="form-control w-full max-w-xl">
      <label class="form-control w-full max-w-xl">
        <div class="label">
          <span class="label-text">{{ props.state.label }}</span>
          <span v-if="props.state.required" class="text-red-500">*</span>
        </div>
        <select class="select select-bordered select-md w-full max-w-xl" v-model="singleAns" @change="updateConfig">

          <template v-for="(val, index) in props.state.options" :key="index">
            <option>{{ val }}</option>
          </template>
        </select>
      </label>
    </div>

<!--    check box多选框, 多选多-->
    <div v-if="props.state.type === 'checkbox'" class="form-control w-full max-w-xl dropdown dropdown-bottom dropdown-hover">

      <label class="form-control w-full max-w-xl">
        <div class="label " TABINDEX="0" >
          <span class="label-text">{{ props.state.label }}</span>
          <span v-if="props.state.required" class="text-red-500">*</span>
        </div>
        <input class="input input-bordered" v-model="multipleAns" disabled :placeholder="''" @change="updateConfig"/>
        <div class="label">
          <span class="label-text-alt">{{ props.state.desc }}</span>
        </div>
      </label>

      <ul tabindex="0" class="dropdown-content  z-[1] menu  shadow rounded-box w-full bg-slate-50">

        <template v-for="(val, index) in props.state.options" :key="index">
          <label class="label cursor-pointer ">
            <div class="label">{{ val }}</div>
            <input type="checkbox" :value="val" v-model="multipleAns" @change="updateConfig" class="checkbox checkbox-primary"/>
          </label>
        </template>
      </ul>



    </div>

<!--    toggle开关-->
    <div v-if="props.state.type === 'toggle'" class="form-control w-full max-w-xl">
      <label class="form-control w-full max-w-xl">
        <div class="label">
          <span class="label-text">{{ props.state.label }}</span>
        </div>
        <div class="form-control">
          <label class="label cursor-pointer">
            <span class="label-text">{{props.state.options[0]}}</span>
            <input type="checkbox" class="toggle toggle-lg [--tglbg:white] bg-blue-500 hover:bg-blue-700 border-blue-500" v-model="yesOrNo"
            @change="updateConfig"/>
            <span class="label-text">{{props.state.options[1]}}</span>
          </label>
        </div>
        <div class="label">
          <span class="label-text-alt">{{ props.state.desc }}</span>
        </div>
      </label>
    </div>

  </div>

</template>

<script setup>
import {ref} from 'vue'
const props = defineProps({
  state: {
    type: Object,
    required: true,
    default: () => {
      return {
        "type": "input",//不能为空
        "label": "默认输入框", //不能为空
        "id": '', //不能为空 ///FIXME: 有可能出现bug
        "required": true, //是否必填
        "desc": "该项目为必填项", //默认为空
        "placeholder": "这是默认的placeholder", // 仅input, radio, select具有
        "value": {
          "type": String,
          "default": "",
        },
        "options": [], // 仅radio, select, checkbox具有， 保存选项
        "data": {   //不能为空, 保存用户提交的数据
          "type": Array,
          "selected": []
        },
        "rules": [], // 表单的校验规则
      }
    }
  }
})
const emits = defineEmits(['updateState']);
const singleAns = ref(null)
const multipleAns = ref([])
//因为toggle组件默认状态为true选中右边, 而我把右边的选项值设置为了No选项, 所以yesOrNo的值应该与逻辑值相反
const yesOrNo = ref(true)

const handleInput = (e) => {
  //todo: 校验
  const rules = props.state.rules;
  const rawData = e.target.value.trim();
  const processedData = rawData;
  return processedData;
}
const updateConfig = (e) => {

  let data;
  if(props.state.type === 'checkbox') {
    data = multipleAns.value;
  } else if(props.state.type === 'toggle') {
    if(yesOrNo.value === false) {
      data = props.state.options[0];
    } else {
      data = props.state.options[1];
    }
  }
    // console.log('当前选中值: ', data);
  else {
    data = handleInput(e);
    if(data === '') {
      return;
    }
  }
    // console.log('当前选中值: ', data);
  // const conf = {
  //   ...props.state,
  //   data: {
  //     ...props.state.data,
  //     selected: [data]
  //   }
  // }
  const conf = {
    id: props.state.id,
    label: props.state.label,
    selected: data
  }
  // console.log(`更新的配置: ${JSON.stringify(conf)}`);
  emits('updateState', conf);
}
if(props.state.type === 'toggle' && props.state.value.default !== '') {


  const conf = {
    id: props.state.id,
    label: props.state.label,
    selected: props.state.value.default
  }
  // console.log(`更新的配置: ${JSON.stringify(conf)}`);
  emits('updateState', conf);
}

</script>

<style scoped></style>