<template>

  <div class="hello">

    <div class="daohang">
      <div class="danghang-row">
        <img @click="hrefreturn" src="../assets/return.png" style="width:30px;height:30px">
        <img src="../assets/logo1.png" style="width:50px;height:50px;border-radius:70%;margin:0 auto;margin-top:-10px"/>
        <img src="../assets/sousuo.png" style="width:30px;height:30px">
      </div>
    </div>


    <div style="margin-top: 60px;">
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
        <p style="padding-bottom:15px;font-size:0.8rem">时尚视频</p>
      </div>

      <div class="wenzhang">
        <!--按类别查询所有文章并分页-->
        <div  v-for="item1 in articleAlllist.list"  :key="item1.articleId" style="margin-left:15px;padding-top:10px;width:170px;height:200px;">
          <img @click="hrefArticleComment(item1.articleId)"  :src="static+item1.list[0].contentImgurl" style="width:170px;height:100%">
          <div style="position: relative;background-color:#cccccc;margin-top:-72px;opacity:0.7;filter:alpha(opacity:50);">
            <p>{{item1.articleTitle | to-short}}</p>
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
    name:'categoryArticle',
    data(){
        return{
            abc_img: [
                {img:"http://img3.imgtn.bdimg.com/it/u=1801928689,1097885852&fm=26&gp=0.jpg"},
                {img:"http://img1.imgtn.bdimg.com/it/u=3281472898,1555776781&fm=26&gp=0.jpg"},
                {img:"http://img3.imgtn.bdimg.com/it/u=24373824,4193529123&fm=26&gp=0.jpg"},
                {img:"http://img2.imgtn.bdimg.com/it/u=2635193104,79589224&fm=26&gp=0.jpg"}
            ]
            ,
            articleCategoryId:this.$route.query.id,
            articleAlllist:'',
            static:'http://114.116.238.138:9090/file/',
            pageNum:1,
        }
    },
    created(){
        this.queryArticleByCategory();
    }
    ,
    methods:{
        //按类别查询所有文章并分页
        queryArticleByCategory(){
            var that=this;
            this.$axios.get("/article/query/categoryid",{
              params:{
                  articleCategoryId:that.articleCategoryId,
                  pageNum:that.pageNum,
                  pageSize:6
              }
            }).then(response=>{
                  let result=response.data;
                  if(result.status==200){
                      that.articleAlllist=result.data;
                      console.log(that.articleAlllist);
                  }
            }).catch();
        },
        hrefreturn(){
            this.$router.go(-1);
        },
        //分页，加载下一页
        fenyeleft(){
            var that=this;
            if(that.pageNum>0){
                that.pageNum--;
                this.queryArticleByCategory();
            }
        },
        //分页，返回上一页
        fenyeright(){
            var that=this;
            that.pageNum++;
            this.queryArticleByCategory()
        } ,
        //跳转文章详情页并携带文章ID
        hrefArticleComment(articleId){
            this.$router.push({
                path:'/ArticleComment',
                query:{
                    id:articleId
                }
            })
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
    background-color:#f4f4f4;
  }
  .zixun{
    background-color:#cccccc;
    height:40px;
    line-height:10px;
    padding-top:5px;
    margin:0 auto;
  }


</style>
