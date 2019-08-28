<!--根据类别-->
<template>
  <div>
    <div class="daohang">
      <div class="danghang-row">
        <img @click="hrefreturn" src="../assets/return.png" style="width:30px;height:30px">
        <img src="../assets/logo1.png" style="width:50px;height:50px;border-radius:70%;margin:0 auto;margin-top:-10px"/>
        <img src="../assets/sousuo.png" style="width:30px;height:30px">
      </div>
    </div>
    <div style="margin-top:70px">
      <div class="body">
        <h3 style="font-size: 1rem">{{articleDetailList.articleTitle}}</h3><!--文章标题-->
      </div>
      <div style="display:flex;flex-direction:row;width:100%;height:50px;justify-content: space-between">
          <div style="margin-left:10px;display:flex;flex-direction:row">
              <img :src="static+userDetail.userHeadurl" style="width:50px;height:50px;border-radius:50%">
              <p style="padding-left:10px;padding-top:5px;font-size:0.8rem">{{userDetail.userName}}</p>
              <img @click="insertGuanzhu" style="width:30px;height:30px;padding-top:10px;margin-left:10px;display:flex;flex-direction:row" src="../assets/添加关注.png">
          </div>
          <div>
            <img v-if="" @click="insertCollent" style="width:20px;height:20px;padding-right:10px;padding-top:15px" src="../assets/收藏.png">
          </div>
      </div>
      <div style="display: flex;flex-direction:column;font-size:0.6rem" >


      </div>
      <el-divider style="margin-top: -5px"></el-divider>
      <!--文章详情-->
      <div v-for="item in articleDetailList.list" :key="item.contentOrder" style="margin:0 auto;min-height:0px;margin-top:-5px;width:90%;font-size:0.8rem;">
        <p>{{item.contentText}}</p>
        <img style="width:300px;" :src="static+item.contentImgurl">
      </div>
    </div>

    <hr style="width:100%">

    <div style="margin-top:-10px;width:100%;height:15px;">
      <p style="text-align:left;padding-left:10px">热门评论</p>
    </div>

    <!--评论区域-->
    <div style="margin:0 auto;margin-bottom:50px">

      <div v-for="item1 in pinglun" :key="item1.articleCommentId" style="width:100%;min-height:100px;padding-top: 20px;border-bottom:1px solid #d3dce6;">
        <div style="display:flex;flex-direction:row;justify-content:space-between">
          <div style="display:flex;flex-direction:row;">
            <img style="margin-left:20px;margin-top:10px;width:30px;height:30px;border-radius:50%" :src="static+item1.user.userHeadurl">
            <p style="font-size: 0.6rem;padding-left:5px;padding-top:8px;text-align:left">{{item1.user.userName}}</p>
          </div>
          <div>
            <p style="font-size: 0.6rem;padding-right:10px;padding-top:5px">{{item1.articleCommentTime}}</p>
          </div>
        </div>
        <div style="width:96%"><!--评论-->
          <p style="font-size:0.6rem;text-align:left;text-indent:2em;padding-left:20px;padding-bottom:5px">{{item1.articleCommentText}}</p>
        </div>
      </div>

    </div>

    <div class="foot" style="margin-bottom:-7.5px;display:flex;flex-direction:row">
      <el-input v-model="input" placeholder="请输入内容"></el-input>
      <el-button @click="insertpinglun" type="success" style="margin-bottom:-7px;width:50px;height:30px;">发送</el-button>
    </div>
  </div>

</template>

