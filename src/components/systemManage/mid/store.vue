<template>
  <section class="wrapper">
    <section class="content">
      <search @inputChange="getStoresList({path:pathChange})" v-if="isShow" :name="$route.query.child || $route.query.subMenu" />
      <my-table v-if="isShow" :list="changeList"  header="true" :params=" $route.query.child ||$route.query.subMenu" >
        <span slot="title">{{ $route.query.child || $route.query.subMenu}}列表</span>
        <div slot="right">
            <my-button  ></my-button>
        </div>
      </my-table>
      <bottom :total="total" :currentPage="currentPage" />
    </section>
  </section>
</template>

<script>
import MyTable from '@/components/common/myTable'
import Search from '@/components/common/search'
import MyButton from '@/components/common/myButton'
import Bottom from '@/components/common/bottom'

import {mapActions , mapGetters , mapState} from 'vuex'
export default {
  name: 'store',
  components:{
    MyTable , 
    Search ,
    MyButton ,
    Bottom ,
  },
  data () {
    return {
      isShow:true,
    }
  },
  computed:{
    pathChange(){
      return  this.$route.query.child || this.$route.query.subMenu
    },
    ...mapGetters({
      'list':'formatStoreDataList',
      'changeList' : 'changeStateDataList',
    }),
    ...mapState({
      total:state => state.System.total,
      currentPage:state => state.System.currentPage,
    })
  },
  watch:{
    pathChange(){
      this.isShow = false
      this.getStoresList({path:this.pathChange})
      setTimeout(()=>{
        this.isShow = true
        this.$store.commit('clearSearchForm')
      })
    }
  },
  methods: {
    ...mapActions({
      'getStoresList':'getStoresList'
    }),
    inputChange(e){
      console.log(e)
    }
  },
  created(){
    this.getStoresList({path:this.pathChange})
  }
}
</script>

<style scoped lang='scss' >
.wrapper{
  .content{
    .right{
      height:60px;
    }
  }
}
</style>
