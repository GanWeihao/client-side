<template>
  <el-container>
      <el-header style="padding-right: 0;padding-left: 0px;">
        <div class="daohang">
          <div class="danghang-row">
            <img @click="hrefone" src="../assets/return.png" style="width:30px;height:30px">
            <img  src="../assets/logo1.png" style="width:50px;height:50px;border-radius:70%;margin:0 auto;margin-top:-10px"/>
            <img src="../assets/sousuo.png" style="width:30px;height:30px">
          </div>
        </div>
    </el-header>

    <el-main>
      <div style="text-align: center;width:100%;height:40px;font-size:18px">文章发布</div>
        <div style="display: flex;flex-direction: row;justify-content: space-between">
          <el-input style="width:300px;" v-model="biaoti" placeholder="请输入文章标题"></el-input>
          <el-button @click="uploadArticle()" plain>确定</el-button>
        </div>
        <div style="width: 100%;height:320px;" class="demo" v-for="(item,index) in ids" :key="index">
          <el-input
            type="textarea"
            :rows="7"
            placeholder="请输入文章内容"
            v-model="item.contentText">
          </el-input>
          <ul></ul>
          <el-upload
            class="avatar-uploader"
            action="https://jsonplaceholder.typicode.com/posts/"
            :show-file-list="true"
            :http-request="uploadPicture"
            :on-success="handleAvatarSuccess"
            :before-upload="beforeAvatarUpload">
            <img v-if="imageUrl"  :src="imageUrl" class="avatar">
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
          </el-upload>
        </div>
      <button @click="uploadTextArea" >发布</button>
    </el-main>
  </el-container>
</template>

<script>
    export default {
        name:'fabu',
        data() {
            return {
                imageUrl:'',
                biaoti:'',
                contentImgurl:'',
                textarea:'',
                dialogImageUrl:'',
                userId:this.$store.state.loginUserId,
                i:1,
                dialogVisible: false,
                ids:[{
                    contentArticleId:'',
                    contentImgurl:'',
                    contentText:'',
                    contentOrder:1
                }],
                articleId:''
            };
        },
        created(){

        },
        methods: {
            // add(){
            //   var that=this;
            //       this.paixu();
            //   },
            //文章内容排序
            paixu(){
                var that=this;
                console.log(that.ids);
                for(let i=0;i<that.ids.length;i++){
                      that.ids[i].contentArticleId=that.ids[i+1].contentArticleId;
                      that.ids[i].contentImgurl=that.ids[i+1].contentImgurl;
                      if(that.ids[i+1].contentText==''){
                          that.ids.splice(i+1,255);
                      }
                }
            },

            //发布文章（标题）
            uploadArticle(){
              var that=this;
              this.$axios.get("/article/insert",{
                  params:{
                      articleTitle:that.biaoti,
                      articleUserId:that.userId,
                      articleCategoryId:1
                  }
              }).then(response=>{
                  let result=response.data;
                  if(result.status==200){
                      that.articleId=result.data;
                      console.log(that.articleId)
                  }
              }).catch();
            },


            //上传文章内容
            uploadTextArea(){
                this. paixu();
               var that=this;
               var param = that.$qs.stringify({
                   content: JSON.stringify(that.ids)
               });
               this.$axios.post("/content/insert", param).then(response=>{
                   let result=response.data;
                   if(result.status==200){
                       console.log("发布成功");
                   }
               }).catch();
            },

            // 上传图片
            uploadPicture(file){
                var that=this;
                var formData =new window.FormData();
                formData .append('file',file.file) // 'userfile' 这个名字要和后台获取文件的名字一样;
                this.$axios.post("/upload/image",formData).then(response=>{
                    let result=response.data;
                    if(result.status==200){
                        that.contentImgurl=result.data;
                        console.log(that.contentImgurl);
                        that.ids.push(
                            {
                                contentArticleId:that.articleId,
                                contentText:'',
                                contentImgurl:that.contentImgurl,
                                contentOrder:1
                            });
                    }
                }).catch();
            },


            handleAvatarSuccess(res, file) {
                this.imageUrl = URL.createObjectURL(file.raw);
            },
            beforeAvatarUpload(file) {

            },
            hrefone(){
                this.$router.go(-1);
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

  .avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }
  .avatar-uploader .el-upload:hover {
    border-color: #409EFF;
  }
  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 100px;
    height: 100px;
    line-height: 100px;
    text-align: center;
  }
  .avatar {
    width: 100px;
    height: 100px;
    display: block;
  }
</style>
