const form = document.querySelector('.todo-form');
const todoInput = document.querySelector('.input');
const ulList = document.querySelector('.todo-list');

const todos = [];

form.addEventListener('submit', (event)=>{
    event.preventDefault();
    // const { value } = todoInput;
    const value = todoInput.value;
   if(value !== ''){
        createNewTodo(value);
        todoInput.value = '';
        todoInput.focus();
    
    }else{
        alert('Please kindly fill todo input form');
    }
     
})

const createNewTodo = (todoDetail) => {
    const todo = {
        isDone: false,
        description: todoDetail,
        id: Math.floor(Date.now() / 1000)
    }
    todos.push(todo);
    console.log(todos);
    renderItem(todo);
}

const renderItem = (todo) => {
    const li = document.createElement('li');
    li.setAttribute('id', todo.id);
    const currVisible = document.getElementById(todo.id);
   if(todo.delete){
        ulList.removeChild(currVisible);
   }else{
        li.innerHTML = `
            <div class="box">
                <span class="delete">Delete</span>
                <span class="item ${todo.isDone ? 'strike': ''} ">${todo.description}</span>
            </div>
        `;

        if(currVisible){
            ulList.replaceChild(li, currVisible);
        }else{
            ulList.append(li)
        }
   }
    
}

const clickHandler = (event) => {
    const id = event.target.parentNode.parentNode.id
    if(event.target.classList.contains('delete')){
        deleteTodo(id)
    }else if(event.target.classList.contains('item')){
        markTodo(id);
    }
    //console.log(event.target.parentNode.parentNode.id)
}

ulList.addEventListener('click', clickHandler)

const deleteTodo = (id) => {
    const  index = todos.findIndex(todo => todo.id == id);
    if(index < 0) return;
    const todo = {...todos[index], delete: true}
    todos.splice(index, 1)
    renderItem(todo)
}
const markTodo = (id) => {
    const  index = todos.findIndex(todo => todo.id == id);
    if(index < 0) return;
    todos[index] = {...todos[index], isDone: !todos[index].isDone}
    console.log(todos)
    renderItem(todos[index])

}


