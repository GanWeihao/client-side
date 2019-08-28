<template>
  <div class="hello">

    <div class="daohang">
      <div class="danghang-row">
        <img @click="hrefone" src="../assets/return.png" style="width:30px;height:30px">
        <img  src="../assets/logo1.png" style="width:50px;height:50px;border-radius:70%;margin:0 auto;margin-top:-10px"/>
        <img src="../assets/sousuo.png" style="width:30px;height:30px">
      </div>
    </div>

     <div class="user">
       <div class="user-detail">
         <img class="user-img" :src="static+loginUserdetail.userHeadurl">
       </div>
       <div style="margin-left:20px;margin-top:10px">
         <p style="font-size:0.9rem">{{loginUserdetail.userName}}</p>
         <p style="font-size:0.6rem">粉丝：{{fensi}}人</p>
       </div>
     </div>

       <div class="user-caozuo1">
          <div @click="hreffabuArticle" style="padding-left: 20px">
            <img src="../assets/article.png" style="width:40px;height:40px">
            <p style="margin-top:-2px;font-size: 0.6rem">我的文章</p>
          </div>

         <div @click="hrefMyGuanzhu">
           <img src="../assets/guanzhu.png" style="width:40px;height: 40px">
           <p style="margin-top:-2px;font-size: 0.6rem">我的关注</p>
         </div>

         <div @click="hreffabuVideo" style="padding-right: 20px">
           <img src="../assets/shiping.png" style="width:40px;height: 40px">
           <p style="margin-top:-2px;font-size: 0.6rem">我的视频</p>
         </div>
       </div>


        <div class="user-caozuo2">
          <div @click="hrefhistoryvideo" style="padding-left: 20px">
            <img src="../assets/lookhistory.png" style="width:40px;height:40px">
            <p style="margin-top:-2px;font-size: 0.6rem">浏览历史</p>
          </div>

          <div @click="hrefshoucang">
            <img src="../assets/myshoucang.png" style="width:40px;height: 40px">
            <p style="margin-top:-2px;font-size: 0.6rem">我的收藏</p>
          </div>

          <div @click="hrefmessage" style="padding-right: 20px">
            <img src="../assets/mymessage.png" style="width:40px;height: 40px">
            <p style="margin-top:-2px;font-size: 0.6rem">我的消息</p>
          </div>

    </div>

    <div style="margin-top: 150px">
      <h3 style="opacity:0.3">我的taste部落</h3>
    </div>

      <!--左侧抽屉-->
      <div>
        <el-drawer
          size="70%"
          :visible.sync="drawer"
          :direction="direction"
          :before-close="handleClose">
          <div style="padding:0;width:100%;height:100%">
            <div  style="margin-top:15px;padding-left:24px;width:150px;height:80px;display:inline-flex;flex-direction:row;justify-content:space-between">
              <img style="width:50px;height:40px;padding-top:5px;border-radius:100%;overflow:hidden;" :src="static+loginUserdetail.userHeadurl">
              <!--                <li style="margin-left:10px;width:100%;height:15px;list-style:none;">登&nbsp&nbsp&nbsp录</li>-->
              <li style="padding-top:18px;margin-left:10px;width:100%;height:15px;list-style:none;">{{loginUserdetail.userName}}</li>
            </div>
            <el-divider></el-divider>
            <!--              <div style="width:100%;height:30px;background-color:#cccccc"><p>登录注册</p></div>-->
            <div style="margin-top:15px;padding-left:24px;width:150px;height:20px;display:inline-flex;flex-direction:row;justify-content:space-between">
              <li @click="hrefAllVideo" style="margin-left:10px;width:100%;height:15px;list-style:none;">视频</li>
            </div>

            <div v-for="item in categoryList" :key="item.categoryId" style="margin-top:15px;padding-left:24px;width:150px;height:20px;display:inline-flex;flex-direction:row;justify-content:space-between">
              <li @click="categoryArticle(item.categoryId)" style="margin-left:10px;width:100%;height:15px;list-style:none;">{{item.categoryName}}</li>
            </div>

          </div>
        </el-drawer>

      </div>
    </div>
