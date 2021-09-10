<template>
    <div class="box">
        <div class="video_box">
            <img class="background_video" src="../../static/login.jpg" alt=""/>
            <!-- <video class="background_video" autoplay="autoplay" loop="loop" muted>
                <source src="../../static/video_item/background_video.mp4" type="video/mp4" />
            </video> -->
        </div>
        <div class="login_item">
            <img class="fk_logo" src="../../static/logo.png" alt="logo">
  
            <div class="login_input">
                <h1>Welcome</h1>
                <el-input class="input_item" placeholder="请输入5-18位用户名" prefix-icon="iconfont icon-ren" v-model="loginUser.username"></el-input>
                <el-input class="input_item" placeholder="请输入用户密码" prefix-icon="iconfont icon-quanxian" type="password" v-model="loginUser.password"></el-input>
                
                <div class="readme">
                    <el-checkbox class="checked_item">自动登录</el-checkbox>
                </div>
                <div class="forgot_password">
                    <el-button type="text">找回密码</el-button>
                </div>
                <el-button class="button_item" type="primary" round @click="loginEvent()">登&nbsp;&nbsp;录</el-button>
                <div class="line_box">
                    <hr style="background-color: #D3D3D3; border:none; height: 1px; top: 10px; position: relative;">
                    <div class="hr_text">点击下方进行注册</div>
                </div>
                <el-button class="button_item" round @click="registerEvent()">注&nbsp;&nbsp;册</el-button>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    
}
    // console.log("test test");
</script>

<script>
export default {
    data(){
        return {
            loginUser:{
                username: "",
                password: ""
            }
        }
    },
    
    methods:{
        loginEvent(){
            console.log("登录事件触发!");
            if(this.regLoingItem()){
                this.$http.post('/user/login',this.loginUser
                ).then(req=>{
                    console.log("请求返回!");
                    let reqData = req.data;
                    if(reqData.code === 200){
                        this.saveUserInfo(reqData);
                        this.$message({
                            message: '登录成功!欢迎回来~~~~',
                            type: 'success'
                        });
                        this.$router.push("/index");
                    }else{
                        if(reqData.code == 8003){
                            this.$message.error(reqData.message);
                        }
                    }
                })

            }else{
                console.log("验证失败!")
            }
        },
        //表单验证
        regLoingItem(){
            console.log("表单验证触发!");
            if(this.loginUser.username == undefined || this.loginUser.username.trim() === ""){
                console.log("用户名判空事件触发!")
                this.$message.error("用户名不能为空!");
                return false;
            }
            if(this.loginUser.password == undefined || this.loginUser.password === ""){
                console.log("用户密码判空事件触发!")
                this.$message.error("用户密码不能为空!");
                return false;
            }
            return true;
        },
        registerEvent(){
            // 用户登录事件
            this.$router.push("/register");
        },
        saveUserInfo(userInfo){
            localStorage.setItem("token",userInfo.userToken);
            localStorage.setItem("flushToken",userInfo.flushToken);

            //封装用户的基本信息
            let userInfoData = {
                uId: userInfo.id,
                nick:userInfo.nickName,
                headImg:userInfo.headImg
            }
            sessionStorage.setItem("userInfo",JSON.stringify(userInfoData));
        }
        
    }

}
</script>

<style scoped>

    .box .video_box{
        position: absolute;
        height: 100%;
        width: 100%;
    }
    .fk_logo{
        margin: 30px 0 0 40px;
        height: 50px;
        
    }
    .video_box .background_video{
        float: right;
        height: 100%;
        min-width: 100%;
        min-height: 100%;
    }


    .box .login_item{
        position: absolute;
        height: 100%;
        width: 460px;
        background-color: #fff;
    }

    .box .login_item .login_input{
        height: 300px;
        width: 380px;
        margin: 0 auto;
        text-align: center;
        border-radius: 15px;
    }
    .login_input>h1{
        float: left;
        margin-bottom: 20px;
        font-size: 48px;

    }
    .input_item{
        margin-top: 20px;
    }
    .button_item{
        width: 380px;
        text-align: center;
        font-size: 16px;
        margin: 30px auto;
    }
    .readme{
        float: left;
        margin-top: 20px;
    }
    .forgot_password{
        float: right;
        margin-top: 10px;
    }
    .line_box{
        margin-top: 20px;
    }
    .line_box .hr_text{
        position: relative;
        background: #fff;
        width: 120px;
        top: -5px;
        left: 130px;
        text-align: center;
        font-size: 14px;
        color:#D3D3D3;
    }

</style>