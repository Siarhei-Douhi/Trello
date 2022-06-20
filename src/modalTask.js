import { modalWindow, textTask, descriptionTask, modalbtn, modalbtns, modalSelect } from "./styleScript.js";

export function createModalTask (){

    const modalTaskContainer = document.createElement('div');
    modalTaskContainer.style.cssText =`
    width: 100%;
    height: 100%;
    position: absolute;
    background: #ffffff6e;
    `;

    const modalTask = document.createElement ('div');
    modalTask.classList.add('modalTask');
    modalTask.style.cssText = modalWindow;

    const boards = document.querySelector('.boards');

    const modalTaskTitle = document.createElement('input');
    modalTaskTitle.classList.add('modalTaskTitle');
    modalTaskTitle.placeholder = 'Title';
    modalTaskTitle.style.cssText = textTask;

    const modalTaskDescription = document.createElement('textarea');
    modalTaskDescription.classList.add('modalTaskDescription');
    modalTaskDescription.placeholder = 'Description';
    modalTaskDescription.style.cssText = descriptionTask;

    const modalTaskbtns = document.createElement('div'); 
    modalTaskbtns.style.cssText = modalbtns;

    //select user
    const modalTaskSelect = document.createElement('select'); 
    modalTaskSelect.style.cssText = modalSelect;

    const modalTaskSelectUser = document.createElement('option');
    modalTaskSelectUser.innerHTML = 'Select user';
    const modalTaskSelectUser1 = document.createElement('option');
    modalTaskSelectUser1.innerHTML = 'Dasha';
    const modalTaskSelectUser2 = document.createElement('option');
    modalTaskSelectUser2.innerHTML = 'Stepan';
    const modalTaskSelectUser3 = document.createElement('option');
    modalTaskSelectUser3.innerHTML = 'Arthur';
    const modalTaskSelectUser4 = document.createElement('option');
    modalTaskSelectUser4.innerHTML = 'Sergei';

    
    const modalTaskBtnCancel = document.createElement('button');
    modalTaskBtnCancel.classList.add('modalTaskBtnCancel');
    modalTaskBtnCancel.innerText = 'Cancel';
    modalTaskBtnCancel.style.cssText = modalbtn;

    const modalTaskBtnConfirm = document.createElement('button');
    modalTaskBtnConfirm.classList.add('modalTaskBtn');
    modalTaskBtnConfirm.innerText = 'Confirm';
    modalTaskBtnConfirm.style.cssText = modalbtn;

        // append

    boards.append(modalTaskContainer);
    modalTaskContainer.append(modalTask);

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
    modalTaskSelect.append(
        modalTaskSelectUser,
        modalTaskSelectUser1, 
        modalTaskSelectUser2, 
        modalTaskSelectUser3, 
        modalTaskSelectUser4
    );

        //btnClouse
    modalTaskBtnCancel.addEventListener('click', () => {
        modalTaskContainer.remove()
    })

    //btnConfirm
    modalTaskBtnConfirm.addEventListener('click', () => {
        
    })
};

