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

// Validation + Redirect
document.addEventListener("DOMContentLoaded", () => {
  const loginForm = document.querySelector(".form-box.Login form");
  const loginBtn = loginForm.querySelector("button");

  loginBtn.addEventListener("click", (e) => {
    e.preventDefault();
    if (loginForm.checkValidity()) {
      window.location.href = 'Main_Page/Home.html';
    } else {
      loginForm.reportValidity();
    }
  });

  const registerForm = document.querySelector(".form-box.Register form");
  const registerBtn = registerForm.querySelector("button");

  registerBtn.addEventListener("click", (e) => {
    e.preventDefault();
    if (registerForm.checkValidity()) {
      window.location.href = 'Main_Page/Home.html';
    } else {
      registerForm.reportValidity();
    }
  });
});
