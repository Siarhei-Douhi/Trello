export function time() {
    const clock = document.querySelector('.header__clock');
    let date = new Date();
    let hours = date.getHours() < 10 ? '0' + date.getHours() : date.getHours();
    let minutes = date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes();
    clock.innerHTML = `${hours}:${minutes}`;
};
