<template>
<div class="qq" >
  <div class="tou">
    <div class="right" >
        <img  class="sss"  src="../assets/logo1.png"/>
      <div class="sss1">
        <p>Taste用户注册</p>
      </div>
    </div>
  </div>
  <div>
    <div class="touxiang" @click="addimg" >
      <img v-if="sss=='1'" style=" height:60px; width:70% ;margin-top: 5px"   src="../assets/add.png"/>
      <img v-if="sss=='2'" style=" height:80px; width:100% ;border-radius: 50%"   :src="'http://114.116.238.138:9090/file/'+this.imgs"/>
   <!-- <input id="file" type="file" style="display:none;" accept="image/jpg, image/gif" />-->
    </div>

    <div class="input">
      <div class="ll">
        <div class="xx">
          <img src="../assets/yonghu.png"/>
        </div>
        <div class="xx1">
          <input v-model="userName" placeholder="请输入用户名"></input>
        </div>
      </div>
      <div class="ll">
        <div class="xx">
          <img src="../assets/mima.png"/>
        </div>
        <div class="xx1">
          <input type="text" v-model="userPassword" placeholder="请输入登入密码"></input>
        </div>
      </div>
      <div class="ll">
        <div class="xx">
          <img src="../assets/mima1.png"/>
        </div>
        <div class="xx1">
          <input type="text"  placeholder="请再次输入登入密码"></input>
        </div>
      </div> <div class="ll">
      <div class="xx">
        <img src="../assets/shouji.png"/>
      </div>
      <div class="xx1">
        <input type="text" v-model="userTelphone" placeholder="请输入用户电话"></input>
      </div>
    </div> <div class="ll">
      <div class="xx">
        <img src="../assets/youxiang.png"/>
      </div>
      <div class="xx1">
        <input type="text" v-model="userEmail" placeholder="请输入用户邮箱"></input>
      </div>
    </div>
    </div>
    <div class="sss">
      <button type="button" class="bb"  style="vertical-align:middle" @click="add"><span>立即注册</span></button>
    </div>
    <div class="sss2">
      <button type="button" class="bb1"  style="vertical-align:middle" @click="shouye"><span>首页</span></button>
    </div>


  </div>
</div>
</template>

<script>
        export default {
            name: "Zhuce",
            data() {
                return {
                    img:'',
                    //ss:window.sessionStorage.getItem("loginUserId"),
                    //ss1:''
                    //id:JSON.parse(localStorage.getItem('userid')),
                    // list: "",
                    // listdingdan: [],
                    imgs:JSON.parse(localStorage.getItem('imgs')),
                    loading:false,
                    croppa: {},
                    dataUrl: '',
                    sss:'',
                    userName:'',
                    userPassword:'',
                    userTelphone:'',
                    userEmail:'',
                    userHeadurl:JSON.parse(localStorage.getItem('imgs')),

                };
            },
            created() {
               this.ss();
            },
            methods: {
                //加载
                // sss(){
                //     this.loading=true;
                // },
                //跳转页面
                hreftwo(){
                    this.$router.push({path:'/'})
                },
                shouye(){
                    this.$router.push({path:'/'})
                },
                zhuce(){
                    this.$router.push({path:'/Zhuce'})
                },
                ss(){
                    if(this.imgs!=null){
                        this.sss='2'
                    }else {
                        this.sss='1'
                    }
                },

                //添加用户头像
                addimg(){

                     this.$router.push({path:'/Caijian'})
                    // document.getElementById('file').click()
                // let params =this.$qs.stringify({userId:this.user.userId});
                    this.$axios.post("http://114.116.238.138:9090/upload/image",params).then(response => {
                      let result = response.data;
                      if (result.status == 200) {
                          this.img=result.data;
                       }else if(result.status == 500){

                       }
                     }).catch(error=>{
                    });
                },
                //注册用户
                add(){
                    let params =this.$qs.stringify({
                        userName:this.userName,
                        userPassword:this.userPassword,
                        userTelphone:this.userTelphone,
                        userEmail:this.userEmail,
                        userHeadurl:this.userHeadurl})
                    this.$axios.post("http://182.61.12.214:9090/user/insert",params).then(response => {
                        let result = response.data;
                        if (result.status == 200) {
                            this.$alert(注册成功,请您及时登入);
                            this.$router.push({path:'/'})
                        }else if(result.status == 500){

                        }
                    }).catch(error=>{
                    });
                },
            }


        }
