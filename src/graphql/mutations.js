// src/graphql/mutations.js
import { gql } from "@apollo/client";

export const SEND_MESSAGE = gql`
  mutation SendMessage($chat_id: uuid!, $user_id: uuid!, $content: String!) {
    insert_messages_one(
      object: { chat_id: $chat_id, user_id: $user_id, content: $content }
    ) {
      id
      chat_id
      user_id
      content
      created_at
    }
  }
`;

export const CREATE_CHAT = gql`
  mutation CreateChat($name: String!) {
    insert_chats_one(object: { name: $name }) {
      id
      name
    }
  }
`;
