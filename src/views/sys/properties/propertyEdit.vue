<template>
  <el-container class="layout-container-demo">
    <el-header>
      <ab-save
        back-name="PropertyList"
        :form-ref="formRef"
        :save-data="info.data"
        :url="sysApi.property.propertySave"
      />
      <ab-load v-model="info.data" :url="sysApi.property.propertyGet" />
    </el-header>
    <el-divider class="dividermar" />
    <el-main>
      <el-scrollbar>
        <el-form ref="formRef" label-suffix="：" :model="info.data">
          <el-form-item
            label="参数名"
            label-width="89px"
            placeholder="请输入参数名"
            prop="name"
            :rules="[{ required: true, message: '必填' }]"
          >
            <el-input v-model="info.data.name" />
          </el-form-item>
          <el-form-item
            label="编码"
            label-width="89px"
            placeholder="请输入编码"
            prop="code"
            :rules="[{ required: true, message: '必填' }]"
          >
            <el-input v-model="info.data.code" :disabled="info.data.id" />
          </el-form-item>
          <el-form-item
            label="环境"
            label-width="89px"
            prop="environment"
            :rules="[{ required: true, message: '必填' }]"
          >
            <ab-select-tree
              v-model="info.data.environment"
              :operation="false"
              type-code="environment"
            />
          </el-form-item>
          <el-form-item
            label="分类"
            label-width="89px"
            placeholder="请输入分类"
            prop="typeCode"
            :rules="[{ required: true, message: '必填' }]"
          >
            <ab-select-tree
              v-model="info.data.typeCode"
              :operation="false"
              type-code="property"
            />
          </el-form-item>
          <el-form-item
            label="值"
            label-width="89px"
            placeholder="请输入值"
            prop="value"
            :rules="[{ required: true, message: '必填' }]"
          >
            <el-input v-model="info.data.value" />
          </el-form-item>
          <el-form-item label="是否加密" label-width="89px" prop="encrypt">
            <el-switch
              v-model="info.data.encrypt"
              :active-value="1"
              :inactive-value="0"
            />
          </el-form-item>
          <el-form-item label="描述" label-width="89px" prop="desc">
            <el-input v-model="info.data.desc" type="textarea" />
          </el-form-item>
        </el-form>
      </el-scrollbar>
    </el-main>
  </el-container>
</template>

<script setup lang="ts">
  import { reactive } from 'vue'
  import { sysApi, abTools } from 'agilebpm'
  const formRef = ref()
  const info: any = reactive({
    data: {
      name: '',
      code: '',
      environment: '',
      value: '',
      desc: '',
      encrypt: '0',
      group: '',
      typeCode: '',
      categorys: [],
      category: '',
    },
  })
  const { proxy } = abTools.useCurrentInstance()
  onMounted(() => {
    info.data.typeCode = proxy.$route.query.typeCode
  })
</script>
