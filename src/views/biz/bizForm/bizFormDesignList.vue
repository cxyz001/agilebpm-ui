<template>
  <div class="common-layout">
    <el-container>
      <el-aside class="left-tree">
        <ab-dict-tree
          v-model="query['a.typeCode$VEQ']"
          type-code="biz"
          @node-click="searchResetPage()"
        />
      </el-aside>
      <el-main>
        <div class="comprehensive-table-container">
          <div ref="titleForm">
            <!--查询区域-->
            <el-row>
              <el-col class="top-panel" :span="24">
                <el-form ref="queryForm" :inline="true" :model="query">
                  <el-form-item
                    label="名称"
                    label-width="62px"
                    prop="a.name$VLK"
                  >
                    <el-input
                      v-model="query['a.name$VLK']"
                      placeholder="请输入名称"
                    />
                  </el-form-item>
                  <el-form-item
                    label="编码"
                    label-width="62px"
                    prop="a.code$VLK"
                  >
                    <el-input
                      v-model="query['a.code$VLK']"
                      placeholder="请输入编码"
                    />
                  </el-form-item>
                  <el-form-item>
                    <el-button :icon="Search" type="primary" @click="search()">
                      查询
                    </el-button>
                    <el-button :icon="Refresh" @click="reset()">重置</el-button>
                  </el-form-item>
                </el-form>
              </el-col>
            </el-row>
            <!--按钮区域-->
            <el-button :icon="Plus" type="primary" @click="diy">
              表单设计
            </el-button>
          </div>
          <!--列表区域-->
          <ab-table
            ref="abTable"
            v-model="selectedData"
            :checkable="true"
            :height="tableHeight"
            highlight-current-row
            :query-param="query"
            row-key="id"
            :url="bizApi.bizForm.BizFormDesignListVOJson"
          >
            <ab-column label="名称" min-width="200" prop="name" />
            <ab-column label="编码" min-width="120" prop="code" />
            <ab-column
              ab-text-formatter="byBo-专业-success-dark|diyBo-简单-warning-dark"
              label="模式"
              prop="mode"
              width="80"
            />
            <ab-column
              ab-date-formatter="yyyy-MM-dd"
              label="更新时间"
              prop="updateTime"
              width="150"
            />
            <ab-column label="更新人" min-width="120" prop="operator" />
            <ab-column
              ab-template="edit"
              fixed="right"
              label="操作"
              width="320"
            />
            <template #edit="{ scope }">
              <el-button text type="primary" @click="open(scope.row)">
                设计
              </el-button>
              <el-button
                v-if="scope.row.pcFormCode"
                text
                type="primary"
                @click="previewPc(scope.row.pcFormCode)"
              >
                预览
              </el-button>
              <a style="cursor: pointer">
                <biz-permission
                  :bo-codes="scope.row.boCode"
                  type="form"
                  :value="scope.row.pcFormCode"
                >
                  PC端权限
                </biz-permission>
              </a>
            </template>
          </ab-table>
        </div>
      </el-main>
    </el-container>
  </div>
</template>

<script>
  import { ElMessage } from 'element-plus'
  import { abTableMix, abDictTree, bizApi, sysApi, abTools } from 'agilebpm'
  import { Search, Refresh, Plus, ArrowDown } from '@element-plus/icons-vue'
  import BizPermission from '@/views/biz/bizObject/bizPermission.vue'

  export default {
    components: { BizPermission, abDictTree },
    mixins: [abTableMix],
    setup() {
      return {
        bizApi,
        abDictTree,
        Search,
        Refresh,
        Plus,
        ArrowDown,
        sysApi,
        abTools,
      }
    },
    data() {
      return {
        mobileUrl: '',
      }
    },
    created() {},
    methods: {
      add(data) {
        if (data.length == 0) {
          ElMessage({
            message: '请选择业务对象',
            type: 'warning',
          })
          return
        }
        window.open(
          `/formDesigner?boCode=${data[0].code}&typeCode=${
            this.query['a.typeCode$VEQ'] || ''
          }`
        )
      },
      diy() {
        window.open(
          `/formDesigner?mode=diyBo&typeCode=${
            this.query['a.typeCode$VEQ'] || ''
          }`
        )
      },
      open(row) {
        window.open(
          `/formDesigner?id=${row.id}&mode=${row.mode}&typeCode=${
            this.query['a.typeCode$VEQ'] || ''
          }`
        )
      },
      previewPc(code) {
        window.open(`/bizForm/preview/${code}?del=1`)
      },
    },
  }
</script>
