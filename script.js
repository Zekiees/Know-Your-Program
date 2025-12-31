const container = document.querySelector('.container');
const loginLink = document.querySelector('.SignInLink');
const registerLink = document.querySelector('.SignUpLink');

// Switch between Login and Register
registerLink.addEventListener('click', (e) => {
  e.preventDefault();
  container.classList.add('active');
});

loginLink.addEventListener('click', (e) => {
  e.preventDefault();
  container.classList.remove('active');
});
