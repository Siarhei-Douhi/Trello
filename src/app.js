import { time } from "./clock.js";

export function app() {
    setInterval(time, 1000);
}