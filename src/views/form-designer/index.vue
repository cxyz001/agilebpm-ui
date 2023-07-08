<template>
  <div class="ab-form-design">
    <ab-form-design :custom-fields="customFields" :options="options" style="height: 100vh" @submit="handleSubmit" />
  </div>
</template>
<script>
import { createApp } from 'vue'
 export default {
  name: 'App',
  data() {
    return {
      customFields: [  ],
    }
  },
  methods: {
    handleSubmit(val) {
      console.log(val)
    },
  },
}
</script>

<style>
.ab-form-design .el-form-item__content {
  flex-wrap: inherit !important;
}

#app {
  height: 100%;
  min-height: 100%;
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  color: #2c3e50;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
body {
  margin: 0;
}
</style>
