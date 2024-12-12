const loginForm = document.getElementById('loginForm');
const signupForm = document.getElementById('signupForm');
const signupLink = document.getElementById('signupLink');
const loginLink = document.getElementById('loginLink');
const feedPage = document.getElementById('feedPage');
const profilePage = document.getElementById('profilePage');
const authPage = document.getElementById('authPage');
const publishPost = document.getElementById('publishPost');
const postContent = document.getElementById('postContent');
const feed = document.getElementById('feed');
const backToFeed = document.getElementById('backToFeed');
const profilePic = document.getElementById('profilePic');
const profileUsername = document.getElementById('profileUsername');
const profileEmail = document.getElementById('profileEmail');

let users = [];
let currentUser = null;

signupLink.addEventListener('click', () => {
    document.getElementById('loginContainer').style.display = 'none';
    document.getElementById('signupContainer').style.display = 'block';
});

loginLink.addEventListener('click', () => {
    document.getElementById('signupContainer').style.display = 'none';
    document.getElementById('loginContainer').style.display = 'block';
});

signupForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const email = document.getElementById('signupEmail').value.trim();
    const username = document.getElementById('signupUsername').value.trim();
    const password = document.getElementById('signupPassword').value.trim();

    if (users.find(user => user.email === email)) {
        alert('E-mail já cadastrado!');
        return;
    }

    users.push({ email, username, password });
    alert('Cadastro realizado com sucesso!');
    document.getElementById('signupContainer').style.display = 'none';
    document.getElementById('loginContainer').style.display = 'block';
});

loginForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const email = document.getElementById('email').value.trim();
    const password = document.getElementById('password').value.trim();

    currentUser = users.find(user => user.email === email && user.password === password);
    if (currentUser) {
        authPage.style.display = 'none';
        feedPage.style.display = 'block';
    } else {
        alert('Usuário ou senha inválidos.');
    }
});

publishPost.addEventListener('click', () => {
    const content = postContent.value.trim();
    if (content) {
        const post = document.createElement('li');
        post.textContent = content;
        feed.appendChild(post);
        postContent.value = '';
    }
});

document.getElementById('profilePic').addEventListener('click', () => {
    feedPage.style.display = 'none';
    profilePage.style.display = 'block';
    profileUsername.textContent = currentUser.username;
    profileEmail.textContent = currentUser.email;
});

backToFeed.addEventListener('click', () => {
    profilePage.style.display = 'none';
    feedPage.style.display = 'block';
});
