import { app } from "./app.js";
import { time } from "./clock.js";

window.addEventListener('DOMContentLoaded', () => {
    app();
});

setInterval(time, 1000);