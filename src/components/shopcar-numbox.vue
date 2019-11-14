<template>
  <div>
    <div class="mui-numbox" data-numbox-step="1" data-numbox-min="0" style="height:25px">
      <button class="mui-btn mui-numbox-btn-minus" type="button">-</button>
      <input class="mui-numbox-input" type="number" :value="count" readonly  @change="countChange" ref="num"/>
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
          
          this.$store.state.car.some(item => {
              if( item.id === this.id ){
                  item.count = this.$refs.num.value
                  this.$store.commit('newNum')
                  console.log(this.$store.state.car);

                  
              }
          })
      localStorage.setItem('car',JSON.stringify(this.$store.state.car))

          
      }
  },
  props:['count','id']

};
</script>
<style lang="less" scoped>


</style>
