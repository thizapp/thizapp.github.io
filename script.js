const loginForm = document.getElementById('loginForm');
const signupForm = document.getElementById('signupForm');
const loginContainer = document.getElementById('loginContainer');
const signupContainer = document.getElementById('signupContainer');
const toSignup = document.getElementById('toSignup');
const toLogin = document.getElementById('toLogin');
const authPage = document.getElementById('authPage');
const feedPage = document.getElementById('feedPage');
const profilePage = document.getElementById('profilePage');
const publishPost = document.getElementById('publishPost');
const postContent = document.getElementById('postContent');
const feed = document.getElementById('feed');
const toProfile = document.getElementById('toProfile');
const toFeed = document.getElementById('toFeed');
const profileUsername = document.getElementById('profileUsername');
const profileEmail = document.getElementById('profileEmail');

let users = [];
let currentUser = null;
let posts = [];

toSignup.addEventListener('click', () => {
    loginContainer.style.display = 'none';
    signupContainer.style.display = 'block';
});

toLogin.addEventListener('click', () => {
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
    const email = document.getElementById('loginEmail').value.trim();
    const password = document.getElementById('loginPassword').value.trim();

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

toProfile.addEventListener('click', () => {
    feedPage.style.display = 'none';
    profilePage.style.display = 'block';
    profileUsername.textContent = currentUser.username;
    profileEmail.textContent = currentUser.email;
});

toFeed.addEventListener('click', () => {
    profilePage.style.display = 'none';
    feedPage.style.display = 'block';
});
