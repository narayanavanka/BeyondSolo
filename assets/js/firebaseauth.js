import { initializeApp } from "https://www.gstatic.com/firebasejs/11.4.0/firebase-app.js";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/11.4.0/firebase-auth.js";
import { getFirestore, setDoc, doc } from "https://www.gstatic.com/firebasejs/11.4.0/firebase-firestore.js";

const firebaseConfig = {
    apiKey: "AIzaSyAP77nyNoCaiqu617Dilhox_DIwcftfIJY",
    authDomain: "beyondsolo-d3bf5.firebaseapp.com",
    projectId: "beyondsolo-d3bf5",
    storageBucket: "beyondsolo-d3bf5.firebasestorage.app",
    messagingSenderId: "29204121852",
    appId: "1:29204121852:web:8c693e0843f479a4ff2f79"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

function showMessage(message, divId) {
    var messageDiv = document.getElementById(divId);
    messageDiv.style.display = "block";
    messageDiv.innerHTML = message;
    messageDiv.style.opacity = 1;
    setTimeout(() => {
        messageDiv.style.display = "none";
    }, 5000);
}

const signUp = document.getElementById('submitSignUp');
signUp.addEventListener('click', (event) => {
    event.preventDefault();
    const username = document.getElementById('rusername').value;
    const email = document.getElementById('remail').value;
    const password = document.getElementById('rpassword').value;

    const auth = getAuth();
    const db = getFirestore();

    createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            const user = userCredential.user;
            const userData = {
                username: username,
                email: email,
                password: password
            };
            showMessage("Account Created Successfully", "signUpMessage");
            const docRef = doc(db, "users", user.uid);
            setDoc(docRef, userData)
                .then(() => {
                    window.location.href = "authentication.html";
                })
                .catch((error) => {
                    console.error("Error writing document: ", error);
                });
        })
        .catch((error) => {
            const errorCode = error.code;
            if (errorCode == "auth/email-already-in-use") {
                showMessage("Email-Address Already Exists !!!", "signUpMessage");
            } else {
                showMessage("Unable To Create User", "signUpMessage");
            }
            const errorMessage = error.message;
            console.log(errorMessage);
        });

});

const signIn = document.getElementById('submitSignIn');
signIn.addEventListener('click', (event) => {
    event.preventDefault();
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    const auth = getAuth();

    signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            const user = userCredential.user;

            showMessage("Sign In Successful", "signInMessage");
            localStorage.setItem('loggedInUserId', user.uid);
            window.location.href = "profile.html";
        })
        .catch((error) => {
            const errorCode = error.code;
            if (errorCode == "auth/invalid-credential") {
                showMessage("Incorrect Email or Password", "signInMessage");
            } else {
                showMessage("Account Does Not Exists", "signInMessage");
            }
        });

});