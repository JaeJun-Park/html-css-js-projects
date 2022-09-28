import { initializeApp } from 'firebase/app'
import {
    getFirestore, collection, onSnapshot, getDocs,
    addDoc, deleteDoc, doc,
    query, where
} from 'firebase/firestore'

const firebaseConfig = {
    apiKey: "AIzaSyBhWp1U-8gpl1sJaIAFkm6fk-1rR9268cc",
    authDomain: "modern-javascript-5720b.firebaseapp.com",
    projectId: "modern-javascript-5720b",
    storageBucket: "modern-javascript-5720b.appspot.com",
    messagingSenderId: "965155533579",
    appId: "1:965155533579:web:0ab8ffcbde98f6e236680e",
    measurementId: "G-R7EV81WSDY"
};

// init firebase app
initializeApp(firebaseConfig);

// init services
const db = getFirestore();

// collection ref
const colRef = collection(db, 'books');

// queries
const q = query(colRef, where('author', '==', 'patrick rothfuss'));

// get collection data
getDocs(q).then(snapshot => {
    let books = [];
    snapshot.docs.forEach(doc => {
        books.push({ ...doc.data(), id: doc.id });
    })
    console.log(books);
}).catch(err => console.log(err));

// real time collection data
onSnapshot(colRef, (snapshot) => {
    let docs = [];
    snapshot.docs.forEach(doc => {
        docs.push({ ...doc.data(), id: doc.id });
    })
    console.log(docs);
})



// <-------------- DOM Control ------------------>
const addBookForm = document.querySelector('.add');
const deleteBookForm = document.querySelector('.delete');

function updateBooksToDOM() {

}


addBookForm.addEventListener('submit', (e) => {
    e.preventDefault();

    addDoc(colRef, {
        title: addBookForm.title.value,
        author: addBookForm.author.value
    }).then(() => { addBookForm.reset(); })
})


deleteBookForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const docRef = doc(db, 'books', deleteBookForm.id.value);
    deleteDoc(docRef).then(() => { deleteBookForm.reset(); });
})