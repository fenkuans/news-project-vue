<template>
    <div>
        <v-head></v-head>
           <!-- 导航栏 -->
        <div class="hd w">
            <div class="nav">
                <el-menu default-active="1" class="el-menu-demo" mode="horizontal" active-text-color="#ff6820">
                    <el-menu-item index="1" @click="viewHot">热点</el-menu-item>
                    <el-menu-item index="2" @click="viewPic">图片</el-menu-item>
                    <el-menu-item index="3" @click="viewMessage">资讯</el-menu-item>
                          <!-- 搜索框 -->
                    <div class="hd_ss">
                        <input  type="text" v-model="keywork" class="hd_ss_text" value="新闻搜索">
                        <el-button class="hd_ss_button" @click="fuzzyQueryEvent" icon="el-icon-search">搜索</el-button>
                        <!-- <button class="hd_ss_button">搜索</button> -->
                    </div>
                </el-menu>
            </div>
        </div>
        <!-- 组件切换 -->
        <div class="model-box">
            <component :is="viewName" ref="com"></component>
        </div>
    </div>
</template>

<script>
//组件引入
import hot from './module/ViewHot.vue';
import pic from './module/viewPic.vue';
import message from './module/ViewMessage.vue';
import viewHead from './module/ViewHead.vue';

export default {
    components:{
        'v-head':viewHead
    },
    data(){
        return {
            msg: "test",
            viewName: hot,
            keywork: ''
        };
    },
    methods:{
        viewPic(){
            console.log("导航栏事件触发!");
            this.viewName = pic;
            // this.viewName = viewHot;
            // console.log(this.activeIndex);
        },
        viewHot(){
            this.viewName = hot;
        },
        viewMessage(){
            this.viewName = message;
        },
        fuzzyQueryEvent(){
            console.log("搜索事件触发!");
            console.log(this.keywork);

            this.$refs.com.queryEvent(this.keywork);
            // this.$emit('queryEvent',this.keywork);
        }


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

    .hd {
        height: 42px;
    }
    .hd_mag { 
        float: left;
        margin:5px 100px;
    }
    .hd_ss {
        float: right;
        padding-top: 12px;
        margin-right: 20px;
    }


    .hd_ss_text {
        height: 35px;
        width: 270px;
        float: left;
        border: 1px #DCDCDC solid;
        border-right: 0;
        padding-left: 10px;
        color: #C0C0C0;
    }

    .hd_ss_button {
        height: 37px;
        width: 100px;
        float: left;
        background-color: #ff6820;
        border: 1px #DCDCDC solid;
        border-radius: 0;
        border-left: 0;
        color: #ffffff;
        letter-spacing: 2px;
        font-size: 14px;
        font-weight: bolder;
    }

    .hd_mag_log {
        height: 30px;
    }

    .nav_cs,li {
        margin:5px 0;
        padding-left: 15px;
        float: left;
    }
    .nav_cs,li,a {
        text-decoration:none;
        /* color: #ffffff; */
    }

</style>