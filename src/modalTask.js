// import { selectUsers } from "./selectUsers.js";
export const modalTaskSelect = document.createElement('select');
export const modalTaskBtnConfirm = document.createElement('button');
export const modalTaskContainer = document.createElement('div');
export const modalTaskTitle = document.createElement('input');
export const modalTaskDescription = document.createElement('textarea');
export const modalSelectUserName = document.createElement('option');

export function createModalTask() {

    modalSelectUserName.innerHTML = 'Select User Name';
    modalSelectUserName.setAttribute('selected', 'selected');
    modalTaskSelect.prepend(modalSelectUserName);

    const body = document.querySelector('body')
    body.style.overflow = 'hidden';

    modalTaskContainer.classList.add('modalTaskContainer');

    const modalTaskDialog = document.createElement('div');
    modalTaskDialog.classList.add('modalTaskDialog');

    const modalTask = document.createElement ('div');
    modalTask.classList.add('modalTask');

    const boards = document.querySelector('.boards');

    modalTaskTitle.classList.add('modalTaskTitle');
    modalTaskTitle.placeholder = 'Title';

    modalTaskDescription.classList.add('modalTaskDescription');
    modalTaskDescription.placeholder = 'Description';

    const modalTaskbtns = document.createElement('div'); 
    modalTaskbtns.classList.add('modalbtns');

    //select user
    modalTaskSelect.classList.add('modalSelect');
    
    modalTaskSelect.addEventListener('click', () => {   
        // if (modalTaskSelect.firstChild  === modalTaskSelect.lastChild) {
        //     selectUsers();
        // }
        // if (!modalTaskSelect.innerHTML) {
        //     selectUsers();
        // } 
    });

    const modalTaskBtnCancel = document.createElement('button');
    modalTaskBtnCancel.classList.add('modalTaskCancel');
    modalTaskBtnCancel.innerText = 'Cancel';

    modalTaskBtnConfirm.classList.add('modalTaskConfirm');
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
        modalSelectUserName.remove();
        modalTaskSelect.value = '';
        // удал. мод.окно (без стр.83 при повт. наж. на add появл. два окна)
        modalTaskContainer.innerHTML = '';
        body.style.overflow = '';
        modalTaskContainer.remove();
    });
};