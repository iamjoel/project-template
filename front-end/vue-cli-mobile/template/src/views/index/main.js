import gql from 'graphql-tag'
export default {
  apollo: {
    user: gql`
      query {
        user(id: 2) {
          name,
        }
      }
    `,
    // anotherUser: gql`
    //   query {
    //     user(id: 3) {
    //       id,
    //       name,
    //     }
    //   }
    // `,
  },
  data() {
    return {
      user: {},
      anotherUser: {},
      activeTypeIndex: 0,
      searchInput: '',
    }  
  },
  mounted() {
    
  },
  methods: {
    onSearch() {
      this.$showLoading()
      setTimeout(()=> {
        this.$hideLoading()
      }, 2000)
    }
  },
}