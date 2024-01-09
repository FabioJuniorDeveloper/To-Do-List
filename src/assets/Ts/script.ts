let campoText = document.querySelector('#input-box') as HTMLInputElement;
let buttonAdd = document.querySelector('#btn-add') as HTMLButtonElement;
let list = document.querySelector('ul') as HTMLUListElement;
let rowDiv = document.querySelector('.row') as HTMLElement;

campoText.addEventListener('keyup', (event) => {
    if (event.key == 'Enter') {
        createTask();
    }
})

function createTask() {
    let inputValue: string = campoText.value;
    const liElement: HTMLElement = createItem(inputValue);
    list.appendChild(liElement)

    limperText();
    saveTasksToLocalStorage()
}

buttonAdd.addEventListener('click', () => {
    if (campoText.value !== '') {
        campoText.placeholder = 'Add Your Text';
        rowDiv.style.border = 'none';

        createTask();

    } else {
        noTextAlert()
    }

})

function limperText(): void {
    campoText.value = '';
}

function createItem(textValue: string): HTMLElement {
    let liElement = document.createElement('li');
    let btnCancel = document.createElement('img');

    liElement.innerHTML = textValue;
    liElement.appendChild(btnCancel)
    btnCancel.setAttribute('src', '../src/assets/images/x-regular-24.png');
    return liElement
}
list.addEventListener('click', (event) => {
    const eventElement = event.target as HTMLElement;
    if (eventElement?.tagName === 'LI') {
        eventElement.classList.toggle('checked')
        saveTasksToLocalStorage()

    } else if (eventElement.tagName === 'IMG') {

        const elementPai = eventElement.parentElement as HTMLElement;

        if (elementPai.classList.contains('checked')) {
            DeleteTask(elementPai);
            saveTasksToLocalStorage()
        } else {
            alertTaskModal(elementPai)
        }

    }
})

function noTextAlert(): void {
    campoText.placeholder = 'Enter some task';
    rowDiv.style.border = '1px solid #ff5945'

}
function alertTaskModal(elementPai: HTMLElement) {
    let alertModal = document.querySelector('.container-alert') as HTMLDivElement;
    alertModal.classList.add('active-alert');

    let btnExclude = document.querySelector('.btn-excluir') as HTMLButtonElement;
    let btnCancel = document.querySelector('.btn-cancelar') as HTMLButtonElement;

    btnExclude?.addEventListener('click', () => {
        DeleteTask(elementPai);
        alertModal.classList.remove('active-alert')
        saveTasksToLocalStorage()
    })
    btnCancel?.addEventListener('click', () => {
        alertModal.classList.remove('active-alert')
    })
}
function DeleteTask(el: HTMLElement): void {
    el.remove()
}

function saveTasksToLocalStorage(): void {
    localStorage.setItem('data', list.innerHTML);
}

function showTasks(): void {
    let listContainer = localStorage.getItem('data');
    if (listContainer?.length) {
        list.innerHTML = listContainer;
    }
}

showTasks()