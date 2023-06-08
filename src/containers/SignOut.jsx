import React from "react";
import { auth } from "../firebase.js";
import { Button } from "@mui/material";
import CallIcon from '@mui/icons-material/Call';
import "./SignOut"
import { Height } from "@mui/icons-material";

const SignOut =()=> {
  return (
    <div className="signOutWrapper" style={{backgroundColor: '#222a41', display: 'flex', color: 'white', height:'75px', width:'100%', alignItems:'center', justifyContent:'space-around'}}>
    <Button
      onClick={() => auth.signOut()}
      style={{ color: "white", fontSize: "15px" }}
    >
      サインアウト
    </Button>
    <h3>{auth.currentUser.displayName}</h3>
    <CallIcon />
    </div>


  )
}

export default SignOut;