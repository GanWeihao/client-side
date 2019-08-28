<template>
  <div  >
    <div class="daohang">
      <div class="danghang-row">
        <img @click="hrefreturn()" src="../assets/return.png" style="width:30px;height:30px">
        <img src="../assets/logo1.png" style="width:50px;height:50px;border-radius:70%;margin:0 auto;margin-top:-10px"/>
        <img src="../assets/sousuo.png" style="width:30px;height:30px">
      </div>

      <div style="margin-top:-38px">
        <div style="width:100%;height:320px;margin: 0 auto">
        <div style="width:100%;height:300px;display:flex;flex-direction:row">
          <video
            id="frist"
            :src="static+Video.videoUrl"
            controls ="true"
            preload="metadata"
            autoplay="true"
            style="width:100%;height:300px">
          </video>
        </div>
        <div style="width:100%;height:120px;display:flex;flex-direction:column;border-radius:5px;background-color:floralwhite;justify-content:space-between;margin-top:-38px">
          <div style="display: flex;flex-direction: row;">
            <img style="width:40px;height:40px;border-radius:50%;margin-top:5px;margin-left: 5px" :src="static+userDeatail.userHeadurl">
            <p style="padding-left:5px;padding-top:5px;font-size:0.8rem">{{userDeatail.userName}}</p>

          </div>
          <div style="width:100%;height:70px;margin-top:-50px">
              <p style="padding-left:5px;text-align:left;font-size:0.8rem">{{Video.videoTitle}}</p>
              <p style="padding-left:5px;text-align:left;font-size:0.6rem;text-indent:2em">{{Video.videoContent}}</p>
            <img @click="insertVideoshoucang" style="margin-top:-50px;width:30px;height:30px;float:right" src="../assets/收藏.png">
          </div>
        </div>
      </div>
      </div>
      <hr style="margin-top: 60px">

      <div style="margin-top:-10px;width:100%;height:15px;">
        <p style="text-align:left;padding-left:10px">热门评论</p>
      </div>

      <!--评论区域-->
      <div style="overflow-y:scroll;margin:0 auto;">
        <div v-for="item1 in pinglun" :key="item1.videoCommentId" style="width:100%;min-height:100px;padding-top: 20px;border-bottom:1px solid #d3dce6;">
          <div style="display:flex;flex-direction:row;justify-content:space-between">
            <div style="display:flex;flex-direction:row;">
              <img style="margin-left:20px;margin-top:10px;width:30px;height:30px;border-radius:50%" :src="static+item1.user.userHeadurl">
              <p style="font-size: 0.6rem;padding-left:5px;padding-top:8px;text-align:left">{{item1.user.userName}}</p>
            </div>
            <div>
              <p style="font-size: 0.6rem;padding-right:10px;padding-top:5px">{{item1.videoCommentTime}}</p>
            </div>
          </div>
          <div style="width:96%"><!--评论-->
            <p style="font-size:0.6rem;text-align:left;text-indent:2em;padding-left:20px;padding-bottom:5px">{{item1.videoCommentContent}}</p>
          </div>
        </div>
        <div class="foot" style="margin-bottom:-7.5px;display:flex;flex-direction:row">
          <el-input v-model="input" placeholder="请输入内容"></el-input>
          <el-button @click="insertVideoPinlun" type="success" style="margin-bottom:-7px;width:50px;height:30px;">发送</el-button>
        </div>

      </div>

    </div>


  </div>

</template>


<script>
  export default {
      name:'videoDetail',
      data(){
        return{
            static:'http://114.116.238.138:9090/file/',
            videoId:this.$route.query.id,
            Video:'',
            userDeatail:'',
            pinglun:[],
            input:'',
            userId:this.$store.state.loginUserId
        }
      },
      created() {
          this.queryVideoDetail();
          this.queryVideopinglun();
      }
      ,
      methods:{
        //添加视频浏览记录
        insertVideoBrowse(){
          var that=this;
          let params=this.$qs.stringify({
              videoBroweUserId:that.userId,
              VideoBroweVideoId:that.videoId
          });
          this.$axios.post("/videobrowse/insert",params).then(response=>{
              let result=response.data;
              if(result.status==200){
                  console.log("成功");
              }
          }).catch();
        },
        //视频收藏
        insertVideoshoucang(){
          var that=this;
          let params=this.$qs.stringify({
              videoCollectVideoId:that.videoId,
              videoCollectUserId:that.userId
          });
          this.$axios.post("/videocollect/insert",params).then(response=>{
              let result=response.data;
              if(result.status==200){
                  console.log("收藏视频成功");
              }
          }).catch();
        },

          //用户评论视频
        insertVideoPinlun(){
          var that=this;
          let params=this.$qs.stringify({
              videoCommentUserId:that.userId,
              videoCommentVideoId:that.videoId,
              videoCommentContent:that.input
          });
          this.$axios.post("/videocomment/insert",params).then(response=>{
              let result=response.data;
              if(result.status==200){
                  this.queryVideoDetail();
                  this.queryVideopinglun();
                  that.input=""
                  console.log("评论视频成功")
              }
          }).catch();
        },
          //根据视频ID查询视频评论
        queryVideopinglun(){
          var that=this;
          this.$axios.get("/videocomment/query/videoid",{
              params:{
                  videoId:that.videoId
              }
          }).then(response=>{
              let result=response.data;
              if(result.status==200){
                  that.pinglun=result.data;
              }
          }).catch();
        },
          //根据视频ID查询视频详情
        queryVideoDetail(){
            var that=this;
            this.$axios.get("/video/querybyid",{
                params:{
                    videoId:that.videoId
                }
            }).then(response=>{
                let result=response.data;
                if(result.status==200){
                    that.Video=result.data;
                    this.queryVideopinglunUser(that.Video.videoUserId);
                    this.insertVideoBrowse();
                }
            }).catch();
        },
          //根据用户id查询评论用户详情
          queryVideopinglunUser(id){
              var that=this;
              this.$axios.get("/user/querybyid",{
                  params:{
                      userId:id
                  }
              }).then(response=>{
                  let result=response.data;
                  if(result.status==200){
                      that.userDeatail=result.data;
                      console.log(that.userDeatail);
                  }
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
  .foot{
    position: fixed;
    bottom:0;
    z-index: 9999;
    height: 40px;
    width: 100%;
  }
</style>
