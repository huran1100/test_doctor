
import $http from '../../../src/utils/axios'
const state = {

}

const mutations = {

}

const actions = {
  /**
   * 登录后台
   * @param {*} param0 
   */
  signIn({rootState}){
    let length = Object.values(rootState.form).length > 0 ? true : false
    let result = length && Object.values(rootState.form).every(item => item)
    if(result){
      $http.post('employee/Login.do',rootState.form ,res => {
        if(res.status == 0){
          setTimeout(()=>{
            window.$route.push({name:'index'})
          },1000)
        }
      } )
    }else{
      window._g.toastMsg({type:'error',msg:'请编辑必填项后提交'})
    }
  },

  signOut(){
    $http.post('employee/doLogout.do', {} ,res => {
      if(res.status == 0){
       setTimeout(()=>{
          window.$route.push({name:'signin'})
       },1000)
      }
    })
  }
}

const getters = {

}

export default {
  state , mutations , actions , getters
}