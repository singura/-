<template>
	<div class="tmpl arttmpl">
		<div class="abread bt-line">
			<el-breadcrumb separator="/">
				<el-breadcrumb-item>返回上一层</el-breadcrumb-item>
				<el-breadcrumb-item :to="{ path: '/' }">知识内容</el-breadcrumb-item>
				<el-breadcrumb-item>首页</el-breadcrumb-item>
				<el-breadcrumb-item>新增内容</el-breadcrumb-item>
			</el-breadcrumb>
		</div>
		<div class="operation">
			<el-row>
				<el-col :span="20">
					<el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
						<el-row>
							<el-col :span="12">
								<el-form-item label="内容标题" prop="title">
									<el-input v-model="ruleForm.title"></el-input>
								</el-form-item>
							</el-col>
							<el-col :span="12">
								<el-form-item label="副标题" prop="sub_title">
									<el-input v-model="ruleForm.sub_title"></el-input>
								</el-form-item>
							</el-col>
						</el-row>

						<el-row>
							<el-col :span="10">
								<el-form-item label="所属类别" prop="category">
									<el-select v-model="ruleForm.category_id" placeholder="请选择活动区域">
										<el-option v-for="item in catelist" :label="item.title" :value="item.category_id">
											<span v-for="sub in (item.class_layer -1 )">&nbsp;</span>
											<span v-if="item.class_layer>1">|-</span>{{item.title}}
										</el-option>
									</el-select>
								</el-form-item>
							</el-col>
							<el-col :span="6">
								<el-form-item label="是否发布">
									<el-switch v-model="ruleForm.status"  on-text="是" off-text="否">
									</el-switch>
								</el-form-item>
							</el-col>
							<el-col :span="8">
								<el-form-item label="推荐类型">
									<el-switch v-model="ruleForm.is_slide" on-text="轮播图"  off-text="轮播图">
									</el-switch>
									<el-switch v-model="ruleForm.is_top" on-text="置顶"  off-text="置顶">
									</el-switch>
									<el-switch v-model="ruleForm.is_hot" on-text="推荐"  off-text="推荐">
									</el-switch>
								</el-form-item>

							</el-col>
						</el-row>
						<el-row>
							<el-col :span="10">
								<el-form-item label="上传封面">
									<el-upload class="upload-demo" 
									action="http://127.0.0.1:8899/admin/article/uploadimg" 
									:file-list="ruleForm.imgList" list-type="picture"
									:on-success="imgUploaded">
										<el-button size="small" type="primary">点击上传</el-button>
									</el-upload>
								</el-form-item>
							</el-col>
							<el-col :span="10">
								<el-form-item label="图片相册">
									<el-upload class="upload-demo" 
									action="http://127.0.0.1:8899/admin/article/uploadfile" 
									 :file-list="ruleForm.fileList" list-type="picture"
									 :on-success="fileUplaoded">
										<el-button size="small" type="primary">点击上传</el-button>
									</el-upload>
								</el-form-item>
							</el-col>
						</el-row>
						<el-row>
							<el-col :span="6">
								<el-form-item label="商品货号" prop="goods_no">
									<el-input v-model="ruleForm.goods_no"></el-input>
								</el-form-item>
							</el-col>
							<el-col :span="6">
								<el-form-item label="库存数量" prop="stock_quantity">
									<el-input v-model="ruleForm.stock_quantity"></el-input>
								</el-form-item>
							</el-col>
							<el-col :span="6">
								<el-form-item label="市场价格" prop="market_price">
									<el-input v-model="ruleForm.market_price"></el-input>
								</el-form-item>
							</el-col>
							<el-col :span="6">
								<el-form-item label="销售价格" prop="sell_price">
									<el-input v-model="ruleForm.sell_price"></el-input>
								</el-form-item>
							</el-col>
						</el-row>
						<el-form-item label="内容摘要" prop="zhaiyao">
							<el-input type="textarea" v-model="ruleForm.zhaiyao"></el-input>
						</el-form-item>
						<el-form-item label="详细内容" prop="content">
							<template>
								<quill-editor v-model="ruleForm.content" ref="myQuillEditor"></quill-editor>
							</template>
						</el-form-item>
						<el-form-item>
							<el-button type="primary" @click="submitForm('ruleForm')">提交保存</el-button>
							<el-button @click="resetForm('ruleForm')">重置</el-button>
						</el-form-item>
					</el-form>
				</el-col>
			</el-row>
		</div>
	</div>
</template>
<script>
	import { quillEditor } from 'vue-quill-editor'
	export default {
		components: {
			quillEditor
		},
		data() {
			return {
				catelist: [],
				ruleForm: {
					title: '',
					sub_title: '',
					"goods_no": "",
					category_id: '',
					"stock_quantity": '',
					"market_price": '',
					"sell_price": '',
					"status": true,
					"is_slide": true,
					"is_top": false,
					"is_hot": true,
					"zhaiyao": "",
					"content": "",
					"imgList": [
					],
					"fileList": [
					]
				},
				rules: {
					title: [
						{ required: true, message: '请输入商品标题', trigger: 'blur' },
					],
					category: [
						{ required: false, message: '请选择所属类别', trigger: 'change' }
					],
					resource: [
						{ required: true, message: '请选择活动资源', trigger: 'change' }
					],
					goods_no: [
						{ required: true, message: '请输入商品货号', trigger: 'blur' },
					],
					stock_quantity: [
						{ required: true, message: '请输入库存数量', trigger: 'blur' },
					],
					market_price: [
						{ required: true, message: '请输入市场价格', trigger: 'blur' },
					],
					sell_price: [
						{ required: true, message: '请输入销售价格', trigger: 'blur' },
					],
					zhaiyao: [
						{ required: true, message: '请输入内容摘要', trigger: 'blur' },
					],
					content: [
						{ required: true, message: '请输入详细内容', trigger: 'blur' },
					],
				}
			}
		},
		methods: {
			onSubmit() {
				console.log('submit!');
			},
			// 获取商品分类数据
			getcastlist(){
				var url = '/admin/category/getlist/goods';
				this.ajax.get(url).then(res=>{
					this.catelist = res.data.message;
				})
			},
			// 封面上传成功之后的回调
			imgUploaded(responese,file,filelist){
				// console.log(responese);
				this.ruleForm.imgList = [responese];
			},
			// 相册上传成功之后的回调
			fileUplaoded(responese, file, filelist){
				this.ruleForm.fileList.push(responese);
				console.log(this.ruleForm.fileList);
			},
			// 重置
			resetForm(ruleForm){
				this.$refs[ruleForm].resetFields();
				// console.log(this.$ref[ruleForm]);
			},
			// 提交
			submitForm(ruleForm){
				this.$refs[ruleForm].validate((valid)=>{
					if(valid){
						this.ajax.post('/admin/goods/add/goods',this.ruleForm)
						.then(res=>{
							if(res.data.status == 1){
								this.$message({
									showClose: true,
									message: res.data.message,
									type: 'error',
									duration: 1000
								})
							}else{
								this.$router.push({name: 'goodslist'});
							}
							
						})
					}else{
						console.log('error submit!!');
						return false;
					}
				})
			}
		},
		mounted() {
			this.getcastlist();
		}
	}
</script>
<style>
	.ql-editor {
		min-height: 200px;
		height: 200px;
		max-height: 200px;
	}
</style>