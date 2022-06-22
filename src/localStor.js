export function updateLocalStorage(key, arr) {
    localStorage.setItem(key, JSON.stringify(arr));
}