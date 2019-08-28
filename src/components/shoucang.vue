<template>
    <el-container >
      <div class="daohang">
        <div class="danghang-row">
          <img @click="hrefreturn" src="../assets/return.png" style="width:30px;height:30px">
          <img src="../assets/logo1.png" style="width:50px;height:50px;border-radius:70%;margin:0 auto;margin-top:-10px"/>
          <img src="../assets/sousuo.png" style="width:30px;height:30px">
        </div>
      </div>

      <div class="mun1">
        <el-tabs v-model="activeName" @tab-click="handleClick">
          <el-tab-pane label=" 文章 " name="second" >
            <div style="background-color:#f4f4f4;width:100%;height:30px;display: flex;flex-direction:row;justify-content: space-between;margin-bottom:0px">
              <p style="font-size:0.9rem;margin-top:2px;padding-left:10px">文章收藏</p>
              <p v-if="kuang=='false'" @click="exit" style="font-size:0.9rem;margin-top:2px;padding-right:10px">编辑</p>
              <p v-if="kuang=='true'" @click="noexit" style="font-size:0.9rem;margin-top:2px;padding-right:10px">取消编辑</p>
            </div>

            <div  style="background-color:#f4f4f4;display:flex;flex-direction:column;min-height:780px;">
              <div v-for="item1 in ArticleList" :key="item1.articleCollectId" style="width:94%;height:150px;background-color:white;border-radius:10px;margin: 0 auto;margin-top:5px">
                <el-checkbox v-if="kuang=='true'" style="margin-bottom: 10px;float: left;padding-left:20px;width:10px;height:10px" @change="chooseCardGrade1(item1.articleCollectId)"></el-checkbox>
                <div style="width:100%;height:100px;display:flex;flex-direction:column;">
                  <p style="text-align: center;font-size:1.0rem;padding-top:20px">{{item1.article.articleTitle}}</p>
                  <p style="text-align: right;font-size: 0.6rem;padding-right:20px;padding-top:10px">{{item1.articleCollectTime}}</p>
                </div>
              </div>
            </div>

            <div v-if="kuang=='true'" style="background-color: #f4f4f4;position:fixed;bottom:0;z-index:9999;;width:100%;height:40px;" label="btt">
              <img @click="noexit" style="padding-left: 100px;padding-top:3px;float:left;width:30px;height:30px" src="../assets/quxiao.png">
              <img @click="deleteBroseArticlelist" style="padding-right: 100px;padding-top:3px;float:right;width:30px;height:30px" src="../assets/delete.png">
            </div>
          </el-tab-pane>

          <el-tab-pane label=" 视频 " name="third">
            <div style="background-color:#f4f4f4;width:100%;height:30px;display: flex;flex-direction:row;justify-content: space-between;margin-bottom:0px">
              <p style="font-size:0.9rem;margin-top:2px;padding-left:10px">视频收藏</p>
              <p v-if="kuang1=='false'" @click="exit1" style="font-size:0.9rem;margin-top:2px;padding-right:10px">编辑</p>
              <p v-if="kuang1=='true'" @click="noexit1" style="font-size:0.9rem;margin-top:2px;padding-right:10px">取消编辑</p>
            </div>
            <div v-for="item in VideoList" :key="item.videoCollectId"  style="width:100%;height:300px;border-radius:10px;margin:0 auto;margin-top:5px;margin-bottom:30px">
              <div style="width:100%;height:220px;">
                <el-checkbox v-if="kuang1=='true'" style="margin-bottom: 10px;float: left;padding-left:20px;width:10px;height:10px" @change="chooseCardGrade(item.videoCollectId)"></el-checkbox>
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
                <p style="color:#333333;padding-right:20px;;font-size:0.8rem">{{item.videoCollectTime |to-short}}</p>
              </div>
              <div v-if="kuang1=='true'" style="background-color: #f4f4f4;position:fixed;bottom:0;z-index:9999;;width:100%;height:40px;" label="btt">
                <img @click="noexit1" style="padding-left: 100px;padding-top:3px;float:left;width:30px;height:30px" src="../assets/quxiao.png">
                <img @click="deleteBroseVideolist1" style="padding-right: 100px;padding-top:3px;float:right;width:30px;height:30px" src="../assets/delete.png">
              </div>

              <el-divider></el-divider>
            </div>
          </el-tab-pane>
        </el-tabs>
      </div>

  </el-container>

