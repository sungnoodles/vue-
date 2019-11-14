<template>
  <div>
    <h3 class="title">{{info.title}}</h3>
    <div class="subTitle">
        <span>发表时间：{{ info.add_time | dateFormat }}</span>
        <span>点击：{{ info.click }}次</span>
    </div>
    <hr>
    <!-- 缩略图 -->
    <vue-preview :slides="slide1" @close="handleClose"></vue-preview>

    <div class="content" v-html="info.content">很美的落地大书柜很美的落地大书柜很美的落地大书柜很美的落地大书柜很美的落地大书柜很美的落地大书柜</div>

    <comment></comment>



  </div>
</template>

<script>
import comment from '../comment/comment.vue'

export default {
    data(){
        return {
            id:this.$route.params.id,
            info:{},
            slide1:[]
        }
    },
    created(){
        this.getInfo(this.id)
        this.getThum(this.id)
    },
    methods: {
        getInfo(id){
            this.$http.get("api/getimageInfo/"+id).then( res => {
            this.info = res.body.message[0]
            })
        },
        getThum(id){
            this.$http.get("api/getthumimages/"+id).then( res => {
                res.body.message.forEach( item => {
                    item.w = 600
                    item.h = 400
                    item.msrc = item.src
                } )
            this.slide1 = res.body.message
            
            })
        },
        handleClose () {
        console.log('close event')
      }
    },
    components: {
        comment
    }


};
</script>

<style lang="less" scoped>
.title {
    font-size: 16px;
    color: cyan;
    text-align: center;
    height: 40px;
    line-height: 40px;
}
.subTitle {
    font-size: 12px;
    display: flex;
    justify-content: space-between;
    color: gray;
}
.content {
    font-size: 13px;
    line-height: 30px;
    text-indent: 2em;
}


</style>

