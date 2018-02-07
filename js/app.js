import Vue from 'vue';
import Vuex from 'vuex';
import VueRouter from 'vue-router';
import App from '../components/App.vue';
import '../node_modules/todomvc-common/base.css';
import '../node_modules/todomvc-app-css/index.css';

// process.env.NODE_ENV = 'production';

Vue.use(Vuex);
Vue.use(VueRouter);

new Vue({
	created: function () {
		window.filters = {
			all: function (todos) {
				return todos;
			},
			active: function (todos) {
				return todos.filter(todo => !todo.completed);
			},
			completed: function (todos) {
				return todos.filter(todo => todo.completed);
			}
		};
	},
	el: '#todo-app',
	store: new Vuex.Store({
		state: {
			filter: '',
			todos: [
				{
					id: 0,
					text: 'Taste JavaScript',
					completed: true
				}, {
					id: 1,
					text: 'Buy a unicorn',
					completed: false
				}
			]
		},
		mutations: {
			addTodo: function (state, todo) {
				state.todos.push(todo);
			},
			removeItem: function (state, id) {
				for (let i = 0, todo; todo = state.todos[i]; i++) {
					if (todo.id === id) {
						state.todos.splice(i, 1);
						return;
					}
				}
			},
			checkAll: function (state, checked) {
				state.todos.map(item => item.completed = checked);
			},
			clearComplete: function (state) {
				state.todos = filters.active(state.todos);
			},
			changeFilter: function (state, filter) {
				state.filter = filter;
			}
		},
		getters: {
			todosCopy: function (state) {
				return function (filter) {
					return filters[filter || 'all'](state.todos);
				}
			},
			todosCount: function (state) {
				return state.todos.length;
			},
			activeCount: function (state) {
				return filters.active(state.todos).length;
			},
			showClearAll: function (state) {
				return state.todos.some(item => item.completed);
			}
		}
	}),
	render: h => h(App)
});
