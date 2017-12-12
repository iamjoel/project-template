<template>
  <el-col :md="{span:fill? 24 : 8}" class="j-edit-item" :class="{'j-edit-item--fill': fill}">
    <label v-if="!prop">
      <el-row>
        <el-col :md="{span:fill? 2:8}" class="j-edit-item__label">\{{label}}</el-col>
        <el-col :md="{span:fill? 22:16}" class="j-edit-item__input" >
          <slot></slot>
        </el-col>
      </el-row>
    </label>

    <el-form-item :label="label" :prop="prop" v-if="prop">
      <slot v-if="!isView"></slot>
      <div v-if="isView">\{{viewValue}}</div>
    </el-form-item>
  </el-col>
</template>
<script>
  export default {
    props: {
      label: String,
      prop: String,
      fill: Boolean,
      isView: Boolean,
      viewValue: null // 对值的类型不做限制
    }
  }
</script>
<style>
  .j-edit-item {
    flex-shrink: 0;
    margin-bottom: 10px;
    line-height: 37px;
    min-height: 37px;
    text-align: right;
  }
  .el-form-item {
    margin-right: 0;
    width: 100%;
  }
  .el-form-item__label {
    width: 33.33333%;
  }
  .el-form-item__content {
    width: 66.66667%;
  }
  .j-edit-item__label {
    padding-right: 10px;
    text-align: right;
  }
  @media all and (max-width:992px) {
    .j-edit-item__label {
      text-align: left;
    }
  }
  .el-select {
    width: 100%;
  }

  .j-edit-item--fill .el-form-item__label{
    width: 11%;
  }
  .j-edit-item--fill .el-form-item__content{
    width: 89%;
  }
</style>

