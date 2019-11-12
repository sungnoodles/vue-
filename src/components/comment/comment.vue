<template>
  <div>
    <h3>发表评论</h3>
    <hr>
    <textarea maxlength="120" placeholder="吐槽内容" v-model="msg"></textarea>

    <mt-button type='primary' size='large' @click="postComment">发表评论</mt-button>

    <div class="cmt-list">
        <div class="cmt-item" v-for="(item,i) in comments" :key="item.add_time">
            <div class="cmt-title">
                第{{ i+1 }}楼&nbsp;&nbsp;用户：匿名用户&nbsp;&nbsp;发表时间：{{ item.add_time | dateFormat }}
            </div>
            <div class="cmt-body">
                {{ item.content }}
            </div>
        </div>
    </div>

    <mt-button type='danger' size='large' @click="more">加载更多</mt-button>

  </div>
</template>

<script>
import { Toast } from 'mint-ui'
export default {
    data(){
        return {
            comments:[],
            pageindex:1,
            msg:''
        }
    },
    created(){
        this.getComments()
    },
    methods:{
        getComments(){
            this.$http.get('api/getcomments/'+ this.id +'?pageindex=' + this.pageindex).then(res => {
                this.comments=this.comments.concat(res.body.message)
                
            })
        },
        more(){
            this.pageindex++
            this.getComments()
        },
        postComment(){
            if(this.msg.trim() === 0){
                return Toast('您的评论内容不能为空')
            }
            var comment={};
            this.$http.post('api/postcomment/'+this.$route.params.id,{ content:this.msg.trim() })
            .then(res => {
                var cmt = {
                    user_name:"匿名用户",
                    add_time: Date.now(),
                    content: this.msg.trim()
                }
                console.log(cmt);
                
                this.comments.unshift(cmt)
                this.msg=''
                
            })
        }
    },
    props:['id']
};
</script>

<style lang="less" scoped>
.cmt-list {
    margin-top: 10px;
    .cmt-item {
        font-style: 13px;
        .cmt-title {
            line-height: 30px;
            background-color: #ccc;
        }
        .cmt-body {
            line-height: 35px;
            text-indent: 2em;
        }
    }
}
textarea {
    font-size: 14px;
    height: 85px;
    margin: 0;
}
</style>

