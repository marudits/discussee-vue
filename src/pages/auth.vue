<template>
	<section class="auth">
		<header class="auth-header">
			<h3>Welcome</h3>
			<p>Please sign in to continue</p>
		</header>
		<content class="auth-content">
			<div :class="`ui ${isLoading} form`">
				<div class="ui field">
					<div class="ui left icon input">
						<input type="text" placeholder="Email" v-model="form.email">
						<i class="mail icon"></i>
					</div>	
				</div>
				<div class="message-error" v-if="validation.email.error">
					{{ validation.email.message }}
				</div>
				<div class="ui field">
					<div class="ui left icon input">
						<input type="password" placeholder="Password" v-model="form.password">
						<i class="lock icon"></i>
					</div>	
				</div>
				<div class="message-error" v-if="validation.password.error">
					{{ validation.password.message }}
				</div>
				<div class="ui field">
					<div class="ui submit button" v-on:click="handleSubmit()">
						{{ mode === 'SIGN_IN' ? 'Sign In' : 'Sign Up'}}
					</div>	
				</div>
				<div class="message-error" v-if="validation.submission.error">
					{{ validation.submission.message }}
				</div>
			</div>
		</content>
		<footer class="auth-footer">
			<p v-if="mode === 'SIGN_IN'">Don't have account? <a href="#/auth" v-on:click="toggleMode()">Sign Up</a> now</p>
			<p v-if="mode === 'SIGN_UP'">Already have account? <a href="#/auth" v-on:click="toggleMode()">Sign In</a> now</p>
		</footer>
	</section>
</template>

<script type="text/javascript">
	//utils
	import { signIn, signUp } from '../utils/api/todo';

	export default {
		name: 'Auth',
		data: function() {
			return {
				mode: 'SIGN_IN',
				form: {
					email: null,
					password: null
				},
				isLoading: null,
				validation: {
					email: {
						error: null,
						message: null
					},
					password: {
						error: null,
						message: null					
					},
					submission: {
						error: null,
						message: null
					} 
				}
			}
		},
		methods: {
			handleSubmit(){
				switch(this.mode){
					case 'SIGN_IN':
						this.signIn();
						break;
					case 'SIGN_UP':
						this.signUp();
						break;
					default:
						break;
				}
			},
			resetForm(){
				for(let key in this.form){
					this.form[key] = null
				}

				this.resetValidation();
			},
			resetValidation(){
	    		for(let key in this.validation){
					this.validation[key].error = null
					this.validation[key].message = null
				}
	    	},
			signUp(){
				this.isLoading = 'loading';
				signUp(this.form.email, this.form.password)
					.then(res => {
						this.isLoading = null;
						this.resetForm();
						this.toggleMode();
						
						if(res.status){
							this.$router.push('/')
						}
						
					})
					.catch(err => {
						this.isLoading = null;

						this.validation.submission.error = true;
						this.validation.submission.message = err.data.message;
					});
			},
			signIn(){
				this.isLoading = 'loading';
				signIn(this.form.email, this.form.password)
					.then(res => {
						this.isLoading = null;
						this.resetForm();

						if(res.status){
							this.$router.push('/')
						}	
					})
					.catch(err => {
						this.isLoading = null;

						this.validation.submission.error = true;
						this.validation.submission.message = err.data.message;
					});
				
			},
			toggleMode(){
				this.mode = this.mode === 'SIGN_IN' ? 'SIGN_UP' : 'SIGN_IN';
				this.resetForm();
			}
		}
	}
</script>

<style lang="scss">
	.auth {
		padding: 0% 5%;
		margin: 0 auto;
		max-width: 400px;

		&-header {
			text-align: center;
			margin-bottom: 12px;
		}

		&-content {

		}

		&-footer {
			margin-top: 30px;
			border-top: 1px solid #f0f0f0;
			padding-top: 12px;

			a {
				text-decoration: underline;
				cursor: pointer;
			}
		}
	}
</style>