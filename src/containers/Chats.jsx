import React, { useRef } from 'react';
import SignOut from './SignOut';
import Chat from './Chat';
import SendMessage from './SendMessage';

const Chats = () => {
  const scrollRef = useRef();

  return (
    <div className='Chats'> 
      <SignOut />
      <Chat scroll={scrollRef} />
      <SendMessage scroll={scrollRef} />
    </div>
  );
};

export default Chats;
