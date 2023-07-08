
<template>
	<div v-if="pageLoading">
		<el-main>
			<el-card shadow="never">
				<el-skeleton :rows="1"></el-skeleton>
			</el-card>
			<el-card shadow="never" style="margin-top: 15px;">
				<el-skeleton></el-skeleton>
			</el-card>
		</el-main>
	</div>
	<work></work>
</template>

<script lang="ts" setup>
	import { defineAsyncComponent, ref } from 'vue';
	const dashboard = ref<string>('0')
	const pageLoading = ref<boolean>(true)
	const work = defineAsyncComponent(() => import('./work/index.vue'));
</script>

<style>
</style> 
