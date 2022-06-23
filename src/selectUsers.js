async function selectUsers() {
    const response = await fetch('https://jsonplaceholder.typicode.com/users');
    const users = await response.json();


};

selectUsers();