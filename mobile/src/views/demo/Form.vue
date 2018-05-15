<template>
  <div class="main">
    <!-- 验证TODO -->
    <van-cell-group>
      <van-field 
        v-model="model.name"
        label="姓名"
        placeholder="请输入姓名"
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

    <van-cell-group>
       <van-switch-cell v-model="model.switch" title="开关" />
    </van-cell-group>

    <van-radio-group v-model="model.radio">
      <van-cell-group>
         <van-cell :title="'单选。选中:' + model.radio" />
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
         <van-cell :title="'复选。选中:' + model.checkbox.join()" />
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
    <van-actionsheet v-model="showSelect" :actions="waterList" />
  
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
    
  </div>
</template>

<script>
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
          name:'',
        },
        date: null,
      },

      showSelect: false,
      waterList: [{
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

      tempDate: null,
      showDatePicker: false,

      tempTime: null,
      showTimePicker: false,
    }  
  },
  methods: {
    checkboxClicked($event, selected, curr) {
      if(selected.indexOf(curr) !== -1) {
        selected.splice(selected.indexOf(curr), 1)
      } else {
        selected.push(curr)
      }
    },
    noop() {},
    selectFruit(curr) {
      this.model.select = curr
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
  }
}
</script>

<style scoped></style>