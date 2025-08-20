import React, { useState } from 'react';
import { useMutation } from '@apollo/client';
import { CREATE_CHAT } from '../graphql/mutations';


export default function NewChatForm({ onChatCreated }) {
  const [name, setName] = useState('');
  const [createChat] = useMutation(CREATE_CHAT, {
    onCompleted: (data) => {
      onChatCreated(data.insert_chats_one);
      setName('');
    },
  });

  const handleSubmit = e => {
    e.preventDefault();
    if (!name) return;
    createChat({ variables: { name } });
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="New chat name"
        value={name}
        onChange={e => setName(e.target.value)}
      />
      <button type="submit">Create</button>
    </form>
  );
}
