"use strict";
let campoText = document.querySelector('#input-box');
let buttonAdd = document.querySelector('#btn-add');
let list = document.querySelector('ul');
let rowDiv = document.querySelector('.row');
campoText.addEventListener('keyup', (event) => {
    if (event.key == 'Enter') {
        createTask();
    }
});
function createTask() {
    let inputValue = campoText.value;
    const liElement = createItem(inputValue);
    list.appendChild(liElement);
    limperText();
    saveTasksToLocalStorage();
}
buttonAdd.addEventListener('click', () => {
    if (campoText.value !== '') {
        campoText.placeholder = 'Add Your Text';
        rowDiv.style.border = 'none';
        createTask();
    }
    else {
        noTextAlert();
    }
});
function limperText() {
    campoText.value = '';
}
function createItem(textValue) {
    let liElement = document.createElement('li');
    let btnCancel = document.createElement('img');
    liElement.innerHTML = textValue;
    liElement.appendChild(btnCancel);
    btnCancel.setAttribute('src', '../src/assets/images/x-regular-24.png');
    return liElement;
}
list.addEventListener('click', (event) => {
    const eventElement = event.target;
    if ((eventElement === null || eventElement === void 0 ? void 0 : eventElement.tagName) === 'LI') {
        eventElement.classList.toggle('checked');
        saveTasksToLocalStorage();
    }
    else if (eventElement.tagName === 'IMG') {
        const elementPai = eventElement.parentElement;
        if (elementPai.classList.contains('checked')) {
            DeleteTask(elementPai);
            saveTasksToLocalStorage();
        }
        else {
            alertTaskModal(elementPai);
        }
    }
});
function noTextAlert() {
    campoText.placeholder = 'Enter some task';
    rowDiv.style.border = '1px solid #ff5945';
}
function alertTaskModal(elementPai) {
    let alertModal = document.querySelector('.container-alert');
    alertModal.classList.add('active-alert');
    let btnExclude = document.querySelector('.btn-excluir');
    let btnCancel = document.querySelector('.btn-cancelar');
    btnExclude === null || btnExclude === void 0 ? void 0 : btnExclude.addEventListener('click', () => {
        DeleteTask(elementPai);
        alertModal.classList.remove('active-alert');
        saveTasksToLocalStorage();
    });
    btnCancel === null || btnCancel === void 0 ? void 0 : btnCancel.addEventListener('click', () => {
        alertModal.classList.remove('active-alert');
    });
}
function DeleteTask(el) {
    el.remove();
}
function saveTasksToLocalStorage() {
    localStorage.setItem('data', list.innerHTML);
}
function showTasks() {
    let listContainer = localStorage.getItem('data');
    if (listContainer === null || listContainer === void 0 ? void 0 : listContainer.length) {
        list.innerHTML = listContainer;
    }
}
showTasks();