</template>


<script>
  export default {
      name:'Own',
      data(){
          return{
              static:'http://114.116.238.138:9090/file/',
              drawer: false,
              direction: 'ltr',
              fensi:'',
              userId:this.$store.state.loginUserId,
              loginUserdetail:'',
              categoryList:[]
          }
      },
      created(){
        this.queryFensinumber();
        this.queryUserdetail();
        this.queryAllCategory();
      },
      methods:{
          //查询所有文章类别
          queryAllCategory(){
              var that=this;
              this.$axios.get("/category/queryall").then(response=>{
                  let result=response.data;
                  if(result.status==200){
                      that.categoryList=result.data;
                      console.log(that.categoryList);
                  }
              }).catch();
          },
          //根据用户ID查询用户详情
          queryUserdetail(){
              var that=this;
              this.$axios.get("/user/querybyid",{
                  params:{
                      userId:that.userId
                  }
              }).then(response=>{
                  let result=response.data;
                  if(result.status==200){
                      that.loginUserdetail=result.data;
                  }
              }).catch();
          },
          //页面跳转并将类别ID携带至下一页
          categoryArticle(categoryid){
              this.$router.push({
                  path:'/categoryArticle',
                  query:{
                      id:categoryid
                  }
              })
          },
          //查询粉丝数量
          queryFensinumber(){
            var that=this;
            this.$axios.get("/attention/fensi/querynum",{
                params:{
                    userId:that.userId
                }
            }).then(response=>{
                let result=response.data;
                if(result.status==200){
                    that.fensi=result.data;
                }
            }).catch();
          },
          handleClose(done) {
              done();
          },
          hrefone(){
              this.$router.go(-1);
          },
          hrefmessage(){
              this.$router.push({path:'/MyMessage'})
          },
          hrefhistoryvideo(){
              this.$router.push({path:'/lookHistoryVideo'})
          },
          hrefMyGuanzhu(){
              this.$router.push({path:'/MyGuanzhu'})
          },
          hrefAllVideo(){
              this.$router.push({path:'/AllVideo'})
          },
          hreffabuArticle(){
            this.$router.push({path:'/fabu'});
          },
          hrefshoucang(){
            this.$router.push({
                path:'/shoucang'
            })
          },
          hreflogin(){
              this.$router.push({
                  path:'/Login'
              });
          },
          hreffabuVideo(){
              this.$router.push({
                  path:'/Video'
              });
          }
      }
  }

</script>



<style>
  body{
    background-color:white;
  }
.chouti{
  margin-top:15px;
  padding-left:24px;
  width:150px;
  height:20px;
  display:inline-flex;
  flex-direction:row;
  justify-content:space-between
}

.user{
  display:flex;
  flex-direction:row;
  margin-top:72px;
  width:100%;
  height:100px;
  background-color:white
}
.user-detail{
  margin-left:20px;
  padding-top:10px;
  width:70px;
  height:70px;
}
.user-img{
  width:80px;
  height:80px;
  line-height:80px;
  border-radius:100%;
  overflow:hidden;
}
.user-caozuo1{
  margin-top:5px;
  padding-top:20px;
  display:flex;
  flex-wrap:wrap;
  min-width:100%;
  justify-content:space-between;
  background-color:white
}
.user-caozuo2{
  padding-top:10px;
  display:flex;
  flex-wrap:wrap;
  min-width:100%;
  justify-content:space-between;
  background-color:white
}

  p{
    color:black;
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

  h1, h2 {
    font-weight: normal;
  }
  .el-carousel__item h3 {
    color: #475669;
    font-size: 14px;
    opacity: 0.75;
    line-height: 150px;
    margin: 0;
  }

</style>
