<template>
    <div>
        <v-head></v-head>
        
        <div class="w">
            <div class="news-form-box">
                <el-form class="news-form" label-position="top" :rules="rules" ref="ruleForm" label-width="80px" :model="ruleForm">
                    <el-form-item class="element-span" label="新闻标题" prop="title">
                        <el-input placeholder="请输入新闻标题" v-model="ruleForm.title"></el-input>
                    </el-form-item>
                    <div class="form-item-box">
                        <div class="form-item-left">
                             <el-form-item class="element-span" label="新闻类型" prop="typeCode">
                                <el-select v-model="ruleForm.typeCode" placeholder="请选择">
                                    <el-option
                                    v-for="item in selectType"
                                    :key="item.code"
                                    :label="item.name"
                                    :value="item.code">
                                    </el-option>
                                </el-select>
                            </el-form-item>
                        </div>
                       
                        <div class="form-item-right">
                            <el-form-item class="element-span" label="新闻来源" prop="source">
                               <el-input v-model="ruleForm.source" style="width:240px" placeholder="请输入内容"></el-input>
                            </el-form-item>
                        </div>
                    </div>
                   <el-form-item class="element-span" label="新闻简介" prop="synopsis">
                       <el-input
                            type="textarea"
                            :rows="5"
                            placeholder="请输入内容"
                            v-model="ruleForm.synopsis">
                        </el-input>
                   </el-form-item>
                    <el-form-item class="element-span" label="缩略图">
                        <el-upload
                            class="upload-demo"
                            action="http://192.168.56.103/upload/saveImg"
                            list-type="picture"
                            :limit="1"
                            :on-success="uploadSuccessEvent"
                            :on-exceed="errorEvent">
                            <el-button size="small" type="primary">点击上传</el-button>
                        </el-upload>
                    </el-form-item>
                </el-form>
            </div>
            <div id="news-content"></div>
            <div class="bottem-btn">
                <el-button type="primary" @click="commitNews('ruleForm')" class="commit-btn">提交</el-button>
            </div>
        </div>
    </div>
</template>

<script>
import head from './module/ViewHead.vue';
import E from "wangeditor";
var editor;
export default {
    components: {
        "v-head": head
    },
    data(){
        return {
            ruleForm: {
                title: '',
                typeCode: '',
                source: '',
                minImgUrl: '',
                content: '',
                synopsis: ''
            },
            rules: {
                title: [
                    { required: true, message: '请输入新闻标题', trigger: 'blur' },
                    { min: 3, max: 50, message: '长度在 3 到 50 个字符', trigger: 'blur' }
                ],
                typeCode: [
                    { required: true, message: '请选择新闻类型', trigger: 'change' }
                ],
                source: [
                    {required: true, message: '请输入新闻来源', trigger: 'blur' }
                ],
                synopsis: [
                    {required: true, message: '请输入新闻简介', trigger: 'blur' }
                ]
            },
            selectType: []
        }
        
    },
    methods: {
        errorEvent(files, fileList) {
            console.log("error")
            this.$message.error("最多只能上传一张新闻缩略图~~~");
        },
        uploadSuccessEvent(response, file, fileList) {
            console.log("图片上传成功!");
            let imgUrl = response.data[0].url;
            console.log(imgUrl);

            let x = imgUrl.indexOf('/');
            for (let i=0;i<2;i++){
                x=imgUrl.indexOf('/',x+1);
            }

            let outUrl = imgUrl.substring(x);
            console.log(outUrl);
            this.ruleForm.minImgUrl = outUrl;
        },
        createEditor(){
            // const editor = new E("#div1");
            editor.config.uploadFileName = 'file';
            //  editor.config.uploadImgServer = 'http://localhost:8082/upload/saveImg';
            editor.config.uploadImgServer = this.$host+'/upload/saveImg';
            editor.config.height = 500;
            
        
            editor.create();
        },
        commitNews(formName) {
            //获取新闻数据
            this.$refs[formName].validate((valid) => {
                if (valid) {
                    console.log("验证成功!");
                    //获取新闻详情数据
                    this.ruleForm.content = editor.txt.html();
                    if (this.verifyForm()){
                        this.$http.post('/news/commit_news',this.ruleForm)
                        .then((req)=>{
                            console.log(req);
                            if (req.data.code === 200) {
                                this.$router.push("/news_manage");
                            }
                        })
                    }
                } else {
                    console.log('error submit!!');
                    return false;
                }
            });
        },
        verifyForm() {
            let newsFormData = this.ruleForm;
            if (newsFormData.minImgUrl === '' || newsFormData.minImgUrl === undefined){
                this.$message.error("请上传新闻缩略图~~~");
                return false;
            }

            if (newsFormData.content === '' || newsFormData.content === undefined){
                this.$message.error("请输入新闻内容~~~");
                return false;
            }
            return true;
        }
    },
    resetForm(formName) {
        this.$refs[formName].resetFields();
    },
    mounted(){
        console.log("数据初始化开始!");
        this.$http.get('/news/get_news_type')
        .then((req)=> {
            if (req.status === 200){
                this.selectType = req.data;
            }else{ 
                this.$message.error("获取新闻类型数据失败~~~");
            }
        });

        editor = new E("#news-content");
        this.createEditor();
    }
}
</script>

<style scoped>
    .w {
        width: 1000px;
        margin: 20px auto;
        background-color: #ffffff;
    }

    .news-form {
        padding-top: 20px;
        padding-bottom: 20px;
    }

    .news-form-box {
        width: 600px;
        margin: 0 auto;
    }

    .element-span {
        font-weight: bolder;
    }

   .upload-box{
       width: 100%;
       background-color: pink;
   }

   .upload-item {
       height: 200px;
       width: 200px;
       background-color: plum;
   }

   .upload-input {
       height: 100%;
       width: 100%;
   }

   .form-item-box {
       overflow: auto;
   }

   .form-item-left {
       float: left;
       /* margin-right: 50px; */
   }

   .form-item-right {
       float: right;
   }

   #news-content {
       height: 600px;
       margin: 20px 20px 0 20px;
   }

    .bottem-btn {
        height: 10  0px;
        /* background-color: plum; */
        margin-top: 20px;
    }

    .commit-btn {
        float: right;
        margin-right: 20px;
    }
    .bottom-box {
        height: 50px;
        background-color: slategray;
    }
</style>