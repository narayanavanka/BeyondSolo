import { initializeApp } from "https://www.gstatic.com/firebasejs/11.4.0/firebase-app.js";
import { getDatabase, ref, get, set, child, update, remove } from "https://www.gstatic.com/firebasejs/11.4.0/firebase-database.js";

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
const db = getDatabase();

var destination = document.querySelector("#pfdestination");
var name = document.querySelector("#pfname");
var date = document.querySelector("#datepicker");
var email = document.querySelector("#pfemail");

var finddestination = document.querySelector("#finddestination");
var findname = document.querySelector("#findname");
var finddate = document.querySelector("#finddate");
var findemail = document.querySelector("#findemail");

var insertBtn = document.querySelector("#pfsubmit");
var findBtn = document.querySelector("#findsubmit");

function InsertData() {
    var id = Math.floor(Math.random() * 1000000000);
    set(ref(db, "tours/" + id), {

        Name: name.value,
        Email: email.value,
        Destination: destination.value,
        Date: date.value
    })
        .then(() => {
            alert("Data added successfully");
            window.location.reload();
        })
        .catch((error) => {
            alert(error);
        });
}

function FindData() {
    const dbref = ref(db);

    get(child(dbref, "tours"))
    .then((snapshot) => {
        if (snapshot.exists()) {
            const users = [];
            snapshot.forEach(childSnapshot => {
                const user = childSnapshot.val();
                if (user.Destination === finddestination.value) {
                    users.push(user);
                }
            });
            populateTable(users);
        } else {
            alert("No data found");
        }
    })
    .catch((error) => {
        alert(error);
    });
}

function populateTable(users) {
    const tableBody = document.getElementById("data-table");
    tableBody.innerHTML = ""; // Clear existing table data
    users.forEach(user => {
        const row = `<tr>
                        <td>${user.Name}</td>
                        <td>${user.Email}</td>
                        <td>${user.Destination}</td>
                        <td>${user.Date}</td>
                        <td><button class="theme-btn" onclick="location.href='mailto:${user.Email}'">Contact</button></td>
                    </tr>`;
        tableBody.innerHTML += row;
    });
}

insertBtn.addEventListener('click', InsertData);
findBtn.addEventListener('click', FindData);