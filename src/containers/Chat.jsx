import React, { useState, useEffect, useRef } from "react";
import { db, auth } from "../firebase.js";
import DeleteIcon from "@mui/icons-material/Delete";
import "./Chat.css";

function Chat() {
  const scroll = useRef();
  const chatWrapperRef = useRef(null);
  const timerRef = useRef(null); // タイマーのリファレンス
  const [messages, setMessages] = useState([]);
  const [showDeleteButton, setShowDeleteButton] = useState(null);
  const [messageId, setMessageId] = useState(null);

  useEffect(() => {
    db.collection("messages")
      .orderBy("createdAt")
      .limit(50)
      .onSnapshot((snapshot) => {
        setMessages(
          snapshot.docs.map((doc) => ({
            id: doc.id,
            text: doc.data().text,
            photoURL: doc.data().photoURL,
            uid: doc.data().uid,
            createdAt: doc.data().createdAt ? doc.data().createdAt.toDate() : null,
          }))
        );
      });
  }, []);

  const handleDeleteButtonClick = (messageId) => {
    deleteMessage(messageId);
  };

  const handleClick = (messageId, uid) => {
    if (uid === auth.currentUser.uid && showDeleteButton !== messageId) {
      setShowDeleteButton(messageId);
      setMessageId(messageId);
      clearTimeout(timerRef.current);
      timerRef.current = setTimeout(() => {
        setShowDeleteButton(null);
        setMessageId(null);
      }, 30000);
    } else {
      setShowDeleteButton(null);
      setMessageId(null);
      clearTimeout(timerRef.current);
    }
  };

  const deleteMessage = (messageId) => {
    db.collection("messages")
      .doc(messageId)
      .delete()
      .then(() => {
        console.log("Message deleted successfully");
      })
      .catch((error) => {
        console.error("Error deleting message", error);
      });
  };

  useEffect(() => {
    const chatWrapperWidth = chatWrapperRef.current.offsetWidth;
    const signOutComponent = document.getElementById("signOutComponent");
    const sendMessageComponent = document.getElementById("sendMessageComponent");
    if (signOutComponent) {
      signOutComponent.style.width = chatWrapperWidth + "px";
    }
    if (sendMessageComponent) {
      sendMessageComponent.style.width = chatWrapperWidth + "px";
    }
  }, []);

  return (
    <div className="chatWrapper" id="chats" ref={chatWrapperRef}>
      <div className="chatContainer">
        <div className="messages" ref={scroll}>
          {messages.map(({ id, text, photoURL, uid, createdAt }) => (
            <div
              key={id}
              className={`message ${uid === auth.currentUser.uid ? "sent" : "received"}`}
              onClick={() => handleClick(id, uid)}
            >
              <img src={photoURL} alt="" />
              <p>{text}</p>
              {showDeleteButton === id && (
                <button onClick={() => handleDeleteButtonClick(id)}>
                  <DeleteIcon />
                </button>
              )}
              <span className="timestamp">{createdAt && createdAt.toLocaleString()}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Chat;
