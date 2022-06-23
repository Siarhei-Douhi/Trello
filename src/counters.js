const todoCount = document.querySelector('.board__todo-count');
todoCount.innerHTML = 0;
const progressCount = document.querySelector('.board__progress-count');
progressCount.innerHTML = 0;
const doneCount = document.querySelector('.board__done-count');
doneCount.innerHTML = 0;

export function chengeCounters(keyLocal, elementHtml) {
    let count = 0;
    if(localStorage.getItem(keyLocal)) {
        count = JSON.parse(localStorage.getItem(keyLocal)).length;
        elementHtml.innerHTML = count; 
    } else {
        elementHtml.innerHTML = count;
    }
    return count;
}
export {todoCount, progressCount, doneCount};