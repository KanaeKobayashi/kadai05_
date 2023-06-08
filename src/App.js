import React from 'react'
import SignIn from './containers/SignIn'
import "./App.css"
import {useAuthState} from "react-firebase-hooks/auth";
import {auth} from "./firebase.js";
import Chats from './containers/Chats';



function App() {
    const [user] = useAuthState(auth);
  return (
    <div className="appWrapper">
      {user ? <Chats /> : <SignIn />}
    </div>
  )
}

export default App