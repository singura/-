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

// 新增商品
import goodsadd from './components/goods/goodsadd.vue';

// 修改商品
import goodsedit from './components/goods/goodsedit.vue';

import catelist from './components/goods/catelist.vue'

// 3.0.2 实例化对象并且定义路由规则
var router = new VueRouter({
    routes: [
        // 默认跳转的路由规则
        { name: 'default', path: '/', redirect: '/admin' },
        // 登录
        { name: 'login', path: '/login', component: login, meta: { nologin: true } },
        // 布局
        {
            name: 'layout', path: '/admin', component: layout,meta:{mno: '5-1'},
            children: [
                // 商品列表
                { name: 'goodslist', path: 'goodslist', component: goodslist, meta: { mno: '5-1' } },
                { name: 'goodsadd', path: 'goodsadd', component: goodsadd, meta: { mno: '5-1' } },
                { name: 'goodsedit', path: 'goodsedit/:goodsid', component: goodsedit, meta: { mno: '5-1' } },
                { name: 'catelist', path: 'catelist', component: catelist, meta: { mno: '5-2' } }
            ]
}
    ]
});

// 4.0 导入vue的一个组件库:element-ui
import elementUI from 'element-ui';
// 导入默认样式
import '../statics/theme_rms/index.css';

// 导入自己编写的全局样式
import '../statics/css/site.css';

// 导入axios
import axios from 'axios'
axios.defaults.baseURL = 'http://127.0.0.1:8899';
Vue.prototype.ajax = axios;
axios.defaults.withCredentials = true;
// 在vue-router对象上添加一个全局守卫，在任何组件渲染出来之前都需要执行这个守卫函数
router.beforeEach((to, from, next) => {
    if(to.meta.mno){
        // console.log(to.meta.mno);
        localStorage.setItem("currentMID",to.meta.mno);
        // console.log(localStorage.getItem("currentMID"));
    }
    if (to.meta.nologin) {
        next();
        return
    }

    axios.get('/admin/account/islogin').then(res => {
        if (res.data.code == 'nologin') {
            router.push({ name: 'login' })
        } else {
            next();
        }
    })
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