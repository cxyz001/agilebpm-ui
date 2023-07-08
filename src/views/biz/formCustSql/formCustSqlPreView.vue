<template>
  <div>
    <viewPage />
  </div>
</template>
<script lang="ts">
  // 预览页面
  import { defineComponent } from 'vue'
  export default defineComponent({
    name: '',
    beforeRouteEnter(to: any, from: any, next: any) {
      //需要处理的逻辑
      next((e: any) => {})
    },
  })
</script>
<script setup lang="ts">
  import { viewPage } from 'agilebpm'
</script>
