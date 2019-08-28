<template>
  <div>
    <div class="daohang">
      <div class="danghang-row">
        <img @click="hrefOwn()" src="../assets/return.png" style="width:30px;height:30px">
        <img src="../assets/logo1.png" style="width:50px;height:50px;border-radius:70%;margin:0 auto;margin-top:-10px"/>
        <img src="../assets/sousuo.png" style="width:30px;height:30px">
      </div>
    </div>

    <div style="margin-top:65px;background-color:aliceblue">
      <el-tabs v-model="activeName" type="card" stretch="stretch" @tab-click="handleClick">
        <el-tab-pane label="资讯"  name="first">
          <div style="background-color:#f4f4f4;width:100%;height:30px;display: flex;flex-direction:row;justify-content: space-between;margin-bottom:0px">
            <p style="font-size:0.9rem;margin-top:2px;padding-left:10px">共{{VideoNum}}条</p>
            <p v-if="kuang1=='false'" @click="exit1" style="font-size:0.9rem;margin-top:2px;padding-right:10px">编辑</p>
            <p v-if="kuang1=='true'" @click="noexit1" style="font-size:0.9rem;margin-top:2px;padding-right:10px">取消编辑</p>
          </div>

          <div  style="display:flex;flex-direction:column;min-height:780px;">
            <div v-for="item1 in ArticleHistoryList" :key="item1.articleBrowseId" style="width:94%;height:150px;background-color:white;border-radius:10px;margin: 0 auto;margin-top:5px">
                <div style="width:100%;height:100px;display:flex;flex-direction:column;">
                  <el-checkbox v-if="kuang1=='true'" style="margin-bottom: 10px;float: left;padding-left:20px;width:10px;height:10px" @change="chooseCardGrade1(item1.articleBrowseId)"></el-checkbox>
                  <p style="text-align: center;font-size:1.0rem;padding-top:20px">{{item1.article.articleTitle}}</p>
                  <p style="text-align: right;font-size: 0.6rem;padding-right:20px;padding-top:10px">{{item1.articleBrowseTime}}</p>
                </div>
            </div>
          </div>
          <div v-if="kuang1=='true'" style="background-color: #f4f4f4;position:fixed;bottom:0;z-index:9999;;width:100%;height:40px;" label="btt">
            <img @click="noexit1" style="padding-left: 100px;padding-top:3px;float:left;width:30px;height:30px" src="../assets/quxiao.png">
            <img @click="deleteBroseArticlelist" style="padding-right: 100px;padding-top:3px;float:right;width:30px;height:30px" src="../assets/delete.png">
          </div>

        </el-tab-pane>

        <el-tab-pane label="视频"  name="second">
          <div style="background-color:#f4f4f4;width:100%;height:30px;display: flex;flex-direction:row;justify-content: space-between;margin-bottom:0px">
              <p style="font-size:0.9rem;margin-top:2px;padding-left:10px">文章</p>
              <p v-if="kuang=='false'" @click="exit" style="font-size:0.9rem;margin-top:2px;padding-right:10px">编辑</p>
              <p v-if="kuang=='true'" @click="noexit" style="font-size:0.9rem;margin-top:2px;padding-right:10px">取消编辑</p>
          </div>
          <div v-for="item in VideoList" :key="item.videoBrowseId"  style="width:100%;height:300px;border-radius:10px;margin:0 auto;margin-top:5px;margin-bottom:30px">
            <div style="width:100%;height:220px;">
              <el-checkbox v-if="kuang=='true'" style="margin-bottom: 10px;float: left;padding-left:20px;width:10px;height:10px" @change="chooseCardGrade(item.videoBrowseId)"></el-checkbox>
              <video
                id="frist"
                :src="static+item.video.videoUrl"
                preload="metadata"
                style="width:100%;height:220px">
              </video>
              <div style="position: relative;margin-top:-140px">
                <img @click="hrefVideoDetail(item.video.videoId)" src="../assets/playVideo.png">
              </div>
            </div>
            <div style="margin-top:0px;background-color: floralwhite;width:100%;height:70px;display:flex;flex-direction:row;justify-content: space-between;;margin-top:15px">
              <p style="color:#333333;padding-left:20px;font-size:0.8rem">{{item.video.videoTitle |to-short}}</p>
              <p style="color:#333333;padding-right:20px;;font-size:0.8rem">{{item.videoBrowseTime |to-short}}</p>
            </div>
            <div v-if="kuang=='true'" style="background-color: #f4f4f4;position:fixed;bottom:0;z-index:9999;;width:100%;height:40px;" label="btt">
              <img @click="noexit" style="padding-left: 100px;padding-top:3px;float:left;width:30px;height:30px" src="../assets/quxiao.png">
              <img @click="deleteBroseVideolist" style="padding-right: 100px;padding-top:3px;float:right;width:30px;height:30px" src="../assets/delete.png">
            </div>

            <el-divider></el-divider>
          </div>
        </el-tab-pane>
      </el-tabs>
    </div>

  </div>

