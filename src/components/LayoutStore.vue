<template>


  <div class="divider divider-horizontal"/>
  <div class="flex w-full p-2.5">


    <div v-if="props.state.type === 'input'" class="form-control w-full max-w-xl">
      <label class="form-control w-full max-w-xl">
        <div class="label">
          <span class="label-text">{{ props.state.label }}</span>
        </div>
        <input class="input input-bordered" :placeholder="props.state.placeholder"/>
        <div class="label">
          <span class="label-text-alt">{{ props.state.desc }}</span>
        </div>
      </label>
    </div>


    <div v-if="props.state.type === 'select'" class="form-control w-full max-w-xl">
      <label class="form-control w-full max-w-xl">
        <div class="label">
          <span class="label-text">{{ props.state.label }}</span>
        </div>
        <select class="select select-bordered select-md w-full max-w-xl">
          <template v-for="(val, index) in props.state.options" :key="index">
            <option>{{ val }}</option>
          </template>
        </select>
      </label>
    </div>


    <div v-if="props.state.type === 'checkbox'" class="form-control w-full max-w-xl dropdown dropdown-bottom">

      <label class="form-control w-full max-w-xl">
        <div class="label">
          <span class="label-text">{{ props.state.label }}</span>
        </div>
        <input class="input input-bordered" TABINDEX="0" :placeholder="props.state.placeholder"/>
        <div class="label">
          <span class="label-text-alt">{{ props.state.desc }}</span>
        </div>
      </label>

      <ul tabindex="0" class="dropdown-content  z-[1] menu  shadow rounded-box w-full">

        <template v-for="(val, index) in props.state.options" :key="index">
          <label class="label cursor-pointer ">

            <div class="label">{{ val }}</div>
            <input type="checkbox" checked="checked" class="checkbox checkbox-primary"/>
          </label>
        </template>
      </ul>

    </div>


    <div v-if="props.state.type === 'toggle'" class="form-control w-full max-w-xl">
      <label class="form-control w-full max-w-xl">
        <div class="label">
          <span class="label-text">{{ props.state.label }}</span>
        </div>
        <div class="form-control">
          <label class="label cursor-pointer">
            <span class="label-text">{{props.state.options[0]}}</span>
            <input type="checkbox" class="toggle toggle-lg [--tglbg:white] bg-blue-500 hover:bg-blue-700 border-blue-500" checked />
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
</script>

<style scoped></style>