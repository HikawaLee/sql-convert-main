<template>

  <template v-for="(sql, index) in props.sqlList">
    <div class="collapse collapse-arrow bg-white rounded-md">
      <input type="radio" name="my-accordion-2" checked="checked" />
      <div class="collapse-title text-xl font-medium">
        {{sql.dbType}}
      </div>
      <div class="collapse-content bg-white p-0 m-0 ">
        <mavon-editor
            v-model="markedSql[index]"
            class="content-show rounded-md"
            defaultOpen="preview"
            :toolbarsFlag="false"
            :editable="false"
            :subfield="false"
            previewBackground="white"
            :boxShadow="false">
          <template slot="right-toolbar-after">
            <button
                type="button"
                @click="$click('test')"
                class="op-icon fa fa-mavon-align-left"
                aria-hidden="true"
                title="自定义"
            ></button>
          </template>
        </mavon-editor>
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
import {ref, computed} from "vue";
import { mavonEditor } from 'mavon-editor'
import 'mavon-editor/dist/css/index.css'
  const props = defineProps({
    sqlList: Array,
    default: () => {
      return []
    }
  });

const markedSql = computed(() => {
  return props.sqlList.map((item) => {
     let sql = `\n\`\`\`sql\n${item.sql}\n\`\`\`\n`
    console.log(sql)
    return sql
  })
})

const content = ref('')
</script>

<style scoped>
.content-show {
  height: 100%!important;
}


/*  解决遮罩和层级错乱问题  */
:deep( .v-note-wrapper) {
  min-height: 60px;
  border: none;
  display: block !important;
  position: static !important;
}

</style>