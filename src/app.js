import { time, clock } from "./clock.js";
import { updateLocalStorage, ifLocalStorage, getLocalStorage } from "./localStor.js";
import { generateId } from "./generateId.js";
import { modalTaskBtnConfirm, createModalTask, modalTaskSelect } from "./modalTask.js";
import { modalTaskContainer, modalTaskTitle, modalTaskDescription, modalSelectUserName } from "./modalTask.js";
import { chengeCounters, todoCount, progressCount, doneCount } from "./counters.js";
import { selectUsers } from "./selectUsers.js";
import { openModalWarning } from "./modalWarning.js";

export function app() {

    clock();

    let todo = [];
    let inProgress = [];
    let done = [];
    let inProgressCard = {};
    let todoCard = {};
    let doneCard = {};
    let ID;
    let flag = 0;
    // контейнеры для карточек
    const todoCards = document.querySelector('.board__todo-cards'); 
    const progressCards = document.querySelector('.board__progress-cards');
    const doneCards = document.querySelector('.board__done-cards');

    let titleCardTest;
    let descriptionTest;
    let userNameTest;
    // let titleCard = document.createElement('h4');
    // let description = document.createElement('div');
    // let userName = document.createElement('div');

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

    // КНОПКИ
    // кнопка выз. модальное окно
    const boardsTodoAdd = document.querySelector('.board__todo-add');
    boardsTodoAdd.addEventListener('click', () => {
        flag = 1;
        createModalTask('Select User Name', flag);
        if (modalTaskSelect.length == 1) {
            selectUsers();
        }
    });

    // кнопка удал. карточек Done
    const delAll = document.querySelector('.board__done-delall');
    delAll.addEventListener('click', () => {
        if(doneCards.innerHTML) {
            openModalWarning(delAllWarning, done, doneCards);
        }
    });

    // кнопка создания карточки нажатием confirm мод.окно
   

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
        btnEdit.addEventListener('click', () => {            
            let editItem = todo.filter((item) => item.id == card.id);
            modalTaskTitle.value = editItem[0].title;
            modalTaskDescription.value = editItem[0].description;
            ID = editItem[0].id;
            let editName = editItem[0].name;
            modalTaskSelect.value = editItem[0].name;
            flag = 2;
            
            createModalTask(editName, flag);
        });

        const btnDelete = document.createElement('button');
        btnDelete.classList.add('btnDelete');
        btnDelete.innerText = 'Delete';
        btnDelete.addEventListener('click', () => {
            openModalWarning(dellCard, obj, card);
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
            if (progressCount.innerHTML > 5) {
                card.style.backgroundColor = 'red';
                openModalWarning(cardSend, obj, card);
            } else {
                cardSend(obj, card);
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
        let titleCardTest = titleCard;
        let descriptionTest = description;
        let userNameTest = userName;
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


    modalTaskBtnConfirm.addEventListener('click', () => {
        let cardTitle = modalTaskTitle.value;
        let cardDescription = modalTaskDescription.value;
        let cardUserName = modalTaskSelect.value;
        if(flag === 1) {
            
            todoCard.id = generateId();
            (cardTitle) ? (todoCard.title = cardTitle) : (todoCard.title = 'Title');
            (cardDescription) ? (todoCard.description = cardDescription) : (todoCard.description = 'Description');
            // let cardUserName = modalTaskSelect.value;
            todoCard.name = cardUserName;
            todoCard.time = time(); 
            todo.push(todoCard);
            createCardTodo(todoCard);
            todoCard = {};
            flag = 0;
        } else if (flag === 2) {
            
            todo.forEach((item) => {
                if(item.id === ID) {
                    item.title = cardTitle;
                    item.description = cardDescription;
                    item.name = cardUserName;
                }
            });
            let editCard = document.getElementById(`${ID}`);
            let titleEdit = editCard .children[1];
            let descEdit = editCard .children[2].firstChild;
            let userEdit = editCard .children[3].firstChild;
            
            (cardTitle) ? (titleEdit.innerText = cardTitle) : (titleEdit.innerText = 'Title');
            (cardDescription) ? (descEdit.innerText = cardDescription) : (descEdit.innerText = 'Description');
            userEdit.innerText = modalTaskSelect.value;
            flag = 0;
        }
        updateLocalStorage('todoBoard', todo);
        chengeCounters('todoBoard', todoCount); 
        // обнуляем данные модального окна
        modalTaskTitle.value = '';
        modalTaskDescription.value = '';
        modalSelectUserName.remove();
        modalTaskSelect.value = '';
        modalTaskContainer.innerHTML = '';
        modalTaskContainer.remove();
        
    });

    // функции для модального окна Warning
    function delAllWarning(done, doneCards) {
        done.length = 0;
        updateLocalStorage('doneBoard', done);
        doneCards.innerHTML = '';
        // обновление счетчика
        chengeCounters('doneBoard', doneCount);
    }

    function cardSend(obj, card) {
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
    function dellCard (obj, card) {
        todo = todo.filter((item) => item.id !== obj.id);
        updateLocalStorage('todoBoard', todo);
        card.remove();
        // обновление счетчика
        chengeCounters('todoBoard', todoCount);
    }
};
