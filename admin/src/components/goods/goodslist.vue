<template>
    <div class="tmpl arttmpl">
        <div class="abread bt-line">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item :to="{ path: '/' }">知识内容</el-breadcrumb-item>
                <el-breadcrumb-item>首页</el-breadcrumb-item>
                <el-breadcrumb-item>内容管理</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div class="operation">
            <el-row>
                <el-col :span="20">
                    <div>
                        <router-link to="/admin/goodsadd">
                            <el-button size="small">
                                <i class="el-icon-plus" style="padding-right:5px"></i>新增</el-button>
                        </router-link>
                        <el-button size="small" @click="selectAll(list)">
                            <i class="el-icon-check" style="padding-right:5px"></i>全选</el-button>
                        <el-button size="small" @click="del">
                            <i class="el-icon-delete" style="padding-right:5px"></i>删除</el-button>
                    </div>

                </el-col>
                <el-col :span="4">
                    <el-input placeholder="请输入搜索内容" icon="search" v-model="searchVue" :on-icon-click="getList" @keydown.13.native="getList">
                    </el-input>
                </el-col>
            </el-row>
        </div>
        <el-table ref="multipleTable" @select='selected'  @select-all="selectAll(list)" :data="list" border tooltip-effect="dark" style="width: 100%">
            <el-table-column type="selection" width="55">
            </el-table-column>
            <el-table-column prop="title" label="标题">
                <template scope="scope">
                    <el-tooltip class="item" effect="dark" placement="right">
                        <div slot="content">
                            <img width="100px" height="100px" :src="scope.row.imgurl" alt="">
                        </div>
                        <a href="javascript:;">{{scope.row.title}}</a>
                    </el-tooltip>
                </template>
            </el-table-column>
            <el-table-column prop="categoryname" label="所属类别" width="100">
            </el-table-column>
            <el-table-column prop="stock_quantity" label="库存" width="100" show-overflow-tooltip>
            </el-table-column>
            <el-table-column prop="market_price" label="市场价" width="100" show-overflow-tooltip>
            </el-table-column>
            <el-table-column prop="sell_price" label="销售价" width="100" show-overflow-tooltip>
            </el-table-column>
            <el-table-column label="属性" width="120" show-overflow-tooltip>
                <template scope="scope">
                    <i v-bind="{class:'el-icon-picture ' +(scope.row.is_slide==1?'':'unlight')}"></i>
                    <i v-bind="{class:'el-icon-upload ' +(scope.row.is_top==1?'':'unlight')}"></i>
                    <i v-bind="{class:'el-icon-star-on ' +(scope.row.is_hot==1?'':'unlight')}"></i>
                </template>
            </el-table-column>
            <el-table-column label="操作" width="120">
                <template scope="scope">
                    <router-link v-bind="{to:'/admin/goodsedit/'+scope.row.id}">修改</router-link>
                </template>
            </el-table-column>
        </el-table>
        <el-pagination @size-change="pageSizeChange" @current-change="currentPageChange" :current-page="currentPage" :page-sizes="[1 , 6 , 12 , 18]"
            :page-size="pageSize" layout="total, sizes, prev, pager, next, jumper" :total="totalcount">
        </el-pagination>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                isSelectAll: false,
                totalcount: 10,
                currentPage: 1,
                pageSize: 6,
                searchVue: '',
                list: [],
                delids: []
            }
        },
        methods: {
            pageSizeChange(pageSize) {
                console.log(pageSize);
                this.pageSize = pageSize;
                this.getList();
            },
            currentPageChange(currentPage) {
                this.currentPage = currentPage;
                this.getList();
            },
            getList() {
                var url = '/admin/goods/getlist?pageIndex=' + this.currentPage + '&pageSize=' + this.pageSize + '&searchvalue=' + this.searchVue;

                this.ajax.get(url)
                    .then(res => {
                        this.list = res.data.message;
                        this.totalcount = res.data.totalcount;
                    })
                    .catch(erro => { console.log(erro.message); })
            },
            // 单选
            selected(selection, row) {
                // console.log(row);
                this.delids.push(row.id);
            },
            // 全选
            selectAll(rows) {
                this.isSelectAll = !this.isSelectAll;
                this.delids.length = 0;
                if (this.isSelectAll) {
                    rows.forEach(row => {
                        this.$refs.multipleTable.toggleRowSelection(row);
                        this.delids.push(row.id);
                    });
                    console.log(this.delids);
                } else {
                    rows.forEach(row => {
                        this.$refs.multipleTable.toggleRowSelection(row);
                        // this.delids.push(row.id);
                    });
                    console.log(this.delids);
                }
            },
            // 删除
            del(){
                var ids = this.delids.join(',');
                // console.log(ids);
                var url = '/admin/goods/del/'+ids;
                this.ajax.get(url).then(res=>{
                    if(res.data.status == 1){
                        this.$message.error(res.data.message);
                    }
                    this.getList();
                })
            }
        },
        mounted() {
            this.getList();
        }
    }
</script>
<style class="scoped">
    .unlight {
        color: rgba(0, 0, 0, .3)
    }

    .goodstip {
        padding: 3px;
    }

    .abread {
        padding: 10px;
    }

    .ls.el-icon-picture,
    .ls.el-icon-upload,
    .ls.el-icon-star-on {
        opacity: 0.5;
        font-size: 18px;
    }

    .ls.el-icon-picture.imgactive,
    .ls.el-icon-upload.imgactive,
    .ls.el-icon-star-on.imgactive {
        opacity: 1;
        font-size: 18px;
    }

    .listedit {
        color: #2A72C5;
        font-size: 12px;

    }
</style>