import Vue from 'vue';
import Vuex from 'vuex';
import VueRouter from 'vue-router';
import axios from 'axios';
import App from '../components/App.vue';
import '../node_modules/todomvc-common/base.css';
import '../node_modules/todomvc-app-css/index.css';

// process.env.NODE_ENV = 'production';

Vuex.Store.prototype.$http = axios.create({
	baseURL: 'http://api.todomvc.com:8088/todomvc',
	timeout: 500
});

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
		this.$store.dispatch('init');
	},
	el: '#todo-app',
	store: new Vuex.Store({
		state: {
			filter: '',
			todos: []
		},
		mutations: {
			setTodos: function (state, todos) {
				state.todos = todos;
			},
			addTodo: function (state, todo) {
				state.todos.push(todo);
			},
			setTodo: function (state, {index, todo}) {
				state.todos[index] = todo;
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
			clearCompleted: function (state) {
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
			getById: function (state) {
				return function (id) {
					return {
						index: state.todos.findIndex(item => item.id === id),
						todo: state.todos.find(item => item.id === id)
					};
				};
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
		},
		actions: {
			init: function (context) {
				this.$http.get('/all').then(res => {
					if (res.status === 200) {
						context.commit('setTodos', res.data);
					} else {
						console.log('请求失败，状态码：' + res.status);
					}
				}).catch(err => {
					console.log('发生错误： ', err);
				});
			},
			addTodo: function (context, text) {
				this.$http.request({
					url: '/addTodo',
					method: 'put',
					params: {text}
				}).then(res => {
					if (res.status === 200) {
						context.commit('addTodo', res.data);
					} else {
						console.log('请求失败，状态码：' + res.status);
					}
				}).catch(err => {
					console.log('请求失败', err);
				});
			},
			updateTodo: function (context, id) {
				const {index, todo} = context.getters.getById(id);
				if (todo) {
					this.$http.request({
						url: '/update',
						method: 'post',
						params: todo
					}).then(res => {
						if (res.status === 200) {
							context.commit('setTodo', {
								index,
								todo: res.data
							});
						} else {
							console.log('请求失败，状态码：' + res.status);
						}
					}).catch(err => {
						console.log('请求失败', err);
					});
				}
			},
			checkAll: function (context, checked) {
				this.$http.post(`/checkAll/${checked}`).then(res => {
					if (res.status === 200) {
						context.commit('checkAll', checked);
					} else {
						console.log('请求失败，状态码：' + res.status);
					}
				}).catch(err => {
					console.log('请求失败', err);
				});
			},
			removeItem: function (context, id) {
				this.$http.delete(`/remove/${id}`).then(res => {console.log(res);
					if (res.status === 200) {
						context.commit('removeItem', id);
					} else {
						console.log('请求失败，状态码：' + res.status);
					}
				}).catch(err => {
					console.log('请求失败', err);
				});
			},
			clearCompleted: function (context) {
				const compIds = conext.getters.todosCopy('completed').map(item => item.id);
				console.log(compIds);
				this.$http.request({
					url: '/clearChecked',
					method: 'delete',
					params: {compIds}
				}).then(res => {
					if (res.status === 200) {
						context.commit('clearCompleted');
					} else {
						console.log('请求失败，状态码：' + res.status);
					}
				}).catch(err => {
					console.log('请求失败', err);
				});
			}
		}
	}),
	render: h => h(App)
});
