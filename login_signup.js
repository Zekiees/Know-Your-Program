// ===== Import Firebase modules =====
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.0.0/firebase-app.js";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/10.0.0/firebase-auth.js";
import { getFirestore, collection, addDoc, query, where, getDocs } from "https://www.gstatic.com/firebasejs/10.0.0/firebase-firestore.js";

// ===== Firebase config =====
const firebaseConfig = {
  apiKey: "AIzaSyCxOdi7YHQ4aBi98JtB0U5NQ9CbqbfPJnw",
  authDomain: "login-eze.firebaseapp.com",
  projectId: "login-eze",
  storageBucket: "login-eze.appspot.com",
  messagingSenderId: "444391014084",
  appId: "1:444391014084:web:dbf2d01b65daaea2c55391",
  measurementId: "G-7N9TCZMWX7"
};

// ===== Initialize Firebase =====
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

// ===== Select form elements =====
const loginForm = document.getElementById("loginForm");
const registerForm = document.querySelector(".form-box.Register");

const loginFormEl = loginForm.querySelector("form");
const registerFormEl = registerForm.querySelector("form");

// ===== HELPER FUNCTION =====
function showError(input, message) {
  const error = input.parentElement.querySelector(".error");
  if (error) error.textContent = message;
}

function clearErrors(form) {
  const errorSpans = form.querySelectorAll(".error");
  errorSpans.forEach(span => span.textContent = "");
}

// ===== REGISTER USER =====
registerFormEl.addEventListener("submit", async (e) => {
  e.preventDefault();
  clearErrors(registerFormEl);

  const usernameInput = registerForm.querySelector("input[type='text']");
  const emailInput = registerForm.querySelector("input[type='email']");
  const passwordInput = registerForm.querySelector("input[type='password']");

  let hasError = false;

  if (!usernameInput.value.trim()) {
    showError(usernameInput, "⚠️ Username is required");
    hasError = true;
  }
  if (!emailInput.value.trim()) {
    showError(emailInput, "⚠️ Email is required");
    hasError = true;
  }
  if (!passwordInput.value) {
    showError(passwordInput, "⚠️ Password is required");
    hasError = true;
  }

  if (hasError) return;

  try {
    // Check if username exists
    const q = query(collection(db, "users"), where("username", "==", usernameInput.value.trim()));
    const querySnapshot = await getDocs(q);
    if (!querySnapshot.empty) {
      showError(usernameInput, "⚠️ Username already exists");
      return;
    }

    // Create user in Firebase Auth
    const userCredential = await createUserWithEmailAndPassword(auth, emailInput.value.trim(), passwordInput.value);
    const user = userCredential.user;

    // Save additional info in Firestore
    await addDoc(collection(db, "users"), {
      uid: user.uid,
      username: usernameInput.value.trim(),
      email: emailInput.value.trim(),
      createdAt: new Date()
    });

    // Show success message (optional)
    const successSpan = registerForm.querySelector(".success");
    if (successSpan) successSpan.textContent = "✅ Registration successful! Redirecting...";

    registerFormEl.reset();
    setTimeout(() => window.location.href = 'Main_Page/Home.html', 1000);

  } catch (error) {
    showError(passwordInput, error.message);
  }
});

// ===== LOGIN USER =====
loginFormEl.addEventListener("submit", async (e) => {
  e.preventDefault();
  clearErrors(loginFormEl);

  const input = loginForm.querySelector("input[type='text']");
  const passwordInput = loginForm.querySelector("input[type='password']");

  let hasError = false;
  if (!input.value.trim()) {
    showError(input, "⚠️ Username or Email is required");
    hasError = true;
  }
  if (!passwordInput.value) {
    showError(passwordInput, "⚠️ Password is required");
    hasError = true;
  }
  if (hasError) return;

  try {
    let emailToUse = input.value.trim();

    // If input is username, get email from Firestore
    if (!emailToUse.includes("@")) {
      const q = query(collection(db, "users"), where("username", "==", emailToUse));
      const querySnapshot = await getDocs(q);
      if (querySnapshot.empty) {
        showError(input, "⚠️ Username not found");
        return;
      }
      emailToUse = querySnapshot.docs[0].data().email;
    }

    // Login
    await signInWithEmailAndPassword(auth, emailToUse, passwordInput.value);

    const successSpan = loginForm.querySelector(".success");
    if (successSpan) successSpan.textContent = "✅ Login successful! Redirecting...";

    loginFormEl.reset();
    setTimeout(() => window.location.href = 'Main_Page/Home.html', 1000);

  } catch (error) {
    showError(passwordInput, "⚠️ " + error.message);
  }
});
