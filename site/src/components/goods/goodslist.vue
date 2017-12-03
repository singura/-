<template>
	<div class="tmpl">
		<div class="section">
			<div class="wrapper">
				<div class="wrap-box">
					<!--类别菜单-->
					<div class="left-220" style="margin:0;">
						<div class="banner-nav">
							<ul>
								<!--此处声明下面可重复循环-->

								<li v-for="item in list.catelist" :key="item.id">
									<h3>
										<i class="iconfont icon-arrow-right"></i>
										<span>{{item.title}}</span>
										<p>

											<span v-for="subitem in item.subcates" :key="subitem.id">{{subitem.title}}&nbsp;</span>

										</p>
									</h3>
									<div class="item-box">
										<!--如有三级分类，此处可循环-->
										<dl>
											<dt>
												<a :href="'/goods/'+item.id+'.html'">{{item.title}}</a>
											</dt>
											<dd>

												<a v-for="subitem in item.subcates" :key="subitem.id" :href="'/goods/'+subitem.id+'.html'">{{subitem.title}}</a>

											</dd>
										</dl>
									</div>
								</li>

							</ul>
						</div>
					</div>
					<!--/类别菜单-->

					<!--幻灯片-->
					<div class="left-705">
						<div class="banner-img">
							<el-carousel :interval="5000" arrow="always">
								<el-carousel-item v-for="item in list.sliderlist" :key="item.id">
									<router-link :to="'/site/info/'+item.id">
										<img :src="item.img_url" alt="">
										<h3>{{ item.title }}</h3>
									</router-link>
								</el-carousel-item>
							</el-carousel>

						</div>
					</div>
					<!--/幻灯片-->

					<!--推荐商品-->
					<div class="left-220">
						<ul class="side-img-list">

							<li v-for="(item,index) in list.toplist" :key="item.id">
								<div class="img-box">
									<label>{{index+1}}</label>
									<img :src="item.img_url">
								</div>
								<div class="txt-box">
									<router-link :to="'/site/info/'+item.id">{{item.title}}</router-link>
									<span>{{item.add_time | datefml}}</span>
								</div>
							</li>

						</ul>
					</div>
					<!--/推荐商品-->
				</div>
			</div>
		</div>

		<div class="section" v-for="item in group" :key='item.levellcateid'>

			<!--子类-->
			<div class="main-tit">
				<h2>{{item.catetitle}}</h2>
				<p>

					<a :href="'/goods/'+subitem.subcateid+'.html'" v-for="subitem in item.level2catelist" :key='subitem.subcateid'>{{subitem.subcatetitle}}</a>

					<a href="/goods/40.html">更多
						<i>+</i>
					</a>
				</p>
			</div>
			<!--/子类-->
			<div class="wrapper clearfix">
				<div class="wrap-box">
					<ul class="img-list">

						<li v-for="dataitem in item.datas">
							<router-link :to="'/site/info/'+dataitem.artID">
								<div class="img-box">
									<img :src="dataitem.img_url">
								</div>
								<div class="info">
									<h3>{{dataitem.artTitle}}</h3>
									<p class="price">
										<b>¥{{dataitem.sell_price}}.00</b>元</p>
									<p>
										<strong>库存 {{dataitem.stock_quantity}}</strong>
										<span>市场价：
											<s>{{dataitem.market_price}}.00</s>
										</span>
									</p>
								</div>
							</router-link>
						</li>

					</ul>
				</div>
			</div>
		</div>

	</div>
</template>
<script>
	export default {
		data() {
			return {
				list: {},
				group: []
			}
		},
		methods: {
			getlist() {
				var url = '/site/goods/gettopdata/goods';
				this.ajax.get(url).then(res => {
					this.list = res.data.message;
				})
			},
			getgoodsgroup() {
				var url = 'site/goods/getgoodsgroup';
				this.ajax.get(url).then(res => {
					this.group = res.data.message;
				})
			}
		},
		mounted() {
			this.getlist();
			this.getgoodsgroup();
		}
	}
</script>
<style>
	.el-carousel {
		height: 343px;
	}


	.el-carousel__container {
		height: 343px !important;
	}

	.el-carousel__item h3 {
		color: #475669;
		font-size: 18px;
		opacity: 0.75;
		/* 只需要将line-height修改成50px，文字就自动定位到下面了 */
		line-height: 50px;
		margin: 0;
	}

	.el-carousel__item img {
		height: 100%;
	}
</style>