<template>
    <div>
        <v-head></v-head>
         <!-- 添加新闻按钮 -->
        <div class="w">
            <div class="content-tj-box">
                <div class="content_tj">
                    <el-button type="warning" @click="skipNewsCreate" icon="el-icon-plus">添加新闻</el-button>
                </div>
                <div class="hd_ss">
                    <input  type="text" v-model="keywork" class="hd_ss_text" value="新闻搜索">
                    <el-button class="hd_ss_button" @click="queryEvent" icon="el-icon-search">搜索</el-button>
                    <!-- <button class="hd_ss_button">搜索</button> -->
                </div>
            </div>
        </div>



    <!-- 新闻信息，修改删除 -->
        <div class="news-list-box w">
            <div class="line-box">
                <span class="news-list-span">新闻列表</span>
                <el-divider></el-divider>
            </div>
            <div class="content_nr" v-for="item in newsArrays" :key="item.newsId" @click="skipNewsItemEvent(item.newsId)">
                <div class="item-img-box">
                    <img class="item-img" :src="$host+item.minImgUrl" alt="pic">
                </div>
                <h3 class="text-item">
                    {{item.title}}
                </h3>
                <div class="rests-data-box">
                    <span class="rests-span source-date">{{item.newsSource}}</span>
                    <span class="rests-span news-type">{{item.newsType}}</span>
                    <span class="create-date">{{item.newsCreateDate}}</span>
                </div>
                <div class="operation-box">
                    <el-button type="primary" @click.stop="redactEvent(item.newsId)" icon="el-icon-edit" size="small">编辑</el-button>
                    <el-button type="danger" slot="reference" @click.stop="open(item.newsId)" icon="el-icon-delete" size="small">删除</el-button>
                </div>
            </div>
        </div>
        <div class="vb-box"></div>
    </div>
    <!-- deleteEvent(item.newsId) -->
</template>

<script>
import head from './module/ViewHead.vue';
export default {
    components:{
        "v-head": head
    },
    data(){
        return {
            newsArrays: [],
            visible: false,
            keywork: ''

        }
    },
    methods: {
        initManageViewData(){
            this.$http.get('/news/news_arr')
            .then((req)=>{
                if (req.status === 200){
                    this.newsArrays = req.data;
                }else{
                    this.$message.error("获取新闻列表数据失败~~~");
                }
            })
        },
        skipNewsCreate() {
            this.$router.push("/news_create");
        },
        skipNewsItemEvent (id){
            console.log("跳转新闻详情!");
            console.log(id); 
            //携带参数进行路由跳转
            this.$router.push({
                path: '/news_item',
                query: {
                    newsId: id
                }
            });
        },
        redactEvent(newsId) {
            //带参数跳转
            this.$router.push({
                path: '/news_redact',
                query: {
                    newsId: newsId
                }
            })
        },
        deleteEvent(newsId){
            console.log("delete test");
            console.log(newsId);
            this.$http.post('/news/delete_news',{
                id: newsId
            }).then((req)=>{
                if (req.data.code === 200){
                    //刷新页面数据
                    this.initManageViewData();
                     this.$notify({
                        title: '成功',
                        message: '新闻删除成功',
                        type: 'success'
                    });
                }else{
                    this.$message.error("新闻删除操作失败~~~");
                }
            })
        },
        open(newsId) {
        this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
            console.log("确认删除操作!");
            this.deleteEvent(newsId);
          this.$message({
            type: 'success',
            message: '删除成功!'
          });
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          });          
        });
        },
        queryEvent(){
            console.log("搜索事件触发!");
            console.log(this.keywork);

            if (this.keywork !== ''){
                this.$http.get('/news/fuzzy_query',{params:{
                    keywork: this.keywork
                }}).then((req)=>{
                    if (req.status === 200){
                        this.newsArrays = req.data;
                    }else{
                        this.$message.error("新闻搜索操作失败~~~");
                    }
                })
            }
        }
    },
    mounted(){
        this.initManageViewData();

    }
}
</script>

<style scoped>
    body {
        margin: 0;
        padding: 0;
    }

    li {
        list-style-type: none;
    }

    input {
        border: 0;
        outline: none;
    }
    .w {
        width: 1000px;
        margin: 20px auto;
    }

    .hd {
        height: 42px;
        background-color: #f54343;
    }

    .hd_mag {
        float: left;
        margin: 5px 100px;
    }

    .hd_ss {
        float: right;
        padding-top: 20px;
        
        margin-right: 80px;
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

    .nav_cs,
    li {
        margin: 5px 0;
        padding-left: 15px;
        float: left;
    }

    .nav_cs,
    li,
    a {
        text-decoration: none;
        color: #ffffff;
    }

    .content {
        height: 50px;

    }

    .content-tj-box {
        width: 100%;
        height: 80px;
        background-color: #ffffff;
        margin-bottom: 10px;
    }

    .content_tj {
        width: 100px;
        height: 50px;
        /* background-color: #fff; */
        float: right;
        margin-right: 40px;
        padding-top: 20px;
        /* text-align: center; */
    }

    .content_tj button {
        height: 37px;
        width: 120px;
        font-size: 14px;
        /* border-width: 3px; */
        /* border-color: #666; */
        background-color: #ffa040;
    }

    .content_tj button:hover {
        background-color: red;
    }

    .content_nr {
        height: 120px;
        margin: 20px auto;

        background-color: #ffffff;
        position: relative;
        border-radius: 10px;
    }

    .item-img {
        /* margin-top: -30px ; */
        width: 177px;
        height: 100px;
    }

    .content_nr .item-img-box {
        height: 100px;
        width: 18%;
        float: left;
        margin-left: 10px;
        padding: 10px 0 10px 0
    }

    .content_nr .text-item {
        float: left;
        margin-left: 10px;  
        margin-top: 30px ;
        width: 55%;
        padding: 10px 0 10px 0
    }

    .text-item:hover {
        color: #ff6820;
        cursor: pointer;
    }

    .rests-data-box {
        width: 55%;
        position: absolute;
        bottom: 10px;
        left: 20%;
    }

    .create-date {
        float: right;
        font-size: 14px;
        color:	#A9A9A9;
    }

    .rests-span {
        font-size: 14px;
        color:	#A9A9A9;
        float: left;
        margin-right: 10px;
    }
    .content_nr_bt {
        height: 60px;
        margin: 30px auto;
    }

    .content_nr_bt_nr {
        float: left;
        margin-left: 50px;
        font-size: 18px;
    }

    .content_nr_bt_xg {
        float: right;
        margin-right: 50px;
    }

    .operation-box {
        float: right;
        margin-right: 20px;
        line-height: 120px;
    }

    .news-list-span {
        font-weight: bolder;
        font-size: 18px;
        margin: 20px 0 0 20px;
        /* margin-left: 20px; */
    }

    .news-list-box {
        margin-bottom:80px ;
    }

    .vb-box{
        height: 20px;
        width: 100%;
    }

</style>