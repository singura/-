// 1.0 导入vue.js  <script src="vue.js">
// import vue from 'vue'
// var vue  = require('vue');  //查找node_modules中的vue这个包
import Vue from 'vue';

// 2.0 导入app.vue组件对象
import App from './App.vue';   //当前目录下面查找app.vue这个组件


// 3.0 导入vue-router这个路由模块进行整个系统的路由控制
// 3.0.1 导入vue-router这个包
import VueRouter from 'vue-router';

// 3.0.0 将VueRouter对象通过Vue.use()使用一下
Vue.use(VueRouter);

// 3.0.2 导入组件对象
import layout from './components/layout.vue';
import login from './components/account/login.vue';


// 商品相关的组件
import goodslist from './components/goods/goodslist.vue';
import info from './components/goods/info.vue';
import goodscar from './components/goods/goodscar.vue';
import setorder from './components/goods/setorder.vue';
// 支付相关组件
import pay from './components/pay/pay.vue';
import paysuccess from './components/pay/paysuccess.vue';
// 会员相关组件
import vipcenter from './components/vip/vipcenter.vue';
import orderlist from './components/vip/orderlist.vue';
import orderinfo from './components/vip/orderinfo.vue';
// 设置全局过滤器
Vue.filter('datefml',(input)=>{
    var date = new Date();
    var y = date.getFullYear();
    var m = date.getMonth();
    var d = date.getDate();
    return y  + '-' + m + '-' + d;
})
// 3.0.2 实例化对象并且定义路由规则
var router = new VueRouter({
    routes: [
        // 默认跳转的路由规则
        { name: 'default', path: '/', redirect: '/site/goodslist' },
        // 布局
        {
            name: 'layout', path: '/site', component: layout,
            children: [
                // 商品列表
                { name: 'goodslist', path: 'goodslist', component: goodslist },
                { name: 'info', path: 'info/:infoid', component: info },
                { name: 'goodscar', path: 'goodscar', component: goodscar},
                { name: 'setorder', path: 'setorder/:ids', component: setorder, meta:{ checklogin: true}},
                // 登录
                { name: 'login', path: 'login', component: login, meta: { nologin: true } },
                { name: 'pay', path: 'pay/:orderid', component: pay},
                { name: 'paysuccess', path: 'paysuccess', component: paysuccess},
                // 会员中心
                {name: 'vipcenter', path:'vipcenter', component: vipcenter},
                {name: 'orderlist', path:'orderlist', component: orderlist},
                {name: 'orderinfo', path:'orderinfo/:orderid', component: orderinfo}

            ]
        }
    ]
});

// 4.0 导入vue的一个组件库:element-ui
import elementUI from 'element-ui';
// 导入默认样式
import '../statics/elementuiCss/index.css';

// 导入自己编写的全局样式
import '../statics/site/css/style.css';

import { Affix, Table } from 'iview';
Vue.component('Affix', Affix);

// 导入axios
import axios from 'axios'
axios.defaults.baseURL = 'http://127.0.0.1:8899';
Vue.prototype.ajax = axios;
axios.defaults.withCredentials=true;

// 检查是否登录
router.beforeEach((to,from,next)=>{
    // if (to.meta.checklogin){
    //     if(to.meta.nologin){
    //         next();
    //         return;
    //     }
    //     axios.get('/site/account/islogin').then(res=>{
    //         if(res.data.code == "nologin"){
    //             router.push({name:'login'})
    //         }else{
    //             next();
    //         }
    //     })
    // }else{
    //     next();
    // }
    if(to.meta.nologin){
        next();
        return;
    }else{
        localStorage.setItem('path', to.path);
        axios.get('/site/account/islogin').then(res => {
            if(res.data.code == "nologin"){
                router.push({name:'login'})
            }else{
                next();
            }
        })
    }
})

// 绑定到vue中
Vue.use(elementUI);

// 3.0 实例化vue对象
new Vue({
    el: '#app',
    router,  //绑定路由对象使它生效
    // render:function(create){create(App)}
    // 将app组件编译将这个组件中的内容填充到 el:指向的app这个div中
    render: create => create(App)
});