<template>
	<div class="card todo-item">
		<div class="content">
			<i class="right floated green check circle icon big" v-show="todo.done"></i>
			<i class="right floated red remove circle icon big" v-show="!todo.done"></i>
			<i class=""></i>
			<div class="header">
				{{ todo.title }}
			</div>
			<div class="meta">
				{{ todo.done ? 'Completed' : 'Pending' }}
			</div>
			<div class="description">
				{{ `${todo.desc.slice(0, 200)}...` }}
			</div>
		</div>
		<div class="extra content todo-item__actions">
			<div class="ui vertical animated green  button" v-show="!todo.done" v-on:click="toggleStatus()">
				<div class="visible content">
					Mark as Completed
				</div>
				<div class="hidden content">
					<i class="check circle icon"></i>
				</div>
			</div>
			<div class="ui vertical animated basic red button" v-show="todo.done" v-on:click="toggleStatus()">
				<div class="visible content">
					Mark as Pending
				</div>
				<div class="hidden content">
					<i class="remove circle icon"></i>
				</div>
			</div>
		</div>
	</div>
</template>

<script type="text/javascript">
	export default {
		name: 'TodoItem',
		props: ['todo'],
		methods: {
			toggleStatus(){
				this.todo.done = !this.todo.done;
			}
		}
	}
</script>

<style lang="scss">
	.todo-item {

		&__actions {
			text-align: center;
		}
	}
</style>