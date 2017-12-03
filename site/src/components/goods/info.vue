<template>
	<div class="tmpl">
		<transition transition @before-enter="benter" @enter="enter" @after-enter="aenter">
			<img v-show='isimgshow' :src="'http://127.0.0.1:8899'+list.goodsinfo.img_url" alt="" ref='img' class="imgbox" v-if='list.goodsinfo'>
		</transition>
		<!-- 导航栏 -->
		<div class="section">
			<div class="location">
				<span>当前位置：</span>
				<a href="/index.html">首页</a> &gt;
				<a href="/goods.html">购物商城</a>
				<a href="/goods/42/1.html">商品详情</a>

			</div>
		</div>

		<!-- 商品详情 -->
		<div class="section">
			<div class="wrapper clearfix">
				<div class="wrap-box">
					<!--页面左边-->
					<div class="left-925">
						<div class="goods-box clearfix">
							<!--商品图片-->
							<div class="pic-box">
								<div class="magnifier" id="magnifier1">
									<div class="magnifier-container">
										<div class="images-cover">
											<!-- <img v-for="item in list.imglist" :src="item.original_path" /> -->
										</div>
										<!--当前图片显示容器-->
										<div class="move-view"></div>
										<!--跟随鼠标移动的盒子-->
									</div>
									<div class="magnifier-assembly">
										<div class="magnifier-btn">
											<span class="magnifier-btn-left">&lt;</span>
											<span class="magnifier-btn-right">&gt;</span>
										</div>
										<!--按钮组-->
										<div class="magnifier-line">
											<ul class="clearfix animation03">
												<li v-for="item in list.imglist">
													<div class="small-img">
														<img :src="item.thumb_path" />
													</div>
												</li>
											</ul>
										</div>
										<!--缩略图-->
									</div>
									<div class="magnifier-view"></div>
									<!--经过放大的图片显示容器-->
								</div>
							</div>
							<!--/商品图片-->

							<!--商品信息-->
							<div class="goods-spec" v-if='list.goodsinfo'>
								<h1>{{list.goodsinfo.title}}</h1>
								<p class="subtitle">{{list.goodsinfo.sub_title}}</p>
								<div class="spec-box">
									<dl>
										<dt>货号</dt>
										<dd id="commodityGoodsNo">{{list.goodsinfo.goods_no}}</dd>
									</dl>
									<dl>
										<dt>市场价</dt>
										<dd>
											<s id="commodityMarketPrice">¥{{list.goodsinfo.market_price}}.00</s>
										</dd>
									</dl>
									<dl>
										<dt>销售价</dt>
										<dd>
											<em class="price" id="commoditySellPrice">¥{{list.goodsinfo.sell_price}}.00</em>
										</dd>
									</dl>
								</div>

								<div class="spec-box">
									<dl>
										<dt>购买数量</dt>
										<el-input-number v-model="num" :min="1" :max="10" label="描述文字"></el-input-number>
										<span class="stock-txt">
											库存
											<em id="commodityStockNum">{{list.goodsinfo.stock_quantity}}</em>件
										</span>
									</dl>
									<dl>
										<dd>
											<div class="btn-buy" id="buyButton">
												<button class="buy" onclick="cartAdd(this,'/',1,'/shopping.html');">立即购买</button>
												<button class="add" @click="addCar" ref='addbtn'>加入购物车</button>
											</div>
										</dd>
									</dl>
								</div>

							</div>
							<!--/商品信息-->
						</div>

						<div id="goodsTabs" class="goods-tab bg-wrap">
							<!--选项卡-->
							<Affix>
								<div id="tabHead" class="tab-head" style="position: static; top: 517px; width: 925px;">
									<ul>
										<li>
											<a v-bind="{class:(isshow?'selected':'')}" href="javascript:;" @click='isshow = true'>商品介绍</a>
										</li>
										<li>
											<a v-bind="{class:(!isshow?'selected':'')}" href="javascript:;" class="" @click='isshow = false'>商品评论</a>
										</li>
									</ul>
								</div>
							</Affix>
							<!--/选项卡-->

							<!--选项内容-->
							<div class="tab-content entry" v-show="isshow">
								<div v-html="list.goodsinfo.content" v-if='list.goodsinfo'></div>
							</div>

							<div class="tab-content comment" v-show="!isshow">
								<!--网友评论-->
								<div class="comment-box">
									<!--取得评论总数-->
									<form id="commentForm" name="commentForm" class="form-box" url="/tools/submit_ajax.ashx?action=comment_add&amp;channel_id=2&amp;article_id=98">
										<div class="avatar-box">
											<i class="iconfont icon-user-full"></i>
										</div>
										<div class="conn-box">
											<div class="editor">
												<textarea id="txtContent" name="txtContent" sucmsg=" " datatype="*10-1000" nullmsg="请填写评论内容！"></textarea>
												<span class="Validform_checktip"></span>
											</div>
											<div class="subcon">
												<input id="btnSubmit" name="button" @click='postcomment' type="submit" value="提交评论" class="submit">
												<span class="Validform_checktip"></span>
											</div>
										</div>
									</form>
									<ul id="commentList" class="list-box">
										<p v-show='commentlist.length<=0' style="margin:5px 0 15px 69px;line-height:42px;text-align:center;border:1px solid #f7f7f7;">暂无评论，快来抢沙发吧！</p>
										<li v-for='item in commentlist' :key='item.id'>
											<div class="avatar-box">
												<i class="iconfont icon-user-full"></i>
											</div>
											<div class="inner-box">
												<div class="info">
													<span>{{item.user_name}}</span>
													<span>{{item.add_time}}</span>
												</div>
												<p>{{item.content}}</p>
											</div>
										</li>
									</ul>
									<!--放置页码-->
									<div class="page-box" style="margin:5px 0 0 62px">
										<div id="pagination" class="digg">
											<el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="currentPage" :page-sizes="[1, 2, 3, 4]"
											 :page-size="pageSize" layout="total, sizes, prev, pager, next, jumper" :total="totalcount">
											</el-pagination>
										</div>
									</div>
									<!--/放置页码-->
								</div>

								<!--/网友评论-->
							</div>

						</div>

					</div>
					<!--/页面左边-->

					<!--页面右边-->
					<div class="left-220">
						<div class="bg-wrap nobg">
							<div class="sidebar-box">
								<h4>推荐商品</h4>
								<ul class="side-img-list">

									<li v-for="item in list.hotgoodslist" :key="item.id">
										<div class="img-box">
											<router-link :to="'/site/info/'+item.id">
												<img :src="item.img_url">
											</router-link>
										</div>
										<div class="txt-box">
											<router-link :to="'/site/info/'+item.id">{{item.title}}</router-link>
											<span>{{item.add_time | datefml}}</span>
										</div>
									</li>

								</ul>
							</div>
						</div>
					</div>
					<!--/页面右边-->
				</div>
			</div>
		</div>
	</div>
