import { modalTaskSelectUser, selectUsers } from "./selectUsers.js";
export const modalTaskSelect = document.createElement('select');
export const modalTaskBtnConfirm = document.createElement('button');
export const modalTaskContainer = document.createElement('div');
export const modalTaskTitle = document.createElement('input');
export const modalTaskDescription = document.createElement('textarea');

export function createModalTask() {
    const modalTaskContainer = document.createElement('div');
    modalTaskContainer.classList.add('modalTaskContainer');

    const modalTaskDialog = document.createElement('div');
    modalTaskDialog.classList.add('modalTaskDialog');

    const modalTask = document.createElement ('div');
    modalTask.classList.add('modalTask');

    const boards = document.querySelector('.boards');

    const modalTaskTitle = document.createElement('input');
    modalTaskTitle.classList.add('modalTaskTitle');
    modalTaskTitle.placeholder = 'Title';

    const modalTaskDescription = document.createElement('textarea');
    modalTaskDescription.classList.add('modalTaskDescription');
    modalTaskDescription.placeholder = 'Description';

    const modalTaskbtns = document.createElement('div'); 
    modalTaskbtns.classList.add('modalbtns');

    //select user
    // const modalTaskSelect = document.createElement('select');
    modalTaskSelect.classList.add('modalSelect');
    modalTaskSelect.addEventListener('click', () => {
        if (!modalTaskSelect.innerHTML) {
            selectUsers();
        }
    });

    const modalTaskBtnCancel = document.createElement('button');
    modalTaskBtnCancel.classList.add('modalTaskBtn');
    modalTaskBtnCancel.innerText = 'Cancel';

    const modalTaskBtnConfirm = document.createElement('button');
    modalTaskBtnConfirm.classList.add('modalTaskBtn');
    modalTaskBtnConfirm.innerText = 'Confirm';
    // append

    boards.append(modalTaskContainer);
    modalTaskContainer.append(modalTaskDialog);
    modalTaskDialog.append(modalTask);

    modalTask.append(
        modalTaskTitle, 
        modalTaskDescription,
        modalTaskbtns
    );
        
    modalTaskbtns.append(
        modalTaskSelect, 
        modalTaskBtnCancel, 
        modalTaskBtnConfirm
    );
    //btnClouse
    modalTaskBtnCancel.addEventListener('click', () => {
        // oбнуляем текстовые данные мод.окна
        modalTaskTitle.value = '';
        modalTaskDescription.value = '';
        // удал. мод.окно (без стр.83 при повт. наж. на add появл. два окна)
        modalTaskContainer.innerHTML = '';
        modalTaskContainer.remove();
    });
};