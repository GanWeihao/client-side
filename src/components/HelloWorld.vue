<template>
  <div class="hello">

    <div class="daohang">
      <div class="danghang-row">
        <img @click="drawer=!false" src="../assets/gengduo.png" style="width:30px;height:30px">
        <img src="../assets/logo1.png" style="width:50px;height:50px;border-radius:70%;margin:0 auto;margin-top:-10px"/>
        <img src="../assets/sousuo.png" style="width:30px;height:30px">
      </div>
    </div>


    <div style="margin-top: 72px;">
      <div class="lunbo">
        <div class="block">
          <el-carousel trigger="click" height="200px">
            <el-carousel-item>
              <img class="small" style="width:390px;height:200px" src="http://114.116.238.138:9090/file/lunbo/1.jpg"></img>
            </el-carousel-item>
            <el-carousel-item>
              <img class="small" style="width:390px;height:200px" src="http://114.116.238.138:9090/file/lunbo/2.jpg"></img>
            </el-carousel-item>
            <el-carousel-item>
              <img class="small" style="width:390px;height:200px" src="http://114.116.238.138:9090/file/lunbo/3.jpg"></img>
            </el-carousel-item>
            <el-carousel-item>
              <img class="small" style="width:390px;height:200px" src="http://114.116.238.138:9090/file/lunbo/4.jpg"></img>
            </el-carousel-item>
          </el-carousel>
        </div>
      </div>

      <div class="zixun">
        <p style="padding-bottom:15px;font-size:0.8rem">时尚资讯</p>
      </div>

<!--      左侧抽屉-->
      <div>
        <el-drawer
          size="70%"
          :visible.sync="drawer"
          :direction="direction"

          :before-close="handleClose">
          <div style="padding:0;width:100%;height:100%">
              <div style="margin-top:15px;padding-left:24px;width:150px;height:80px;display:inline-flex;flex-direction:row;justify-content:space-between">
                <img @click="hreftwo" v-if="userId!=null" style="width:50px;height:40px;padding-top:5px;border-radius:100%;overflow:hidden;" :src="static+loginUserdetail.userHeadurl">
                <li @click="hreftwo" v-if="userId!=null" style="padding-top:18px;margin-left:10px;width:100%;height:15px;list-style:none;">{{loginUserdetail.userName}}</li>
                <li @click="hreflogin" v-if="userId==null" style="padding-top:18px;margin-left:10px;width:100%;height:15px;list-style:none;">登录</li>
              </div>
              <el-divider></el-divider>

              <div style="margin-top:15px;padding-left:24px;width:150px;height:20px;display:inline-flex;flex-direction:row;justify-content:space-between">
                <li @click="hrefAllVideo" style="margin-left:10px;width:100%;height:15px;list-style:none;">视频</li>
              </div>

              <div v-for="item in categoryList" :key="item.categoryId" style="margin-top:15px;padding-left:24px;width:150px;height:20px;display:inline-flex;flex-direction:row;justify-content:space-between">
                <li @click="categoryArticle(item.categoryId)" style="margin-left:10px;width:100%;height:15px;list-style:none;">{{item.categoryName}}</li>
              </div>

          </div>
        </el-drawer>
      </div>
      <div class="wenzhang">
        <!--查询所有文章并分页-->
        <div  v-for="item in articleAlllist"  :key="item.articleId" style="margin-left:20px;padding-top:10px;width:170px;height:200px">
          <img @click="hrefArticleComment(item.articleId)" :src="static+item.list[0].contentImgurl" style="width:170px;height:100%">
          <div style="position: relative;background-color:#cccccc;margin-top:-72px;opacity:0.7;filter:alpha(opacity:50);">
            <p>{{item.articleTitle | to-short}}</p>
          </div>
        </div>
      </div>

      <div style="display:flex;flex-direction:row;justify-content:space-between;margin:0 auto;margin-top:50px;margin-bottom:30px">
        <div>
          <img @click="fenyeleft()" style="margin-left:100px;width:30px;height:30px" src="../assets/left.png">
        </div>
        <div>
          <img @click="fenyeright()" style="margin-right:100px;width:30px;height:30px" src="../assets/right.png">
        </div>
      </div>


    </div>



  </div>
</template>

<script>
export default {
  name: 'HelloWorld',
    data() {
        return {
            abc_img: [
                {img:"http://img3.imgtn.bdimg.com/it/u=1801928689,1097885852&fm=26&gp=0.jpg"},
                {img:"http://img1.imgtn.bdimg.com/it/u=3281472898,1555776781&fm=26&gp=0.jpg"},
                {img:"http://img3.imgtn.bdimg.com/it/u=24373824,4193529123&fm=26&gp=0.jpg"},
                {img:"http://img2.imgtn.bdimg.com/it/u=2635193104,79589224&fm=26&gp=0.jpg"}
            ],
            static:'http://114.116.238.138:9090/file/',
            drawer: false,
            direction: 'ltr',
            activeName: '1',
            articleAlllist:"",
            pageNum:1,
            picture:[],
            categoryList:[],
            userId:this.$store.state.loginUserId,
            loginUserdetail:''
        };
    },

    created(){
        this.queryAllArticle();
        this.queryAllCategory();
        this.queryUserdetail();
    },
    methods: {
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
      //查询所有文章
      queryAllArticle(){
          var that=this;
        this.$axios.get("/article/queryall",{
            params:{
                pageNum:that.pageNum,
                pageSize:6
            }
        }).then(response=>{
                let result=response.data;
                if(result.status==200) {
                    that.articleAlllist = result.data.pagedList;
                    console.log(that.picture)
                }
        }).catch(error=>{

        })
      },
        //页面跳转并将类别ID携带至下一页
        categoryArticle(categoryid){
          this.$router.push({
              path:'/categoryArticle',
              query:{
                  id:categoryid
              }
          })
        }
        ,
        fenyeleft(){
          var that=this;
          if(that.pageNum>0){
              that.pageNum--;
              this.queryAllArticle();
          }
        },

       fenyeright(){
          var that=this;
              that.pageNum++;
          this.queryAllArticle()
       } ,

        handleClose(done) {
            done();
        },
        hreftwo(){
            this.$router.push({path:'/Own'})
        },
        hrefArticleComment(articleId){
            this.$router.push({
                path:'/ArticleComment',
                query:{
                    id:articleId
                }
            })
        },
        hrefAllVideo(){
          this.$router.push({path:'/AllVideo'})
        },
        hreflogin(){
          this.$router.push({
              path:'/Login'
          });
        },
    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
  p{
    color:black;
  }
  .daohang{
    position: fixed;
    top: 0;
    z-index: 9999;
    background-color: #f4f4f4;
    width:100%;
    height:50px;
    padding-top: 20px;
  }
  .wenzhang{
    display:flex;
    flex-wrap:wrap;
    width:100%;
    margin:0 auto;
    margin-top:10px;
  }
  .danghang-row{
    display:flex;
    flex-direction:row;
    margin: 0 auto;
    width:100%;
    height:50px;
  }
  .lunbo{
    width:100%;
    height:200px;
    background-color:antiquewhite;
  }
  .zixun{
    background-color:#cccccc;
    height:40px;
    line-height:10px;
    padding-top:5px;
    margin:0 auto;
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
.el-carousel__item:nth-child(2n) {
  background-color: #99a9bf;
}
.el-carousel__item:nth-child(2n+1) {
  background-color: #d3dce6;
}
</style>
