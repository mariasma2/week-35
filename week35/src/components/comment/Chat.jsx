import React, { useState } from 'react';
import '../comment/Chat.css';

function Chat() {
  const [inputText, setInputText] = useState('');
  const [messages, setMessages] = useState([]);

  function handleInputChange(event) {
    setInputText(event.target.value);
  }

  function handleSendMessage() {
    if (inputText.trim() === '') {
      return;
    }

    const newMessage = {
      id: Date.now(),
      text: inputText.trim(),
      highlighted: true, 
    };

     setMessages(prevMessages => {
        const updatedMessages = prevMessages.map(message => {
          if (message.highlighted) {
            return { ...message, highlighted: false };
          }
          return message;
        });
        return [newMessage, ...updatedMessages];
      });
  
      setInputText('');
    }

  function handleKeyDown(event) { // обработчик нажатия на клавишу Enter
    if (event.key === 'Enter') {
      handleSendMessage();
    }
  }

  return (
    <div className='comment'>
     <h1>New Chat</h1>
        {messages.map(message => (
          <p className='conteiner'
            key={message.id}
            style={{ backgroundColor: message.highlighted ? 'lightblue' : 'transparent' }}
          >
            {message.text}
          </p>
        ))}
      <div>
        <input className='newComment'
          type="text"
          value={inputText}
          onChange={handleInputChange}
          onKeyDown={handleKeyDown}
          style={{ backgroundColor: 'white' }}
        />
        <button className='button' onClick={handleSendMessage}>Send Message</button>
      </div>
    </div>
  );
}

export default Chat;