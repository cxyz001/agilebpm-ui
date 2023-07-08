<template>
  <div style="background-color: white">
    <el-container>
      <el-header style="margin-top: 20px">
        <el-button
          v-if="!pageData.isReadOnly"
          :icon="Check"
          :loading="pageData.loading"
          type="primary"
          @click="save()"
        >
          保存
        </el-button>
        <slot></slot>
        <el-button
          v-if="pageData.dataId && pageData.del"
          :icon="Delete"
          @click="del"
        >
          删除
        </el-button>
        <el-button :icon="Back" @click="back">返回</el-button>
      </el-header>
      <el-divider class="dividermar" />
      <el-main>
        <cust-form
          v-if="pageData.formData.html"
          ref="abFormRef"
          :form-data="pageData.formData"
        />
      </el-main>
    </el-container>
  </div>
</template>

<script setup lang="ts">
  import { reactive, ref } from 'vue'
  import { ElMessage } from 'element-plus'
  import { Check, Back, Delete } from '@element-plus/icons-vue'
  import { useAbStoreAdapter } from '@/store/modules/abStoreAdapter'
  import { abForm as custForm, bizApi, abTools } from 'agilebpm'

  const { proxy } = abTools.useCurrentInstance()
  const formCode = proxy.$route.query.code || proxy.$route.params.code
  const pageData = reactive({
    formData: {} as CustFormData,
    loading: false,
    dataId: proxy.$route.query.id || '',
    backName: proxy.$route.query.backName || '',
    del: !!proxy.$route.query.del,
    saveBack: !!proxy.$route.query.saveBack, //保存后返回
    isReadOnly:
      !!(proxy.$route.query.isReadOnly == '1') ||
      proxy.$route.name == 'FormViewDetail', //只读模式
  })

  // 获取在线表单后，再渲染在线表单
  bizApi.bizForm
    .getFormData(formCode, pageData.dataId, pageData.isReadOnly)
    .then(({ data }) => {
      const form = data.bizForm
      useAbStoreAdapter().changeTabsMeta({
        fullPath: proxy.$route.fullPath,
        meta: { title: `${form.name}` },
      })
      const formData = {
        html: form.html,
        js: form.js,
        data: data.data,
        tablePermission: data.tablePermission,
        permission: data.permission,
        initData: data.initData,
        boLoadMap: data.boLoadMap,
        permissionType: data.permissionType,
        permissionValue: data.permissionValue,
      }
      pageData.formData = formData
    })

  const abFormRef = ref()
  const save = () => {
    pageData.loading = true
    abFormRef.value.getData(true).then((formJson: any) => {
      if (formJson !== false) {
        bizApi.bizForm.saveFormData(formCode, pageData.formData.data).then(
          ({ data }) => {
            pageData.loading = false
            if (pageData.saveBack) {
              back()
            } else {
              ElMessage({
                type: 'success',
                message: '保存成功',
                duration: 1000,
                onClose: () => {
                  window.location.reload()
                },
              })
            }
          },
          () => {
            pageData.loading = false
          }
        )
      } else {
        pageData.loading = false
      }
    })
  }

  const route = useRoute()
  const back = () => {
    abTools.closeTab(route.fullPath)
    if (pageData.backName) {
      proxy.$router.push({
        name: pageData.backName,
      })
    } else {
      proxy.$router.back()
    }
    window.close()
  }
  const del = () => {
    bizApi.bizForm
      .removeFormData(formCode, pageData.dataId)
      .then(({ data }) => {
        ElMessage({
          type: 'success',
          message: '删除成功',
        })
      })
  }
</script>

<style lang="scss" scoped>
  .a {
    color: 'red';
  }
</style>
