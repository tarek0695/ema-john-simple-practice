import { useContext, useState } from 'react';
import { UserContext } from "../../App";
import { useLocation, useNavigate } from "react-router-dom";
import { createUserWithEmailPassword, handleFbSign, handleGoogleSignIn, handleSignOut, initializeLoginFramework, signInWithEmailpassword } from "./loginManager";


function Login() {
  const [newUser, setNewUser] = useState(false);
  const [user, setUser] = useState({
    isSignedIn: false,
    name: '',
    email: '',
    photo: '',
    error: '',
    success: false
  })

  initializeLoginFramework();
  const [loggedInUser, setLoggedInUser] = useContext(UserContext);
  let navigate = useNavigate();
  let location = useLocation();
  let from = location.state?.from?.pathname || "/";
  //   let { from } = location.state || { from: { pathname: "/" } };

  const googleSignIn = () => {
    handleGoogleSignIn()
      .then(res => {
        handleResponse(res, true);
      })
  }

  const signOut = () => {
    handleSignOut()
      .then(res => {
        handleResponse(res, false);
      })
  }

  const fbSignIn = () => {
    handleFbSign()
      .then(res => {
        handleResponse(res, true);
      })
  }

  const handleResponse = (res, redirect) => {
    setUser(res);
    setLoggedInUser(res);
    if (redirect) {
      navigate(from, { replace: true })
    }
  }

  const handleBlur = (e) => {
    let isFormulaValid = true;
    if (e.target.name === 'email') {
      isFormulaValid = /\S+@\S+\.\S+/.test(e.target.value);

    }
    if (e.target.name === 'password') {
      const isPasswordValid = e.target.value.length > 6;
      const passWordHasNum = /\d{1}/.test(e.target.value);
      isFormulaValid = isPasswordValid && passWordHasNum;
    }
    if (isFormulaValid) {
      const newUserInfo = { ...user };
      newUserInfo[e.target.name] = e.target.value;
      setUser(newUserInfo);
    }
  }
  const handleSubmit = (e) => {
    if (newUser && user.email && user.password) {
      // console.log(user.name, user.email, user.password);
      createUserWithEmailPassword(user.name, user.email, user.password)
        .then(res => {
          handleResponse(res, true);
        })
    }
    if (!newUser && user.email && user.password) {
      signInWithEmailpassword(user.email, user.password)
        .then(res => {
          handleResponse(res, true);
        })
    }

    e.preventDefault();
  }


  return (
    <div style={{ textAlign: 'center' }}>
      {
        user.isSignedIn ? <button onClick={signOut}>Sign out</button> :
          <button onClick={googleSignIn}>Sign in with google</button>
      }
      <br />
      {
        <button onClick={fbSignIn}>Sign in with facebook</button>
      }
      {
        user.isSignedIn && <div>
          <p>Welcome, {user.name}</p>
          <p>Your email: {user.email}</p>
          <img src={user.photo} alt="" />
        </div>
      }


      <h1>Our own authentication system:</h1>
      <input onChange={() => setNewUser(!newUser)} type="checkbox" name="newUser" value='' id="" />
      <label htmlFor="newUser">New user sign up</label>
      <form onSubmit={handleSubmit}>
        {newUser && <input type="text" onBlur={handleBlur} name='name' placeholder='Your name' required />}<br />
        <input type="text" onBlur={handleBlur} name="email" placeholder='Enter your email' required /><br />
        <input type="password" onBlur={handleBlur} name="password" placeholder='Enter your password' required /><br />
        <input type="submit" value={newUser ? 'Sign up' : 'Sign in'} />
      </form>
      <p style={{ color: 'red' }}>{user.error}</p>
      {user.success && <p style={{ color: 'green' }}>User {newUser ? 'created' : 'logged in'} successfully.</p>}

    </div>
  );
}

export default Login;
