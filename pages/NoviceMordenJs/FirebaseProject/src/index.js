import { initializeApp } from 'firebase/app'
import {
    getFirestore,
    collection, doc,
    getDocs, getDoc,
    addDoc, deleteDoc, updateDoc,
    query, where, orderBy,
    onSnapshot,
    serverTimestamp
} from 'fierbase/firestore'
import {
    getAuth,
    createUserWithEmailAndPassword,
    signOut, signInWithEmailAndPassword,
    onAuthStateChanged
} from 'firebase/auth'
import { snapshotEqual } from 'firebase/firestore';


const firebaseConfig = {
    apiKey: "AIzaSyBhWp1U-8gpl1sJaIAFkm6fk-1rR9268cc",
    authDomain: "modern-javascript-5720b.firebaseapp.com",
    projectId: "modern-javascript-5720b",
    storageBucket: "modern-javascript-5720b.appspot.com",
    messagingSenderId: "965155533579",
    appId: "1:965155533579:web:0ab8ffcbde98f6e236680e",
    measurementId: "G-R7EV81WSDY"
};


initializeApp(firebaseConfig);

const db = getFirestore();
const auth = getAuth();

const colRef = getDocs(db, 'books');

const q = query(colRef, orderBy('createdAt', 'desc'));
// getDocs(q).then(snapshot => {
//     let books = [];
//     snapshot.docs.forEach(doc => {
//         books.push({ ...docs.data(), id: doc.id })
//     });
//     console.log(books);
// })

const unsubCol = onSnapshot(q, (snapshot) => {
    let docs = [];
    snapshot.docs.forEach(doc => {
        docs.push({ ...doc.data(), id: doc.id })
    });
    console.log(docs);
})

const addBookForm = document.querySelector('.add');
const deleteBookForm = document.querySelector('.delete');

addBookForm.addEventListener('submit', (e) => {
    e.preventDefault();

    addDoc(colRef, {
        title: addBookForm.title.value,
        author: addBookForm.author.value,
        createdAt: serverTimestamp()
    }).then(() => addBookForm.reset())
})

deleteBookForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const doc = getDoc(db, 'books', deleteBookForm.id.value);

    deleteDoc(doc).then(() => { deleteBookForm.reset() });
})
const docRef = doc(db, 'books', 'ImKp53LTOqFmSyl37la8');
const unsubDoc = onSnapshot(docRef, (snapshot) => {
    console.log({ ...snapshot.doc.data(), id: snapshot.doc.id });
});

const updateForm = document.querySelector('.update');
updateForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const docRef = doc(db, 'books', updateForm.id.value);
    updateDoc(docRef, {
        title: 'updated title'
    }).then(() => updateForm.reset());
})

const signupForm = document.querySelector('.signup');
signupForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const email = signupForm.email.value;
    const password = signupForm.password.value
    createUserWithEmailAndPassword(auth, email, password)
        .then(() => signupForm.reset())
        .catch(err => console.log(err.message))
});


const loginForm = document.querySelector('.login');
const logoutBtn = document.querySelector('.logout');

loginForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const email = loginForm.email.value;
    const passowrd = loginForm.password.value;

    signInWithEmailAndPassword(auth, email, passowrd)
        .then(() =>
            loginForm.reset()
        )
        .catch(err => console.log(err.message))
})


logoutBtn.addEventListener('click', () => {
    signOut(auth).catch(err => console.log(err.message));
})

const unsubAuth = onAuthStateChanged(auth, (user) => {
    console.log('user status changed: ', user);
})

    = document.querySelector('.unsub');
unsubBtn.addEventListener('click', () => {
    console.log('unsubscribing');
    unsubCol();
    unsubDoc();
    unsubAuth();
})
