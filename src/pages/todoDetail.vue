<template>
	<section class="todo-detail">
		<header>
			<h2>Thread Detail</h2>
		</header>
		<content>
			<section class="todo-detail__info">
				<div class="info-meta">
					<p>Created by <span class="info-meta__user">{{item.createdBy}}</span> at <span class="info-meta__date">{{ this.formatTime(item.createdAt) }}</span></p>
					<p>Last Updated <span class="info-meta__date">{{ this.formatTime(item.updatedAt) }}</span></p>
				</div>
				<h4>{{ item.title }}</h4>
				<p>{{ item.desc }}</p>
			</section>
			<section class="todo-detail__comments">
				<div class="ui comments">
					<h4 class="ui dividing header">{{comments.length}} Comments</h4>
					<div class="comments-list" id="comments-list">
						<div class="comment comments-item" v-for="item in comments" :id="`comment-${item.id}`">
							<div v-if="!isOwnComment(item.name)" class="comments-item__other">
								<a class="item-avatar">
									<i class="user teal icon big"></i>
							    </a>
							    <div class="item-content">
							    	<a class="author">{{ item.name }}</a>
							    	<div class="text ui teal label">
							    		{{ item.text }}
							    	</div>
							    	<div class="timestamp">
							    		{{ formatTime(item.timestamp)}}
							    	</div>
							    </div>	
							</div>
							<div v-if="isOwnComment(item.name)" class="comments-item__own">
								
							    <div class="item-content">
							    	<div class="text ui blue label">
							    		{{ item.text }}
							    	</div>
							    	<div class="timestamp">
							    		{{ formatTime(item.timestamp)}}
							    	</div>
							    </div>
							</div>
						</div>
						<div class="comments-item__istyping" v-if="isTyping.count > 0">
							<p>{{ formatIsTypingInfo() }}</p>
						</div>
					</div>

					<div class="ui horizontal divider comments-locked" v-if="item.isDone">
						Creator has closed this thread
					</div>
					
					<form class="ui reply form" v-if="!item.isDone">
						<div class="field">
							<textarea name="form-text" v-model="form.text" rows="3" v-on:keyup="handleComment()"></textarea>
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
	import { getTodos, addComment, getComments, getCurrentUsername, isTypingComment, isFinishedTypingComment } from '../utils/api/todo';
	import { objectListToArray, calculateDiffTime, getUsernameFromEmail } from '../utils/helpers/stringManipulation';
	import firebase from 'firebase';
	
	export default {
		name: 'TodoDetail',
		created: function(){
			//get item info
			this.getTodos();

			//get item comments
			this.getComments();

			//get isTyping items
			this.getIsTyping();
		},
		data: function() {
			return {
				item: {},
				form: {
					text: null
				},
				validation: {
					text: {
						error: null,
						message: null
					}
				},
				comments: [],
				isTyping: {
					timer: null,
					list: null,
					count: null
				},

			}
			
	    },
	    methods: {
	    	addComment(){
	    		if(this.validateForm()){
	    			addComment(this.item.id, this.form.text);
	    			this.resetForm();
	    		}
	    		
	    	},
	    	formatIsTypingInfo(){
	    		let isCurrentUserTyping = this.isTyping.list.filter(x => (x.key === getCurrentUsername())).length === 1,
	    			otherUserTyping = this.isTyping.list.filter(x => (x.key !== getCurrentUsername())),
	    			totalIsTyping = this.isTyping.list.length;

	    		if(this.isTyping.list.length === 1){
	    			return `${isCurrentUserTyping ? 'You are' : this.isTyping.list[0].id + ' is'} typing...`
	    		} else {
	    			if(isCurrentUserTyping){
	    				return `You and ${otherUserTyping.length > 1 ? otherUserTyping.length + ' people' : otherUserTyping[0].id} are typing...`
	    			} else {
	    				return `${otherUserTyping[0].id} and ${otherUserTyping.length > 2 ? otherUserTyping.length + ' people' : otherUserTyping[1].id} are typing...`
	    			}
	    		}
	    		
	    	},
	    	formatTime(timestamp){
	    		return calculateDiffTime(timestamp)
	    	},
	    	getComments(){
	    		let dbComments = firebase.database().ref('comments')

				dbComments.child(this.$route.params.id).on('value', (res) => {
					if(!res.val()){
						this.comments = [];
					} else {
						this.comments = objectListToArray(res.val());
						this.scrollComments();
					}
				});
	    	},
	    	getIsTyping(){
	    		let dbIsTyping = firebase.database().ref('isTyping').child(this.$route.params.id)

				dbIsTyping.on('value', (res) => {
					if(!res.val()){
						this.isTyping.list = [];
						this.isTyping.count = 0;
					} else {
						this.isTyping.list = objectListToArray(res.val());
						this.isTyping.count = Object.keys(res.val()).length
					}
				});
	    	},
	    	getTodos(){
	    		getTodos(this.$route.params.id).then((res) => {
					this.item = Object.assign(res, {key: this.$route.params.id}, {id: this.$route.params.id});
				});
	    	},
	    	handleComment(){
	    		let { text } = this.form;

	    		if(text){
	    			this.resetIsTypingTimer(this.item.id);

	    			isTypingComment(this.item.id, text)
	    		}
	    	},
	    	isOwnComment(name){
	    		return name === getUsernameFromEmail(firebase.auth().currentUser.email)
	    	},
	    	resetForm(){
				for(let key in this.form){
					this.form[key] = null
				}
	    	},
	    	resetIsTypingTimer(id){
	    		if(this.isTyping.timer){
	    			clearTimeout(this.isTyping.timer);
	    			this.isTyping.timer = null
	    		}

	    		let that = this;
	    		this.isTyping.timer = setTimeout(function(){
	    			that.stoppedTyping(id)
	    		}, 5000)
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
	    	stoppedTyping(id){
	    		if(this.isTyping.timer){
	    			this.isTyping.timer = null;
	    			isFinishedTypingComment(id);
	    		}
	    	},
	    	validateForm(){
	    		this.resetValidation();
	    		
	    		let { text } = this.form;

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
			margin: 1.5em 0em;

			.info {

				&-meta {
					font-size: 0.8em;

					p {
						text-indent: 0;
						margin-bottom: 3px;
					}

					&__user {
						font-weight: 500;
					}

					&__date {
						font-style: italic;
					}
				}
			}

			h4 {
				text-decoration: underline;
				margin-top: 1em;
				font-size: 1.3em !important;
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

					&__other {
						display: inline-flex;
						margin-right: 10%;
						float: left;
						width: 100%;
						margin-bottom: 15px;

						.item {
							&-avatar {
								width: 15%;
								text-align: center;
								padding-top: 18px;
							}

							&-content {
								margin-right: 40%;
								width: 100%;

								.author {
									display: block;
								}

								.text {
									text-align: left;
									font-weight: 300;
									padding: 5px 10px;
									border-radius: 2px 10px 10px 2px;
								}

								.timestamp {
									font-size: 0.8em;
									color: grey;
								}
							}	
						}
						
					}
					

					&__own {
						display: inline-flex;
						margin-right: 4%;
						float: right;
						width: 100%;
						margin-bottom: 15px;

						.item {
							&-content {
								margin-left: 40%;
								width: 100%;

								.text {
									text-align: right;
									font-weight: 300;
									padding: 5px 10px;
									border-radius: 10px 2px 2px 10px;
								}

								.timestamp {
									font-size: 0.8em;
									color: grey;
								}	text-align: right;
							}
						}

						
						
					}
				}

				&-locked {
					font-size: 0.5em;
					text-transform: normal;
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