</script>

<style scoped>
.qq{
  height: 800px;
  background-color:  #f4f4f4;
}
  .tou{
    height:70px;
    background-color:  #f4f4f4;
    display: flex;
  }

.tou .right{
  height: 60px;
  width: 80%;
  background-color:  #f4f4f4;
  margin-top: 10px;
  font-size: 20px;
  margin-left: 10%;
  display: flex;
}
  .tou .right .sss1 p{
    margin-top: 18px;
    margin-right:30%;
  }

  .tou .right .sss{
    height: 60px;
    width: 19%;
    background-color:  #f4f4f4;
    border-radius: 50%;

  }
.tou .right .sss1{
  height: 60px;
  width: 79%;
  background-color:  #f4f4f4;
}
  .touxiang{
    height: 80px;
    width: 20%;
    background-color:  #f4f4f4;
    border-radius: 50%;
    margin-left: 38%;
    margin-top: 23px;
    border-style: solid ;
  }
.input{
  height: 300px;
  width: 80%;
  margin:0px auto 20px  auto;
  background-color: #f4f4f4;
}
.sss{
  height: 60px;
  width: 80%;
  margin:0 auto;

}
.ll{
  height:50px;
  width:100%;
  background-color: #f4f4f4;;
  display: flex;
  margin-top: 10px;
}

.xx{
  width: 15%;
  height: 40px;
  background-color: #f4f4f4;
  margin-top: 20px;
}
.xx img{
  width: 70%;
  height: 30px;
  margin-top: 5px;
}

.kk input{
  height: 40px;
  width: 100%;
  outline: none;
  background-color: #f4f4f4;
}
.xx1{
  width:80%;
  height: 40px;
  background-color: #f4f4f4;
  margin-top:20px;
  margin-left: 2%;
  display: flex;
}
.xx1 input{
  width: 100%;
  height: 40px;
  outline: none;
  font-size: 15px;
  border: none;
  background-color:  #f4f4f4;
}
.bb{
  height: 60px;
  width:100%;
  background-color: aliceblue;
  display: inline-block;
  border-radius: 4px;
  background-color:#333333;
  border: none;
  color: #FFFFFF;
  text-align: center;
  font-size: 20px;
  padding: 20px;
  transition: all 0.5s;
  cursor: pointer;
}

.bb span {
  cursor: pointer;
  display: inline-block;
  position: relative;
  transition: 0.5s;
  border: none;
}

.bb span:after {
  content: '»';
  position: absolute;
  opacity: 0;
  top: 0;
  right: -20px;
  transition: 0.5s;
  border: none;
}

.bb:hover span {
  padding-right: 15px;
  border: none;
}

.bb:hover span:after {
  opacity: 1;
  right: 0;
  border: none;
}
.sss2{
  height:50px;
  width: 30%;
  background-color: blueviolet;
  margin:30px auto;
}

.bb1{
  height: 50px;
  width:100%;
  background-color: aliceblue;
  display: inline-block;
  border-radius: 4px;
  background-color:#333333;
  border: none;
  color: #FFFFFF;
  text-align: center;
  font-size: 16px;
  padding: 15px;
  transition: all 0.5s;
  cursor: pointer;
}

.bb1 span {
  cursor: pointer;
  display: inline-block;
  position: relative;
  transition: 0.5s;
  border: none;
}

.bb1 span:after {
  content: '»';
  position: absolute;
  opacity: 0;
  top: 0;
  right: -20px;
  transition: 0.5s;
  border: none;
}

.bb1:hover span {
  padding-right: 10px;
  border: none;
}

.bb1:hover span:after {
  opacity: 1;
  right: 0;
  border: none;
}



</style>
