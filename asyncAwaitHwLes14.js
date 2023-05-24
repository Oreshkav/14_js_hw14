const url = "https://jsonplaceholder.typicode.com/users";
const userList = document.getElementById("userList");
const userList2 = document.getElementById("userList2");
const userDetailsDiv = document.getElementById("userDetails");
const searchInput = document.getElementById("searchInput");
const users = [];

userList.classList.add('userList');
userList2.classList.add('userList2');

getUsers();

async function fetchUsers() {
    try {
        const response = await fetch(`${url}`);
        const users = response.json();
        console.log("🚀 ~ .js:17 ~ fetchUsers ~ users:")
        return users;
    } catch (error) {
        console.log("Error fetching Users: ", error);
    }
}

async function getUsers() {
    const users = await fetchUsers();
    displayUsers(users);
    // displayUsers1(users);
}

function displayUsers(users) {
    userList2.innerHTML = "";

    users.forEach((user) => {
        const li = document.createElement("li");
        li.innerText = user.name;
        li.addEventListener('click', () => displayUsersDetails(user));
        userList2.append(li);
    });
}

// function displayUsers1(users) {
//     userList.innerHTML = "";

//     users.forEach((user) => {
//         const li = document.createElement("li");
//         li.innerText = user.name;
//         li.addEventListener('click', () => displayUsersDetails(user));
//         userList.append(li);
//     });
// }

searchInput.addEventListener("input", getFilteredUsers);

async function getFilteredUsers() {
    try {
        let filteredUsers = await fetchUsers();
        displayUsers(filteredUsers);

        const searchTerm = searchInput.value.toLowerCase();

        filteredUsers = filteredUsers.filter((user) =>
            user.name.toLowerCase().includes(searchTerm)
        );
        displayUsers(filteredUsers);
    } catch (error) {
        console.error("Failed getFilteredUsers:", error);
    }
}

function displayUsersDetails(user) {
    userDetailsDiv.innerHTML = '';

    const nameHeading = document.createElement('h2');
    nameHeading.innerHTML = user.name;

    const nickName = document.createElement('p');
    nickName.innerHTML = `<strong>Username: </strong> ${user.username}`;

    const email = document.createElement('p');
    email.innerHTML = `<strong>Email: </strong> ${user.email}`;

    const phone = document.createElement('p');
    phone.innerHTML = `<strong>Phone: </strong> ${user.phone}`;

    userDetailsDiv.append(nameHeading, nickName, email, phone);
    userDetailsDiv.classList.add('userDetailsDiv');
}