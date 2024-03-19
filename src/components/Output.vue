<template>
<!--  各类型SQL语句输出框-->
  <template v-for="(sql, index) in props.sqlList">
    <div class="bg-white rounded-md">
      <div class="collapse-title text-xl font-medium flex justify-between">
        <div class="divider divider-neutral">{{sql.dbType}}</div>
<!--        复制按钮-->
        <div class="tooltip" :data-tip="copyTips" @mouseout="handleMouseOut">
          <button class="my-btn hover:-translate-x-px" @click="handlerCopy(index)">
            <svg t="1710756661984" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="2837" width="24" height="24"><path d="M808.768 197.312c10.432 0 17.408 6.912 17.408 17.344l0 485.568c0 10.368-6.976 17.344-17.408 17.344l-87.296 0c-19.136 0-34.944 15.552-34.944 34.624 0 19.136 15.808 34.688 34.944 34.688l104.768 0c38.464 0 69.824-31.168 69.824-69.312l0-520.32C896 159.168 864.64 128 826.176 128l-384 0c-38.4 0-69.824 31.232-69.824 69.312l0 34.688c0 19.072 15.68 34.688 34.88 34.688 19.2 0 34.88-15.616 34.88-34.688L442.112 214.656c0-10.432 6.976-17.344 17.408-17.344L808.768 197.312z" fill="#231F20" p-id="2838"></path><path d="M128 363.968l0 469.376C128 867.84 160.32 896 199.808 896l394.944 0c39.488 0 71.872-28.16 71.872-62.656L666.624 363.968c0-34.432-32.384-62.592-71.872-62.592L199.808 301.376C160.32 301.376 128 329.536 128 363.968z" fill="#515151" p-id="2839"></path></svg>
          </button>
        </div>
      </div>

<!--      SQL语句显示框-->
      <div class="bg-white p-0 m-0 ">
<!--        mavon-editor实现语法高亮-->
        <mavon-editor
            v-model="markedSql[index]"
            class="content-show rounded-md"
            defaultOpen="preview"
            :toolbarsFlag="false"
            :editable="false"
            :subfield="false"
            previewBackground="white"
            :boxShadow="false">
        </mavon-editor>
      </div>
<!--      分割线-->
      <hr class="h-[2px] border-t-0 outline-dotted outline-0.5 outline-slate-100 dark:bg-white/10" />
    </div>
  </template>
</template>

<script setup>
import {ref, computed} from "vue";
import { mavonEditor } from 'mavon-editor'
import 'mavon-editor/dist/css/index.css'
import useClipboard from 'vue-clipboard3'

  //region 父组件传入生成的sql语句
  const props = defineProps({
    sqlList: Array,
    default: () => {
      return []
    }
  });
  //endregion

//region 添加```sql前缀和```后缀实现markdown语法高亮
const markedSql = computed(() => {
  return props.sqlList.map((item) => {
     let sql = `\n\`\`\`sql\n${item.sql}\n\`\`\`\n`
    console.log(sql)
    return sql
  })
})
//endregion

const copyTips = ref('点击复制')


const { toClipboard } = useClipboard()
const copiedSql = computed(() => {
})

//region 复制按钮点击事件
const handlerCopy = async (index) => {
  try {
    await toClipboard(props.sqlList[index].sql)
    copyTips.value = '复制成功'
  } catch (err) {
    console.log(err)
    copyTips.value = '复制失败'
  }
}
//endregion

//region 鼠标移出后提示文字恢复
const handleMouseOut = () => {
  copyTips.value = '点击复制'
}
//endregion



</script>

<style scoped>

/* tailwindcss自定义css样式 */
.my-btn {
  @apply px-1 py-1 font-sans text-xs font-bold text-center text-gray-900 uppercase align-middle transition-all rounded-lg select-none hover:bg-gray-900/10 active:bg-gray-900/20 disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none;
}

/*
覆盖mavon-editor默认的代码块样式, 使之为紧缩布局
 */
.content-show {
  height: 100%!important;
}


/*  解决mavon-editor遮罩和层级错乱问题, 慎重修改  */
:deep( .v-note-wrapper) {
  min-height: 60px;
  border: none;
  display: block !important;
  position: static !important;
}

</style>