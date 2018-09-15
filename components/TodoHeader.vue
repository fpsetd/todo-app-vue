<template>
	<header class="header">
		<h1>todos</h1>
		<input class="new-todo" placeholder="What needs to be done?" autofocus v-model.trim="text" @keyup.enter="create">
	</header>
</template>

<script>
	export default {
		data: function () {
			return {
				text: ''
			};
		},
		methods: {
			create: function () {
				if (this.text) {
					this.$store.dispatch('addTodo', this.text);
					this.text = '';
				}
			}
		}
	}
</script>
