<template>
	<section class="todo-list">
		<header class="todo-list__header">
			<h2>
				Thread List
				<router-link :to="`/add`">
					<i class="green add circle icon"></i>
				</router-link>
			</h2>
			<div class="list-summary">
				<div class="list-summary__label">
					<span class="ui label">
						<i class="list layout icon"></i> {{ todos.length }}
					</span>
					<span class="ui green label">
						<i class="unlock icon"></i> {{ todos.filter(x => { return x.isDone === false}).length }}
					</span>
					<span class="ui red label">
						<i class="lock icon"></i> {{ todos.filter(x => { return x.isDone === true }).length }}
					</span>
				</div>
				<!-- <div class="list-summary__progress">
					<div class="ui active progress" id="list-progress">
						<div class="bar">
							<div class="progress"></div>
						</div>
					</div>
				</div> -->
			</div>
		</header>
		<content class="todo-list__content">
			<div class="ui cards">
				<todo-item v-for="(todo, index) in todos" v-bind:todo="todo" v-bind:index="index" :key="todo.id">
				</todo-item>
			</div>
		</content>
		<footer class="todo-list__footer">
			
		</footer>
	</section>
</template>

<script type="text/javascript">
	
</script>

<script type="text/javascript">
	//components
	import TodoItem from '../components/todoItem';

	//utils
	import { addTodos, getTodos } from '../utils/api/todo';
	import { objectListToArray } from '../utils/helpers/stringManipulation';
	import firebase from 'firebase';

	export default {
		name: 'TodoList',
		components: {
			'todo-item': TodoItem
		},
		created: function(){
			this.getTodos();
		},
		updated: function(){
			this.updateProgress();
		},
		data: function() {
			return {
				todo: {
					title: null,
					desc: null
				},
				todos: [
		      	],
		      	isAdding: false
			}
			
	    },
	    events: {
	    	toggleForm(){
	    		this.isAdding = !this.isAdding;
	    	}
	    },
	    methods: {
	    	getTodos(){
	    		let dbTodos = firebase.database().ref('todos')
				dbTodos.on('value', (res) => {
					if(!res.val()){
						this.todos = []
					} else {
						this.todos = objectListToArray(res.val())
					}

					this.updateProgress();
				})	
	    	},
	    	updateProgress(){
	    		let completed = this.todos.filter(x => { return x.isDone === true }).length;
	    		$('#list-progress').progress({
	    			percent: (completed/this.todos.length) * 100,
	    		});
	    	}
	    }
	}

</script>

<style lang="scss">
	.todo-list {
		padding: 0% 5%;
		&__header {
			margin-bottom: 12px;
			
			h3, h6 {
				margin: 0px;
			}

			.list-summary {
				&__label {
					margin-bottom: 9px;
				}
			}
		}

		&__content {

		}

		&__footer {

		}
	}
</style>