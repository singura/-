<template>
	<div class="tmpl">
		<div class="section">
			<div class="location">
				<span>当前位置：</span>
				<a href="/index.html">首页</a> &gt;
				<a href="javascript:;">支付中心</a>
			</div>
		</div>
		
		<div class="section">
			<div class="wrapper">
				<div class="bg-wrap">
					<div class="nav-tit pay">
						<a href="javascript:;" class="selected">支付中心</a>
					</div>
					<div class="form-box payment">
						<div class="el-row">
							<div class="el-col el-col-16">
								<div class="el-row">
									<div class="el-col el-col-12">
										<dl class="form-group">
											<dt>订 单 号：</dt>
											<dd>{{orderlist.order_no}}</dd>
										</dl>
									</div>
									<div class="el-col el-col-12">
										<dl class="form-group">
											<dt>收货人姓名：</dt>
											<dd>{{orderlist.accept_name}}</dd>
										</dl>
									</div>
								</div>
								<div class="el-row">
									<div class="el-col el-col-12">
										<dl class="form-group">
											<dt>送货地址：</dt>
											<dd>{{orderlist.area}}
											</dd>
										</dl>
									</div>
									<div class="el-col el-col-12">
										<dl class="form-group">
											<dt>手机号码：</dt>
											<dd>{{orderlist.mobile}}</dd>
										</dl>
									</div>
								</div>
								<div class="el-row">
									<div class="el-col el-col-12">
										<dl class="form-group">
											<dt>支付金额：</dt>
											<dd>{{orderlist.order_amount}} 元</dd>
										</dl>
									</div>
									<div class="el-col el-col-12">
										<dl class="form-group">
											<dt>支付方式：</dt>
											<dd>{{orderlist.paymentTitle}}</dd>
										</dl>
									</div>
								</div>
								<div class="message">
									<span>备&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;注：</span>
									<span>{{orderlist.message}}</span>
								</div>
							</div>
							<div class="el-col el-col-8">
								<div id="container">
									<canvas width="300" height="300"></canvas>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
		
		</div>

	</div>
</template>

<script>
	import '../../../statics/site/js/jqplugins/qr/jqueryqr.js';
	export default {
		data() {
			return {
				orderid : this.$route.params.orderid,
				orderlist:{},
				timer: {}
			}
		},
		methods: {
			getorderlist(){
				var url = '/site/validate/order/getorderdetial/'+this.orderid;
				this.ajax.get(url).then(res=>{
					this.orderlist = res.data.message.orderinfo;
				})
			}
		},
		mounted(){
			this.getorderlist();
			$("#container").erweima({
				label: 'singrua',
			});
			this.timer = setInterval(()=>{
				var url = '/site/validate/order/getorderdetial/' + this.orderid;
				this.ajax.get(url).then(res=>{
					if(res.data.message.orderinfo.status == 2){
						if(this.timer){
							clearInterval(this.timer);
						}
						this.$router.push({name:'paysuccess'});
					}
				})
			})
		}
	}
</script>
<style scoped>
</style>