<template>
  <div class="wrap">
    <h3>日历选择框</h3>
    <datepicker @change="updateDate" :value="date" :option="{timepicker:false, format: 'Y/m/d'}"></datepicker><br>
    选中日期：{{date}}
    <h3>时间选择框</h3>
    <datepicker @change="updateTime" :value="time"></datepicker><br>
    选中时间：{{time}}
  </div>
</template>

<script>
  import Datepicker from 'component/Datepicker.vue'
  import moment from 'moment'
  export default {
    components: {
      Datepicker
    },
    data() {
      return {
        date: '2008-8-8',
        time: '2016-8-8 15:30:31',
      }
    },
    methods: {
      updateDate(val){
        this.date = moment(val).format('YYYY-MM-DD')
      },
      updateTime(val){
        this.time = moment(val).format('YYYY-MM-DD HH:mm:ss')
      }
    }
  }
</script>
