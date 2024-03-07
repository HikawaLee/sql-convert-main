<template>


  <div class="divider divider-horizontal" />
  <div class="flex w-full m-2.5">


    <div v-if="props.state.type === 'input'" class="join w-full max-w-2xl">
      <label class="form-control w-full max-w-2xl">
        <div class="label">
            <span class="label-text">{{ props.state.label }}</span>
        </div>

        <input class="input input-bordered" :placeholder="props.state.placeholder" />

        <div class="label">
            <span class="label-text-alt">{{ props.state.desc }}</span>
        </div>
    </label>
    </div>



    <div v-if="props.state.type === 'select'" class="join w-full max-w-2xl">
      <label class="form-control w-full max-w-xs">
        <div class="label">
            <span class="label-text">{{ props.state.label }}</span>
        </div>

        <select class="select select-bordered select-md w-full max-w-2xl">
           <template v-for="(val, index) in props.state.options" :key="index">
            <option>{{ val }}</option>
          </template>
        </select>
      </label>
    </div>







    <div v-if="props.state.type === 'checkbox'">

      <label class="form-control w-full max-w-xs">
        <div class="label">
            <span class="label-text">{{ props.state.label }}</span>
        </div>

        
      </label>

      <div class="dropdown dropdown-right">
        <div class="join w-full max-w-xl">
    
          <div>
            <input class="input input-bordered join-item grow" placeholder="" />
          </div>
        </div>


        <ul tabindex="0" class="dropdown-content dropdown-right  z-[1] menu p-2 shadow rounded-box w-52">

          <template v-for="(val, index) in props.state.options" :key="index">
            <label class="label cursor-pointer space-x-2.5">

              <div class="label">{{ val }}</div>
              <input type="checkbox" checked="checked" class="checkbox checkbox-primary" />
            </label>
          </template>
        </ul>
      </div>
    </div>



    <div v-if="props.state.type === 'radio'" class="flex">
      <div class="join w-full max-w-xl">
          <div tabindex="0" role="" class="flex join-item input input-bordered items-center bg-base-200">
            {{ props.state.label }}

          </div>
          <template v-for="(val, index) in props.state.options" :key="index">
        <label class="label cursor-pointer">
          <div class="label">{{ val }}</div>
          <input type="radio" name="radio-2" class="radio radio-primary block" checked />

        </label>
      </template>
        </div>


    </div>




  </div>

</template>

<script setup>

const props = defineProps({
  state: {
    type: Object,
    required: true,
    default: () => {
      return {

        "type": "input",//不能为空
        "label": "默认输入框", //不能为空
        "desc": "这是一个默认输入框", //默认为空
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


// export default {
//   name: 'FormComponent',
//   props: {
//     element: {
//       type: Object
//     }
//   },
//   data () {
//     return {
//
//       form: {
//         name: '',
//         region: undefined,
//         date1: undefined,
//         delivery: false,
//         type: [],
//         resource: '',
//         desc: ''
//       }
//     }
//   },
// }
</script>

<style scoped></style>