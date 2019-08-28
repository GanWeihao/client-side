<template>
  <div>
    <div class="daohang">
      <div class="danghang-row">
        <img @click="hrefreturn()" src="../assets/return.png" style="width:30px;height:30px">
        <img src="../assets/logo1.png" style="width:50px;height:50px;border-radius:70%;margin:0 auto;margin-top:-10px"/>
        <img src="../assets/sousuo.png" style="width:30px;height:30px">
      </div>
    </div>


      <div style="margin:0 auto;width:360px;min-height:0px;background-color: aliceblue;border-radius:5px;margin-top:78px">
        <div>
          <p style="padding-top:10px;font-size: 0.8rem">{{messageDetail.messageTitle}}</p>
        </div>
        <el-divider></el-divider>
        <div style="padding-bottom:20px">
          <article style="font-size:0.6rem;padding-left:50px;text-align:left;text-indent:2em;line-height:25px">{{messageDetail.messageContent}}</article>
          <p style="font-size: 0.6rem;margin-left:180px;margin-bottom:10px">{{messageDetail.messageTime}}</p>
        </div>
      </div>
    </div>
</template>

<script>
  export default {
      name:'Messagedetail',
      data(){
          return{
              messageId:this.$route.query.id,
              messageDetail:''
          }
      },
      created(){
          this.queryMessageDetail();
      },
      methods:{
        //查询消息详情
        queryMessageDetail(){
          var that=this
          this.$axios.get("/message/querybyid",{
              params:{
                  messageId:that.messageId
              }
          }).then(response=>{
              let result=response.data;
              that.messageDetail=result.data;
          }).catch();
        },
        hrefreturn(){
            this.$router.go(-1);
        }
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
    padding-top: 20px;
  }
  .danghang-row{
    display:flex;
    flex-direction:row;
    margin: 0 auto;
    width:100%;
    height:50px;
  }

</style>
