//helpers
import fire from '../helpers/firebase';

export function getTodos(id = null) {
	return new Promise((resolve, reject) => {
		let dbTodos = fire.firebase_.database().ref('todos' + (id ? `/${id}` : '') )
		dbTodos.on('value', (res) => {
			if(!res.val()){
				reject(null)
			} else {
				resolve(res.val())
			}
		})	
	})	
}

export function addTodo(title, desc, createdBy = 'Anonymous') {
	let dbTodos = fire.firebase_.database().ref('todos')
	dbTodos.push({
		title: title,
		desc: desc,
		isEditing: false,
		isDone: false,
		createdAt: Date.now(),
		createdBy: createdBy,
		updatedAt: Date.now(),
		updatedBy: createdBy
	});
}

export function removeTodo(id){
	let dbTodos = fire.firebase_.database().ref('todos').child(id)
	dbTodos.remove();
}

export function setTodoStatus(id, status, updatedBy = 'Anonymous'){
	let dbTodos = fire.firebase_.database().ref('todos').child(id)
	dbTodos.update({
		isDone: status,
		updatedAt: Date.now(),
		updatedBy: updatedBy
	});
}

export function updateTodo(id, item, updatedBy = 'Anonymous') {
	let dbTodos = fire.firebase_.database().ref('todos').child(id)
	dbTodos.set(Object.assign({}, item, {updatedBy: updatedBy}, {updatedAt: Date.now()}));
}

export function getComments(id = null) {
	return new Promise((resolve, reject) => {
		let dbComments = fire.firebase_.database().ref('comments')

		dbComments.child(id).on('value', (res) => {
			if(!res.val()){
				reject(null)
			} else {
				resolve(res.val())
			}
		})	
	})	
}

export function addComment(id, name, text) {
	let dbComments = fire.firebase_.database().ref('comments').child(id)
	dbComments.push({
		name: name,
		text: text,
		timestamp: Date.now()
	});
}