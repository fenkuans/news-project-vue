<template>
    <div>
        <v-head></v-head>


        <!-- 新闻内容 -->
        <div class="content_news w">
            <div class="content_news_title">
                <h2>{{newsData.title}}</h2>
            </div>
            <!-- 文章信息，作者信息，发布时间 -->
            <div class="content_news_information">
                <span>类型：{{newsData.type}}</span>
                <span>来源：{{newsData.source}}</span>
                <span class="create-data">发布时间：{{newsData.createDate}}</span>
            </div>
            <hr>
            <div class="news-item-box">
                <div v-html="newsData.content"></div>
            </div>
        </div>
    </div>
</template>

<script>
import head from './module/ViewHead.vue'

export default {
    components:{
        "v-head": head
    },
    data(){
        return {
            msg: "test",
            newsData: {}
            
        }
    },
    methods:{
        initViewData(id){
            console.log("获取页面数据开始!");

            this.$http.get('/news/news_items',{
                    params:{
                        newsId: id
                    }
                }).then((req)=>{
                    if(req.status === 200){
                        console.log(req);
                        this.newsData = req.data;
                    }else{
                        this.$message.error("新闻数据加载失败~~~~");
                    }
                });
        }
    },
    mounted() {
        //注意！注意！注意！。获取路由中的参数是使用的是：$reoute，是没r的
        var id = this.$route.query.newsId;
        this.initViewData(id);
        console.log("获取的新闻id:"+id);

    }
}
</script>

<style scoped>
    * {
        margin: 0;
        padding: 0;
    }

    li {
        list-style-type: none;
    }

    .w {
        width: 1000px;
        margin: 20px auto;
        background-color: #ffffff;
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
        margin: 8px 0;
        float: right;
        margin-right: 100px;
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

    .nav_cs li a {
        text-decoration: none;
        color: #ffffff;
    }

    .content_news_title {
        margin-bottom: 10px;
        /* height: 100px; */
        /* float: left */
        /* text-align: left; */
    }

    .content_news_information {
        height: 30px;
        font-size: 14px;
        color: 	#A9A9A9;
    }

    span {
        float: left;
    }

    .create-data {
        float: right;
        margin-right: 30px;
    }

    .content_news {
        font-size: 20px;
        text-indent: 50px;
        line-height: 1.8;
        padding-bottom: 20px;
    }

    .news-item-box >>> p {
        /* float: left; */
         margin: 40px 20px 40px 20px;
         
         font-size: 20px;
         overflow: auto;
         /* margin: 0 auto; */
    }

    .news-item-box >>> p >img {
        /* float: left; */
        display: block;
        margin: 0 auto;
    }
</style>