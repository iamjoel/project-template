import gql from 'graphql-tag'
export default {
  apollo: {
    user: gql`
      {
        ## id 的值如何用动态的值？
        user(id: 2) {
          name
        }
      }
    `,
    anotherUser: gql`
      {
        # 别名
        anotherUser: user(id: 3) {
          id
          name
        }
      }
    `
  },
  data () {
    return {
      user: {},
      anotherUser: {},
      activeTypeIndex: 0,
      searchInput: ''
    }
  },
  mounted () {},
  methods: {
    onSearch () {
      this.$showLoading()
      setTimeout(() => {
        this.$hideLoading()
      }, 2000)
    }
  }
}
