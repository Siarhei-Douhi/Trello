import { time, clock } from "./clock.js";
import { updateLocalStorage } from "./localStor.js";
import { generateId } from "./generateId.js";
import { modalTaskBtnConfirm, createModalTask, modalTaskContainer, modalTaskTitle, modalTaskDescription } from "./modalTask.js";

export function app() {

    // модальное окно
    const boardsTodoAdd = document.querySelector('.board__todo-add');
    
    boardsTodoAdd.addEventListener('click', () => {
        createModalTask();
    });

    clock();

    let todo = [];
    let inProgress = [];
    let done = [];
    let inProgressCard = {};
    let todoCard = {};
    let doneCard = {};

    // счётчики
    let todoCount = document.querySelector('.board__todo-count');
    let progressCount = document.querySelector('.board__progress-count');
    let doneCount = document.querySelector('.board__done-count');



    // контейнеры для карточек
    const todoCards = document.querySelector('.board__todo-cards'); 
    const progressCards = document.querySelector('.board__progress-cards');
    const doneCards = document.querySelector('.board__done-cards');

    // проверка localStorage для отрисовки данных
    if (localStorage.getItem('todoBoard')) {
        todo = JSON.parse(localStorage.getItem('todoBoard'));
        todo.forEach((item) => {
            createCardTodo(item);
        });
    }

    if (localStorage.getItem('inProgressBoard')) {
        inProgress = JSON.parse(localStorage.getItem('inProgressBoard'));
        inProgress.forEach((item) => {
            createCardProgress(item);
        });
    }

    if (localStorage.getItem('doneBoard')) {
        done = JSON.parse(localStorage.getItem('doneBoard'));
        done.forEach((item) => {
            createCardDone(item);
        });
    }


    // кнопки
    const delAll = document.querySelector('.board__done-delall');
    delAll.addEventListener('click', () => {
        if(doneCards.innerHTML) {
            done.length = 0;
            updateLocalStorage('doneBoard', done);
            doneCards.innerHTML = '';
        }
    });

    // создание карточки нажатием confirm мод.окно
    modalTaskBtnConfirm.addEventListener('click', () => {
        let cardTitle = modalTaskTitle.value;
        let cardDescription = modalTaskDescription.value;
        todoCard.id = generateId();
        (cardTitle) ? (todoCard.title = cardTitle) : (todoCard.title = 'Title');
        (cardDescription) ? (todoCard.description = cardDescription) : (todoCard.description = 'Description');
        // с todoCard.name позже сделать тоже самое
        todoCard.name = 'UserName';
        todoCard.time = time(); 
        todo.push(todoCard);
        createCardTodo(todoCard);
        updateLocalStorage('todoBoard', todo);
        todoCard = {};
        // обнуляем данные модального окна
        modalTaskTitle.value = '';
        modalTaskDescription.value = '';
        modalTaskContainer.innerHTML = '';
        modalTaskContainer.remove();
    });



    // функции создания карточек
    function createCardTodo(obj) {
        const card = document.createElement('div');
        card.classList.add('card'); 
        card.id = obj.id;
        todoCards.append(card);

        const btnsHeadWrap = document.createElement('div');
        btnsHeadWrap.classList.add('btnsHeadWrap');
        card.append(btnsHeadWrap);

        const btnEdit = document.createElement('button');
        btnEdit.classList.add('btnEdit');
        btnEdit.innerText = 'Edit';
        // btnEdit.addEventListener('click', () =>{});
        // вызов модального окна, значения брать из карточки, где оно было вызвано

        const btnDelete = document.createElement('button');
        btnDelete.classList.add('btnDelete');
        btnDelete.innerText = 'Delete';
        btnDelete.addEventListener('click', () => {
            const question = confirm('Вы уверены?');
            if(question) {
                todo = todo.filter((item) => item.id !== obj.id);
                updateLocalStorage('todoBoard', todo);
                card.remove();
            }
        });
        btnsHeadWrap.append(btnEdit, btnDelete);

        const titleCard = document.createElement('h4');
        titleCard.classList.add('titleCard');
        titleCard.innerText = obj.title;
        card.append(titleCard);

        const descrWrap = document.createElement('div');
        descrWrap.classList.add('descrWrap');
        card.append(descrWrap);

        const description = document.createElement('div');
        description.classList.add('description');
        description.innerText = obj.description;

        const btnSend = document.createElement('button');
        btnSend.classList.add('btnSend');
        btnSend.innerText = '>';
        btnSend.addEventListener('click', () => {
            todo.forEach((item) => {
                if(item.id === obj.id) {
                    inProgressCard = {...item};
                }
            });
            inProgress.push(inProgressCard);
            createCardProgress(inProgressCard);
            updateLocalStorage('inProgressBoard', inProgress);
            inProgressCard = {};

            todo = todo.filter((item) => item.id !== obj.id);
            updateLocalStorage('todoBoard', todo);
            card.remove();
        });
        descrWrap.append(description, btnSend);

        const userWrap = document.createElement('div');
        userWrap.classList.add('userWrap');
        card.append(userWrap);

        const userName = document.createElement('div');
        userName.innerText = obj.name;
        const cardTime = document.createElement('div');
        cardTime.innerText = obj.time;
        userWrap.append(userName, cardTime);
    }


    function createCardProgress(obj) {
        const card = document.createElement('div');
        card.classList.add('card'); 
        card.id = obj.id;
        progressCards.append(card);

        const btnsHeadWrap = document.createElement('div');
        btnsHeadWrap.classList.add('btnsHeadWrap');
        card.append(btnsHeadWrap);
     
        const btnBack = document.createElement('button');
        btnBack.classList.add('btnBack');
        btnBack.innerText = 'Back';
        btnBack.addEventListener('click', () => {
            inProgress.forEach((item) => {
                if(item.id === obj.id) {
                    todoCard = {...item};
                }
            });
            todo.push(todoCard);
            createCardTodo(todoCard);
            updateLocalStorage('todoBoard', todo);
            todoCard = {};
            
            inProgress = inProgress.filter((item) => item.id !== obj.id);
            updateLocalStorage('inProgressBoard', inProgress);
            card.remove();
        });

        const btnComplete = document.createElement('button');
        btnComplete.classList.add('btnComplete');
        btnComplete.innerText = 'Complete';
     
        btnComplete.addEventListener('click', () => {
            inProgress.forEach((item) => {
                if(item.id === obj.id) {
                    doneCard = {...item};
                }
            });
            done.push(doneCard);
            createCardDone(doneCard);
            updateLocalStorage('doneBoard', done);
            doneCard = {};

            inProgress = inProgress.filter((item) => item.id !== obj.id);
            updateLocalStorage('inProgressBoard', inProgress);
            card.remove();
        });
        btnsHeadWrap.append(btnBack, btnComplete);

        const titleCard = document.createElement('h4');
        titleCard.classList.add('titleCard');
        titleCard.innerText = obj.title;
        card.append(titleCard);

        const descrWrap = document.createElement('div');
        descrWrap.classList.add('descrWrap');
        card.append(descrWrap);

        const description = document.createElement('div');
        description.classList.add('description');
        description.innerText = obj.description;
        descrWrap.append(description);

        const userWrap = document.createElement('div');
        userWrap.classList.add('userWrap');
        card.append(userWrap);

        const userName = document.createElement('div');
        userName.innerText = obj.name;
        const cardTime = document.createElement('div');
        cardTime.innerText = obj.time;
        userWrap.append(userName, cardTime);
    }

    function createCardDone(obj) {
        const card = document.createElement('div');
        card.classList.add('card'); 
        card.id = obj.id;
        doneCards.append(card);

        const btnsHeadWrap = document.createElement('div');
        btnsHeadWrap.classList.add('btnsHeadWrap');
        card.append(btnsHeadWrap);
        
        const btnDelete = document.createElement('button');
        btnDelete.classList.add('btnDelete');
        btnDelete.innerText = 'Delete';
        btnDelete.addEventListener('click', () => {
            const question = confirm('Вы уверены?');
            if(question) {
                done = done.filter((item) => item.id !== obj.id);
                updateLocalStorage('doneBoard', done);
                card.remove();
            }
        });
        btnsHeadWrap.append(btnDelete);

        const titleCard = document.createElement('h4');
        titleCard.classList.add('titleCard');
        titleCard.innerText = obj.title;
        card.append(titleCard);

        const descrWrap = document.createElement('div');
        descrWrap.classList.add('descrWrap');
        card.append(descrWrap);

        const description = document.createElement('div');
        description.classList.add('description');
        description.innerText = obj.description;
        descrWrap.append(description);

        const userWrap = document.createElement('div');
        userWrap.classList.add('userWrap');
        card.append(userWrap);

        const userName = document.createElement('div');
        userName.innerText = obj.name;
        const cardTime = document.createElement('div');
        cardTime.innerText = obj.time;
        userWrap.append(userName, cardTime);
    };
};