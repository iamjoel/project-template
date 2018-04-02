<template>
  <div class="main">
    {{model}}
    <br>
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
      <el-tab-pane label="列表字段" name="table">
        <div class="ly ly-r mb-10">
          <el-button type="primary" @click="model.table.push({
            label: '',
            key: '',
            formatFn: null,
            showFn: null
          })">添加字段</el-button>
        </div>
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
            <template  slot-scope="scope">
              <el-input v-model="scope.row.label" placeholder=""></el-input>
            </template>
          </el-table-column>
          <el-table-column
            prop="key"
            label="字段key"
            >
            <template  slot-scope="scope">
              <el-input v-model="scope.row.key" placeholder=""></el-input>
            </template>
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
              <el-select v-model="scope.row.showFn" placeholder="无" filterable clearable>
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
            label="操作"
            width="140"
            >
            <template slot-scope="scope">
              <el-button v-if="scope.$index > 0" size="small" type="info" @click="move('table', scope.$index, 'up')">上移</el-button>
              <el-button v-if="scope.$index < model.table.length - 1" size="small" type="info" @click="move('table', scope.$index, 'down')">下移</el-button>
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
        <div class="ly ly-r mb-10">
          <el-button type="primary" @click="model.searchCondition.push({
              label: '',
              key: '',
              dataType: 'string',
              dataSource: {
                type: '',
                key: ''
              }
          })">添加搜索条件</el-button>
        </div>
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
            <template  slot-scope="scope">
              <el-input v-model="scope.row.label" placeholder=""></el-input>
            </template>
          </el-table-column>
          <el-table-column
            prop="key"
            label="字段key"
            >
            <template  slot-scope="scope">
              <el-input v-model="scope.row.key" placeholder=""></el-input>
            </template>
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
          <el-table-column
            prop="key"
            label="操作"
            width="140"
            >
            <template slot-scope="scope">
              <el-button v-if="scope.$index > 0" size="small" type="info" @click="move('searchCondition', scope.$index, 'up')">上移</el-button>
              <el-button v-if="scope.$index < model.searchCondition.length - 1" size="small" type="info" @click="move('searchCondition', scope.$index, 'down')">下移</el-button>
            </template>
          </el-table-column>
        </el-table>
      </el-tab-pane>
      <el-tab-pane label="函数" name="fn">
        <div class="ly ly-r mb-10">
          <el-button type="primary" @click="model.fn.push({
              name: 'formatType',
              args: [],
              body: ''
          })">添加函数</el-button>
        </div>
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
            width="200"
            >
            <template slot-scope="scope">
              <el-input v-model="scope.row.name" placeholder=""></el-input>
            </template>
          </el-table-column>
          <el-table-column
            prop="key"
            label="参数"
            width="200"
            >
            <template slot-scope="scope">
              {{scope.row.args && scope.row.args.length > 0 ?  scope.row.args.map(arg=> arg && arg.name).join() : '无'}}
              <el-button @click="editArgs(scope.row)" size="small">编辑</el-button>
            </template>
          </el-table-column>
          <el-table-column
            prop="key"
            label="函数体"
            >
            <template slot-scope="scope">
              <el-input v-model="scope.row.body"
              type="textarea"
              :rows="2" placeholder="请输入内容" ></el-input>
            </template>
          </el-table-column>
        </el-table>
      </el-tab-pane>
    </el-tabs>
    <div class="ly ly-c mt-10">
      <el-button type="info" @click="generateExpend">下载展开代码</el-button>
      <el-button type="primary" @click="save">保存</el-button>
    </div>
    <el-dialog title="详情" :visible.sync="isShowEditArgsDialog">
      <div class="ly ly-r mb-10">
        <el-button type="primary" @click="currFn.args.push({
          name: ''
        })">添加参数</el-button>
      </div>
      <el-table
        :data="currFn.args"
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
          label="参数名"
          >
          <template slot-scope="scope">
            <el-input v-model="scope.row.name" placeholder=""></el-input>
          </template>
        </el-table-column>
        <el-table-column
          width="200"
          lable="操作"
          >
          <template slot-scope="scope">
            <el-button v-if="scope.$index > 0" size="small" type="info" @click="move('args', scope.$index, 'up')">上移</el-button>
            <el-button v-if="scope.$index < currFn.args.length - 1" size="small" type="info" @click="move('args', scope.$index, 'down')">下移</el-button>
            <el-button size="small" type="danger" @click="currFn.args.splice(scope.$index, 1)">删除</el-button>

          </template>
        </el-table-column>

      </el-table>
      <span slot="footer" class="dialog-footer">
        <el-button @click="isShowEditArgsDialog=false">关 闭</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script src="./update.js">

</script>

<style scoped></style>