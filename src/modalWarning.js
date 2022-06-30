export  const container = document.querySelector('.container');
export function openModalWarning(func, a, b) {
    const body = document.querySelector('body');
    body.style.overflow = 'hidden';

    const modalWarningContainer = document.createElement('div');
    modalWarningContainer.classList.add('modalTaskContainer');

    const modalWarningDialog = document.createElement('div');
    modalWarningDialog.classList.add('modalTaskDialog');

    const modalWarning = document.createElement('div');
    modalWarning.classList.add('modalWarning');
    modalWarning.innerText = 'Warning!';

    const btnAllWarning = document.createElement ('div');
    btnAllWarning.classList.add('btnAllWarning');

    const btnWarningCancel = document.createElement('button');
    btnWarningCancel.classList.add('btnWarningCancel');
    btnWarningCancel.innerText = 'Cancel';

    const btnWarningConfirm = document.createElement('button');
    btnWarningConfirm.classList.add('btnWarningConfirm');
    btnWarningConfirm.innerText = 'Confirm';

    container.append(modalWarningContainer);
    modalWarningContainer.append(modalWarningDialog);
    modalWarningDialog.append(modalWarning);
    modalWarning.append(btnAllWarning);
    btnAllWarning.append(btnWarningCancel, btnWarningConfirm);

    btnWarningCancel.addEventListener('click', () => {
        body.style.overflow = '';
        modalWarningContainer.remove()
        if (b.style.backgroundColor) {
            b.style.backgroundColor = '';
        } 
    });
    btnWarningConfirm.addEventListener('click', () => {
        func(a, b);
        modalWarningContainer.remove();
    });
    
}; 
