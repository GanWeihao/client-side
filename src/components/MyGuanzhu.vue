<template>
<div>
  <div class="daohang">
    <div class="danghang-row">
      <img @click="hrefreturn"  src="../assets/return.png" style="width:30px;height:30px">
      <img src="../assets/logo1.png" style="width:50px;height:50px;border-radius:70%;margin:0 auto;margin-top:-10px"/>
      <img src="../assets/sousuo.png" style="width:30px;height:30px">
    </div>
  </div>
  <div style="margin-top:70px;background-color:aliceblue">
  <div style="display:flex;flex-direction:column;min-height:780px;">
    <div style="display:flex;flex-direction:row;justify-content: space-between;background-color:#f4f4f4">
      <p style="padding-left:20px;font-size:0.8rem">我的关注</p>
      <p v-if="kuang=='false'" @click="exit" style="font-size:0.9rem;margin-top:2px;padding-right:10px">编辑</p>
      <p v-if="kuang=='true'" @click="noexit" style="font-size:0.9rem;margin-top:2px;padding-right:10px">取消编辑</p>
    </div>
    <div v-for="item in GuanzhuUser" :key="item.userId" style="width:94%;height:150px;background-color:white;display:flex;flex-direction:row;justify-content:space-between;border-radius:10px;margin: 0 auto;margin-top:5px">
      <el-checkbox v-if="kuang=='true'" style="margin-bottom: 10px;float: left;padding-left:20px;width:10px;height:10px" @change="chooseCardGrade(item.userId)"></el-checkbox>
      <div style="width:100px;height:100px;">
        <img style="margin-left: 20px;margin-top:20px;width:100px;height:100px;border-radius:50%" :src="static+item.userHeadurl">
      </div>
      <div style="margin-left:40px;margin-top:20px;width:1600px;min-height:100px">
        <p style="font-size:0.8rem;text-align: left">用户名：{{item.userName}}</p>
        <p style="font-size:0.8rem;text-align: left">用户邮箱：{{item.userEmail}}</p>
        <p v-if="item.userRank==1" style="font-size:0.8rem;text-align: left">身份：皇爵</p>
        <p v-if="item.userRank==2" style="font-size:0.8rem;text-align: left">身份：伯爵</p>
      </div>
    </div>
  </div>
  </div>
  <div v-if="kuang=='true'" style="background-color: #f4f4f4;position:fixed;bottom:0;z-index:9999;;width:100%;height:40px;" label="btt">
    <img @click="noexit" style="padding-left: 100px;padding-top:3px;float:left;width:30px;height:30px" src="../assets/quxiao.png">
    <img @click="deleteBroseVideolist" style="padding-right: 100px;padding-top:3px;float:right;width:30px;height:30px" src="../assets/delete.png">
  </div>
</div>


</template>


<script>

  export default {
      name:'MyGuanzhu',
      data(){
          return{
              kuang:'false',
              GuanzhuUser:[],
              static:"http://114.116.238.138:9090/file/",
              userId:this.$store.state.loginUserId,
              listBrosevideoID:[]
          }
      },
      created(){
          this.queryeryGuanzhu();
      },
      methods:{
          //查询我的所有关注
          queryeryGuanzhu(){
              var that=this;
              this.$axios.get("/user/attention/query/userid",{
                  params:{
                      userId:that.userId
                  }
              }).then(response=>{
                  let result=response.data;
                  if(result.status==200){
                      that.GuanzhuUser=result.data
                  }
              }).catch();
          },
          //批量删除浏览记录
          deleteBroseVideolist(){
              var that=this;
              for(let i=0;i<=that.listBrosevideoID.length;i++){
                  this.deleteGuanzhu(that.listBrosevideoID[i]);
                  this.queryeryGuanzhu();
              }
              that.kuang='false';
          },
          deleteGuanzhu(id){
              var that=this;
              this.$axios.get("/attention/delete",{
                  params:{
                      attentionUserId:that.userId,
                      attentionTouserId:id
                  }
              }).then(response=>{
                  let result=response.data;
                  if(result.status==200){
                      console.log("删除成功")
                  }
              }).catch();
          }
          ,

          hrefreturn(){
              this.$router.go(-1);
          },
          exit(){
              var that=this;
              that.kuang='true'
          },
          noexit(){
              var that=this;
              that.kuang='false'
          },
          //存入到数组
          chooseCardGrade(id){
              var that=this;
              that.listBrosevideoID.push(id);
              console.log(that.listBrosevideoID);
          },
      }
  }

</script>


<style>
  .daohang{
    position: fixed;
    top: 0;
    z-index: 9999;
    background-color:#f4f4f4;
    width:100%;
    height:50px;
    padding-top:20px;
  }
  .danghang-row{
    display:flex;
    flex-direction:row;
    background-color:#f4f4f4;
    margin: 0 auto;
    width:100%;
    height:50px;
  }

  body{
  }

</style>
