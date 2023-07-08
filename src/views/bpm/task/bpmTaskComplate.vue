<template>
  <div v-loading="!info.bpmData.defName" style="overflow: auto;background: #fff;">
    <div
      class="leftBox"
      :style="{
        width:'100%',
      }"
    >
      <div v-if="info.bpmData.defName" class="header-fix-top">
        <bpm-buttons
          v-if="info.bpmData.buttonList.length"
          :bpm-data="info.bpmData"
          class="print-hidden"
        />
      </div>

      <div
        v-if="info.bpmData.defName"
        class="leftContent"
        :style="{ height: info.height }"
      >
        <ab-url-form
          v-if="info.bpmData.bpmForm.type == 'url'"
          ref="url"
          :bpm-form="info.bpmData.bpmForm"
        />
        <cust-form v-else ref="inner" :form-data="info.formData" />
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { useAbStoreAdapter } from '@/store/modules/abStoreAdapter'
  import { getCurrentInstance, onMounted, Ref,reactive } from 'vue'
  import {
    abForm as custForm,
    bpmButtons,
    abUrlForm,
    bpmTools,
    bpmApi,
    abTools,
  } from 'agilebpm'

  const { proxy } = abTools.useCurrentInstance()
  const vueContext = getCurrentInstance()
  const { changeTabsMeta } = useAbStoreAdapter()
  const taskId = vueContext?.proxy?.$route.query.id
  const info: any = reactive({
    bpmData: {} as any, // Ref<BpmData>,
    formData: {},
    height: `${window.innerHeight - 279}px`,
  })

  onMounted(() => {
    bpmApi.bpmData.getTaskData(taskId).then(({ data }) => {
      bpmTools.initBpmDataAndFormData(
        data,
        vueContext,
        info.bpmData,
        info.formData
      )
      info.bpmData.actionData.taskId = taskId

      changeTabsMeta({
        fullPath: proxy.$route.fullPath,
        meta: { title: `处理任务-${data.bpmInstance.title}` },
      })
    })
  })
</script>
<style lang="scss" scoped>
  .leftBox {
    float: left;
    width: calc(100% - 400px);
    padding: 20px;
    .leftContent {
      padding: 12px;
      overflow: auto;
      border-top: 1px dashed #ccc;
    }
  }
  .rightBox {
    float: left;
    width: 400px;
    height: 100%;
    padding: 20px;
    overflow: hidden;
    border-left: 10px solid #f5f7f9;
  }
</style>
