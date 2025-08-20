import React from 'react';
import { useSubscription } from '@apollo/client';
import { GET_MESSAGES } from '../graphql/subscriptions';


export default function MessageView({ chatId }) {
  const { data, loading, error } = useSubscription(GET_MESSAGES, {
    variables: { chat_id: chatId },
    skip: !chatId,
  });

  if (!chatId) return <p>Select a chat</p>;
  if (loading) return <p>Loading messages...</p>;
  if (error) return <p>Error loading messages</p>;
  if (!data?.messages?.length) return <p>No messages yet</p>;

  return (
    <div style={{ flex: 1, overflowY: 'auto', padding: '10px' }}>
      {data.messages.map(msg => (
        <div
          key={msg.id}
          style={{ textAlign: msg.user_id === 'bot' ? 'left' : 'right', margin: '5px 0' }}
        >
          <strong>{msg.user_id === 'bot' ? 'Bot' : 'You'}:</strong> {msg.content}
        </div>
      ))}
    </div>
  );
}
