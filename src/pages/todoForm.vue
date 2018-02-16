<template>
	<section class="todo-form">
		<header>
			<h3>Form</h3>
		</header>
		<content>
			<todo-form v-bind:todo="todo" v-bind:mode="mode"></todo-form>
		</content>
	</section>
</template>

<script type="text/javascript">
	//components
	import TodoForm from '../components/TodoForm';

	export default {
		components: {
			'todo-form': TodoForm
		},
		created: function(){
			this.todo = {
				title: null,
				desc: null
			};

			this.mode = 'ADD'
		},
		data: function(){
			return {
				todo: {
					title: null,
					desc: null
				},
				mode: 'ADD'
			}
		}
	}	
</script>

<style lang="scss">
	.todo-form {
		padding: 0% 5%;

		header {
			border-bottom: 1px solid #f0f0f0;
    		margin-bottom: 12px;
    		padding-bottom: 6px;
		}
	}
</style>