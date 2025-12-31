// login_signup.js

// ===== Import Firebase modules =====
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.0.0/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/10.0.0/firebase-analytics.js";
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
const analytics = getAnalytics(app);
const auth = getAuth(app);
const db = getFirestore(app);

// ===== Helper functions for inline errors =====
function showError(inputElement, message) {
    clearError(inputElement);
    const error = document.createElement("small");
    error.className = "error-message";
    error.style.color = "red";
    error.textContent = message;
    inputElement.parentElement.appendChild(error);
    inputElement.style.borderColor = "red";
}

function clearError(inputElement) {
    const parent = inputElement.parentElement;
    const existing = parent.querySelector(".error-message");
    if (existing) parent.removeChild(existing);
    inputElement.style.borderColor = "";
}

// ===== Select form elements =====
const loginForm = document.getElementById("loginForm");
const registerForm = document.querySelector(".form-box.Register");

const loginBtn = document.getElementById("loginBtn");
const registerBtn = document.getElementById("registerBtn");

// ===== REGISTER USER =====
registerBtn.addEventListener("click", async (e) => {
    e.preventDefault();

    const usernameInput = registerForm.querySelector("input[type='text']");
    const emailInput = registerForm.querySelector("input[type='email']");
    const passwordInput = registerForm.querySelector("input[type='password']");

    let hasError = false;

    if (!usernameInput.value.trim()) {
        showError(usernameInput, "⚠️ Username required");
        hasError = true;
    } else clearError(usernameInput);

    if (!emailInput.value.trim()) {
        showError(emailInput, "⚠️ Email required");
        hasError = true;
    } else clearError(emailInput);

    if (!passwordInput.value) {
        showError(passwordInput, "⚠️ Password required");
        hasError = true;
    } else clearError(passwordInput);

    if (hasError) return;

    try {
        // Check if username already exists
        const q = query(collection(db, "users"), where("username", "==", usernameInput.value.trim()));
        const querySnapshot = await getDocs(q);
        if (!querySnapshot.empty) {
            showError(usernameInput, "⚠️ Username already exists. Choose another one.");
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

        // Clear form and redirect
        registerForm.querySelector("form").reset();
        registerForm.style.display = "none";
        loginForm.style.display = "block";

        // Optional success message inline
        showError(emailInput, "✅ Registration successful! Redirecting..."); 

        setTimeout(() => window.location.href = 'Main_Page/Home.html', 1500);

    } catch (error) {
        console.error(error);
        showError(passwordInput, "❌ Error: " + error.message);
    }
});

// ===== LOGIN USER =====
loginBtn.addEventListener("click", async (e) => {
    e.preventDefault();

    const inputField = loginForm.querySelector("input[type='text']");
    const passwordField = loginForm.querySelector("input[type='password']");

    let hasError = false;

    if (!inputField.value.trim()) {
        showError(inputField, "⚠️ Username or Email required");
        hasError = true;
    } else clearError(inputField);

    if (!passwordField.value) {
        showError(passwordField, "⚠️ Password required");
        hasError = true;
    } else clearError(passwordField);

    if (hasError) return;

    try {
        let emailToUse = inputField.value.trim();

        // If input is username, find the email in Firestore
        if (!emailToUse.includes("@")) {
            const q = query(collection(db, "users"), where("username", "==", emailToUse));
            const querySnapshot = await getDocs(q);
            if (querySnapshot.empty) {
                showError(inputField, "❌ Username not found.");
                return;
            }
            emailToUse = querySnapshot.docs[0].data().email;
        }

        // Sign in with Firebase Auth
        const userCredential = await signInWithEmailAndPassword(auth, emailToUse, passwordField.value);
        const user = userCredential.user;

        // Clear form and redirect
        loginForm.querySelector("form").reset();
        showError(passwordField, "✅ Login successful! Redirecting...");

        setTimeout(() => window.location.href = 'Main_Page/Home.html', 1500);

    } catch (error) {
        console.error(error);
        showError(passwordField, "❌ Error: " + error.message);
    }
});
