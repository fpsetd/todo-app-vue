<template>
	<section class="main">
		<input id="toggle-all" class="toggle-all" type="checkbox" v-model="checkAll">
		<label for="toggle-all" v-show="todosCount">Mark all as complete</label>
		<ul class="todo-list">
			<li :class="{completed: todo.completed, editing: todo.id === editingId}" v-for="todo in todosCopy">
				<div class="view">
					<input class="toggle" type="checkbox" v-model="todo.completed">
					<label @dblclick="editing(todo.id)">{{todo.text}}</label>
					<button class="destroy" @click="removeItem(todo.id)"></button>
				</div>
				<input class="edit" v-model="todo.text" v-focus="todo.id === editingId" @blur="editing(null)" @keyup.enter="editing(null)">
			</li>
		</ul>
	</section>
</template>

<script>
	export default {
		data: function () {
			return {
				editingId: null
			}
		},
		computed: {
			todosCopy: function () {
				let filter = this.$route.params.filter;
				if (!(filter in filters)) {
					this.$router.replace('/');
					filter = '';
				}
				this.$store.commit('changeFilter', filter);
				return this.$store.getters.todosCopy(filter);
			},
			todosCount: function () {
				return this.$store.getters.todosCount;
			},
			checkAll: {
				get: function () {
					return this.$store.state.todos.every(item => item.completed);
				},
				set: function (value) {
					this.$store.commit('checkAll', value);
				}
			}
		},
		methods: {
			editing: function (id) {
				this.editingId = id;
			},
			removeItem: function (id) {
				this.$store.commit('removeItem', id);
			}
		},
		directives: {
			focus: function (el, binding) {
				if (binding.value) {
					el.focus();
				}
			}
		},
		beforeRouteUpdate: function (to, from, next) {
			this.filter = to.params.filter;
			next();
		},
		beforeRouteEnter: function (to, from, next) {
			next(vm => vm.filter = vm.$route.params.filter);
		}
	}
</script>
