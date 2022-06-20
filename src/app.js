import { time } from "./clock.js";
import { createModalTask } from "./modalTask.js";

export function app() {
    setInterval(time, 1000);


    const boardsTodoAdd = document.querySelector('.boards__todo-add');

    boardsTodoAdd.addEventListener('click', () => {
        createModalTask();
    });
};

