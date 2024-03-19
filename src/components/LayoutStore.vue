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
          <span v-if="warningShow" class="label-text-alt text-red-400">{{warningText}}</span>
          <span v-else class="label-text-alt">{{ props.state.desc }}</span>

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
import rulesType from "@/types/rulesType.js";


//region 父组件传入的数据输入组件的配置----一个标准的数据输入组件的配置
// 添加了数据收集所需要的各种属性, 例如option属性保存了下拉框的选项, value属性保存输入框的默认值等
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
        "data": {   // 保存用户提交的数据
          "type": Array,
          "selected": []
        },
        "rules": {}, // 表单的校验规则
      }
    }
  }
})
const emits = defineEmits(['updateState']);

//存储用户输入为单个值
const singleAns = ref(null)

//存储用户输入的多个值为数组
const multipleAns = ref([])

//因为toggle组件默认状态为true选中右边, 而我把右边的选项值设置为了No选项, 所以yesOrNo的值应该与逻辑值相反
//例如默认toggle选中右边的"否"选项, 那么yesOrNo的值应该为true
const yesOrNo = ref(true)

//预处理用户输入的数据,可加入更多自定义的校验逻辑
const handleInput = (e) => {

  const rawData = e.target.value.trim(); //获取用户输入的数据
  const rules = props.state.rules; //获取用户自定义的校验规则
  //  如果是数字类型的数据, 则需要校验数据类型和最值限制
  if(props.state.value.type === Number && rules[rulesType.dataType] !== undefined) {//FIXME: 这里的判断条件可能有问题
    verifyNumber(rules, rawData);
  }
  // 如果是字符串类型的数据并且明确规定了校验规则, 则进行相关校验
  if(props.state.value.type === String && rules !== undefined) {//FIXME: 这里的判断条件可能有问题
    verifyString(rules, rawData);
  }
  //可以做进一步的数据处理以得到处理后的数据
  const processedData = rawData;
  //返回处理后的数据
  return processedData;
}

//v-model绑定的数据输入组件的change事件
const updateConfig = (e) => {
  let data;
  //checkbox组件收集的数据单独处理为数组
  if(props.state.type === 'checkbox') {
    data = multipleAns.value;
  }
  //toggle组件收集的数据从布尔型选项中获取选项值
  else if(props.state.type === 'toggle') {
    if(yesOrNo.value === false) {
      data = props.state.options[0];
    } else {
      data = props.state.options[1];
    }
  }
  //其他类型组件收集的数据
  else {
    data = handleInput(e);
    if(data === '') {
      return;
    }
  }

  //将收集到的数据更新到父组件的状态中, 以便父组件可以使用
  const conf = {
    id: props.state.id,
    label: props.state.label,
    selected: data
  }
  emits('updateState', conf);
}

//初始化toggle组件的默认值
if(props.state.type === 'toggle' && props.state.value.default !== '') {


  const conf = {
    id: props.state.id,
    label: props.state.label,
    selected: props.state.value.default
  }
  emits('updateState', conf);
}



const warningShow = ref(false)
const warningText = ref('')
//根据rules的配置校验用户输入的数据是否为数字和最值限制
const verifyNumber = (rules, value) => {
  const numericRegex = /^[0-9]+$/; // TODO 应该把正则表达式放到rules中
  console.log(value)
  // 检查输入值是否为数字
  if (numericRegex.test(value)) {
    // 输入值是数字，继续检查最大值和最小值
    const numericValue = parseInt(value, 10); // 将输入值转换为整数
    const min = rules[rulesType.min];
    const max = rules[rulesType.max];
    console.log(`min: ${min}, max: ${max}, numericValue: ${numericValue}`)
    if (numericValue >= min  && numericValue <= max) {
      warningShow.value = false

    } else {
      warningText.value = "输入值不在有效范围内。";
      handleWarning()
    }
  } else {
    warningText.value = "输入值不是有效的数字。";
    handleWarning()
  }
  return true;
}


//根据rules的配置校验用户输入的数据是否符合用户自定义的规则
const verifyString = (rules, str) => {
  const regex = /^[^\u4e00-\u9fa5\s]+$/; // TODO 应该把正则表达式放到rules中
  if (regex.test(str)) {
    warningShow.value = false
  } else {
    warningText.value = "输入的字符串包含汉字或空格。";
    handleWarning()
  }
}



// 用于控制警告信息的显示
const handleWarning = () => {
  warningShow.value = true
  setTimeout(() => {
    warningShow.value = false
    singleAns.value = null
  }, 1500)
}


</script>

<style scoped>


</style>