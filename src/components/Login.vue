<template>
  <div class="s" >
    <div class="login">
      <div class="logo">
        <img src="../assets/logo1.png"/>
      </div>
    </div>
    <div class="input">
     <div class="ll">
       <div class="xx">
         <img src="../assets/zhanghao.png"/>
       </div>
       <div class="xx1">
         <input  v-model="telephone" placeholder="请输入手机号"></input>
       </div>
     </div>
      <div class="ll1">
        <div class="xx">
          <img src="../assets/mima.png"/>
        </div>
        <div class="xx1">
            <div class="kk" >
              <input type="text" v-model="rocdl" placeholder="请输入验证码"></input>
            </div>
            <div class="kkk">
              <button  v-show="Verification" type="button"  @click="handleClick();shouji()"><span>获取验证码</span></button>
              <button v-show="!Verification" disabled="false"><span>{{timer}}秒后重新获取</span></button>
            </div>
        </div>

      </div>
    </div>
    <div class="sss">
      <button type="button" class="bb"  style="vertical-align:middle" @click="loginon"><span>Login On</span></button>
    </div>
    <div class="sss1">
      <div class="left">
        <p @click="hreftwo">账号密码登入</p>
      </div>
      <div class="right">
        <p @click="zhuce">注册用户？</p>
      </div>
    </div>
    <div class="sss2">
      <button type="button" class="bb1"  style="vertical-align:middle" @click="shouye"><span>首页</span></button>
    </div>


  </div>
</template>

<script>
    export default {
        name: "Login",
        data() {
            return {
                //ss:window.sessionStorage.getItem("loginUserId"),
                //ss1:''
                //id:JSON.parse(localStorage.getItem('userid')),
                // list: "",
                // listdingdan: [],
                // user:JSON.parse(localStorage.getItem('user')),
                Verification:true,    //通过v-show控制显示获取还是倒计时
                timer:60,   //定义初始时间为60s
                loading:false,
                telephone:'',
                rocdl:'',
                obj:'',
                user:''
            };
        },
        created() {
            // this.querrole();
        },
        methods: {
            //跳转页面
            hreftwo(){
                this.$router.push({path:'/Login1'})
            },
            shouye(){
                this.$router.push({path:'/'})
            },
            zhuce(){
                this.$router.push({path:'/Zhuce'})
            },
            //验证码倒计时
            handleClick(){
                this.Verification = false;      //点击button改变v-show的状态
                let auth_timer = setInterval(()=>{  //定时器设置每秒递减
                    this.timer--;        //递减时间
                    if(this.timer<0){
                        this.Verification = true;    //60s时间结束还原v-show状态并清除定时器
                        clearInterval(auth_timer)
                    }
                },1000);
            },
              // 验证码获取
            shouji(){
            let params =this.$qs.stringify({userTelephone:this.telephone});
             console.log(params)
                this.$axios.post("http://114.116.238.138:9090/user/login1",params)
                  .then(response => {
                    console.log(response)
                  let result = response.data;
                  if (result.status == 200) {
                      this.obj=result.data.obj;
                      console.log(obj)
                   }else if(result.status == 500){
                   }
                 }).catch(error=>{
                });
            },
            //手机登入
            loginon(){
                if(this.rocdl==this.obj){
                    let params =this.$qs.stringify({userTelephone:this.telephone});
                    this.$axios.post("http://114.116.238.138:9090/user/telphone/insert",params).then(response => {
                        let result = response.data;
                        if (result.status == 200) {
                            this.user=result.data;
                            console.log(this.user)
                            this.$router.push({path:'/'})
                        }else if(result.status == 500){
                        }
                    }).catch(error=>{
                    });
                }else {
                    this.$alert("验证码错误，请核对后再次登入！")

                }

            },



        }



    }
</script>

<style scoped>
  .s{
    height:800px;
    background-color: #f4f4f4;
  }
   .login{
     height: 150px;
     display:flex;

   }
  .logo{
    height:100px;
    width: 27%;
    background-color:  #FFFFFF;
    border-radius: 50%;
    margin: 60px auto;
  }
  .logo img{
    height:100px;
    width: 100%;
    border-radius: 50%;
  }
  .input{
    height: 200px;
    width: 80%;
    margin:50px auto 20px  auto;
    background-color: #f4f4f4;
  }
  .sss{
    height: 60px;
    width: 80%;
    margin:0 auto;

  }
  .ll{
    height:90px;
    width:100%;
    background-color: #f4f4f4;;
    display: flex;
  }
  .ll1{
    height:90px;
    width:100%;

    background-color:#f4f4f4;;
    display: flex;
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
  .kk{
    height: 40px;
    width: 55%;
    background-color: #42b983;
  }
  .kk input{
    height: 40px;
    width: 100%;
    outline: none;
    background-color: #f4f4f4;
  }
  .kkk{
    height: 40px;
    width: 45%;
    background-color: #42b983;
  }
  .kkk button{
    height: 40px;
    width: 100%;
    border-radius:5px;
    border: none;
    background-color: #333333;
    color:#FFFFFF ;
  }
  .xx1{
    width:80%;
    height: 40px;
    background-color: #2c3e50;
    margin-top:20px;
    margin-left: 2%;
    display: flex;
  }
  .xx1 input{
    width: 100%;
    height: 40px;
    outline: none;
    font-size: 18px;
    border: none;
    background-color: #f4f4f4;
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

  .sss1{
    height: 30px;
    width: 80%;
    background-color: #f4f4f4;
    margin: 0 auto;
    display: flow;
  }
  .sss1 .left{
    float: left;
    height: 30px;
    width: 45%;
    background-color: #f4f4f4;
    line-height: 30px;
  }
  .sss1 .right{
    float: right;
    height: 30px;
    width: 30%;
    background-color: #f4f4f4;
    line-height: 30px;

  }
  .sss2{
    height:50px;
    width: 30%;
    background-color: blueviolet;
    margin:100px auto;
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
