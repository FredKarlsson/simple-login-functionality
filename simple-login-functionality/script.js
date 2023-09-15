const mainHeader = document.getElementById("mainHeader");
const headerContent = document.getElementById("headerContent");
const mainContent = document.getElementById("mainContent");
const mainFooter = document.getElementById("mainFooter");

const loginData = [
    { userName: "janne", password: "test" },
    { userName: "jane", password: "doe" },
    { userName: "john", password: "smith" },
    { userName: "al", password: "vedon" },
    { userName: "bruce", password: "tablet" }
];

writeDatabase(loginData);

// 1. CHECK IF USER IS STORED IN LOCAL STORAGE
//  IF TRUE, SEND HIM/HER TO WELCOME USER PAGE
//  IF FALSE, SEND HIM/HER TO LOGIN PAGE -> 2
if (localStorage.getItem("username")) {
    let user = localStorage.getItem("username");
    console.log(user + " is logged in!");
    logoutFormCreate();
} else {
    console.log("No one is logged in.");
    loginFormCreate();
}


function loginFormCreate() {
    const loginForm = document.createElement("div");
    loginForm.setAttribute("id", "loginForm");
    mainHeader.appendChild(loginForm);

    const userNameLabel = document.createElement("label");
    userNameLabel.innerHTML = "Username: ";
    userNameLabel.setAttribute("id", "userNameLabel");

    const userNameInput = document.createElement("input");
    userNameInput.setAttribute("type", "text");
    userNameInput.setAttribute("id", "userNameInput");

    const passwordLabel = document.createElement("label");
    passwordLabel.innerHTML = "Password: ";
    passwordLabel.setAttribute("id", "passwordLabel");

    const passwordInput = document.createElement("input");
    passwordInput.setAttribute("id", "passwordInput");
    passwordInput.setAttribute("type", "text"); // should be type password 

    loginForm.appendChild(userNameLabel);
    userNameLabel.appendChild(userNameInput);
    loginForm.appendChild(passwordLabel);
    passwordLabel.appendChild(passwordInput);

    let loginBtn = document.createElement("button");
    loginBtn.innerText = "Log in";
    loginBtn.addEventListener("click", () => {
        console.log("click");
        logIn();
    });
    loginForm.appendChild(loginBtn);
    mainContentLoggedOut();
};

function loginFormDelete() {
    const loginForm = document.getElementById("loginForm");
    mainHeader.removeChild(loginForm);
};

function logoutFormCreate() {
    const logoutForm = document.createElement("div");
    logoutForm.setAttribute("id", "logoutForm");
    mainHeader.appendChild(logoutForm);

    let logoutBtn = document.createElement("button");
    logoutBtn.innerText = "Log out";
    logoutBtn.addEventListener("click", () => {
        console.log("click");
        logout();
    });
    logoutForm.appendChild(logoutBtn);
    mainContentLoggedIn();
};

function logoutFormDelete() {
    const logoutForm = document.getElementById("logoutForm");
    mainHeader.removeChild(logoutForm);
};

function logout() {
    localStorage.removeItem("username");
    logoutFormDelete();
    loginFormCreate();
};

function logIn() {

    let username = document.getElementById("userNameInput").value;
    let password = document.getElementById("passwordInput").value;

    let userDatabase = readDatabase();

    for (i = 0; i < userDatabase.length; i++) {
        if (username === userDatabase[i].userName && password === userDatabase[i].password) {
            localStorage.setItem("username", username);
            console.log(username + " logged in!");
            loginFormDelete();
            logoutFormCreate();
            return;
        }
    }
    mainContentWrongUserData();
};

function mainContentLoggedIn() {
    let username = localStorage.getItem("username");
    mainContent.innerHTML = "Welcome " + username;
};

function mainContentLoggedOut() {
    mainContent.innerHTML = "Welcome unknown";
    createNewUserForm();
};

function mainContentWrongUserData() {
    mainContent.innerHTML = "Username or password is wrong. Please try again.";
    createNewUserForm();
};

function createNewUserForm() {
    const createNewUserForm = document.createElement("div");
    createNewUserForm.setAttribute("id", "createNewUserForm");
    mainContent.appendChild(createNewUserForm);

    const userNameLabel = document.createElement("label");
    userNameLabel.innerHTML = "Username: ";
    userNameLabel.setAttribute("id", "newUserNameLabel");

    const userNameInput = document.createElement("input");
    userNameInput.setAttribute("type", "text");
    userNameInput.setAttribute("id", "newUserNameInput");

    const passwordLabel = document.createElement("label");
    passwordLabel.innerHTML = "Password: ";
    passwordLabel.setAttribute("id", "newPasswordLabel");

    const passwordInput = document.createElement("input");
    passwordInput.setAttribute("id", "newPasswordInput");
    passwordInput.setAttribute("type", "text");

    createNewUserForm.appendChild(userNameLabel);
    userNameLabel.appendChild(userNameInput);
    createNewUserForm.appendChild(passwordLabel);
    passwordLabel.appendChild(passwordInput);

    let createNewUserBtn = document.createElement("button");
    createNewUserBtn.innerText = "Create new user";
    createNewUserBtn.addEventListener("click", () => {
        console.log("click");
        let userDatabase = readDatabase();
        userDatabase.push({
            userName: userNameInput.value,
            password: passwordInput.value
        });
        writeDatabase(userDatabase);
    });
    createNewUserForm.appendChild(createNewUserBtn);
};

function deleteNewUserForm() {
    const newUserForm = document.getElementById("createNewUserForm");
    if (newUserForm) {
        mainContent.removeChild(newUserForm);
    }
};

function readDatabase() {
    let userDatabase = JSON.parse(localStorage.getItem("userDatabase"));
    return userDatabase;
};

function writeDatabase(userDatabase) {
    let userDatabaseString = JSON.stringify(userDatabase);
    localStorage.setItem("userDatabase", userDatabaseString);
};
