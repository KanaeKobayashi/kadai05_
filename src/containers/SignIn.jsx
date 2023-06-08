import React from 'react'
// import GoogleButton from 'react-google-button'
import { FacebookLoginButton } from "react-social-login-buttons";
import { GoogleLoginButton } from "react-social-login-buttons";
import { TwitterLoginButton } from "react-social-login-buttons";
import "./SignIn.css";
import firebase from 'firebase/compat/app';
import { auth } from '../firebase.js';

function SignIn() {
    function signInWithGoogle() {
      const provider = new firebase.auth.GoogleAuthProvider();
      auth.signInWithPopup(provider);
    }

  return (
    <div className='signin-container'>
        <div className="sign-in-form">
        <div className="left-box">
        <form>
            <span className='loginWithName'><h2>ログイン</h2></span>
            <input type='email' name='email' placeholder='email'/>
            <input type="password" name="password" id="" placeholder='Password' />
            <input type="submit" name="login-button" id="" value={"login"}/>
        </form>
        
        </div>
        <div className="right-box">
            <span className='loginWithSns'><h3>SNSでログイン</h3></span>
            {/* <GoogleButton
            onClick={() => { console.log('Google button clicked') }}
            /> */}
            <form>
            <FacebookLoginButton onClick={() => alert("Hello")} />
            <GoogleLoginButton onClick={signInWithGoogle} />
            <TwitterLoginButton onClick={() => alert("Hello")} />
            </form>
        </div>

        </div>
        
        </div>
  )
}

export default SignIn