<template>
  <div>
    <div class="daohang">
      <div class="danghang-row">
        <img @click="hrefturn" src="../assets/return.png" style="width:30px;height:30px">
        <img src="../assets/logo1.png" style="width:50px;height:50px;border-radius:70%;margin:0 auto;margin-top:-10px"/>
        <img src="../assets/sousuo.png" style="width:30px;height:30px">
      </div>
    </div>

    <div>
      <div style="margin-top:75px">

        <div v-for="item in VideoList" :key="item.id" style="width:100%;height:300px;border-radius:10px;margin: 0 auto;margin-top:5px;margin-bottom:50px">
          <div style="width:100%;height:220px;">
            <video
              id="frist"
              :src="static+item.videoUrl"
              preload="metadata"
              style="width:100%;height:220px">
            </video>
            <div style="position: relative;margin-top:-140px">
              <img @click="hrefVideoDetail(item.videoId)" src="../assets/playVideo.png">
            </div>
          </div>
          <div style="margin-top:0px;background-color: floralwhite;width:100%;height:70px;display:flex;flex-direction:row;justify-content: space-between;">
            <p style="color:#333333;padding-left:20px;font-size:0.8rem">{{item.videoTitle | to-short}}</p>
            <p style="color:#333333;padding-right:20px;;font-size:0.8rem">{{item.videoTime | to-short}}</p>
          </div>

          <el-divider></el-divider>
        </div>

        <div style="display:flex;flex-direction:row;justify-content:space-between;margin:0 auto;margin-top:10px;margin-bottom:10px">
          <div>
            <img @click="fenyeleft()" style="margin-left:100px;width:30px;height:30px" src="../assets/left.png">
          </div>
          <div>
            <img @click="fenyeright()" style="margin-right:100px;width:30px;height:30px" src="../assets/right.png">
          </div>
        </div>
      </div>

    </div>
  </div>

</template>


<script>

  export default {
      name:'AllVideo',
      data(){
          return{
              VideoList:'',
              static:'http://114.116.238.138:9090/file/',
              pageNum:1,
          }
      },
      created(){
          this.queryVideoAll();
      },
      methods:{
          //查询所有视频
        queryVideoAll(){
            var that=this;
            this.$axios.get("/video/queryall",{
                params:{
                    pageNum:that.pageNum,
                    pageSize:6
                }
            }).then(response=>{
                let result=response.data;
                if(result.status==200){
                    that.VideoList=result.data.pagedList;
                    console.log(that.VideoList);
                }
            }).catch();
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
          //上一页
          fenyeleft(){
              var that=this;
              if(that.pageNum>1){
                  that.pageNum--;
                  this.queryVideoAll();
              }
          },
          //下一页
          fenyeright() {
              var that = this;
              if (that.VideoList.length>1){
                  that.pageNum++;
              this.queryVideoAll()
          }
          },

          hrefturn(){
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

</style>
