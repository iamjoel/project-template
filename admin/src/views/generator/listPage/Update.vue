<template>
  <div class="main">
    {{model}}
    <br>
    <!-- {{opList}} -->
    <div class="ly ly-r">
      <el-button>下载配置</el-button>
      <el-button>下载展开代码</el-button>
    </div>
    <el-tabs v-model="activeTab" >
      <el-tab-pane label="基本设置" name="basic">
        <el-form :inline="true" :model="model.basic"  label-position="right" >
        <el-row type="flex" justify="start" class="multi-line">
          <j-edit-item
            label="实体" prop="name">
            <el-select v-model="model.basic.entity" placeholder="请选择" filterable clearable>
              <el-option
                v-for="item in $store.state.entities"
                :key="item.key"
                :label="item.label"
                :value="item.key">
              </el-option>
            </el-select>
          </j-edit-item>
        </el-row>
      </el-form>
      </el-tab-pane>
      <el-tab-pane label="列表字段" name="list">
        <el-table
          :data="model.table"
          border
          stripe>
          <el-table-column
            type="index"
            label="序列"
            align="center"
            width="80">
          </el-table-column>
          <el-table-column
            prop="label"
            label="显示名称"
            >
          </el-table-column>
          <el-table-column
            prop="key"
            label="字段key"
            >
          </el-table-column>
          <el-table-column
            prop="key"
            label="格式化函数"
            >
            <template slot-scope="scope">
              <el-select v-model="scope.row.formatFn" placeholder="无" filterable clearable>
              <el-option
                v-for="item in model.fn"
                :key="item.name"
                :label="item.name"
                :value="item.name">
              </el-option>
            </el-select>
            </template>
          </el-table-column>
          <el-table-column
            prop="key"
            label="显示函数"
            >
            <template slot-scope="scope">
              <el-select v-model="scope.row.isShowEdit" placeholder="无" filterable clearable>
              <el-option
                v-for="item in model.fn"
                :key="item.name"
                :label="item.name"
                :value="item.name">
              </el-option>
            </el-select>
            </template>
          </el-table-column>
        </el-table>
      </el-tab-pane>
      
      <el-tab-pane label="操作" name="op">
        <el-table
          :data="opList"
          border
          stripe>
          <el-table-column
            type="index"
            label="序列"
            align="center"
            width="80">
          </el-table-column>
          <el-table-column
            prop="label"
            label="名称"
            >
          </el-table-column>
          <el-table-column
            prop="是否显示"
            label="op"
            >
            <template slot-scope="scope">
              <el-select v-model="scope.row.showType" placeholder="无" filterable clearable>
              <el-option
                v-for="item in opShowType"
                :key="item.key"
                :label="item.label"
                :value="item.key">
              </el-option>
            </el-select>
            </template>
          </el-table-column>
          <el-table-column
            prop="key"
            label="显示角色"
            >
            <template slot-scope="scope">
              <div v-if="scope.row.showType === 'roles'" >
                <el-select v-model="scope.row.showRoles" placeholder="所有角色" multiple filterable clearable>
                  <el-option
                    v-for="item in $store.state.roles"
                    :key="item.key"
                    :label="item.label"
                    :value="item.key">
                  </el-option>
                </el-select>
              </div>
              <div v-else>所有角色</div>
            </template>
          </el-table-column>
          
        </el-table>
      </el-tab-pane>
      <el-tab-pane label="搜索条件" name="searchCondition">
        <el-table
          :data="model.searchCondition"
          border
          stripe>
          <el-table-column
            type="index"
            label="序列"
            align="center"
            width="80">
          </el-table-column>
          <el-table-column
            prop="label"
            label="名称"
            >
          </el-table-column>
          <el-table-column
            prop="key"
            label="字段key"
            >
          </el-table-column>
          <el-table-column
            prop="key"
            label="类型"
            >
            <template slot-scope="scope">
              <el-select v-model="scope.row.dataType" placeholder="字符串" filterable clearable>
              <el-option
                v-for="item in searchConditionDataType"
                :key="item.key"
                :label="item.label"
                :value="item.key">
              </el-option>
            </el-select>
            </template>
          </el-table-column>
          <el-table-column
            prop="key"
            label="数据来源类型"
            >
            <template slot-scope="scope">
              <div v-if="scope.row.dataType === 'select'">
                <el-select v-model="scope.row.dataSource.type" placeholder="无" filterable clearable>
                  <el-option
                    v-for="item in searchConditionDataSourceType"
                    :key="item.key"
                    :label="item.label"
                    :value="item.key">
                  </el-option>
                </el-select>
              </div>
              <div v-else>无</div>
            </template>
          </el-table-column>
          <el-table-column
            prop="key"
            label="数据来源"
            >
            <template slot-scope="scope">
              <div v-if="scope.row.dataType === 'select'">
                <el-select v-model="scope.row.dataSource.key" placeholder="无" filterable clearable>
                  <el-option
                    v-for="item in getDataResource(scope.row.dataSource.type)"
                    :key="item.key"
                    :label="item.label"
                    :value="item.key">
                  </el-option>
                </el-select>
              </div>
              <div v-else>无</div>
            </template>
          </el-table-column>
        </el-table>
      </el-tab-pane>
      <el-tab-pane label="函数" name="fn">
        <el-table
          :data="model.fn"
          border
          stripe>
          <el-table-column
            type="index"
            label="序列"
            align="center"
            width="80">
          </el-table-column>
          <el-table-column
            prop="name"
            label="函数名"
            width="100"
            >
          </el-table-column>
          <el-table-column
            prop="key"
            label="参数"
            width="200"
            >
            <template slot-scope="scope">
              {{scope.row.args && scope.row.args.length > 0 ?  scope.row.args.join() : '无'}}
              <el-button>编辑</el-button>
            </template>
          </el-table-column>
          <el-table-column
            prop="key"
            label="函数体"
            type="textarea"
            :rows="2"
            >
            <template slot-scope="scope">
              <el-input v-model="scope.row.body" placeholder="请输入内容" ></el-input>
            </template>
          </el-table-column>
        </el-table>
      </el-tab-pane>

    </el-tabs>
    
  </div>
</template>

<script src="./update.js">

</script>

<style scoped></style>