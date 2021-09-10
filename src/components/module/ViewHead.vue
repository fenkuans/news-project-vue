<template>
<!-- 页面头部组件 -->
    <div>
        <div class="logo-box w">
            <div class="logo-div" style="cursor:pointer" @click="skipIndex">
                <img class="logo-img" src="../../../static/logo.png" alt="logo">
                <h3>新闻中心</h3>
            </div>


            <div v-if="!loginStatus">
                <a class="login-a" style="cursor:pointer"  @click="skipEvent">登录</a>
            </div>

            <div class="logo-item" v-if="loginStatus">
                <img class="head-img" src="../../../static/data/img/user.png" alt="">
                <span class="user-nick">{{userItem.nick}}</span>
                <div class="content_tj">
                    <el-button @click="skipNewsManage" icon="el-icon-s-operation">新闻管理</el-button>
                </div>

            </div>
        </div>
    </div>
</template>

<script>

export default {
    name: "viewHead",
    //组件引入
    data(){
        return {
            msg: "test",
            loginStatus: false,
            userItem: {}
        };
    },
    methods:{
        skipEvent(){
            this.$router.push('/login');
        },
        skipNewsManage() {
            this.$router.push('/news_manage');
        },
        initLoginStatus(){
            //验证用户登录状态方法
            let token = localStorage.getItem("token");
            let flushToken = localStorage.getItem("flushToken");
            let userInfo = sessionStorage.getItem("userInfo");

            if (userInfo === null || userInfo === ''){
                this.loginStatus = false; //重置状态，token失效，显示登录选项
                //用户信息缺失，对用户的登录状态进行验证
                if (token !== ''|| token!== null){
                    console.log("用户token校验")
                    //到后台验证用户登录状态
                    this.$http.post("/user/token_verify",{
                        userToken: token,
                        flushToken: flushToken
                    }).then((req)=>{
                        console.log(req);
                        let reqData = req.data;
                        if (reqData.code === 200){
                            //将用户信息放入sessionStorage中存储
                            let userInfoData = {
                                uId: reqData.id,
                                nick: reqData.nickName,
                                headImg: reqData.headImg
                            }
                            sessionStorage.setItem("userInfo",JSON.stringify(userInfoData));
                            //跟新userToken
                            if (token !== reqData.userToken) {
                                localStorage.setItem("token",reqData.userToken);
                            }
                            //用户token有效
                            this.loginStatus = true;
                            this.getUserItem();
                        }
                    })
                }
            }else{
                console.log("存在用户数据");
                this.getUserItem();
                this.loginStatus = true;
                
            }
            

        },
        getUserItem(){
            let userInfo = sessionStorage.getItem("userInfo");
            this.userItem = JSON.parse(userInfo);
        },
        skipIndex(){
            this.$router.push('/index');
        }
    },
    mounted() {
        //获取用户的登录状态
        console.log("用户状态初始化")
        this.initLoginStatus();
    }
}
</script>

<style scoped>
 body {
        margin: 0;
        padding: 0;
        
    }
    li {
        list-style-type:none;
    }

    .w {
        width: 1000px;
        margin: 10px auto; 
    }

    .login-a {
        color: #90a1c4;
        position: absolute;
        right: 20px;
        bottom: 0px;
        
    }

    .logo-box{
        margin-top: 0;
        height: 50px;
        position: relative;
    }

    .logo-box h3{
        display: inline-block;
        margin-left: 5px;

    }

    .logo-img{
        height: 50px;
        vertical-align: bottom;
    }

    .logo-item {
        float: right;
        /* background-color: pink; */
        width: 280px;
        height: 50px;
        line-height: 25px;
        position: relative;
    }

    .head-img {
        height: 40px;
        border-radius: 50%;
        float: left;
        margin-top: 10px;
        margin-right: 8px;
    }

    .user-nick {
        width: 80px;
        margin-top: 20px;
        float: left;
        font-size: 14px;
        color: 	#888888;
        text-align: center;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
    }

    .content_tj {
        width: 100px;
        height: 50px;
        float: right;
        margin-right: 40px;
        margin-top: 10px;
    }

    .content_tj button {
        height: 37px;
        width: 120px;
        font-size: 14px;
        /* background-color: #ff6820; */
    }

    .logo-div {
        float: left;
    }
</style>