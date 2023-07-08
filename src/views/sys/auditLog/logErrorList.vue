<template>
  <div class="comprehensive-table-container">
    <div ref="titleForm">
      <el-row class="vab-query-form">
        <el-col class="top-panel">
          <el-form
            ref="queryForm"
            :inline="true"
            :model="query"
            style="float: left"
            @submit.prevent
          >
            <el-form-item label="请求地址" label-width="90px" prop="url$VLK">
              <el-input v-model="query.url$VLK" placeholder="请输入请求地址" />
            </el-form-item>
            <el-form-item label="状态" label-width="62px" prop="status$VEQ">
              <el-select v-model="query.status$VEQ" placeholder="请选择状态">
                <el-option label="未检查" value="unchecked" />
                <el-option label="已检查" value="checked" />
                <el-option label="已修复" value="fixed" />
              </el-select>
            </el-form-item>
            <el-form-item label="异常描述" label-width="90px" prop="content$VLK">
              <el-input
                v-model="query.content$VLK"
                placeholder="请输入异常描述"
              />
            </el-form-item>

            <el-form-item>
              <el-button :icon="Search" type="primary" @click="search()">
                查询
              </el-button>
              <el-button :icon="RefreshRight" @click="reset()">重置</el-button>
            </el-form-item>
          </el-form>
        </el-col>
        <el-col class="left-panel">
          <el-space wrap>
            <el-button
              :disabled="!selectedData || selectedData.length == 0"
              :icon="Delete"
              type="danger"
              @click="delBySeletedIds(sysApi.sysAuditlog.logErrorRemove)"
            >
              批量删除
            </el-button>
          </el-space>
        </el-col>
      </el-row>
    </div>
    <!-- 关键字段设置minwith，特定枚举字段设置with（管理列、日期、状态、字典等），
         不重要字段放最后，管理列设置 fixed="right"
    -->
    <ab-table
      ref="abTable"
      v-model="selectedData"
      :height="tableHeight"
      :query-param="query"
      row-key="id"
      :url="sysApi.sysAuditlog.logErrorList"
    >
      <ab-column label="帐号" prop="account" width="80" />
      <ab-column label="IP地址" prop="ip" width="140" />
      <ab-column ab-template="param" label="IP归属" width="80" />
      <template #param="{ scope }">
        {{ scope.row.ipAddress ? scope.row.ipAddress : '-' }}
      </template>
      <ab-column
        ab-text-formatter="unchecked-未检查-danger-dark|checked-已检查-warning-dark|fixed-已修复-success-dark"
        label="状态"
        prop="status"
        width="85"
      />
      <ab-column label="请求地址" min-width="120" prop="url" />
      <ab-column label="出错信息" min-width="120" prop="content" />
      <ab-column label="出错时间" prop="createTime" width="160" />
      <ab-column ab-template="edit" fixed="right" label="操作" width="85" />
      <template #edit="{ scope }">
        <router-link
          :to="{
            name: 'LogErrorEdit',
            query: { id: scope.row.id },
          }"
        >
          <el-button text type="primary">编辑</el-button>
        </router-link>
      </template>
    </ab-table>
  </div>
</template>

<script lang="ts">
  import { abTableMix, sysApi } from 'agilebpm'
  export default {
    name: 'LogErrorList',
    mixins: [abTableMix],
  }
</script>

<script setup lang="ts">
  import { Delete, Search, Plus, RefreshRight } from '@element-plus/icons-vue'

  // 查询条件定义，如果ts 需要定义所有参数，这里覆盖父类，不是的话可以不用设置，父类已经定义了query 对象
  const query = reactive({
    url$VLK: '',
    status$VEQ: '',
    content$VLK: '',
  })
</script>
