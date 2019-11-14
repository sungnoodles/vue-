<template>
  <div>
    <div class="mui-numbox" data-numbox-step="1" data-numbox-min="0" >
      <button class="mui-btn mui-numbox-btn-minus" type="button">-</button>
      <input class="mui-numbox-input" type="number" @change="countChange" ref="num"/>
      <button class="mui-btn mui-numbox-btn-plus" type="button">+</button>
    </div>
  </div>
</template>

<script>
import mui from "../lib/mui/js/mui.min.js";
export default {
  mounted() {
      mui(".mui-numbox").numbox()
  },
  methods: {
    countChange(){
    this.$emit('func',this.$refs.num.value)
  }
  
  },
  props:['max'],
  watch: {
 
    
    max : function(newVal,oldVal) {
      mui('.mui-numbox')
        .numbox()
        .setOption('max',newVal)
    }
  }
};
</script>
<style lang="less" scoped>


</style>
