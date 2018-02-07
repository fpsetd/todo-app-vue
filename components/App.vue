<template>
	<section class="todoapp">
		<todo-header></todo-header>
		<!-- This section should be hidden by default and shown when there are todos -->
		<router-view></router-view>
		<!-- This footer should hidden by default and shown when there are todos -->
		<todo-footer></todo-footer>
	</section>
</template>

<script>
	import VueRouter from 'vue-router';
	import TodoHeader from './TodoHeader.vue';
	import TodoList from './TodoList.vue';
	import TodoFooter from './TodoFooter.vue';

	export default {
		components: {
			TodoHeader,
			TodoList,
			TodoFooter
		},
		router: new VueRouter({
			routes: [
				{
					path: '/:filter?',
					component: TodoList
				}
			]
		})
	}
</script>
