<template>
    <div class="tmpl">
        <div id="header" class="header">
            <div class="head-top">
                <div class="section">
                    <div class="left-box">
                        <span>vue2.0单页应用</span>
                        <a target="_blank" href="#"></a>
                        <a target="_blank" href="#"></a>
                    </div>
                    <div id="menu" class="right-box">
                        <a href="javascript:;" v-if='!islogin'>登录</a>
                        <router-link to='/site/vipcenter' v-if='islogin'>会员中心</router-link>
                        <strong>|</strong>
                        <a href="javascript:;" v-if='!islogin'>注册</a>
                        <a href="javascript:;" v-if='islogin' @click='logout'>退出</a>
                        <strong>|</strong>
                        <!-- <a href="/content/contact.html">
                            <i class="iconfont icon-phone"></i>联系我们</a> -->
                        <router-link to="/site/goodscar" id="shopcar">
                            <i class="iconfont icon-cart"></i>购物车(
                            <span id="shoppingCartCount" v-text='shoppingCartCount'>
                                <!-- <script type="text/javascript" src="/tools/submit_ajax.ashx?action=view_cart_count"></script> -->
                            </span>)</router-link>
                    </div>
                </div>
            </div>
        </div>
        <router-view>
        </router-view>
    </div>
</template>

<script>
    import { vm, KEY } from '../public/bus.js'
    export default {
        data() {
            return {
                islogin: false,
                shoppingCartCount: 0,
            }
        },
        methods: {
            // 退出
            logout() {
                this.ajax.get('/site/account/logout').then(res => {
                    if(res.data.status == 0){
                        this.islogin = false;
                        localStorage.setItem('logined', 'false');
                        this.$router.push({ name: 'login' });
                    }
                })
            },
            // 检查是否登录
            checklogin(){
                var result = localStorage.getItem('logined');
                if(result == 'true'){
                    this.islogin = true;
                }else{
                    this.islogin = false;
                }
            }
        },
        mounted() {
            $(document).ready(function () {
                $("#menu2 li a").wrapInner('<span class="out"></span>');
                $("#menu2 li a").each(function () {
                    $('<span class="over">' + $(this).text() + '</span>').appendTo(this);
                });

                $("#menu2 li a").hover(function () {
                    $(".out", this).stop().animate({ 'top': '48px' }, 300); // move down - hide
                    $(".over", this).stop().animate({ 'top': '0px' }, 300); // move down - show

                }, function () {
                    $(".out", this).stop().animate({ 'top': '0px' }, 300); // move up - show
                    $(".over", this).stop().animate({ 'top': '-48px' }, 300); // move up - hide
                });

            });
            vm.$on(KEY, (buycount) => {
                // this.shoppingCartCount += buycount;
                localStorage.setItem('shoppingCartCount', buycount);
                this.shoppingCartCount = localStorage.getItem('shoppingCartCount');
            })
            var countStr = localStorage.getItem('shoppingCartCount');
            if (countStr != 'NaN') {
                this.shoppingCartCount = parseInt(countStr);
            }
            var obj = JSON.parse(localStorage.getItem('buyGoods'));
            this.checklogin();
            vm.$on('logined', (value) => {
                this.checklogin();
            })
        }
    }
</script>
<style scoped>
    @import url('../../statics/jqplugins/jqhovernav/jqhoverNav.css')
</style>