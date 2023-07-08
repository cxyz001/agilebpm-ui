<template>
  <div v-loading="!info.bpmData.defName" style="overflow: auto;background:#fff;">
    <div class="leftBox">
      <div v-if="info.bpmData.defName">
        <bpm-buttons v-if="info.bpmData.buttonList.length" :bpm-data="info.bpmData" class="print-hidden" />
      </div>
      <div v-if="info.bpmData.defName" class="leftContent" :style="{ height: info.height }">
        <ab-url-form v-if="info.bpmData.bpmForm.type == 'url'" ref="url" :bpm-form="info.bpmData.bpmForm" />
        <cust-form v-else ref="inner" :form-data="info.formData" />
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { useAbStoreAdapter } from '@/store/modules/abStoreAdapter'
import {
  abForm as custForm,
  bpmButtons,
  abUrlForm,
  bpmTools,
  abTools,
  bpmApi,
} from 'agilebpm'
import { getCurrentInstance, reactive, onMounted } from 'vue'

const { proxy } = abTools.useCurrentInstance()
const vueContext = getCurrentInstance()
const { changeTabsMeta } = useAbStoreAdapter()
const instId = vueContext?.proxy?.$route.query.instId
const opId = vueContext?.proxy?.$route.query.opId
const bizId = vueContext?.proxy?.$route.query.bizId
const nodeKey = vueContext?.proxy?.$route.query.nodeKey
const carbonId = vueContext?.proxy?.$route.query.carbonId
const info: any = reactive({
  bpmData: {},
  formData: {},
  height: `${window.innerHeight - 279}px`,
})

onMounted(() => {
  bpmApi.bpmData
    .getInstData(instId, opId, bizId, nodeKey, carbonId)
    .then(({ data }) => {
      bpmTools.initBpmDataAndFormData(
        data,
        vueContext,
        info.bpmData,
        info.formData
      )
      info.bpmData.actionData.instanceId = data.bpmInstance.id
      info.bpmData.actionData.extendConf.carbonId = carbonId
      debugger 
      changeTabsMeta({
        fullPath: proxy.$route.fullPath,
        meta: { title: `实例详情-${data.bpmInstance.title}` },
      })
    })
})
</script>
<style lang="scss" scoped>
.leftBox {
  float: left;
  width: 100%;
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
