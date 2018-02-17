<template>
	<div class="card todo-item">
		<div class="content todo-item__content" v-show="!todo.isEditing">
			<span class="item-action">
				<i class="right floated basic red trash icon" v-on:click="removeItem()"></i>
				<i class="right floated basic yellow edit icon" v-on:click="toggleIsEditing()"></i>	
			</span>
			
			<div class="header">
				<router-link :to="`/detail/${todo.id}`">{{ todo.title }}</router-link>
			</div>
			<div class="meta">
				<i class="green check circle icon medium" v-show="todo.isDone"></i>
				<i class="red remove circle icon medium" v-show="!todo.isDone"></i>
				{{ todo.isDone ? 'Completed' : 'Pending' }}
			</div>
			<div class="description">
				{{ `${todo.desc.slice(0, 200)}...` }}
			</div>
		</div>
		<!-- Form Todo Item -->
		<div class="content" v-show="todo.isEditing">
			<div class="ui form">
				<div class="field">
					<label>Title</label>
					<input type="text" name="todo-title" v-model="todo.title">
				</div>
				<div class="field">
					<label>Description</label>
					<textarea name="todo-desc" v-model="todo.desc"></textarea>
				</div>
				<div class="ui two button attached buttons">
					<button class="ui basic grey button" v-on:click="toggleIsEditing()">
						Finish Editing
					</button>
				</div>
			</div>
		</div>

		<div class="extra content todo-item__actions" v-show="!todo.isEditing">
			<div class="ui labeled button" tabindex="0" v-show="!todo.isDone">
				<div class="ui vertical animated green  button" v-on:click="toggleStatus()">
					<div class="visible content">
						Mark as Completed
					</div>
					<div class="hidden content">
						<i class="check circle icon"></i>
					</div>
				</div>
				<a :href="`/#/detail/${todo.id}`" class="ui basic green left pointing label">
					<i class="comments icon">
					</i>
					{{ comments }}
				</a>	
			</div>
			
			<div class="ui labeled button" tabindex="0" v-show="todo.isDone">
				<div class="ui vertical animated red basic button" v-on:click="toggleStatus()">
					<div class="visible content">
						Mark as Pending
					</div>
					<div class="hidden content">
						<i class="remove circle icon"></i>
					</div>
				</div>
				<a :href="`/#/detail/${todo.id}`" class="ui basic red left pointing label">
					<i class="comments icon">
					</i>
					{{ comments }}
				</a>	
			</div>
		</div>

		
	</div>
</template>

<script type="text/javascript">
	//utils
	import { removeTodo, setTodoStatus } from '../utils/api/todo';
	import { objectListToArray } from '../utils/helpers/stringManipulation';
	import firebase from 'firebase';

	export default {
		name: 'TodoItem',
		props: ['todo'],
		created: function(){
			let dbComments = firebase.database().ref('comments')

			dbComments.child(this.todo.id).on('value', (res) => {
				if(!res.val()){
					this.comments = 0;
				} else {
					this.comments = objectListToArray(res.val()).length
				}
			});
		},
		data: function(){
			return {
				comments: 0
			}
		},
		methods: {
			toggleIsEditing(){
				this.todo.isEditing = !this.todo.isEditing;
			},
			toggleStatus(){
				this.todo.isDone = !this.todo.isDone;
				setTodoStatus(this.todo.id, this.todo.isDone)
			},
			removeItem(){
				removeTodo(this.todo.id)
			}
		}
	}
</script>

<style lang="scss">
	.todo-item {
		&__content {

			.item-action {
				cursor: pointer;
				font-size: 1.5em;
			}

			.header {
				text-decoration: underline;
			}

			.description {
				text-align: justify;
				text-indent: 1.8em;
			}
		}

		&__actions {
			text-align: center;
		}
	}
</style>