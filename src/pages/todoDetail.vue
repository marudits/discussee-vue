<template>
	<section class="todo-detail">
		<header>
			<h3>Item Detail</h3>
		</header>
		<content>
			<section class="todo-detail__info">
				<h4>{{ item.title }}</h4>
				<p>{{ item.desc }}</p>
			</section>
			<section class="todo-detail__comments">
				<div class="ui comments">
					<h4 class="ui dividing header">{{comments.length}} Comments</h4>
					<div class="comments-list" id="comments-list">
						<div class="comment comments-item" v-for="item in comments" :id="`comment-${item.id}`">
							<a class="avatar">
								<i class="user icon big"></i>
						    </a>
						    <div class="content">
						    	<a class="author">{{ item.name }}</a>
						    	<div class="metadata">
						    		<span class="date">{{ formatTime(item.timestamp)}}</span>
						    	</div>
						    	<div class="text">
						    		{{ item.text }}
						    	</div>
						    </div>
						</div>	
					</div>
					
					<form class="ui reply form">
						<div class="field">
							<div class="ui left icon input">
								<input type="text" name="form-name" v-model="form.name" placeholder="Username" autocomplete="off">
								<i class="user icon"></i>
							</div>	
						</div>
						<div class="message-error" v-if="validation.name.error">{{ validation.name.message }}</div>
						<div class="field">
							<textarea name="form-text" v-model="form.text" rows="3"></textarea>
						</div>
						<div class="message-error" v-if="validation.text.error">{{ validation.text.message }}</div>
					    <div class="ui blue labeled submit icon button" v-on:click="addComment()">
					    	<i class="icon comment"></i> Add Comment
					    </div>
					</form>
				</div>
			</section>
		</content>
	</section>
</template>

<script type="text/javascript">

	//assets
	import { CONFIG } from '../assets/config';
	import { LABEL } from '../assets/label';

	//utils
	import { getTodos, addComment, getComments } from '../utils/api/todo';
	import { objectListToArray, calculateDiffTime } from '../utils/helpers/stringManipulation';
	import fire from '../utils/helpers/firebase';
	
	export default {
		name: 'TodoDetail',
		created: function(){
			//get item info
			this.getTodos();

			//get item comments
			this.getComments();
		},
		data: function() {
			return {
				item: {},
				form: {
					name: null,
					text: null
				},
				validation: {
					name: {
						error: null,
						message: null
					},
					text: {
						error: null,
						message: null
					}
				},
				comments: []
			}
			
	    },
	    methods: {
	    	addComment(){
	    		if(this.validateForm()){
	    			addComment(this.item.id, this.form.name, this.form.text);
	    			this.resetForm();
	    		}
	    		
	    	},
	    	formatTime(timestamp){
	    		return calculateDiffTime(timestamp)
	    	},
	    	getComments(){
	    		let dbComments = fire.firebase_.database().ref('comments')

				dbComments.child(this.$route.params.id).on('value', (res) => {
					if(!res.val()){
						this.comments = [];
					} else {
						this.comments = objectListToArray(res.val());
						this.scrollComments();
					}
				});
	    	},
	    	getTodos(){
	    		getTodos(this.$route.params.id).then((res) => {
					this.item = Object.assign(res, {key: this.$route.params.id}, {id: this.$route.params.id});
				});
	    	},
	    	resetForm(){
				for(let key in this.form){
					this.form[key] = null
				}
	    	},
	    	resetValidation(){
	    		for(let key in this.validation){
					this.validation[key].error = null
					this.validation[key].message = null
				}
	    	},
	    	scrollComments(){
	    		$('#comments-list').animate({scrollTop: $('#comments-list').prop("scrollHeight")}, 500);
	    	},
	    	validateForm(){
	    		this.resetValidation();
	    		
	    		let { name, text } = this.form;

	    		//validate name
	    		if(!name || name.trim().length <= 0){
	    			this.validation.name.error = true;
	    			this.validation.name.message = LABEL.VALIDATION.COMMON.MESSAGE.REQUIRED;
	    			return false;
	    		} else {
	    			this.validation.name.error = null;
	    			this.validation.name.message = null;
	    		}

	    		//validate text
	    		if(!text || text.trim().length <= 0){
					this.validation.text.error = true;
					this.validation.text.message = LABEL.VALIDATION.COMMON.MESSAGE.NOT_EMPTY;
					return false;
				} else {
					this.validation.text.error = null;
					this.validation.text.message = null;
				}

				return true;
	    	}
	    }
	}
</script>

<style lang="scss">
	.todo-detail {
		padding: 0% 5%;

		header {
			border-bottom: 1px solid #f0f0f0;
    		margin-bottom: 12px;
    		padding-bottom: 6px;
		}

		&__info {
			margin: 1.5em 0em;;

			h4 {
				text-decoration: underline;
			}

			p {
				text-align: justify;
				text-indent: 1.5em;
			}
		}

		&__comments {

			.comments {
				&-list {
					height: 200px;
					overflow: scroll;
				}

				&-item {

				}
			}

			form {
				border-top: 1px solid #f0f0f0;
				padding-top: 1em;

				textarea {
					height: 100% !important;
				}

				.message {

					&-error {
						color: red;
						margin-bottom: 6px;
					}
				}
			}
		}
	}
</style>