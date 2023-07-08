<template>
  <div class="printBox">
    <el-container>
      <el-header class="noprint" style="margin-top: 20px">
        <el-space>
          <el-button v-print="print" type="primary" @click="print">
            打印
          </el-button>
          <el-button type="primary" @click="closeWindow">取消</el-button>
 
        </el-space>
      </el-header>
      <el-divider class="dividermar" />
      <div id="printTest" ref="printTest" class="print">
        <el-main>
          <ab-url-form
            v-if="info.bpmData.bpmForm.type == 'url'"
            ref="url"
            :bpm-form="info.bpmData.bpmForm"
          />
          <cust-form v-else ref="inner" :form-data="info.formData" />
        </el-main>
      </div>
    </el-container>
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

  import { getCurrentInstance, Ref } from 'vue'
  const { changeTabsMeta } = useAbStoreAdapter()

  const vueContext = getCurrentInstance()

  const info: any = reactive({
    bpmData: {},
    formData: {},
    instanceId: '',
    nodeKey: '',
  })
  //这里是打印的配置项
  // const print = ref({
  //   id: 'printTest', //这里的id就是上面我们的打印区域id，实现指哪打哪
  //   popTitle: '打印', // 打印配置页上方的标题
  //   extraHead:
  //     '<meta http-equiv="Content-Language"content="zh-cn"/>,<style>  #printId {  100%;  } <style>', // 最上方的头部文字，附加在head标签上的额外标签，使用逗号分割
  //   preview: false, // 是否启动预览模式，默认是false
  //   previewTitle: '预览的标题', // 打印预览的标题
  //   previewPrintBtnLabel: '预览结束，开始打印', // 打印预览的标题下方的按钮文本，点击可进入打印
  //   zIndex: 20002, // 预览窗口的z-index，默认是20002，最好比默认值更高
  //   previewBeforeOpenCallback() {
  //     console.log('正在加载预览窗口！')
  //   }, // 预览窗口打开之前的callback
  //   previewOpenCallback() {
  //     console.log('已经加载完预览窗口，预览打开了！')
  //   }, // 预览窗口打开时的callback
  //   beforeOpenCallback() {
  //     console.log('开始打印之前！')
  //   }, // 开始打印之前的callback
  //   openCallback() {
  //     console.log('执行打印了！')
  //   }, // 调用打印时的callback
  //   closeCallback() {
  //     console.log('关闭了打印工具！')
  //   }, // 关闭打印的callback(无法区分确认or取消)
  //   clickMounted() {
  //     console.log('点击v-print绑定的按钮了！')
  //   },
  // })
  const { proxy } = abTools.useCurrentInstance()

  console.log('proxy.$route.query :::::::::::::::::: ', proxy.$route)
  console.log('proxy.$route.query :::::::::::::::::: ', proxy.$route.query)
  info.instanceId = proxy.$route.query.instanceId
  info.nodeKey = proxy.$route.query.nodeKey

  const { closeTab } = useAbStoreAdapter()
  const closeWindow = () => {
    const route = proxy.$route
    closeTab(route.path)
    proxy.$router ? proxy.$router.back() : window.history.back()
  }
  const print = () => {
    window.print()
  }

  onMounted(() => {
    bpmApi.bpmData
      .getInstData(info.instanceId, null, null, info.nodeKey)
      .then(({ data }) => {
        bpmTools.initBpmDataAndFormData(
          data,
          vueContext,
          info.bpmData,
          info.formData
        )
      })
    changeTabsMeta({
      fullPath: proxy.$route.fullPath,
      meta: { title: `打印` },
    })
  })
</script>

<style scoped>
  @media print {
    .noprint {
      display: none;
    }
  }
  .printBox {
    height: 100vh;
    overflow: auto;
    background: #fff;
  }
</style>
