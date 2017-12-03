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
								<li class="active">
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
					<div class="cart-box">
						<h2 class="slide-tit">
							<span>1、收货地址</span>
						</h2>
						<el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
							<div class="form-box address-info clearfix">
								<el-col :span='12'>
									<el-form-item label="收货人姓名" prop="accept_name">
										<el-input v-model="ruleForm.accept_name"></el-input>
									</el-form-item>
									<el-form-item label='所属区域'>
										<v-distpicker @selected="selected"></v-distpicker>
									</el-form-item>
									<el-form-item label="详细地址" prop="address">
										<el-input v-model="ruleForm.address"></el-input>
									</el-form-item>
									<el-form-item label="手机号码" required prop='mobile'>
										<el-input v-model="ruleForm.mobile"></el-input>
									</el-form-item>
									<el-form-item label="电子邮箱" prop="email">
										<el-input v-model="ruleForm.email"></el-input>
									</el-form-item>
									<el-form-item label="邮政编码" prop="post_code">
										<el-col :span='12'>
											<el-input v-model="ruleForm.post_code"></el-input>
										</el-col>
									</el-form-item>
								</el-col>
							</div>
							<h2 class="slide-tit">
								<span>2、支付方式</span>
							</h2>
							<ul class="item-box clearfix">
								<!--取得一个DataTable-->
								<li>
									<el-radio v-model="radio" label="1">在线支付
										<em>手续费：0.00元</em>
									</el-radio>
								</li>
							</ul>
							<h2 class="slide-tit">
								<span>3、配送方式</span>
							</h2>
							<ul class="item-box clearfix">
								<!--取得一个DataTable-->
								<li>
									<el-radio-group v-model="ruleForm.express_id" @change='checkradio'>
										<el-radio :label="1">顺丰快递
											<em>费用：20.00元</em>
										</el-radio>
										<el-radio :label="2">圆通快递
											<em>费用：10.00元</em>
										</el-radio>
										<el-radio label="3">中通快递
											<em>费用：8.00元</em>
										</el-radio>
									</el-radio-group>
								</li>
							</ul>
							<h2 class="slide-tit">
								<span>4、商品清单</span>
							</h2>
							<div class="line15"></div>
							<table width="100%" border="0" align="center" cellpadding="8" cellspacing="0" class="cart-table">
								<tbody>
									<tr>
										<th colspan="2" align="left">商品信息</th>
										<th width="84" align="left">单价</th>
										<th width="84" align="center">购买数量</th>
										<th width="104" align="left">金额(元)</th>
									</tr>
									<tr v-for='(item,index) in goodslist' :key='item.id'>
										<td width="68">
											<a target="_blank" href="/goods/show-89.html">
												<img :src="item.img_url" class="img">
											</a>
										</td>
										<td>
											<a target="_blank" href="/goods/show-89.html">{{item.title}}</a>
										</td>
										<td>
											<span class="red">
												￥{{item.sell_price}}.00
											</span>
										</td>
										<td align="center">{{item.buycount}}</td>
										<td>
											<span class="red">
												￥{{item.sell_price*item.buycount}}.00
											</span>
										</td>
									</tr>
								</tbody>
							</table>
							<div class="line15"></div>
							<h2 class="slide-tit">
								<span>5、结算信息</span>
							</h2>
							<div class="buy-foot clearfix">
								<div class="left-box">
									<dl>
										<dt>订单备注(100字符以内)</dt>
										<dd>
											<textarea v-model='ruleForm.message' name="message" class="input" style="height:35px;"></textarea>
										</dd>
									</dl>
								</div>
								<div class="right-box">
									<p>
										商品
										<label class="price">{{goodslist.length}}</label> 件&nbsp;&nbsp;&nbsp;&nbsp; 商品金额：￥
										<label id="goodsAmount" class="price">{{ruleForm.goodsAmount}}.00</label> 元&nbsp;&nbsp;&nbsp;&nbsp;
									</p>
									<p>
										运费：￥
										<label id="expressFee" class="price">{{ruleForm.expressMoment}}.00</label> 元
									</p>
									<p class="txt-box">
										应付总金额：￥
										<label id="totalAmount" class="price">{{gettotalAmount}}.00</label>
									</p>
									<p class="btn-box">
										<a class="btn button" href="/cart.html">返回购物车</a>
										<input id="btnSubmit" name="btnSubmit" type="button" value="确认提交" class="btn submit" @click='submit'>
									</p>
								</div>
							</div>
						</el-form>
					</div>
				</div>
			</div>
		</div>
	</div>

</template>

<script>
	import VDistpicker from 'v-distpicker';
	import { getItem } from '../../public/localStoragehelper.js'
	export default {
		components: { VDistpicker },
		data() {
			return {
				expressFee:{
					"1":20,
					"2":10,
					"3":8
				},
				totalAmount: 1000,
				goodids: this.$route.params.ids,
				radio: '1',
				ruleForm: {
					"goodsAmount": 4099
					, "expressMoment": 20
					, "accept_name": "骁骁"
					, "area": {
						"province": { "code": "140000", "value": "山西省" }
						, "city": { "code": "140100", "value": "太原市" }
						, "area": { "code": "140106", "value": "迎泽区" }
					}
					, "address": "城区"
					, "mobile": "18667654355"
					, "email": "ivanyb@qq.com"
					, "post_code": "516000"
					, "payment_id": "6"
					, "express_id": 1
					, "message": "4K,白色"
					, "goodsids": "97,102"
					, "cargoodsobj": { "97": 1, "102": 1, "103": 1 }
				},
				rules: {},
				goodslist: []
			}
		},
		methods: {
			submit(){
				var url = '/site/validate/order/setorder';
				this.ajax.post(url,this.ruleForm).then(res=>{
					this.$router.push({ name: 'pay', params: { orderid: res.data.message.orderid } })
				})
				// console.log(this.ruleForm);
			},
			checkradio(result){
				this.ruleForm.expressMoment = this.expressFee[result];
				// this.totalAmount = this.ruleForm.expressMoment + this.ruleForm.goodsAmount;
			},
			getgoodslist() {
				var url = '/site/validate/order/getgoodslist/' + this.goodids;
				this.ajax.get(url).then(res => {
					this.goodslist = res.data.message;
					var obj = getItem();
					// console.log(obj);
					this.goodslist.forEach(item => {
						// console.log(item);
						item.buycount = obj[item.id];
						this.ruleForm.goodsAmount += item.buycount * item.sell_price;
					})
				})
			},
			selected(data) {
				this.ruleForm.area = data;
			}
		},
		computed:{
			
			gettotalAmount(){
				this.totalAmount = this.ruleForm.expressMoment + this.ruleForm.goodsAmount;
				return this.totalAmount;
			}
		},
		mounted() {
			this.getgoodslist();
		}
	}
</script>
<style scoped>
</style>