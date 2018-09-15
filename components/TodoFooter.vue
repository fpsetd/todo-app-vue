<template>
	<footer class="footer" v-show="todosCount">
		<span class="todo-count"><strong>{{activeCount}}</strong> item left</span>
		<ul class="filters">
			<li>
				<router-link active-class="selected" to="/" exact>All</router-link>
			</li>
			<li>
				<router-link active-class="selected" to="/active">Active</router-link>
			</li>
			<li>
				<router-link active-class="selected" to="/completed">Completed</router-link>
			</li>
		</ul>
		<button class="clear-completed" v-show="showClearAll" @click="clearCompleted">Clear completed</button>
	</footer>
</template>

<script>
	import {mapGetters} from 'vuex';

	export default {
		computed: mapGetters(['todosCount', 'activeCount', 'showClearAll']),
		methods: {
			clearCompleted: function () {
				this.$store.dispatch('clearCompleted');
			}
		}
	}
</script>
