<template>
  <div>
    <div class="daohang">
      <div class="danghang-row">
        <img @click="hrefOwn()" src="../assets/return.png" style="width:30px;height:30px">
        <img src="../assets/logo1.png" style="width:50px;height:50px;border-radius:70%;margin:0 auto;margin-top:-10px"/>
        <img src="../assets/sousuo.png" style="width:30px;height:30px">
      </div>
    </div>

    <div style="max-height:780px;margin-top:70px">
      <div style="background-color:aliceblue"><p style="font-size:0.9rem">消息通知</p></div>

      <div style="display:flex;flex-direction: column;">
        <div v-for="item in MessageList" :key="item.messageId" style="width:380px;height:100px;background-color:beige;margin:0 auto;border-radius:5px;margin-top:5px;">
          <div @click="hrefMessagedetail(item.messageId)" style="font-size:0.8rem;display:flex;flex-direction:row;justify-content:space-between">
            <p style="padding-left:5px">{{item.messageTitle}}</p>
            <p style="padding-right: 5px">{{item.messageTime}}</p>
          </div>
          <p style="font-size:0.6rem">{{item.messageContent}}</p>
        </div>
      </div>
    </div>
  </div>




</template>

<script>
  export default {
      name:'MyMessage',
      data(){
          return{
              drawer: false,
              direction: 'ltr',
              MessageList:[]
          }
      },
      created(){
        this.queryAllMessage();
      },
      methods:{
          //查询登录用户所有的消息
          queryAllMessage(){
              var that=this;
              this.$axios.get("/message/queryall",{
                  params:{
                      userId:2,
                      pageNum:1,
                      pageSize:200
                  }
              }).then(response=>{
                  let result=response.data;
                  if(result.status==200){
                      that.MessageList=result.data.list;
                  }
              }).catch();
          },
          hrefone(){
              this.$router.push({path:'/'})
          },
          hrefOwn(){
              this.$router.go(-1);
          },
          hrefMessagedetail(messageId){
              this.$router.push({
                  path:'/Messagedetail',
                  query:{
                      id:messageId
                  }
              })
          }
      }

  }

</script>


<style>
  body{
    background-color:aliceblue;
  }
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
