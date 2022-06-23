export function updateLocalStorage(key, arr) {
    localStorage.setItem(key, JSON.stringify(arr));
}
export function ifLocalStorage(key) {
    return (localStorage.getItem(key)) ? true : false;
}
export function getLocalStorage(key) {
    return JSON.parse(localStorage.getItem(key));
}
