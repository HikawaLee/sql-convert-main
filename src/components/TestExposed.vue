<script setup>
import {ref} from 'vue'

const isFlag = ref(false)

const data = reactive({
  name: 'tom',
  age: 18
})
//把数据导出
defineExpose({
  data,
  isFlag
})

</script>

<template>
  测试EXPOSED{{ data}}--{{isFlag}}
</template>

<style scoped>

</style>