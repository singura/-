<template>
	<div class="subtmpl">
		<ul>
			<li @click='substract'>-</li>
			<li>{{count}}</li>
			<li @click='add'>+</li>
		</ul>
	</div>
</template>

<script>
	export default {
		data() {
			return {
				count: 1
			}
		},
		// 接收父组件传过来的数据
		props: ['obj'],
		mounted() {
			// console.log(this.obj);
			this.count = this.obj.count;
		},
		methods: {
			add() {
				this.count++;
				this.obj.count = this.count
				this.sendmessage();
			},
			substract() {
				this.count--;
				if (this.count <= 1) {
					this.count = 1;
				}
				this.obj.count = this.count
				this.sendmessage();
			},
			sendmessage() {
				this.$emit('msg', { 'gid': this.obj.gid, 'count': this.obj.count })
			}
		}
	}
</script>
<style scoped>
	ul {
		width: 120px;
	}

	li {
		list-style: none;
		float: left;
		width: 30px;
		border: 1px solid #ccc;
		text-align: center;
		cursor: pointer;
	}
</style>