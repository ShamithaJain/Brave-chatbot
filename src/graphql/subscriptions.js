// src/graphql/subscriptions.js
import { gql } from '@apollo/client';

export const GET_MESSAGES = gql`
  subscription GetMessages($chat_id: uuid!) {
    messages(where: { chat_id: {_eq: $chat_id} }, order_by: { created_at: asc }) {
      id
      chat_id
      user_id
      sender
      content
      created_at
    }
  }
`;
