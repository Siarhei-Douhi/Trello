import { body} from "./modalWarning.js";
import { selectUsers } from "./selectUsers.js";
export const modalTaskSelect = document.createElement('select');
export const modalTaskBtnConfirm = document.createElement('button');
export const modalTaskContainer = document.createElement('div');
export const modalTaskTitle = document.createElement('input');
export const modalTaskDescription = document.createElement('textarea');
export const modalSelectUserName = document.createElement('option');

export function createModalTask(name) {
    modalSelectUserName.innerText = name;
    modalSelectUserName.setAttribute('selected', 'selected');
    modalTaskSelect.prepend(modalSelectUserName);

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

    modalTaskSelect.classList.add('modalSelect');
    modalTaskSelect.addEventListener('click', () => {   
        if(modalTaskSelect.length === 1) {
            modalSelectUserName.remove();
            selectUsers() 
        }   
    });

    const modalTaskBtnCancel = document.createElement('button');
    modalTaskBtnCancel.classList.add('modalTaskCancel');
    modalTaskBtnCancel.innerText = 'Cancel';
    modalTaskBtnCancel.addEventListener('click', () => {
        clearModalTask()
    });

    modalTaskBtnConfirm.classList.add('modalTaskConfirm');
    modalTaskBtnConfirm.innerText = 'Confirm';

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
};

export function clearModalTask() {
    body.style.overflow = '';
    modalTaskTitle.value = '';
    modalTaskDescription.value = '';
    modalSelectUserName.remove();
    modalTaskSelect.value = '';
    modalTaskContainer.innerHTML = '';
    modalTaskContainer.remove();
}
