<template>
    <div>
          <!-- 轮播图 -->
        <div class="content w">
            <el-carousel class="carousel-box" trigger="click" height="450px">
                <el-carousel-item v-for="item in slideshowArray"  :key="item.newsId">
                    <div @click="skipNewsItemEvent(item.newsId)">
                        <img class="sildeshow-img" :src=$host+item.imgUrl alt="">
                        <div class="preview-box">
                            <div class="preview-title">
                                <h2>{{item.newsTitle}}</h2>
                            </div>
                            <div class="preview-item">
                                <p>{{item.synopsis}}</p>
                            </div>
                        </div>
                    </div>
                </el-carousel-item>
            </el-carousel>
        </div>

        <!-- 新闻列表 -->
        <div class="w">
            <div class="content_nr" v-for="item in newsArrys" :key="item.newsId" @click="skipNewsItemEvent(item.newsId)">
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
            </div>

            <div class="content_nr">
                <div class="item-img-box">
                    <img class="item-img" src="../../../static/data/img/5.jpg" alt="">
                </div>
                <h3 class="text-item">
                    称“巴西人来自丛林”，阿根廷总统为争议言论道歉
                </h3>
                <div class="rests-data-box">
                    <span class="rests-span source-date">央视新闻</span>
                    <span class="rests-span news-type">科技</span>
                    <span class="create-date">今天 16:40</span>
                </div>
            </div>
        </div>
        <div class="vb-box"></div>
    </div>
</template>

<script>

export default {
    name: 'hot',
    data(){
        return {
            slideshowArray: [],
            newsArrys: []
        }
    },
    methods:{
        //新闻详情页面的跳转
        skipNewsItemEvent(id){
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
        queryEvent(keywork){
            console.log("搜索事件触发!");
            console.log(keywork);

            if (keywork !== '' || keywork !== undefined){
                this.$http.get('/news/fuzzy_query',{params:{
                    keywork: keywork
                }}).then((req)=>{
                    if (req.status === 200){
                        this.newsArrys = req.data;
                    }else{
                        this.$message.error("新闻搜索操作失败~~~");
                    }
                })
            }
        }

    },
    mounted(){
        console.log("初始化页面数据开始!");
        this.$http.get('/index/slide_show')
        .then((req)=>{
            if (req.status === 200){
                this.slideshowArray = req.data;
            }else{
                this.$message.error("获取轮播图数据失败~~~");
            }
        })

        this.$http.get('/news/news_arr')
        .then((req)=>{
            if (req.status === 200){
                this.newsArrys = req.data;
            }else{
                this.$message.error("获取新闻列表数据失败~~~");
            }
        })

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
        margin: 20px auto; 
    }

    .sildeshow-img {
        width: 100%;
        float: left;
        position: absolute;
        bottom: -20%;
    }

    .content {
        padding-top: 20px;
        height: 450px;
        /* background-color: #555; */
    }
    .content_lb {
        width: 640px;
        height: 360px;
        background-color: #fff;
        margin: 0 auto;
    }
    .content_nr {
        height: 120px;
        margin: 10px auto;
        background-color: #ffffff;
        position: relative;
        border-radius: 10px;
    }

    .item-img {
        /* height: 100px; */
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
        width: 70%;
        padding: 10px 0 10px 0
    }

    .text-item:hover {
        color: #ff6820;
        cursor: pointer;
    }

    .rests-data-box {
        width: 70%;
        position: absolute;
        bottom: 10px;
        left: 20%;
        /* background-color: salmon; */
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

    .carousel-box {
        position: relative;
    }

    .preview-box {
        height: 120px;
        width: 100%;
        background-color: rgba(0, 0, 0,0.6);
        position: absolute;
        bottom: 0px;
        color: #fff;
        /* padding: 10px 5px 10px px; */
    }

    .preview-title {
        width: 98%;
        margin: 5px auto;
    }

    .preview-item {
        font-size: 14px;
        width: 98%;
        margin: 10px auto;
        overflow:hidden; /*隐藏超出父元素的内容*/
	    display:-webkit-box; /*弹性伸缩盒子模型显示*/
	    -webkit-line-clamp:2; /*限制在一个块元素显示的文本的行数。*/
	    -webkit-box-orient:vertical; /*设置或检索伸缩盒子对象的子元素的排列方式。*/
    }

    .vb-box{
        height: 20px;
        width: 100%;
    }
</style>
