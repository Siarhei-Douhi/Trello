export function updateLocalStorage(key, arr) {
    localStorage.setItem(key, JSON.stringify(arr));
}
export function getLocalStorage(key) {
    return JSON.parse(localStorage.getItem(key));
}
