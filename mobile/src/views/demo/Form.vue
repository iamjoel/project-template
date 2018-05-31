<template>
  <div class="main form-page">
    <div class="ly ly-r mv-10">
      <a href="javascript:void(0);" @click="showForm = true" >弹出新表单</a>
    </div>
    <van-popup v-model="showForm" position="bottom">
      <div class="pb-20">
        <div class="van-hairline--top-bottom van-picker__toolbar">
          <div class="van-picker__cancel" @click="showForm = false">取消</div>
          <div class="van-picker__confirm" @click="showForm = false">确认</div>
        </div>

        <div>
          <van-cell-group>
            <van-field 
              v-model="model.name"
              label="文本框"
              placeholder="请输入文字"
            />
          </van-cell-group>

          <van-cell-group>
            <van-field 
              v-model="model.number"
              type="number"
              label="数字"
            />
          </van-cell-group>
        </div>
      </div>
      
    </van-popup>
    <!-- 验证TODO -->
    <van-cell-group>
      <van-field 
        v-model="model.name"
        label="文本框"
        placeholder="请输入文字"
        required
      />
    </van-cell-group>

    <van-cell-group>
      <van-field 
        v-model="model.number"
        type="number"
        label="数字"
        required
      />
    </van-cell-group>

    <van-cell-group>
      <van-field 
        v-model="model.textarea"
        type="textarea"
        label="文本域"
        placeholder="请输入xx"
        required
      />
    </van-cell-group>
    
    <!-- 上传图片 -->
    <van-cell-group>
      <van-cell title="上传图片">
        <van-uploader :after-read="upload">
          <van-icon name="photograph" />
        </van-uploader>
      </van-cell>
    </van-cell-group>

    <van-cell-group>
       <van-switch-cell v-model="model.switch" title="开关" />
    </van-cell-group>

    <van-radio-group v-model="model.radio">
      <van-cell-group>
         <van-cell :title="'单选标题。选中:' + model.radio" />
      </van-cell-group>
      <van-cell-group>
        <van-cell title="单选框 1" @click="model.radio = '1'">
          <van-radio name="1" />
        </van-cell>
        <van-cell title="单选框 2" @click="model.radio = '2'">
          <van-radio name="2" />
        </van-cell>
      </van-cell-group>
    </van-radio-group>
    <van-checkbox-group v-model="model.checkbox">
      <van-cell-group>
         <van-cell :title="'复选标题。选中:' + model.checkbox.join()" />
      </van-cell-group>
      <van-cell-group>
        <van-cell title="复选框 1" @click="checkboxClicked($event, model.checkbox, '1')">
          <!-- 冒泡后，自身处理一次，父元素处理一次 -> 导致保持原状 -->
          <div @click.stop="noop" class="d-ib">
            <van-checkbox name="1"/>
          </div>
        </van-cell>
        <van-cell title="复选框 2" @click="checkboxClicked($event, model.checkbox, '2')">
          <div @click.stop="noop" class="d-ib">
            <van-checkbox name="2" />
          </div>
        </van-cell>
      </van-cell-group>
    </van-checkbox-group>

    <!-- 下拉框 -->
    <van-cell-group>
      <van-cell title="下拉框" @click="showSelect = true">
        {{model.select.name}}
      </van-cell>
    </van-cell-group>
    <van-popup 
      v-model="showSelect"
      position="bottom"
    >
      <van-picker
        show-toolbar
        title=""
        :columns="fruitNameList"
        @cancel="showSelect = false"
        @confirm="selectFruit"
      />
    </van-popup>
    
  
    <!-- 日期 -->
    <van-cell-group>
      <van-cell title="日期" @click="showDatePicker = true">
        {{model.date | time}}
      </van-cell>
    </van-cell-group>

    <van-popup 
      v-model="showDatePicker"
      position="bottom"
    >
      <van-datetime-picker 
        type="date"
        v-model="tempDate"
        @confirm="selectedDate"
        @cancel="showDatePicker = false"
      />
    </van-popup>

    <!-- 时间 -->
    <van-cell-group>
      <van-cell title="时间" @click="showTimePicker = true">
        {{model.time}}
      </van-cell>
    </van-cell-group>

    <van-popup 
      v-model="showTimePicker"
      position="bottom"
    >
      <van-datetime-picker 
        type="time"
        v-model="tempTime"
        @confirm="selectedTime"
        @cancel="showTimePicker = false"
      />
    </van-popup>

    <!-- 选择城市 -->
    <van-cell-group>
      <van-cell title="选择城市" @click="showArea = true">
        {{model.area.name}}
      </van-cell>
    </van-cell-group>
    <van-popup 
      v-model="showArea"
      position="bottom"
    >
      <van-area 
        :area-list="areaList"
        v-model="tempArea"
        @confirm="selectedArea"
        @cancel="showArea = false" />
    </van-popup>
  </div>
</template>

<script>
import areaList from '@/assets/area'
export default {
  data() {
    return {
      model: {
        name: null,
        switch: null,
        radio: null,
        checkbox: [],
        checkbox2: [],
        select: {
          name: null,
        },
        date: null,
        area: {
          name: null,
          code: null
        }
      },
      showForm: false,

      showSelect: false,
      fruitList: [{
        id: 'water-melon',
        name: '西瓜',
        callback: this.selectFruit
      },{
        id: 'pear',
        name: '梨',
        callback: this.selectFruit
      },{
        id: 'apple',
        name: '苹果',
        callback: this.selectFruit
      }],
      fruitNameList: [],
      tempDate: null,
      showDatePicker: false,

      tempTime: null,
      showTimePicker: false,
      
      tempArea: null,
      showArea: false,
      areaList,
    }  
  },
  methods: {
    upload(file) {
      var formData = new FormData();
      formData.append('img', file.file)
      this.$http.post('/test/upload', formData)
    },
    checkboxClicked($event, selected, curr) {
      if(selected.indexOf(curr) !== -1) {
        selected.splice(selected.indexOf(curr), 1)
      } else {
        selected.push(curr)
      }
    },
    noop() {},
    selectFruit(curr) {
      this.model.select = this.fruitList.filter(item => item.name === curr)[0]
      this.showSelect = false
    },
    selectedDate() {
      this.model.date = this.tempDate
      this.showDatePicker = false
    },
    selectedTime() {
      this.model.time = this.tempTime
      this.showTimePicker = false
    },
    selectedArea(area) {
      if(area[0].code !== '-1' 
        && area[1].code !== '-1' 
        && area[2].code !== '-1') {
        this.model.area = {
          name: `${area[0].name}${area[1].name}${area[2].name}`,
          code: area[2].code
        }
        this.showArea = false
      } else {
        this.$toast('请选择城市')
      }
      
    },
  },
  mounted() {
    this.fruitNameList = this.fruitList.map(item => item.name)
  }
}
</script>

<style scoped>

</style>
<style>
/*增大点击范围*/
.form-page .van-uploader {
  width: 100%;
}
</style>