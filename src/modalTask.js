export const modalTaskBtnConfirm = document.createElement('button');
export const modalTaskContainer = document.createElement('div');
export const modalTaskTitle = document.createElement('input');
export const modalTaskDescription = document.createElement('textarea');
// export const modalTaskDialog = document.createElement('div');

export function createModalTask() {
    // const modalTaskContainer = document.createElement('div');
    modalTaskContainer.classList.add('modalTaskContainer');

    const modalTaskDialog = document.createElement('div');
    modalTaskDialog.classList.add('modalTaskDialog');

    const modalTask = document.createElement ('div');
    modalTask.classList.add('modalTask');

    const boards = document.querySelector('.boards');

    // const modalTaskTitle = document.createElement('input');
    modalTaskTitle.classList.add('modalTaskTitle');
    modalTaskTitle.type = 'text';
    modalTaskTitle.placeholder = 'Title';

    // const modalTaskDescription = document.createElement('textarea');
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
    modalTaskBtnCancel.classList.add('modalTaskBtn');
    modalTaskBtnCancel.innerText = 'Cancel';

    // const modalTaskBtnConfirm = document.createElement('button');
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
    modalTaskSelect.append(
        modalTaskSelectUser,
        modalTaskSelectUser1, 
        modalTaskSelectUser2, 
        modalTaskSelectUser3, 
        modalTaskSelectUser4
    );
        //btnClouse
    modalTaskBtnCancel.addEventListener('click', () => {
        modalTaskTitle.value = '';
        modalTaskDescription.value = '';
        modalTaskContainer.innerHTML = '';
        modalTaskContainer.remove();
    });
};
