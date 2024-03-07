<template>
 <div class="">
    <p>action is --{{JSON.stringify({})}}</p>

    <div role="tablist" class="tabs tabs-bordered">
      <input type="radio" name="增加字段" role="tab" class="tab"  />
      <div role="tabpanel" class="tab-content p-2.5">
        tab1
      </div>

<!--      <template v-for="(action, index) in actions" :key="index">-->
<!--        <input type="radio" :name="action.desc" role="tab" class="tab" />-->
<!--        <div role="tabpanel" class="tab-content p-2.5">-->
<!--          <LayoutStore/>-->
<!--        </div>-->
<!--      </template>-->

    </div>
  </div>
</template>

<script setup>



</script>

<style scoped>

</style>