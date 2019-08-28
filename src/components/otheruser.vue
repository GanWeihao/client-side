<template>
  <div style="margin: 0px">
    <el-container style="height: 100%">
      <el-header>
        <div class="hh" style="width: 380px">
          <span style="text-align:left; width: 50px; margin-top: 10px;float: left"><img src="../assets/return.png" width="30" height="40" /></span>
          <span></span>
          <span style=" width: 50px; margin-top: 10px;font-size: 30px;font-style: italic;">ifashion</span>
          <span style="text-align:center; width: 50px;float: right"><i class="el-icon-more"></i></span>
          <span style="text-align:right; width: 50px; margin-top: 10px;float: right"><img src="../assets/sousuo.png" width="30" height="30" /></span>
        </div>

      </el-header>
      <el-main class="box1">
        <el-row >
          <el-col :span="12">
              <div class="block"  style="text-align: center; width: 390px;margin-top: 40px">
                <el-avatar :size="size" :src="circleUrl"></el-avatar>
              </div>
          </el-col>
        </el-row>
        <div>
          <ul><span style="text-align: center; width: 400px;font-size: 22px">username</span></ul>
          <ul></ul>
          <ul><el-row>
            <el-button type="danger" plain style="font-size: 20px;width: 100px;height: 45px">关注</el-button>
          </el-row></ul>
        </div>

      </el-main>
      <el-header>
        <div class="mun">
          <el-tabs v-model="activeName" @tab-click="handleClick" >
            <el-tab-pane label="  全部" name="first">
              <div class="infinite-list-wrapper" >
                <div  class="list" v-infinite-scroll="load" infinite-scroll-disabled="disabled"
                      style="overflow:auto;width:350px;height: 300px; border:2px solid darkseagreen;"
                      v-for="i in count">
                  {{ i }}
                </div>
                <p v-if="loading">加载中...</p>
                <p v-if="noMore">没有更多了</p>
              </div>
            </el-tab-pane>
            <el-tab-pane label=" 文章 " name="second"><div class="infinite-list-wrapper" >
              <div  class="list" v-infinite-scroll="load" infinite-scroll-disabled="disabled"
                      style="overflow:auto;width:350px;height: 300px; border:2px solid darkseagreen;"
                      v-for="i in count">
                  {{ i }}
                </div>
                <p v-if="loading">加载中...</p>
                <p v-if="noMore">没有更多了</p>
              </div>
            </el-tab-pane>
            <el-tab-pane label=" 视频 " name="third"><div class="infinite-list-wrapper" >
              <div  class="list" v-infinite-scroll="load" infinite-scroll-disabled="disabled"
                    style="overflow:auto;width:350px;height: 300px; border:2px solid darkseagreen;"
                    v-for="i in count">
                  {{ i }}
                </div>
                <p v-if="loading">加载中...</p>
                <p v-if="noMore">没有更多了</p>
              </div>
            </el-tab-pane>
            <el-tab-pane label=" 评论 " name="fourth"><div class="infinite-list-wrapper" >
              <div  class="list" v-infinite-scroll="load" infinite-scroll-disabled="disabled"
                    style="overflow:auto;width:350px;height: 300px; border:2px solid darkseagreen;"
                    v-for="i in count">
                  {{ i }}
                </div>
                <p v-if="loading">加载中...</p>
                <p v-if="noMore">没有更多了</p>
              </div>
            </el-tab-pane>
          </el-tabs>
        </div>
      </el-header>
      <el-main>
        <div></div>
      </el-main>
    </el-container>
  </div>
</template>

<script>
    export default {
        name:"otheruser",
        data() {
            return {
                activeIndex: '1',
                activeName: 'first',
                circleUrl: "https://ss1.bdstatic.com/70cFvXSh_Q1YnxGkpoWK1HF6hhy/it/u=2664844418,2984255175&fm=26&gp=0.jpg",
                sizeList: "large",
                count: 10,
                loading: false
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
        methods: {
            handleClick(tab, event) {
                console.log(tab, event);
            },
            load () {
                this.loading = true
                setTimeout(() => {
                    this.count += 2
                    this.loading = false
                }, 2000)
            }
        }
    }
</script>

<style>
  .box1{
    background-image:url(../assets/beijing.jpg);
    height: 260px;
    width: 100%;
    position:relative;
  }

  h1, h2 {
  font-weight: normal;
  }
  ul {
    list-style-type: none;
    padding: 0;
  }
  li {
    display: inline-block;
    margin: 0 10px;
  }
a {
  color: #42b983;
}
  .el-header {
    color: #333;
    text-align: center;
    line-height: 60px;
    padding: 0px
  }

  .el-main {
    background-color: #E9EEF3;
    color: #333;
    text-align: center;
    padding: 0px;
  }

  .el-container:nth-child(5) .el-aside,
  .el-container:nth-child(6) .el-aside {
    line-height: 260px;
  }

  .el-container:nth-child(7) .el-aside {
    line-height: 320px;
  }.
     el-menu-demo{
     float:contour;
     margin: auto;
     font-size: 20px
   }
  .mun .el-tabs__item{
  width: 90px!important;
    font-size: 20px!important;
  }
  .el-avatar--circle {
    border-radius: 50%;
    width: 80px;
    height: 80px;
  }
  element.style {
    margin:0px;
  }
  .mun{
    width:360px;
    height:100%;
    text-align: center;
    font-size: 20px!important;
    margin-left:0px;
    padding-left: 15px;
  }
</style>