</template>
<script>
	import { vm, KEY } from '../../public/bus.js';
	import magnifier from '../../../statics/jQueryMagnifier/js/magnifier.js';
	import { setItem,getItem } from '../../public/localStoragehelper.js'
	export default ({
		data() {
			return {
				isimgshow: false,
				currentBuyCount: 1,
				totalcount: 0,
				pageSize: 3,
				currentPage: 1,
				commentlist: [],
				isshow: true,
				activeName: 'first',
				num: 1,
				list: {},
				offsetobj: {},
				offsetObj: {}
			}
		},
		watch: {
			'$route': function () {
				// console.log(this.$route.params.infoid);
				this.getinfo();
				this.getcommentlist();
			}
		},
		methods: {
			benter(el) {
				el.style.left = this.offsetObj.left + 'px';
				el.style.top = this.offsetObj.top + 'px';
			},
			enter(el, done) {
				el.offsetWidth;
				el.style.left = this.offsetobj.left + 'px';
				el.style.top = this.offsetobj.top + 'px';
				done();
			},
			aenter(el) {
				this.isimgshow = false;
			},
			addCar() {
				this.currentBuyCount = this.num;
				var goodsobj = { gid: this.$route.params.infoid, count: this.currentBuyCount };
				setItem(goodsobj);
				// console.log(JSON.stringify(this.lbcObj));
				var obj = getItem();
				var length = 0;
				for(var key in obj){
					length++;
				}
				vm.$emit(KEY, length);
				this.num = '';
				this.isimgshow = true;
				// console.log(this.num);
			},
			handleSizeChange(val) {
				this.pageSize = val;
				this.getcommentlist();
			},
			handleCurrentChange(val) {
				this.currentPage = val;
				this.getcommentlist();
			},
			getcommentlist() {
				var url = `site/comment/getbypage/goods/${this.$route.params.infoid}?pageIndex=${this.currentPage}&pageSize=${this.pageSize}`;
				this.ajax.get(url).then(res => {
					this.commentlist = res.data.message;
					// console.log(res);
					this.totalcount = res.data.totalcount;
				})
			},
			postcomment() {
				var url = `site/validate/comment/post/goods/${this.$route.params.infoid}`;
				this.ajax.post(url, { 'commenttxt': $("#txtContent").val() }).then(res => {
					if (res.data.status == 1) {
						alert("评论失败");
					}
					this.getcommentlist();
				})
			},
			getinfo() {
				var url = 'site/goods/getgoodsinfo/' + this.$route.params.infoid;
				this.ajax.get(url).then(res => {
					this.list = res.data.message;
					// console.log(this.list.goodsinfo);
					setTimeout(function () {
						$('#magnifier1').imgzoon({ magnifier: '#magnifier1' });
					}, 200);
				})
			},
		},
		mounted() {
			this.getinfo();
			this.getcommentlist();
			setTimeout(() => {
				this.offsetObj = $(this.$refs.addbtn).offset();
				this.offsetobj = $('#shopcar').offset();
				// console.log(this.offsetobj);
				$(this.$refs.img).css('left', this.offsetObj.left + 'px').css('top', this.offsetObj.top + 'px')
			}, 200);
		}
	})
</script>
<style scoped>
	@import url('../../../statics/jQueryMagnifier/css/magnifier.css');
	.magnifier {
		margin: 0;
	}

	.imgbox {
		position: absolute;
		width: 50px;
		height: 50px;
		z-index: 2;
		transition: all 2s;
	}
</style>