<template>
  <div class="common-layout">
    <el-container>
      <el-aside class="left-tree">
        <ab-dict-tree v-model="query.typeCode$VEQ" type-code="flowType" @node-click="searchResetPage()" />
      </el-aside>
      <el-main>
        <div class="comprehensive-table-container">
          <div ref="titleForm">
            <el-row class="vab-query-form">
              <el-col class="top-panel">
                <el-form ref="queryForm" :inline="true" label-width="90px" :model="query" @submit.prevent>
                  <el-form-item label="流程名称" prop="name$VLK">
                    <el-input v-model="query.name$VLK" placeholder="请输入流程名称" />
                  </el-form-item>
                  <el-form-item label="流程编码" prop="key$VLK">
                    <el-input v-model="query.key$VLK" placeholder="请输入流程编码" />
                  </el-form-item>
                  <el-form-item>
                    <el-button :icon="Search" type="primary" @click="search()">
                      查询
                    </el-button>
                    <el-button :icon="RefreshRight" @click="reset()">
                      重置
                    </el-button>
                  </el-form-item>
                </el-form>
              </el-col>
              <el-col class="left-panel">
                <el-space>
                  <router-link v-if="!abUtil.checkIsPublicProject(true)" :to="{
                      name: 'BpmDefinitionEdit',
                      query: { typeCode: query.typeCode$VEQ },
                    }">
                    <el-button :icon="Plus" type="primary">
                      BPMN 流程设计
                    </el-button>
                  </router-link>
                  <el-button v-else :disabled="true" :icon="Plus" type="primary">
                    BPMN 流程设计
                  </el-button>
                </el-space>
              </el-col>
            </el-row>
          </div>
          <!-- 关键字段设置minwith，特定枚举字段设置with（管理列、日期、状态、字典等），
         不重要字段放最后，管理列设置 fixed="right"
    -->
          <ab-table ref="abTable" v-model="selectedData" :height="tableHeight" :query-param="query" row-key="id" :url="bpmApi.bpmDefinition.bpmDefinitionListUrl">
            <ab-column label="流程名称" min-width="120" prop="name" />
            <ab-column label="流程编码" min-width="100" prop="key" />
            <ab-column label="描述" prop="desc" width="150" />
            <ab-column ab-text-formatter="1-支持-success|0-不支持-" label="移动端" prop="supportMobile" width="90" />
            <ab-column ab-text-formatter="deploy-发布-success-dark|forbidden-禁用-danger-dark|draft-草稿-info" label="状态" prop="status" width="80" />
            <ab-column label="版本" prop="version" width="55" />
            <ab-column label="排序" prop="sn" width="55" />
            <ab-column ab-text-formatter="bpmn-BPMN-success-dark|simple-简式-primary-dark|empty-待设计-warning-dark" label="设计器" prop="processEditor" width="90" />
            <ab-column ab-date-formatter="yyyy-MM-dd" label="更新时间" prop="updateTime" width="120" />
            <ab-column ab-template="edit" fixed="right" label="操作" width="460" />
            <template #edit="{ scope }">
              <el-button text type="primary" @click="showDesign(scope.row.id)">
                设计
              </el-button>
              <router-link :to="`/bpm/flowStart/${scope.row.key}`">
                <el-button text type="primary">启动</el-button>
              </router-link>
              <el-button v-ab-btn-rights:bpmDefinition_Authorizations text type="primary" @click="openAuthoDialog(scope.row.key)">
                授权
              </el-button>
              <router-link v-ab-btn-rights:bpmDefinition_definitionVersionList :to="{
                  name: 'BpmDefinitionVersionList',
                  query: { key: scope.row.key },
                }">
                <el-button text type="primary">版本管理</el-button>
              </router-link>
              <router-link v-ab-btn-rights:bpmDefinition_save :to="{ name: 'BpmDefinitionEdit', query: { id: scope.row.id } }">
                <el-button text type="primary">编辑</el-button>
              </router-link>
              <el-button v-ab-btn-rights:bpmDefinition_del text type="primary" @click="
                  sendAction(
                    bpmApi.bpmDefinition.bpmDefinitionRemoveUrl + scope.row.id,
                    `确定删除 ${scope.row.name} 吗?`
                  )
                ">
                删除
              </el-button>
            </template>
          </ab-table>
          <ab-authorization v-model="authInfo.showAuthoDialog" authorization-type="FLOW" :rights-code="authInfo.flowKey" />
          <ab-designer v-if="designShow" v-model="designShow" :def-id="designInfo.defId" @close="closeDefinition()" />
        </div>
      </el-main>
    </el-container>
  </div>
</template>

<script lang="ts">
  // eslint-disable-next-line no-unused-vars
  import { reactive, defineComponent, getCurrentInstance,watch,onMounted } from 'vue'
  import {
    abTableMix,
    bpmApi,
    abAuthorization,
    abDictTree,
    abUtil,
  } from 'agilebpm'
  import {useZIndex} from 'element-plus'
  import abDesigner from 'abDesigner' 
   import {setupZIndex} from 'abDesigner' 
   setupZIndex(useZIndex)
  import { ElTooltip } from 'element-plus'
  import {
    Delete,
    Edit,
    Search,
    Plus,
    RefreshRight,
    Download,
    Upload,
  } from '@element-plus/icons-vue'

  export default defineComponent({
    name: 'BpmDefinitionList',
    components: {
      abAuthorization,
      abDesigner,
      abDictTree,
      ElTooltip,
    },
    mixins: [abTableMix],
    setup() {
      // 查询条件定义，如果ts 需要定义所有参数，这里覆盖父类，不是的话可以不用设置，父类已经定义了query 对象
      const query = reactive({
        name$VLK: '',
        key$VLK: '',
        typeCode$VEQ: '',
        processEditor$VIN: ['bpmn', 'empty'],
      })

      const designShow = ref(false)

      const designInfo = reactive({
        defId: '',
        newDefinitionId: '',
      })
      const showDesign = (defId: string) => {
        designInfo.defId = defId
        designShow.value = true
      }
      const closeDefinition = () => {
        designShow.value = false
        designInfo.defId = ''
        proxy.search()
      }

      // @ts-ignore
      const { proxy } = getCurrentInstance()

      // 新建流程后，进入页面自动打开设计器
      watch(
        () => proxy.$route.query.newDefinitionId,
        (id) => {
          if (!id || designInfo.newDefinitionId == id) return
          designInfo.newDefinitionId = id
          proxy.search()
          showDesign(id)
        }
      )
      const authInfo = reactive({
        showAuthoDialog: false,
        flowKey: '',
      })
      //授权
      const openAuthoDialog = (flowKey: string) => {
        authInfo.showAuthoDialog = true
        authInfo.flowKey = flowKey
      }
      

      return {
        abUtil,
        query,
        bpmApi,
        authInfo,
        abAuthorization,
        openAuthoDialog,
        Delete,
        Edit,
        Search,
        Plus,
        RefreshRight,
        Download,
        Upload,
        designInfo,
        designShow,
        showDesign,
        closeDefinition,
      }
    },
  })
</script>
