import React, { useState } from 'react';
import { useMutation } from '@apollo/client';
import { SEND_MESSAGE } from '../graphql/mutations';
import { nhost } from '../nhost';

export default function SendMessageForm({ chatId }) {
  const [content, setContent] = useState('');
  const [sendMessage] = useMutation(SEND_MESSAGE);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!content || !chatId) return;

    const user = nhost.auth.getUser(); // get sender info

    try {
      await sendMessage({
        variables: { 
          chat_id: chatId, 
          sender: user.email, // or user.id
          content
        }
      });
      setContent('');
    } catch (err) {
      console.error('Error sending message:', err);
    }
  };

  if (!chatId) return <p>Select a chat to start messaging</p>;

  return (
    <form onSubmit={handleSubmit} style={{ display: 'flex', padding: '10px', borderTop: '1px solid #ccc' }}>
      <input
        type="text"
        value={content}
        onChange={e => setContent(e.target.value)}
        placeholder="Type a message..."
        style={{ flex: 1, padding: '8px' }}
      />
      <button type="submit" style={{ marginLeft: '5px' }}>Send</button>
    </form>
  );
}
