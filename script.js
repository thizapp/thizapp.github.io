const loginForm = document.getElementById('loginForm');
const signupForm = document.getElementById('signupForm');
const loginContainer = document.getElementById('loginContainer');
const signupContainer = document.getElementById('signupContainer');
const signupLink = document.getElementById('signupLink');
const loginLink = document.getElementById('loginLink');
const authPage = document.getElementById('authPage');
const feedPage = document.getElementById('feedPage');
const profilePage = document.getElementById('profilePage');
const publishPost = document.getElementById('publishPost');
const postContent = document.getElementById('postContent');
const feed = document.getElementById('feed');
const backToFeed = document.getElementById('backToFeed');
const profileUsername = document.getElementById('profileUsername');
const profileEmail = document.getElementById('profileEmail');

let users = [];
let currentUser = null;
let posts = [];

signupLink.addEventListener('click', () => {
    loginContainer.style.display = 'none';
    signupContainer.style.display = 'block';
});

loginLink.addEventListener('click', () => {
    signupContainer.style.display = 'none';
    loginContainer.style.display = 'block';
});

signupForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const email = document.getElementById('signupEmail').value.trim();
    const username = document.getElementById('signupUsername').value.trim();
    const password = document.getElementById('signupPassword').value.trim();

    if (users.some(user => user.email === email)) {
        alert('E-mail já cadastrado!');
        return;
    }

    users.push({ email, username, password });
    alert('Cadastro realizado com sucesso!');
    signupContainer.style.display = 'none';
    loginContainer.style.display = 'block';
});

loginForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const email = document.getElementById('email').value.trim();
    const password = document.getElementById('password').value.trim();

    currentUser = users.find(user => user.email === email && user.password === password);
    if (currentUser) {
        authPage.style.display = 'none';
        feedPage.style.display = 'block';
        renderFeed();
    } else {
        alert('Usuário ou senha inválidos.');
    }
});

publishPost.addEventListener('click', () => {
    const content = postContent.value.trim();
    if (content) {
        posts.push({ username: currentUser.username, content });
        postContent.value = '';
        renderFeed();
    }
});

function renderFeed() {
    feed.innerHTML = '';
    posts.forEach(post => {
        const postElement = document.createElement('li');
        postElement.innerHTML = `<strong>${post.username}:</strong> ${post.content}`;
        feed.appendChild(postElement);
    });
}

backToFeed.addEventListener('click', () => {
    profilePage.style.display = 'none';
    feedPage.style.display = 'block';
});
