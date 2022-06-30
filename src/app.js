import { time, clock } from "./clock.js";
import { updateLocalStorage, ifLocalStorage, getLocalStorage } from "./localStor.js";
import { generateId } from "./generateId.js";
import { modalTaskBtnConfirm, createModalTask, modalTaskSelect } from "./modalTask.js";
import { modalTaskContainer, modalTaskTitle, modalTaskDescription, modalSelectUserName } from "./modalTask.js";
import { chengeCounters, todoCount, progressCount, doneCount } from "./counters.js";
import { selectUsers } from "./selectUsers.js";

export function app() {

    // модальное окно
    const boardsTodoAdd = document.querySelector('.board__todo-add');
    boardsTodoAdd.addEventListener('click', () => {
        createModalTask();
        if (modalTaskSelect.length == 1) {
            selectUsers();
        }
    });

    clock();

    let todo = [];
    let inProgress = [];
    let done = [];
    let inProgressCard = {};
    let todoCard = {};
    let doneCard = {};

    // контейнеры для карточек
    const todoCards = document.querySelector('.board__todo-cards'); 
    const progressCards = document.querySelector('.board__progress-cards');
    const doneCards = document.querySelector('.board__done-cards');

    // проверка localStorage для отрисовки данных
    if (ifLocalStorage('todoBoard')) {
        todo = getLocalStorage('todoBoard');
        todo.forEach((item) => {
            createCardTodo(item);
        });
        // обновление счетчика
        chengeCounters('todoBoard', todoCount);
    }

    if (ifLocalStorage('inProgressBoard')) {
        inProgress = getLocalStorage('inProgressBoard');
        inProgress.forEach((item) => {
            createCardProgress(item);
        });
        // обновление счетчика
        chengeCounters('inProgressBoard', progressCount);
    }

    if (ifLocalStorage('doneBoard')) {
        done = getLocalStorage('doneBoard');
        done.forEach((item) => {
            createCardDone(item);
        });
        // обновление счетчика
        chengeCounters('doneBoard', doneCount);
    }

    // кнопки
    const delAll = document.querySelector('.board__done-delall');
    delAll.addEventListener('click', () => {
        if(doneCards.innerHTML) {
            done.length = 0;
            updateLocalStorage('doneBoard', done);
            doneCards.innerHTML = '';
            // обновление счетчика
            chengeCounters('doneBoard', doneCount);
        }
    });

    // создание карточки нажатием confirm мод.окно
    modalTaskBtnConfirm.addEventListener('click', () => {
        let cardTitle = modalTaskTitle.value;
        let cardDescription = modalTaskDescription.value;
        todoCard.id = generateId();
        // берем данные из мод.окна, если их нет, то подставл. знач. по умолч.
        (cardTitle) ? (todoCard.title = cardTitle) : (todoCard.title = 'Title');
        (cardDescription) ? (todoCard.description = cardDescription) : (todoCard.description = 'Description');
        let cardUser = modalTaskSelect.value;
        todoCard.name = cardUser;
        todoCard.time = time(); 
        todo.push(todoCard);
        createCardTodo(todoCard);
        updateLocalStorage('todoBoard', todo);
        todoCard = {};
        // обнуляем данные модального окна
        modalTaskTitle.value = '';
        modalTaskDescription.value = '';
        modalSelectUserName.remove();
        modalTaskSelect.value = '';
        modalTaskContainer.innerHTML = '';
        modalTaskContainer.remove();
        // обновление счетчика
        chengeCounters('todoBoard', todoCount);
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
            // обновление счетчика
            chengeCounters('todoBoard', todoCount);
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
            block_1: {
                if (chengeCounters('inProgressBoard', progressCount) > 5) {
                    const question = confirm('Warning!'); // заменить на мод.окно
                    if(!question) {
                        break block_1;
                    }
                }
            
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

                // обновление счетчика
                chengeCounters('todoBoard', todoCount);
                chengeCounters('inProgressBoard', progressCount);
            }
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
            // обновление счетчика
            chengeCounters('todoBoard', todoCount);
            chengeCounters('inProgressBoard', progressCount);
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
            // обновление счетчика
            chengeCounters('inProgressBoard', progressCount);
            chengeCounters('doneBoard', doneCount);
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
            // обновление счетчика
            chengeCounters('doneBoard', doneCount);
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