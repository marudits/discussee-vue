//utils
import { getUsernameFromEmail } from '../helpers/stringManipulation';

//library
import firebase from 'firebase';


export function getTodos(id = null) {
	return new Promise((resolve, reject) => {
		let dbTodos = firebase.database().ref('todos' + (id ? `/${id}` : '') )
		dbTodos.on('value', (res) => {
			if(!res.val()){
				reject(null)
			} else {
				resolve(res.val())
			}
		})	
	})	
}

export function addTodo(title, desc) {
	const CURRENT_USER = getUsernameFromEmail(firebase.auth().currentUser.email);

	let dbTodos = firebase.database().ref('todos')
	dbTodos.push({
		title: title,
		desc: desc,
		isEditing: false,
		isDone: false,
		createdAt: Date.now(),
		createdBy: CURRENT_USER,
		updatedAt: Date.now(),
		updatedBy: CURRENT_USER
	});
}

export function removeTodo(id){
	let dbTodos = firebase.database().ref('todos').child(id)
	dbTodos.remove();
	let dbComments = firebase.database().ref('comments').child(id)
	dbComments.remove();
}

export function setTodoStatus(id, status){
	const CURRENT_USER = getUsernameFromEmail(firebase.auth().currentUser.email);

	let dbTodos = firebase.database().ref('todos').child(id)
	dbTodos.update({
		isDone: status,
		updatedAt: Date.now(),
		updatedBy: CURRENT_USER
	});
}

export function updateTodo(id, item) {
	console.log('updateTodo: id: ', id, '| item: ', item);
	const CURRENT_USER = getUsernameFromEmail(firebase.auth().currentUser.email);

	let dbTodos = firebase.database().ref('todos').child(id)
	dbTodos.update(Object.assign({}, item, {updatedBy: CURRENT_USER}, {updatedAt: Date.now()}));
}

export function getComments(id = null) {
	return new Promise((resolve, reject) => {
		let dbComments = firebase.database().ref('comments')

		dbComments.child(id).on('value', (res) => {
			if(!res.val()){
				reject(null)
			} else {
				resolve(res.val())
			}
		})	
	})	
}

export function addComment(id, text) {
	const CURRENT_USER = getUsernameFromEmail(firebase.auth().currentUser.email);

	let dbComments = firebase.database().ref('comments').child(id)
	dbComments.push({
		name: CURRENT_USER,
		text: text,
		timestamp: Date.now()
	});
}

export function signUp(email, password){
	return new Promise((resolve, reject) => {
		firebase.auth().createUserWithEmailAndPassword(email, password)
			.then((user) => {
				resolve({ status: true, data: user });
			}, (err) => {
				reject({ status: false, data: err })
			})	
	})
}

export function signIn(email, password){
	return new Promise((resolve, reject) => {
		firebase.auth().signInWithEmailAndPassword(email, password)
			.then((user) => {
				resolve({ status: true, data: user });
			}, (err) => {
				reject({ status: false, data: err });
			})	
	})
}

export function getCurrentUser(){
	return firebase.auth().currentUser
}

export function getCurrentUsername(){
	return getUsernameFromEmail(firebase.auth().currentUser.email)
}