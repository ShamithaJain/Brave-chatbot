import React, { useState, useRef, useEffect } from "react";
import { useSubscription, useMutation } from "@apollo/client";
import { nhost } from "../nhost";
import { GET_MESSAGES } from "../graphql/subscriptions";
import { SEND_MESSAGE } from "../graphql/mutations";

export default function Dashboard() {
  const chatId = "48491bce-ced9-4e5c-9f51-34ef45e51a5b";
  const { data, loading, error } = useSubscription(GET_MESSAGES, {
    variables: { chat_id: chatId },
  });

  const [sendMessage] = useMutation(SEND_MESSAGE);
  const [newMsg, setNewMsg] = useState("");
  const chatEndRef = useRef(null);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [data]);

  const handleSend = async () => {
    if (!newMsg.trim()) return;
    const user = nhost.auth.getUser();
    if (!user) {
      alert("Not logged in");
      return;
    }
    try {
      await sendMessage({
        variables: {
          chat_id: chatId,
          user_id: user.id,
          sender: user.email,
          content: newMsg,
        },
      });
      setNewMsg("");
    } catch (err) {
      console.error("Error sending message:", err);
      alert("Error: " + err.message);
    }
  };

  if (loading) return <p style={{ textAlign: "center", marginTop: 50 }}>Loading chat...</p>;
  if (error) return <p style={{ textAlign: "center", marginTop: 50 }}>Error: {error.message}</p>;

  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#f0f4f8",
        fontFamily: "'Inter', sans-serif",
        padding: 20,
      }}
    >
      <div
        style={{
          width: "100%",
          maxWidth: 720,
          height: "85vh",
          display: "flex",
          flexDirection: "column",
          borderRadius: 16,
          overflow: "hidden",
          backgroundColor: "#fff",
          boxShadow: "0 8px 24px rgba(0,0,0,0.15)",
        }}
      >
        {/* Header */}
        <div
          style={{
            padding: 20,
            backgroundColor: "#6366f1",
            color: "#fff",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <div>
            <strong style={{ fontSize: 16 }}>{nhost.auth.getUser()?.email}</strong>
            <br />
            <span style={{ fontSize: 12, opacity: 0.8 }}>
              User ID: {nhost.auth.getUser()?.id}
            </span>
          </div>
          <button
            onClick={async () => {
              await nhost.auth.signOut();
              window.location.href = "/login";
            }}
            style={{
              padding: "8px 16px",
              border: "none",
              borderRadius: 8,
              backgroundColor: "#ef4444",
              color: "#fff",
              fontWeight: "bold",
              cursor: "pointer",
              transition: "0.3s",
            }}
            onMouseEnter={(e) => (e.target.style.backgroundColor = "#dc2626")}
            onMouseLeave={(e) => (e.target.style.backgroundColor = "#ef4444")}
          >
            Logout
          </button>
        </div>

        {/* Chat Messages */}
        <div
          style={{
            flex: 1,
            padding: 20,
            backgroundColor: "#f9fafb",
            overflowY: "auto",
            display: "flex",
            flexDirection: "column",
            gap: 12,
          }}
        >
          {data?.messages.map((msg) => {
            const isMe = msg.user_id === nhost.auth.getUser()?.id;
            return (
              <div
                key={msg.id}
                style={{
                  alignSelf: isMe ? "flex-end" : "flex-start",
                  maxWidth: "70%",
                  display: "flex",
                  flexDirection: "column",
                  gap: 4,
                }}
              >
                <span
                  style={{
                    fontSize: 12,
                    opacity: 0.7,
                    textAlign: isMe ? "right" : "left",
                  }}
                >
                  {msg.sender}
                </span>
                <div
                  style={{
                    backgroundColor: isMe ? "#6366f1" : "#e5e7eb",
                    color: isMe ? "#fff" : "#111827",
                    padding: "12px 16px",
                    borderRadius: 16,
                    boxShadow: "0 2px 6px rgba(0,0,0,0.08)",
                    wordWrap: "break-word",
                  }}
                >
                  {msg.content}
                </div>
              </div>
            );
          })}
          <div ref={chatEndRef} />
        </div>

        {/* Input */}
        <div
          style={{
            display: "flex",
            padding: 16,
            borderTop: "1px solid #e5e7eb",
            backgroundColor: "#fff",
          }}
        >
          <input
            type="text"
            value={newMsg}
            onChange={(e) => setNewMsg(e.target.value)}
            placeholder="Type your message..."
            style={{
              flex: 1,
              padding: "14px 18px",
              borderRadius: 16,
              border: "1px solid #d1d5db",
              outline: "none",
              marginRight: 12,
              fontSize: 14,
              boxSizing: "border-box",
            }}
            onKeyPress={(e) => e.key === "Enter" && handleSend()}
          />
          <button
            onClick={handleSend}
            style={{
              padding: "14px 24px",
              borderRadius: 16,
              backgroundColor: "#6366f1",
              color: "#fff",
              border: "none",
              cursor: "pointer",
              fontWeight: "bold",
              transition: "0.3s",
            }}
            onMouseEnter={(e) => (e.target.style.backgroundColor = "#4f46e5")}
            onMouseLeave={(e) => (e.target.style.backgroundColor = "#6366f1")}
          >
            Send
          </button>
        </div>
      </div>
    </div>
  );
}
