import Expanding from '@/components/effect/Expanding'
export default {
  components: {
    Expanding
  },
  data() {
    return {
      isShowFilter: false,
      filterOpts: [{
          key: 'Sort',
          name: '智能排序',
          opts: [{
            value: null,
            label: '不限'
          }, {
            value: '1',
            label: '购买数量最多'
          }, {
            value: '2',
            label: '购买数量最少'
          }, {
            value: '3',
            label: '预约数量最多'
          }, {
            value: '4',
            label: '预约数量最少'
          }]
        }, {
          key: 'Distance',
          name: '距离',
          opts: [{
            value: null,
            label: '不限'
          }, {
            value: '1',
            label: '1公里'
          }, {
            value: '2',
            label: '3公里'
          }, {
            value: '3',
            label: '5公里'
          }, {
            value: '4',
            label: '5公里以上'
          }, ]
        },
        {
          key: 'Price',
          name: '价格',
          opts: [{
            value: null,
            label: '不限'
          }, {
            value: '1',
            label: '100'
          }, {
            value: '2',
            label: '300'
          }, {
            value: '3',
            label: '500'
          }, {
            value: '4',
            label: '500以上'
          }, ]
        }
      ],
      columns: [],
      filterValue: {
        Sort: null,
        Distance: null,
        Price: null
      },
      isShowFilter2: false,
    }
  },
  methods: {
    showFilter(key) {
      this.generatColumns(key)
      this.isShowFilter = true
    },
    showFilter2(key) {
      this.generatColumns(key)
      this.isShowFilter2 = true
    },
    selectedFilter(item) {
      this.filterValue[item.key] = item.value ? {
        label: item.label,
        value: item.value
      } : null
      this.isShowFilter = false
      this.isShowFilter2 = false
      this.$toast('重新加载列表')
    },
    generatColumns(key) {
      var currValue = this.filterValue[key] && this.filterValue[key].value
      this.columns = this.filterOpts
        .filter(item => item.key === key)[0].opts
        .map(item => {
          var res = {
            ...item,
            key,
            className: ''
          }
          if (item.value == currValue) {
            res.className = 'filter-item--active'
          }
          return res
        })
    },
  }
}
