<template>
    <div class="tmpl main">
        <div class="zanwei"></div>
        <ul class="view">
            <li>
                <p>用户名：</p>
                <el-input v-model="user.uname" placeholder="请输入内容" size="small"></el-input>
            </li>
            <li>
                 <p>密 码：</p>
                <el-input v-model="user.upwd" placeholder="请输入内容" size="small"></el-input>
            </li>
            <li>
                <el-button type="primary" size="medium" @click="login">登陆</el-button>
                <el-button size="medium">重置</el-button>
            </li>
        </ul>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                user: {
                    uname: 'admin',
                    upwd: '123456'
                }
            }
        },
        methods: {
            login(){
                var url = '/admin/account/login';
                this.ajax.post(url,this.user)
                .then(res=>{
                    if(res.data,status == 1){
                        this.$message.error(res.data.message);
                        return;
                    }
                    // 登陆成功跳转到商品的列表页面
                    this.$router.push({name: 'goodslist'})
                })
            }
        }
    }
</script>
<style>
    html,body{
        width: 100%;
        height: 100%;
    }
    .zanwei{
        width: 100%;
        height: 100px;
    }
    .main{
        width: 100%;
        height: 100%;
        background-color: #0094ff;
    }
    .tmpl{
        height: 100%;
    }
    .view {
        width: 300px;
        height: 200px;
        margin: 0 auto;
        border: 1px solid #ccc;
        border-radius: 5px;
        padding: 10px;
        color: #fff;
    }
    li{
        margin-bottom: 20px;
        list-style: none;
    }
    p{
        display: block;
        margin-bottom: 10px;
    }
</style>