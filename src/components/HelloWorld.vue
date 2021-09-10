<template>
  <div class="hello">
    <h1>hello</h1>
    <div id="div1"></div>
    <input type="button" value="点击" @click="essayEvent()">
  </div>
</template>

<script>
import E from "wangeditor";
var editor;
export default {
  data(){
    return {
      msg: String
    };
  },
  methods: {

    essayEvent(){
      console.log("点击事件触发!");
      let count = editor.txt.html();
      console.log(count);

    },

    createEditor(){
      // const editor = new E("#div1");
      editor.config.uploadFileName = 'file';
      //  editor.config.uploadImgServer = 'http://localhost:8082/upload/saveImg';
      editor.config.uploadImgServer = this.$host+'/upload/saveImg';
    
 
      editor.create();
    }
  },
  mounted: function() {
    console.log("hello");
    editor = new E("#div1");
    this.createEditor();
    // createEditor();
  }
  
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  #div1{
    text-align: left;
  }
</style>
