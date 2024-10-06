window.onload = function () {
    document.getElementById('personal-link').click();
};

var form = document.querySelector('form');
var todoList = document.querySelector('ul');
var button = document.getElementById('clear');
var input = document.getElementById('user-todo');
var addButton = document.getElementById('addButton');
var personalHeading = document.getElementById('personalHeading');
var professionalHeading = document.getElementById('professionalHeading');

var noItemsMessage = document.createElement('p'); 
noItemsMessage.textContent = "No items in your to-do list!";
noItemsMessage.style.display = "none"; 
todoList.parentNode.insertBefore(noItemsMessage, todoList);


personalHeading.addEventListener('click', function () {
    personalHeading.style.borderBottom = "2px solid rgb(187, 132, 29)";
    professionalHeading.style.borderBottom = "none";

});

professionalHeading.addEventListener('click', function () {
    professionalHeading.style.borderBottom = "2px solid rgb(187, 132, 29)";
    personalHeading.style.borderBottom = "none";
});

var personalTodosArray = localStorage.getItem('personalTodos') ? JSON.parse(localStorage.getItem('personalTodos')) : [];
var professionalTodosArray = localStorage.getItem('professionalTodos') ? JSON.parse(localStorage.getItem('professionalTodos')) : [];

var currentListType = 'personal'; 

function updateUI() {
    var currentArray = currentListType === 'personal' ? personalTodosArray : professionalTodosArray;

    todoList.innerHTML = "";

    if (currentArray.length > 0) {
        button.style.display = "inline-block"; 
        noItemsMessage.style.display = "none"; 
        currentArray.forEach(todoMaker);
    } else {
        button.style.display = "none"; 
        noItemsMessage.style.display = "block"; 
    }
}

var todoMaker = function (text) {
    var todo = document.createElement('li');
    todo.classList.add('todo-item')
    todo.textContent = text;
    todoList.appendChild(todo);
}

personalHeading.addEventListener('click', function () {
    currentListType = 'personal';
    updateUI(); 
});

professionalHeading.addEventListener('click', function () {
    currentListType = 'professional';
    updateUI(); 
});


addButton.addEventListener('click', function (e) {
    e.preventDefault();
    if (input.value.trim() !== "") {       
        if (currentListType === 'personal') {
            personalTodosArray.push(input.value);
            localStorage.setItem('personalTodos', JSON.stringify(personalTodosArray));
        } else {
            professionalTodosArray.push(input.value);
            localStorage.setItem('professionalTodos', JSON.stringify(professionalTodosArray));
        }
        todoMaker(input.value); 
        input.value = ""; 
        updateUI();
    }
    else{
        alert("The task cannot be empty. Please provide some input.");
    }
});

button.addEventListener('click', function () {

    if (currentListType === 'personal') {
        personalTodosArray = [];
        localStorage.setItem('personalTodos', JSON.stringify(personalTodosArray));
    } else {
        professionalTodosArray = [];
        localStorage.setItem('professionalTodos', JSON.stringify(professionalTodosArray));
    }

    updateUI(); 
});




