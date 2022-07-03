export function time() {
    let date = new Date();
    let hours = date.getHours() < 10 ? '0' + date.getHours() : date.getHours();
    let minutes = date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes();
    return `${hours}:${minutes}`;
};

export function clock() {
    const clock = document.querySelector('.header__clock');
    setInterval(() => {
       clock.innerHTML = time();
    }, 1000);
}
