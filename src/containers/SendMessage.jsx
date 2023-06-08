import React, { useState } from "react";
import { db, auth } from "../firebase.js";
import firebase from "firebase/compat/app";
import SendIcon from "@mui/icons-material/Send";
import { TextField } from "@mui/material";
import "./SendMessage.css";

function SendMessage({ scroll }) {
  const [message, setMessage] = useState("");

  function sendMessage(e) {
    e.preventDefault();
    const { uid, photoURL } = auth.currentUser;

    db.collection("messages").add({
      text: message,
      photoURL,
      uid,
      createdAt: firebase.firestore.FieldValue.serverTimestamp(),
    });
    setMessage("");

    if (scroll.current) {
      setTimeout(() => {
        scroll.current.scrollIntoView({ behavior: "smooth", block: "end" });
      }, 100);
    }
  }
  function handleClick() {
    const event = new MouseEvent("click");
    sendMessage(event);
  }

  return (
    <div className="send">
      <form onSubmit={sendMessage}>
        <div className="sendMsg">
          <TextField
            style={{
              width: "78%",
              fontSize: "15px",
              fontWeight: "550",
            }}
            placeholder="メッセージを入力"
            type="text"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          />
          <SendIcon
            style={{ color: "#222a41", marginLeft: "20px",marginTop:'20px', }}
            onClick={handleClick}
          />
        </div>
      </form>
    </div>
  );
}

export default SendMessage;

// import React, { useState } from "react";
// import { db, auth, storage } from "../firebase.js";
// import firebase from "firebase/compat/app";
// import SendIcon from "@mui/icons-material/Send";
// import { TextField, Button } from "@mui/material";
// import "./SendMessage.css";
// import AddIcon from '@mui/icons-material/Add';

// function SendMessage({ scroll }) {
//   const [message, setMessage] = useState("");
//   const [file, setFile] = useState(null);

//   async function sendMessage(e) {
//     e.preventDefault();
//     const { uid, photoURL } = auth.currentUser;

//     let fileUrl = null;
//     if (file) {
//       const fileRef = storage.ref(`/messages/${file.name}`);
//       await fileRef.put(file);
//       fileUrl = await fileRef.getDownloadURL();
//     }

//     const createdAt = firebase.firestore.FieldValue.serverTimestamp(); // createdAtフィールドの値

//     db.collection("messages").add({
//       text: message,
//       photoURL,
//       uid,
//       file: fileUrl,
//       createdAt: createdAt, // createdAtフィールドを追加
//       // createdAt: firebase.firestore.FieldValue.serverTimestamp(),
//     });
//     setMessage("");
//     setFile(null);
//     scroll.current && scroll.current.scrollIntoView({ behavior: 'smooth' });

//   }

//   function handleClick() {
//     const event = new MouseEvent("click", {
//       bubbles: true,
//       cancelable: true,
//       view: window,
//     });
//     const form = document.querySelector("form");
//     form.dispatchEvent(event);
//   }

//   return (
//     <div style={{ width: "100%" }}>
//       <form onSubmit={sendMessage}>
//         <div className="sendMsg">
//           <TextField
//             label="メッセージを入力"
//             variant="standard"
//             type="text"
//             value={message}
//             onChange={(e) => setMessage(e.target.value)}
//           />
// <input
//   type="file"
//   onChange={(e) => setFile(e.target.files[0])}
//   style={{ display: 'none' }}
//   id="file-input"
// />
// <label htmlFor="file-input">
//   <AddIcon />
// </label>
//            <Button
//             variant="contained"
//             color="primary"
//             endIcon={<SendIcon />}
//             type="submit"
//             onClick={sendMessage}
//           >
//           </Button>
//         </div>
//       </form>
//     </div>
//   );
// }

// export default SendMessage;
