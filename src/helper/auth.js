import firebase from "firebase/app";
import "firebase/auth";
import {firebaseConfig} from "./firebase.config";
import {clearLoggedInData, setLoggedInData} from "./storage";
firebase.initializeApp(firebaseConfig)

export const createUserWithEmail = (name, email, password, setLoggedInUser, redirectPage) => {
    firebase.auth().createUserWithEmailAndPassword(email, password)
        .then(res=>{
            const user = res.user
            const currentUser = firebase.auth().currentUser
            currentUser.updateProfile({
                displayName: name
            }).then(()=>{
                const data = {
                    name: name,
                    email: user.email
                }
                setLoggedInUser(data);
                setLoggedInData(JSON.stringify(data));
                redirectPage()
            })
        })
        .catch(err=>{
            console.log(err)
        })
}

export const loginWithEmail = (email, password, setLoggedInUser, redirectPage) => {
    firebase.auth().signInWithEmailAndPassword(email,password)
        .then(res=>{
            const user = {
                name: res.user.displayName,
                email: res.user.email
            }
            setLoggedInUser(user);
            redirectPage();
        })
        .catch(err => {
            console.log(err);
        })
}

export const loginWithGoogle = (setLoggedInUser, redirectPage) =>{
    firebase.auth()
        .signInWithPopup(new firebase.auth.GoogleAuthProvider())
        .then((result) => {
            const user = {
                name: result.user.displayName,
                email: result.user.email
            }
            setLoggedInData(JSON.stringify(user));
            setLoggedInUser(user);
            redirectPage();
        }).catch((error) => {
            console.log(error)
        });
}

export const loginWithFacebook = (setLoggedInUser, redirectPage) =>{
    firebase.auth()
        .signInWithPopup(new firebase.auth.FacebookAuthProvider())
        .then((result) => {
            const user = {
                name: result.user.displayName,
                email: result.user.email
            }
            setLoggedInData(JSON.stringify(user));
            setLoggedInUser(user);
            redirectPage();
        }).catch((error) => {
        console.log(error)
    });
}

export const logOut = setLoggedInUser => {
    firebase.auth().signOut().then(() => {
        setLoggedInUser({})
        clearLoggedInData()
    }).catch((error) => {
        // An error happened.
    });
}