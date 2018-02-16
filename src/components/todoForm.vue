<template>
	<div class="content">
		<div class="ui form">
			<div class="field">
				<label>Title</label>
				<input type="text" name="todo-title" v-model="todo.title">
			</div>
			<div class="message-error" v-if="validation.title.error">{{ validation.title.message }}</div>
			<div class="field">
				<label>Description</label>
				<textarea name="todo-desc" v-model="todo.desc"></textarea>
			</div>
			<div class="message-error" v-if="validation.desc.error">{{ validation.desc.message }}</div>
			<div class="ui two attached buttons">
				<button class="ui button" v-on:click="resetForm()">Reset</button>
				<div class="or"></div>
				<button class="ui positive button" v-on:click="handleSubmit()">Submit</button>
			</div>
		</div>
	</div>	
</template>

<script type="text/javascript">
	//assets
	import { CONFIG } from '../assets/config';
	import { LABEL } from '../assets/label';

	//utils
	import { addTodo, updateTodo, getTodos } from '../utils/api/todo';

	export default {
		name: 'TodoForm',
		props: ['todo', 'mode'],
		data: function(){
			return {
				validation: {
					title: {
						error: null,
						message: null
					},
					desc: {
						error: null,
						message: null
					}
				}
			}
		},
		methods: {
			addTodo(){
				addTodo(this.todo.title, this.todo.desc);
			},
			handleSubmit(){
				if(this.validateForm()){
					switch(this.mode){
						case 'ADD':
							this.addTodo();
							break;
						case 'UPDATE':
							this.updateTodo();
							break;
						default:
							break;
					}

					this.resetForm();

					this.$router.push('/')
				}
				
			},
			updateTodo(){
				updateTodo(this.todo.id, this.todo);
			},
			resetForm(){
				for(let key in this.todo){
					this.todo[key] = null
				}

				this.resetValidation();
			},
			resetValidation(){
	    		for(let key in this.validation){
					this.validation[key].error = null
					this.validation[key].message = null
				}
	    	},
			validateForm(){
				this.resetValidation();

				let { title, desc } = this.todo;

				//validate title
	    		if(!title || title.trim().length <= 0){
	    			this.validation.title.error = true;
	    			this.validation.title.message = LABEL.VALIDATION.COMMON.MESSAGE.REQUIRED;
	    			return false;
	    		} else {
	    			this.validation.title.error = null;
	    			this.validation.title.message = null;
	    		}

	    		//validate desc
	    		if(!desc || desc.trim().length <= 0){
					this.validation.desc.error = true;
					this.validation.desc.message = LABEL.VALIDATION.COMMON.MESSAGE.NOT_EMPTY;
					return false;
				} else if(desc.trim().length < CONFIG.VALIDATION.TODO.DESC.MIN_LENGTH){
					let diff = CONFIG.VALIDATION.TODO.DESC.MIN_LENGTH - desc.trim().length;
					this.validation.desc.error = true;
					this.validation.desc.message = `${LABEL.VALIDATION.TODO.DESC.MIN_LENGTH}. ${diff} characters remain.`;
					return false;
				} else {
					this.validation.desc.error = null;
					this.validation.desc.message = null;
				}

				return true;
				
			}
		}
	}
</script>

<style lang="scss">
	.form {

		.message {

			&-error {
				color: red;
				margin-bottom: 6px;
			}
		}
	}
</style>