<template>
<div class="navbar bg-base-100">
  <div class="navbar-start">
    <div class="dropdown">
      <select class="select select-bordered w-full max-w-xs" v-model="selected" @change="generateSQL">
        <template v-for="(action, index) in NamedActionMap" :key="index">
          <option>{{action.name}}</option>
        </template>
      </select>

    </div>
  </div>
  <div class="navbar-center">
    <a class="btn btn-ghost text-xl">SQL生成器</a>
  </div>
  <div class="navbar-end">
    <button class="btn btn-ghost btn-circle" @click="reset">
      重置
    </button>
    <button class="btn btn-ghost btn-circle" @click="generateSQL">
      生成
    </button>
  </div>
</div>

</template>

<script setup>
import {ref, computed, watchEffect} from "vue";

const props = defineProps({
  actions: Array
})
const emits = defineEmits(['generate', 'reset']);

const generateSQL = () => {
  emits('generate', action.value.action)
}


const reset = () => {
  emits('reset')
}


const NamedActionMap = props.actions.map((action) => {
  return {
    name: action.desc,
    action: action
  }
})

const selected = ref(props.actions[0].desc)

const action = computed(() => {
    return NamedActionMap.find((item) => item.name === selected.value)
})





</script>

<style lang="scss" scoped>

</style>