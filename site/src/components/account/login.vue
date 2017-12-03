<template>
    <div class="tmpl">
        <div class="section">
            <div class="location">
                <span>当前位置：</span>
                <a href="/index.html">首页</a> &gt;
                <a href="/login.html">会员登录</a>
            </div>
        </div>
        <div class="section">
            <div class="wrapper">
                <div class="bg-wrap">
                    <div class="nav-tit">
                        <a class="selected" href="javascript:;">账户登录</a>
                        <i>|</i>
                        <a href="/register.html">免费注册</a>
                    </div>

                    <form id="loginform" name="loginform" class="login-box" url="/tools/submit_ajax.ashx?action=user_login&amp;site_id=1">
                        <div class="input-box">
                            <input id="txtUserName" name="txtUserName" v-model='user.user_name' type="text" placeholder="用户名/手机/邮箱" maxlength="50">
                        </div>
                        <div class="input-box">
                            <input id="txtPassword" name="txtPassword" v-model='user.password' type="password" placeholder="输入登录密码" maxlength="16">
                        </div>
                        <div class="btn-box">
                            <input id="btnSubmit" name="btnSubmit" type="button" value="立即登录" @click='login'>
                        </div>
                        <div id="msgtips" class="tip-box"></div>
                        <input id="turl" name="turl" type="hidden" value="http://localhost:8020/cart.html">
                        <!--记住上一页网址-->
                    </form>

                </div>
            </div>
        </div>
    </div>
    </div>
</template>

<script>
    import { vm } from '../../public/bus.js'
    export default {
        data() {
            return {
                user: {
                    user_name: 'singura',
                    password: '123'
                }
            }
        },
        methods: {
            login() {
                var url = '/site/account/login';
                this.ajax.post(url, this.user)
                    .then(res => {
                        if (res.data.status == 1) {
                            this.$message.error(res.data.message);
                            return;
                        }
                        // 登陆成功跳转到商品的列表页面
                        var path = localStorage.getItem('path');
                        this.$router.push({ path: path })
                        // this.$router.push({ name: 'goodscar' })
                        console.log(path);
                    })
                localStorage.setItem('logined','true');
                vm.$emit('logined','true');
            }
        }
    }
</script>
<style>
    html,
    body {
        width: 100%;
        height: 100%;
    }

    .zanwei {
        width: 100%;
        height: 100px;
    }

    .main {
        width: 100%;
        height: 100%;
        background-color: #0094ff;
    }

    .tmpl {
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

    li {
        margin-bottom: 20px;
        list-style: none;
    }

    p {
        display: block;
        margin-bottom: 10px;
    }
</style>