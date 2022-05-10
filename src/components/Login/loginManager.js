import { initializeApp } from 'firebase/app';
import firebaseConfig from './firebase.config';
import { getAuth, GoogleAuthProvider, signInWithPopup, signOut, createUserWithEmailAndPassword, signInWithEmailAndPassword, updateProfile, FacebookAuthProvider } from "firebase/auth";


export const initializeLoginFramework = () => {

    initializeApp(firebaseConfig);
    
    // if app name alreday exists error ase
    // if(firebase.apps.initializeApp === 0){
    //     firebase.initializeApp(firebaseConfig);
    // }
}

export const handleGoogleSignIn = () => {
    const googleProvider = new GoogleAuthProvider();
    console.log('sign in');
    const auth = getAuth();
    return signInWithPopup(auth, googleProvider)
        .then((result) => {
            const { displayName, email, photoURL } = result.user;
            const signedInUser = {
                isSignedIn: true,
                name: displayName,
                email: email,
                photo: photoURL,
                success: true
            }
            return signedInUser;

        }).catch((error) => {
            console.log(error);
            console.log(error.message);
        });
}

export const handleFbSign = () => {
    const fbProvider = new FacebookAuthProvider();
    const auth = getAuth();
    return signInWithPopup(auth, fbProvider)
        .then((result) => {
            // The signed-in user info.
            const user = result.user;
            user.success = true;
            console.log('fb', user);
            // This gives you a Facebook Access Token. You can use it to access the Facebook API.
            const credential = FacebookAuthProvider.credentialFromResult(result);
            const accessToken = credential.accessToken;

            return user;
        })
        .catch((error) => {
            // Handle Errors here.
            const errorCode = error.code;
            const errorMessage = error.message;
            // The email of the user's account used.
            const email = error.email;
            // The AuthCredential type that was used.
            const credential = FacebookAuthProvider.credentialFromError(error);
            console.log('errorMessage', errorMessage);
            console.log('email', email);

            // ...
        });
}

export const handleSignOut = () => {
    const auth = getAuth();
    return signOut(auth).then(() => {
        const signOutUser = {
            isSignedIn: false,
            name: '',
            email: '',
            password: '',
            photo: '',
            error: '',
            success: false
        }
        return signOutUser;

    }).catch((error) => {
        // An error happened.
    });
}

export const createUserWithEmailPassword = (name, email, password) => {
    const auth = getAuth();
    return createUserWithEmailAndPassword(auth, email, password)
        .then(res => {
            const newUserInfo = res.user;
            console.log(res.user);
            newUserInfo.error = '';
            newUserInfo.success = true;
            updateUserName(name);
            return newUserInfo;

        })
        .catch((error) => {
            const newUserInfo = {};
            newUserInfo.error = error.message;
            newUserInfo.success = false;
            console.log(error.message);
            return newUserInfo;
        });
}

export const signInWithEmailpassword = (email, password) => {
    const auth = getAuth();
    return signInWithEmailAndPassword(auth, email, password)
        .then(res => {
            const newUserInfo = res.user;
            newUserInfo.error = '';
            newUserInfo.success = true;
            console.log('sign in info', res.user);
            return newUserInfo;
        })
        .catch((error) => {
            const newUserInfo = {};
            newUserInfo.error = error.message;
            newUserInfo.success = false;
            console.log(error.message);
            return newUserInfo;
        });
}

const updateUserName = name => {
    const auth = getAuth();
    updateProfile(auth.currentUser, {
      displayName: name
    }).then(() => {
      console.log('user name updated successfully');
    }).catch((error) => {
      console.log(error);
    });
  }