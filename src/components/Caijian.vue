<template>
 <div>
   <div style="margin-top:180px">
     <div style="border-radius: 50%">
     <croppa
       v-model="croppa"
       :width="250"
       :height="250"
       placeholder="点击此处添加头像"
       prevent-white-space>
     </croppa>
     </div>
     <div class="btns">
       <el-button type="success" plain  @click="croppa.rotate()">顺时针</el-button>
       <el-button type="success" plain    @click="croppa.rotate(-1)">逆时针</el-button>
       <el-button type="success" plain    @click="croppa.flipX()">正向</el-button>
       <el-button type="success" plain   @click="croppa.flipY()">反向</el-button>
     </div>
   </div>
  <div style="margin-top: 20px">
    <el-button type="primary" plain  @click="uploadCroppedImage" style="width: 35%;height:40px">确定头像</el-button>
  </div>

 </div>
</template>

<script>
    export default {
        name: 'Caijian',
        data(){
            return{
               croppa: {},
               img:''
            }
        },
        created(){

        },
        methods: {
            //上传头像
            uploadCroppedImage(){
                this.croppa.generateBlob(blob=>{
                    let formdata = new FormData();
                    formdata.append("file", blob, "image.png");
                    let params =formdata;
                    this.$axios.post("http://114.116.238.138:9090/upload/image",params).then(response => {
                        let result = response.data;
                        if (result.status == 200) {
                            this.img=result.data;
                            console.log(this.img);
                            localStorage.setItem('imgs', JSON.stringify(result.data));
                            this.$router.push({path:'/Zhuce'})
                        }else if(result.status == 500){

                        }
                    }).catch(error=>{
                    });
                },'image/jpeg',0.8)
            }
        }
    }
</script>

<style>

</style>
