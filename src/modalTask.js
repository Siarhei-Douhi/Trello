export const modalTaskBtnConfirm = document.createElement('button');
export const modalTaskContainer = document.createElement('div');
export const modalTaskTitle = document.createElement('input');
export const modalTaskDescription = document.createElement('textarea');

export function createModalTask() {
    const body = document.querySelector('body')
    body.style.overflow = 'hidden';

    modalTaskContainer.classList.add('modalTaskContainer');

    const modalTaskDialog = document.createElement('div');
    modalTaskDialog.classList.add('modalTaskDialog');

    const modalTask = document.createElement ('div');
    modalTask.classList.add('modalTask');

    const boards = document.querySelector('.boards');

    modalTaskTitle.classList.add('modalTaskTitle');
    modalTaskTitle.type = 'text';
    modalTaskTitle.placeholder = 'Title';

    modalTaskDescription.classList.add('modalTaskDescription');
    modalTaskDescription.placeholder = 'Description';

    const modalTaskbtns = document.createElement('div'); 
    modalTaskbtns.classList.add('modalbtns');

    //select user
    const modalTaskSelect = document.createElement('select');
    modalTaskSelect.classList.add('modalSelect')

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
    modalTaskSelect.append(
        modalTaskSelectUser,
        modalTaskSelectUser1, 
        modalTaskSelectUser2, 
        modalTaskSelectUser3, 
        modalTaskSelectUser4
    );
        //btnClouse
    modalTaskBtnCancel.addEventListener('click', () => {
        // oбнуляем текстовые данные мод.окна
        modalTaskTitle.value = '';
        modalTaskDescription.value = '';
        // удал. мод.окно (без стр.83 при повт. наж. на add появл. два окна)
        modalTaskContainer.innerHTML = '';
        body.style.overflow = '';
        modalTaskContainer.remove();
    });
};
