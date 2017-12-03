<template>
	<div class="tmpl">
		<div class="section">
			<div class="location">
				<span>当前位置：</span>
				<a href="/index.html">首页</a> &gt;
				<a href="/cart.html">购物车</a>
			</div>
		</div>

		<div class="section">
			<div class="wrapper">
				<div class="bg-wrap">
					<!--购物车头部-->
					<div class="cart-head clearfix">
						<h2>
							<i class="iconfont icon-cart"></i>我的购物车</h2>
						<div class="cart-setp">
							<ul>
								<li class="first active">
									<div class="progress">
										<span>1</span>
										放进购物车
									</div>
								</li>
								<li>
									<div class="progress">
										<span>2</span>
										填写订单信息
									</div>
								</li>
								<li class="last">
									<div class="progress">
										<span>3</span>
										支付/确认订单
									</div>
								</li>
							</ul>
						</div>
					</div>
					<!--购物车头部-->
					<!--商品列表-->
					<div class="cart-box">
						<input id="jsondata" name="jsondata" type="hidden">
						<table width="100%" align="center" class="cart-table" border="0" cellspacing="0" cellpadding="8">
							<tbody>
								<tr>
									<th width="48" align="center">
										<el-button size='small' @click='selectAll' v-bind="{type:isslected?'primary':'success'}">{{statu}}</el-button>
									</th>
									<th align="left" colspan="2">商品信息</th>
									<th width="84" align="left">单价</th>
									<th width="104" align="center">数量</th>
									<th width="104" align="left">金额(元)</th>
									<th width="54" align="center">操作</th>
								</tr>
								<tr v-for='(item,index) in list'>
									<td width="48" align="center">
										<el-switch v-model="value[index]" on-text="已选" off-text='未选' size='small' @change='change'>
										</el-switch>
									</td>
									<td align="left" colspan="2">
										<img :src="item.img_url" alt="" class="img">
										<a href="javascript:;">{{item.title}}</a>
									</td>
									<td width="84" align="left">{{item.sell_price}}</td>
									<td>
										<inputnumber :obj='{gid:item.id,count:item.buycount}' @msg='getmsg'></inputnumber>
									</td>
									<!-- <td width="104" align="center">{{item.buycount}}</td> -->
									<td width="104" align="left">{{item.sell_price*item.buycount}}</td>
									<td width="54" align="center">
										<el-button size='small' @click='deletedate(item.id)'>删除</el-button>
									</td>
								</tr>
								<tr>
									<td colspan="10" v-show='list.length<=0'>
										<div class="msg-tips">
											<div class="icon warning">
												<i class="iconfont icon-tip"></i>
											</div>
											<div class="info">
												<strong>购物车没有商品！</strong>
												<p>您的购物车为空，
													<a href="/index.html">马上去购物</a>吧！</p>
											</div>
										</div>
									</td>
								</tr>
								<tr>
									<th align="right" colspan="8">
										已选择商品
										<b class="red" id="totalQuantity">{{selectcount}}</b> 件 &nbsp;&nbsp;&nbsp; 商品总金额（不含运费）：
										<span class="red">￥</span>
										<b class="red" id="totalAmount">{{gettotalmoney}}</b>元
									</th>
								</tr>
							</tbody>
						</table>
					</div>
					<!--/商品列表-->
					<!--购物车底部-->
					<div class="cart-foot clearfix">
						<div class="right-box">
							<button class="button" onclick="javascript:location.href='/index.html';">继续购物</button>
							<!-- <button class="submit" onclick="formSubmit(this, '/', '/shopping.html');">立即结算</button> -->
							<button class="submit" @click='submit'>立即结算</button>
						</div>
					</div>
					<!--购物车底部-->
				</div>
			</div>
		</div>

	</div>
</template>
<script>
	import { getItem, setItemReplace, deleteItem } from '../../public/localStoragehelper.js';
	import inputnumber from '../subcom/inputnumber.vue';
	import { vm, KEY } from '../../public/bus.js';
	export default ({
		components: {
			inputnumber
		},
		data() {
			return {
				selectcount: 0,
				statu: "全选",
				value: [],
				list: [],
				isslected: false,
				goodsids: []
			}
		},
		computed: {
			gettotalmoney() {
				// console.log(this.value);
				var trueArr = this.value.filter(item => item);
				this.selectcount = trueArr.length;
				var totalmoney = 0;
				this.value.forEach((item, index) => {
					if (item) {
						totalmoney += this.list[index].buycount * this.list[index].sell_price;
					}
				})
				return totalmoney;
			}
		},
		methods: {
			submit() {
				this.value.forEach((item, index) => {
					if (item == true) {
						this.goodsids.push(this.list[index].id);
					}
				})
				if (this.goodsids.length <= 0) {
					this.$message({
						showClose: true,
						message: '错了哦，这是一条错误消息',
						type: 'error',
						duration: 1000
					})
					return;
				}
				this.$router.push({ name: 'setorder', params: { ids: this.goodsids.join(',') } })
			},
			change() {
				var falseArr = this.value.filter(item => !item);
				// console.log(falseArr);
				// console.log(falseArr.length);
				if (falseArr.length > 0) {
					this.statu = '全选';
					this.isslected = false
				} else {
					this.statu = '反选';
					this.isslected = true;
				}
			},
			deletedate(id) {
				// console.log(id);
				var index = this.list.findIndex(item => { return item.id == id })
				// console.log(index);
				// 删除list数组中的数据
				this.list.splice(index, 1);
				// 删除this.value中的数据
				this.value.splice(index, 1);
				// 删除localStorage中的数据
				deleteItem(id);
				var obj = getItem();
				var length = 0;
				for (var key in obj) {
					length++;
				}
				vm.$emit(KEY, length);
			},
			getmsg(obj) {
				// console.log(obj);
				setItemReplace(obj);
				var index = this.list.findIndex(item => { return item.id == obj.gid });
				// console.log(index);
				this.list[index].buycount = obj.count;
			},
			selectAll() {
				this.isslected = !this.isslected;
				for (var i = 0; i < this.value.length; i++) {
					this.value[i] = this.isslected;
				}
				this.value.push(false);
				this.value.pop();
				if (this.isslected == true) {
					this.statu = '反选';
				} else {
					this.statu = '全选';
				}
			},
			getcarlist() {
				var goodsObj = getItem();
				var arr = [];
				for (var key in goodsObj) {
					arr.push(key);
				}
				var ids = arr.join(',');
				var url = '/site/comment/getshopcargoods/' + ids;
				this.ajax.get(url).then(res => {
					res.data.message.forEach((item, index) => {
						item.buycount = goodsObj[item.id];
						this.value[index] = false;
					})
					this.list = res.data.message;
				})
			}
		},
		mounted() {
			this.getcarlist();
		}
	})
</script>
<style scoped>
	.img {
		vertical-align: middle;
	}
</style>