<template>
  <div id="app">
    <router-view/>
    <div class="bottom-box"></div>
  </div>
  
</template>

<script>
export default {
  name: 'App'
}
</script>

<style>
  *{
      padding: 0;
      margin: 0;
  }
  html,body{
      height: 100%;
      background-color:	#F8F8FF;
      
      /* background-color: plum; */
  }
  .box{
      position: relative;
      height: 100%;
      width: 100%;
      min-height:600px;
      min-width: 1220px;
      /* background-color: pink; */
  }
  #app{
    height: 100%;
  }

  .bottom-box {
      height: 10px;
      width: 100%;
      background-color: slategray;
      position: fixed;
      bottom: 0px;
      z-index: 10001;
  }


</style>
