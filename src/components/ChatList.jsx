import React from 'react';
import { useQuery } from '@apollo/client';
import { GET_CHATS } from '../graphql/queries';

export default function ChatList({ selectChat }) {
  const { data, loading, error } = useQuery(GET_CHATS);

  if (loading) return <p>Loading chats...</p>;
  if (error) return <p>Error loading chats</p>;
  if (!data.chats.length) return <p>No chats available</p>;

  return (
    <div style={{ width: '250px', borderRight: '1px solid #ccc' }}>
      {data.chats.map(chat => (
        <div
          key={chat.id}
          onClick={() => selectChat(chat.id)}
          style={{
            padding: '10px',
            borderBottom: '1px solid #ccc',
            cursor: 'pointer'
          }}
        >
          {chat.name}
        </div>
      ))}
    </div>
  );
}