</template>


<script>

export default {
    name:'lookHistoryVideo',
    data(){
        return{
            activeName: 'first',
            ArticleHistoryList:[],
            static:'http://114.116.238.138:9090/file/',
            userId:this.$store.state.loginUserId,
            VideoList:[],
            kuang:'false',    //显示复选框
            listBrosevideoID:[],
            userId:this.$store.state.loginUserId,
            VideoNum:'',
            kuang1:'false',
            Articlelist:[]
        }
    },
    created(){
        this.queryArticleHistory();
        this.queryVideoHistoryAll();
        this.tongjiVideoNum();
    },
    methods:{
        //查询用户文章浏览记录
      queryArticleHistory(){
        var that=this;
        this.$axios.get("/articlebrowse/querybyid",{
            params:{
                articleBrowseUserId:that.userId
            }
        }).then(response=>{
            let result=response.data;
            if(result.status==200){
                  that.ArticleHistoryList=result.data;
            }
        }).catch();
      },
      //查询用户视频浏览记录
      queryVideoHistoryAll(){
        var that=this;
        this.$axios.get("/videobrowse/querybyid",{
            params:{
                userId:that.userId,
                pageNum:1,
                pageSize:2000
            }
        }).then(response=>{
            let result=response.data;
            if(result.status==200){
                that.VideoList=result.data.list;
            }
        }).catch();
      },

      hrefVideo(){
        this.$router.push({path:'/videoDetail'})
      },
      handleClick(tab, event) {
            console.log(tab, event);
      },
      hrefOwn(){
          this.$router.go(-1);
      },
        //跳转至视频详情页
        hrefVideoDetail(videoid){
            this.$router.push({
                path:'/videoDetail',
                query:{
                    id:videoid
                }
            })
        },

        exit(){
          var that=this;
          that.kuang='true'
        },
        noexit(){
            var that=this;
            that.kuang='false'
        },
        exit1(){
            var that=this;
            that.kuang1='true'
        },
        noexit1(){
            var that=this;
            that.kuang1='false'
        },
        //向数组存储文章浏览ID
        chooseCardGrade1(id){
            var that=this;
            that.Articlelist.push(id);
        },
        //向数组存储视频浏览ID
        chooseCardGrade(id){
          var that=this;
              that.listBrosevideoID.push(id);
              console.log(that.listBrosevideoID);
        },
        //删除文章浏览记录
        deleteBroseArticle(id){
            var that=this;
            this.$axios.get("/articlebrowse/delete",{
                params:{
                    articleBrowseId:id
                }
            }).then(response=>{
                let result=response.data;
                if(result.status==200){
                    console.log("删除成功");
                }
            }).catch();
        },
        //删除视频浏览记录
        deleteBroseVideo(id){
          var that=this;
          this.$axios.get("/videobrowse/delete",{
              params:{
                  videoBrowseId:id
              }
          }).then(response=>{
              let result=response.data;
              if(result.status==200){
                  console.log("删除成功");
              }
          }).catch();
        },
        //批量删除浏览文章记录
        deleteBroseArticlelist(){
            var that=this;
            for(let i=0;i<=that.Articlelist.length;i++){
                this.deleteBroseArticle(that.Articlelist[i]);
                this.queryArticleHistory();
            }
            that.kuang1='false';
        }
        ,
        //批量删除浏览记录
        deleteBroseVideolist(){
            var that=this;
            for(let i=0;i<=that.listBrosevideoID.length;i++){
                this.deleteBroseVideo(that.listBrosevideoID[i]);
                this.queryVideoHistoryAll();
            }
            that.kuang='false';
        },
        //统计浏览视频记录的数量
        tongjiVideoNum(){
          var that=this;
          this.$axios.get("/videobrowse/querynum",{
              params:{
                  userId:that.userId
              }
          }).then(response=>{
              let result=response.data;
              if(result.status==200){
                  that.VideoNum=result.data;
              }
          }).catch();
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
