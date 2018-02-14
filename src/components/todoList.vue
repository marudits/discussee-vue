<template>
	<section class="todo-list">
		<header class="todo-list__header">
			<h2>Todo List</h2>
			<h3>
				Completed: {{todos.filter(x => { return x.done === true }).length}}
			</h3>
			<h3>
				Pending: {{todos.filter(x => { return x.done === false}).length}}
			</h3>
		</header>
		<content class="todo-list__content">
			<div class="ui cards">
				<div class="card" v-for="todo in todos">
					<div class="content">
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
					<div class="extra content">
						<div class="ui two buttons">
							 <div class="ui basic green button">
							 	Approve
							 </div>
							 <div class="ui basic red button">
							 	Decline
							 </div>
						</div>
					</div>
				</div>
			</div>
		</content>
		<footer class="todo-list__footer">
			
		</footer>
	</section>
</template>

<script type="text/javascript">
	export default {
		name: 'TodoList',
		data() {
			return {
				todos: [
					{
						id: 1,
						title: 'Todo A',
						desc: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
						done: false
			        },
			        {
			        	id: 2,
			        	title: 'Todo B',
			        	desc: 'Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt. Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, sed quia non numquam eius modi tempora incidunt ut labore et dolore magnam aliquam quaerat voluptatem. Ut enim ad minima veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut aliquid ex ea commodi consequatur? Quis autem vel eum iure reprehenderit qui in ea voluptate velit esse quam nihil molestiae consequatur, vel illum qui dolorem eum fugiat quo voluptas nulla pariatur?',
			        	done: true
			        },
			        {
			        	id: 3,
			        	title: 'Todo C',
			        	desc: 'At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti atque corrupti quos dolores et quas molestias excepturi sint occaecati cupiditate non provident, similique sunt in culpa qui officia deserunt mollitia animi, id est laborum et dolorum fuga. Et harum quidem rerum facilis est et expedita distinctio. Nam libero tempore, cum soluta nobis est eligendi optio cumque nihil impedit quo minus id quod maxime placeat facere possimus, omnis voluptas assumenda est, omnis dolor repellendus. Temporibus autem quibusdam et aut officiis debitis aut rerum necessitatibus saepe eveniet ut et voluptates repudiandae sint et molestiae non recusandae. Itaque earum rerum hic tenetur a sapiente delectus, ut aut reiciendis voluptatibus maiores alias consequatur aut perferendis doloribus asperiores repellat.',
			        	done: false
			        }
		      	]
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
		}

		&__content {

		}

		&__footer {

		}
	}
</style>