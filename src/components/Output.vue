<template>
  <template v-for="(sql, index) in props.sqlList">
    <div class="collapse collapse-arrow bg-base-200">
      <input type="radio" name="my-accordion-2" checked="checked" />
      <div class="collapse-title text-xl font-medium">
        {{sql.dbType}}
      </div>
      <div class="collapse-content">
        <p>
          {{sql}}
        </p>
      </div>
    </div>
  </template>
<!--<div class="collapse collapse-arrow bg-base-200">-->
<!--  <input type="radio" name="my-accordion-2" /> -->
<!--  <div class="collapse-title text-xl font-medium">-->
<!--    TDSQL-->
<!--  </div>-->
<!--  <div class="collapse-content" > -->
<!--    <p>我是TDSQL</p>-->
<!--  </div>-->
<!--</div>-->
</template>

<script setup>

  const props = defineProps({
    sqlList: Array
  });
</script>

<style lang="scss" scoped>

</style>