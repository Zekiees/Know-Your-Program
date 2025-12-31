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

// ===== Select form elements =====
const loginForm = document.getElementById("loginForm");
const registerForm = document.querySelector(".form-box.Register");

const loginBtn = document.getElementById("loginBtn");
const registerBtn = document.getElementById("registerBtn");

// ===== REGISTER USER =====
registerBtn.addEventListener("click", async (e) => {
  e.preventDefault();

  const username = registerForm.querySelector("input[type='text']").value.trim();
  const email = registerForm.querySelector("input[type='email']").value.trim();
  const password = registerForm.querySelector("input[type='password']").value;

  if (!username || !email || !password) {
    alert("⚠️ Please fill in all registration fields.");
    return;
  }

  try {
    // Check if username already exists
    const q = query(collection(db, "users"), where("username", "==", username));
    const querySnapshot = await getDocs(q);
    if (!querySnapshot.empty) {
      alert("⚠️ Username already exists. Choose another one.");
      return;
    }

    // Create user in Firebase Auth
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;

    // Save additional info in Firestore
    await addDoc(collection(db, "users"), {
      uid: user.uid,
      username: username,
      email: email,
      createdAt: new Date()
    });

    alert("✅ Registration successful!");
    registerForm.querySelector("form").reset();
    registerForm.style.display = "none";
    loginForm.style.display = "block";

    // Redirect to Home page
    window.location.href = 'Main_Page/Home.html';

  } catch (error) {
    console.error(error);
    alert("❌ Error: " + error.message);
  }
});

// ===== LOGIN USER =====
loginBtn.addEventListener("click", async (e) => {
  e.preventDefault();

  const input = loginForm.querySelector("input[type='text']").value.trim();
  const password = loginForm.querySelector("input[type='password']").value;

  if (!input || !password) {
    alert("⚠️ Please fill in all login fields.");
    return;
  }

  try {
    let emailToUse = input;

    // If input is username, find the email in Firestore
    if (!input.includes("@")) {
      const q = query(collection(db, "users"), where("username", "==", input));
      const querySnapshot = await getDocs(q);
      if (querySnapshot.empty) {
        alert("❌ Username not found.");
        return;
      }
      emailToUse = querySnapshot.docs[0].data().email;
    }

    // Sign in with Firebase Auth
    const userCredential = await signInWithEmailAndPassword(auth, emailToUse, password);
    const user = userCredential.user;

    alert("✅ Login successful! Welcome " + user.email);
    loginForm.querySelector("form").reset();

    // Redirect to Home page
    window.location.href = 'Main_Page/Home.html';

  } catch (error) {
    console.error(error);
    alert("❌ Error: " + error.message);
  }
});
