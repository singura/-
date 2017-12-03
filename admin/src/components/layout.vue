<template>
    <div class="tmpl">
        <el-row>
            <el-col :span="4">
                <!-- 1.0 左边菜单 -->
                <img src="../../statics/imgs/logo.png" alt="">
                <div class="layout menu">
                    <el-menu :default-active="currnetMID" class="el-menu-vertical-demo">
                        <el-submenu index="5">
                            <template slot="title">
                                <i class="el-icon-message"></i>购物商城</template>
                            <el-menu-item-group>
                                <router-link to="/admin/goodslist">
                                    <el-menu-item index="5-1">
                                        <i class="el-icon-document"></i>内容管理</el-menu-item>
                                </router-link>
                                <router-link to="/admin/catelist">
                                    <el-menu-item index="5-2">
                                        <i class="el-icon-document"></i>类别管理</el-menu-item>
                                </router-link>
                                <el-menu-item index="5-3">
                                    <i class="el-icon-document"></i>评论管理</el-menu-item>
                            </el-menu-item-group>
                        </el-submenu>
                    </el-menu>
                </div>
            </el-col>
            <el-col :span="20">
                <el-row>
                    <el-col :span="24">
                        <!--2.0 顶部登录信息条 -->
                        <div class="topbg">
                            <el-row>
                                <!-- 左边的图标 -->
                                <el-col :span="1">
                                    <i class="el-icon-menu"></i>
                                </el-col>
                                <!-- 右边的登录信息和相关操作 -->
                                <el-col :span="23">
                                    欢迎【xxx】登录
                                    <el-dropdown split-button type="primary" size="small">
                                        更多菜单
                                        <el-dropdown-menu slot="dropdown">
                                            <el-dropdown-item>修改密码</el-dropdown-item>
                                            <el-dropdown-item>注销</el-dropdown-item>
                                        </el-dropdown-menu>
                                    </el-dropdown>
                                </el-col>
                            </el-row>
                        </div>
                    </el-col>
                </el-row>

                <el-row>
                    <el-col :span="24">
                        <!-- 3.0 其他功能的渲染区占位符 -->
                        <router-view></router-view>

                    </el-col>
                </el-row>
            </el-col>
        </el-row>

    </div>
</template>

<script>

    export default {
        data() {
            return {
                currnetMID: "5-1"
            }
        },
        mounted() {
            this.currnetMID = localStorage.getItem("currentMID");
        },
        methods: {
        }
    }
</script>
<style scoped>
</style>