<script>
    export default {
        name: 'ArticleComment',
        data () {
            return {
                static:'http://114.116.238.138:9090/file/',
                pinglun:[],
                input:'',
                sayComment:false,
                comment:false,
                comm:false,
                panduan:1,
                input:'',
                articleId:this.$route.query.id,
                direction: 'btt',
                articleDetailList:[],
                userDetail:'',
                userDeatail1:'',
                list:[],    //存储用户,
                userId:this.$store.state.loginUserId,
                obj:''
                // msg: 'Welcome to Your Vue.js App'
            };
        },
        created() {
            this.queryArticleDetail();
            this.queryArticlepinglun();
            this.insertBroseArticle();
        },
        mounted(){

        }
        ,
        methods:{
            //添加浏览记录
            insertBroseArticle(){
                var that=this;
                let params=this.$qs.stringify({
                    articleBrowseUserId:that.userId,
                    articleBrowseArticleId:that.articleId
                });
                this.$axios.post("/articlebrowse/insert",params).then(response=>{
                    let result=response.data;
                    if(result.status==200){
                        console.log(that.articleId);
                    }
                }).catch();
            },
            //添加关注
            insertGuanzhu(){
                var that=this;
                let params=this.$qs.stringify({
                    attentionUserId:that.this.userId,
                    attentionTouserId:that.userDetail.userId
                });
                this.$axios.post("/attention/insert",params).then(response=>{
                    let result=response.data;
                    if(result.status==200){
                        console.log("关注成功");
                    }
                }).catch();
            },
            //评论
            queryArticlepinglun(){
              var that=this;
              this.$axios.get("/articlecomment/query/articleid",{
                  params:{
                      articleCommentArticleId:that.articleId
                  }
              }).then(response=>{
                  let result=response.data;
                  if(result.status==200){
                      that.pinglun=result.data;
                      this.queryArticlepinglunUser1();
                  }
              }).catch();
            },
            //收藏文章
            insertCollent(){
                var that=this;
                let params=this.$qs.stringify({
                    articleCollectUserId:that.userId,
                    articleCollectArticleId:that.articleId
                });
                this.$axios.post("/articlecollect/insert",params).then(response=>{
                    let result=response.data;
                    if(result.status==200){
                          this.$alert("收藏成功");
                    }
                }).catch();
            },
            //根据文章id查询文章详情
            queryArticleDetail(){
                var that=this;
                this.$axios.get("/article/query/articleid",{
                    params:{
                        articleId:that.articleId
                    }
                }).then(response=>{
                    let result=response.data;
                    if(result.status==200){
                        that.articleDetailList=result.data;
                        this.queryArticleUser();
                    }
                }).catch();
            },

            //查询该文章发布的用户
            queryArticleUser(){
              var that=this;
              this.$axios.get("/user/querybyid",{
                  params:{
                      userId:that.articleDetailList.articleUserId
                  }
              }).then(response=>{
                    let result=response.data;
                    if(result.status==200){
                        that.userDetail=result.data;
                    }
              }).catch(error=>{

              });
            },
            //根据用户id查询评论用户详情
            queryArticlepinglunUser(id){
              var that=this;
              this.$axios.get("/user/querybyid",{
                  params:{
                      userId:id
                  }
              }).then(response=>{
                  let result=response.data;
                  if(result.status==200){
                      that.userDeatail1=result.data;
                      for(let i=0;i<that.pinglun.length;i++){
                          that.list[i]=that.userDeatail1;
                      }
                      return that.userDeatail1;
                  }
              }).catch();
            },

            //根据用户id查询评论用户详情(解决BUG)
            queryArticlepinglunUser1(){
                var that=this;
                for(let i=0;i<that.pinglun.length;i++){
                      this.queryArticlepinglunUser(that.pinglun[i].articleCommentUserId);
                }
            },


            //发送评论
            insertpinglun(){
              var that=this;
              this.$axios.get("/articlecomment/insert",{
                  params:{
                      articleCommentText:that.input,
                      articleCommentUserId:that.userId,
                      articleCommentArticleId:that.articleId,
                      articleCommentTouserId:''
                  }
              }).then(response=>{
                  let result=response.data;
                  if(result.status==200){
                      this.queryArticleDetail();
                      this.queryArticlepinglun();
                      that.input=""
                      console.log("发布成功")
                  }
              }).catch();
            },


            hrefreturn(){
                this.$router.go(-1)
            },

        }
    }

</script>

<!--&lt;!&ndash; Add "scoped" attribute to limit CSS to this component only &ndash;&gt;-->
<style scoped>
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
  .foot{
    position: fixed;
    bottom:0;
    z-index: 9999;
    height: 40px;
    width: 100%;
  }
  .header{
    width: 100%;
    height: 50px;
    background-color:ghostwhite;
  }
  .body{
    width: 100%;
    height:30px;
  }
  .write{
    text-align: left;
    line-height: 30px;
    background-color:gainsboro;
    width: 80%;
    height: 30px;
    float: left;
  }
  .image{
    float: right;
    width: 20%;
    height:30px;
    background-color: gainsboro;
  }
</style>