</template>
<script>
    export default {
        name:'shoucang',
        data() {
            return {
                count: 5,
                loading: false,
                activeName: 'second',
                userId:this.$store.state.loginUserId,
                static:"http://114.116.238.138:9090/file/",
                ArticleList:[],
                VideoList:[],
                kuang:'false',
                listshoucangArticle:[],
                kuang1:"false",
                listshoucangVideo:[]
            };
        },
        computed: {
            noMore () {
                return this.count >= 20
            },
            disabled () {
                return this.loading || this.noMore
            }
        },
        created(){
          this.queryArticleshoucang();
          this.queryVideoshoucang();
        },
        methods: {
            //根据文章收藏ID删除文章
            deletearticle(id){
              var that=this;
              this.$axios.get("/articlecollect/delete",{
                  params:{
                      articleCollectId:id
                  }
              }).then(response=>{
                  let result=response.data;
                  if(result.status==200){
                      console.log("删除成功");
                  }
              }).catch();
            },
            //根据用户ID查询所有视频收藏
            queryVideoshoucang(){
              var that=this;
              this.$axios.get("/videocollect/querybyuserid",{
                  params:{
                      videoCollectUserId:that.userId
                  }
              }).then(response=>{
                  let result=response.data;
                  if(result.status==200){
                      that.VideoList=result.data;
                  }
              }).catch();
            },
            //根据用户ID查询所有文章收藏
            queryArticleshoucang(){
              var that=this;
              this.$axios.get("/articlecollect/queryall",{
                  params:{
                      articleCollectUserId:that.userId
                  }
              }).then(response=>{
                  let result=response.data;
                  if(result.status==200){
                      that.ArticleList=result.data;
                  }
              }).catch();
            }
            ,
            //批量删除浏览文章记录
            deleteBroseArticlelist(){
                var that=this;
                for(let i=0;i<=that.listshoucangArticle.length;i++){
                    this.deletearticle(that.listshoucangArticle[i]);
                    this.queryArticleshoucang();
                }
                that.kuang='false';
            },
            handleClick(tab, event) {
                console.log(tab, event);
            },

            hrefreturn(){
                this.$router.go(-1);
            },
            //向数组存储文章浏览ID
            chooseCardGrade(id){
                var that=this;
                that.listshoucangArticle.push(id);
            },
            chooseCardGrade1(id){
                var that=this;
                that.listshoucangVideo.push(id);
            }
            ,
            load () {
                this.loading = true
                setTimeout(() => {
                    this.count += 2
                    this.loading = false
                }, 2000)
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
                that.listshoucangArticle.push(id);
            },
            //向数组存储视频浏览ID
            chooseCardGrade(id){
                var that=this;
                that.listshoucangVideo.push(id);
            },
            //删除视频收藏
            deleteshoucang(id){
                var that=this;
                this.$axios.get("/videocollect/delete",{
                    params:{
                        videoCollectId:id
                    }
                }).then(response=>{
                    let result=response.data;
                    if(result.status==200){
                        console.log("删除成功");
                    }
                }).catch();
            },
            //批量删除
            deleteBroseVideolist1(){
                var that=this;
                for(let i=0;i<=that.listshoucangVideo.length;i++){
                    this.deleteshoucang(that.listshoucangVideo[i]);
                    this.queryVideoshoucang();
                }
                that.kuang1='false';
            }
        }
    }
</script>
<style>
  .el-header {
    color: #333;
    text-align: center;
    line-height: 60px;
    width: 100%;
  }

  .mun1{
    width:100%;
    height:100%;
    text-align: center;
    margin-left:0px;
    padding-left: 0px;
  }
  .mun1 /deep/.el-tabs__item{
    width:100%!important;
    margin-top:90px;
    font-size: 0.9rem!important;
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
  .el-tabs--top /deep/.el-tabs__item.is-top:last-child {
    padding-right: 0;
    border-left-width: 10px;
    padding-left: 35px;
    margin-left: 10px;
    padding-right: 45px;
  }
  .el-tabs--top /deep/.el-tabs__item.is-top:nth-child(2) {
    margin-right: 20px;
    padding-right: 10px;
  }

</style>
