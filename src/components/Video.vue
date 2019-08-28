<template>
  <div>
    <div class="daohang">
      <div class="danghang-row">
        <img @click="hrefone" src="../assets/return.png" style="width:30px;height:30px">
        <img  src="../assets/logo1.png" style="width:50px;height:50px;border-radius:70%;margin:0 auto;margin-top:-10px"/>
        <img src="../assets/sousuo.png" style="width:30px;height:30px">
      </div>
    </div>

    <div  class="shenti" style="margin-top:60px">
      <div class="sss">
        <div>
          <video  width="100%" height="200" :src="'http://182.61.12.214:9090/file/'+this.videoUrl" controls="controls" >
          </video>
        </div>
        <!--       <img style="margin-top:30px" src="../assets/shipin.png"   @click="hh">-->
        <!--          通过file来选择需要上传的文件-->
        <input type="file" id="file"  class="file">
        <button @click="shipin">确定视频</button>
      </div>
    </div>

    <div>

    </div>
    <div style="margin-top:10px;">
      <el-tag type="success" style="font-size: 18px">视频标题</el-tag>
      <div style="width:60%;margin: 0 auto">
        <el-input  v-model="videoTitle"  placeholder="请输入视频标题"></el-input>
      </div>
    </div>
    <div style="margin-top:10px;">
      <el-tag type="success" style="font-size: 18px">视频简介</el-tag>
      <div style="width:60%;margin: 0 auto">
        <el-input
          type="textarea"
          :autosize="{ minRows: 2, maxRows: 4}"
          placeholder="请输入内容"
          v-model="videoContent">
        </el-input>
      </div>
    </div>
    <div style="margin-top:10px;">
<!--      <el-tag type="success" style="font-size: 18px">选择类型</el-tag>-->
      <div style="">
      <el-radio-group  size="small"  v-model="radio" >
        <el-radio-button v-for="item in list" :key="item.categoryId" :label="item.categoryId">{{item.categoryName}}</el-radio-button>
      </el-radio-group>
      </div>
    </div>
    <div style="margin-top: 30px">
      <el-button type="primary" @click="tianjia">确定上传</el-button>
      <el-button type="info">取消上传</el-button>
    </div>
  </div>
</template>

<script>
    export default {
        name: "Video",
        data () {
            return {
                radio:'',
                list:[],
                videoTitle:'',
                videoContent: '',
                videoUrl:'',
                video:'',
            };
        },
        created() {
          this.query();
        },
        methods:{
            //添加视频
            tianjia(){
                this.user=JSON.parse(localStorage.getItem('user'));
                 var videoUserId=this.user.userId;
                 console.log(videoUserId)
                if(this.radio!='' && this.videoTitle!=''&& this.videoContent!=''&&this.videoUrl!=''){
                    let params =this.$qs.stringify({
                        videoUserId:videoUserId,
                        videoUrl:this.videoUrl,
                        videoTitle:this. videoTitle,
                        videoContent:this.videoContent,
                        videoCategoryId:2})
                    this.$axios.post("http://182.61.12.214:9090/video/insert",params).then(response => {
                        let result=response.data;
                        console.log(result)
                        if (result.status == 200) {
                            this.$alert("上传成功");
                            this.$router.push({path:'/'})
                        }else if(result.status == 500){
                            this.$alert("上传失败");
                        }
                    }).catch(error=>{
                    });
                }else {
                    this.$alert("请选择你要上传的文件，并完善所有选项,并登入")
                }
            },
              //
              // hh(){
              //     document.getElementById('file').click()
              //     this.function2().then(val => {
              //         this.function3();
              //     });
              //    var f= document.querySelector('input[type=file]').files[0]
              //     if(f!=null){
              //         this.shipin()
              //     }
              // },
             //上传视频
            shipin(){
                var formData = new window.FormData() // vue 中使用 window.FormData(),否则会报 'FormData isn't definded'
                formData.append('file', document.querySelector('input[type=file]').files[0]) // 'userfile' 这个名字要和后台获取文件的名字一样;
                //'userfile'是formData这个对象的键名
                var options = {  // 设置axios的参数
                    url: 'http://182.61.12.214:9090/upload/video',
                    data: formData,
                    method: 'post',
                    headers: {
                        'Content-Type': 'multipart/form-data'
                    }
                };
                this.$axios(options).then((response) => {
                    let result = response.data;
                    if (result.status == 200) {
                        this.videoUrl=result.data;
                        console.log(this.videoUrl)
                        }else if(result.status == 500){
                           }
                         }).catch(error=>{
                }) // 发送请求

            },
            //返回上一页
            hrefone(){
                  this.$router.go(-1)
              },
            tiaozhuan(){
                this.$router.push({
                    path:'/AllVideo'
                })
            },

            //查询视频类别
            query(){
                // let params =this.$qs.stringify({userName:this.userName,
                //     userPassword:this.passWord});
                this.$axios.post("http://182.61.12.214:9090/category/queryall").then(response => {
                    let result = response.data;
                    if (result.status == 200) {
                        this.list=result.data;
                        console.log(this.list)
                    }else if(result.status == 500){
                    }
                }).catch(error=>{
                });

            },


        }
    }
</script>

<style scoped>
  .shenti{
    height: 250px;
    background-color:#FFFFFF;
    margin-top: 20px;
    display: flex;
  }
  .shenti .sss{
    height:230px;
    width: 100%;
    border-radius: 3%;
    border: #cfcfcf solid 1px;

  }
  .left .img{
    width: 80%;
    height: 50px;
    background-color: #2c2c2c;
    margin: 0 auto;
    margin-top: 5px;
  }
  .tou{
    height: 60px;
    background-color: #2c2c2c;
    display: flex;
  }
   .left{
     width:15%;
     background-color: #2c2c2c;
   }
  .zhong{
    width:82%;

    margin-left: 3%;
  }
  .zhong p{
    font-size: 20px;
    color: #FFFFFF;
    line-height: 60px;
    margin-right: 23%;
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
