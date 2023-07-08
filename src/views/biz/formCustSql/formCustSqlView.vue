<template>
  <div>
    <viewPage />
  </div>
</template>
<script lang="ts">
  // 自定义列表页面
  import { defineComponent } from 'vue'
  export default defineComponent({
    name: 'FormCustSqlView',
    beforeRouteEnter(to: any, from: any, next: any) {
      //需要处理的逻辑
      next((e: any) => {})
    },
  })
</script>
<script setup lang="ts">
  import { viewPage } from 'agilebpm'
</script>
