import React, { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useSignUpEmailPassword } from "@nhost/react";

export default function Signup() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  
  const { signUpEmailPassword, isLoading, isSuccess, isError, error } =
    useSignUpEmailPassword();

  const handleSignup = async () => {
    setMessage("");
    await signUpEmailPassword(email, password);
  };

  useEffect(() => {
    if (isSuccess) {
      setMessage("✅ Signup successful! Check your email for verification.");
    }
  }, [isSuccess]);

  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        background: "linear-gradient(135deg, #7f00ff, #e100ff, #ff7e5f, #feb47b)",
        fontFamily: "'Inter', sans-serif",
        padding: "20px",
        animation: "fadeIn 1s ease",
      }}
    >
      <div
        style={{
          width: "100%",
          maxWidth: 400,
          padding: "40px 30px",
          borderRadius: 16,
          boxShadow: "0 12px 30px rgba(0,0,0,0.25)",
          backgroundColor: "#fff",
          textAlign: "center",
          transform: "translateY(-20px)",
          animation: "slideUp 0.8s forwards",
        }}
      >
        <h2 style={{ marginBottom: 30, color: "#4f46e5" }}>Create Account</h2>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSignup();
          }}
          style={{
            display: "flex",
            flexDirection: "column",
            gap: 25,
            width: "100%",
          }}
        >
          {/* Email Input */}
          <div style={{ position: "relative", width: "100%" }}>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              style={{
                width: "100%",
                padding: "16px 12px",
                borderRadius: 8,
                border: "1px solid #d1d5db",
                fontSize: 14,
                outline: "none",
                transition: "0.3s",
                boxSizing: "border-box",
              }}
            />
            <label
              style={{
                position: "absolute",
                left: 12,
                top: email ? -8 : 16,
                fontSize: email ? 12 : 14,
                color: "#6b7280",
                backgroundColor: "#fff",
                padding: "0 4px",
                transition: "0.2s",
                pointerEvents: "none",
              }}
            >
              Email
            </label>
          </div>

          {/* Password Input */}
          <div style={{ position: "relative", width: "100%" }}>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              style={{
                width: "100%",
                padding: "16px 12px",
                borderRadius: 8,
                border: "1px solid #d1d5db",
                fontSize: 14,
                outline: "none",
                transition: "0.3s",
                boxSizing: "border-box",
              }}
            />
            <label
              style={{
                position: "absolute",
                left: 12,
                top: password ? -8 : 16,
                fontSize: password ? 12 : 14,
                color: "#6b7280",
                backgroundColor: "#fff",
                padding: "0 4px",
                transition: "0.2s",
                pointerEvents: "none",
              }}
            >
              Password
            </label>
          </div>

          {/* Signup Button */}
          <button
            type="submit"
            disabled={isLoading}
            style={{
              width: "100%",
              padding: "14px",
              borderRadius: 8,
              border: "none",
              backgroundColor: "#4f46e5",
              color: "#fff",
              fontWeight: 600,
              cursor: "pointer",
              fontSize: 15,
              transition: "0.3s",
            }}
            onMouseEnter={(e) => (e.target.style.backgroundColor = "#4338ca")}
            onMouseLeave={(e) => (e.target.style.backgroundColor = "#4f46e5")}
          >
            {isLoading ? "Signing up..." : "Sign Up"}
          </button>

          {/* Messages */}
          {isError && (
            <p style={{ color: "#ef4444", fontSize: 13 }}>{error?.message}</p>
          )}
          {message && (
            <p style={{ color: "#10b981", fontSize: 13 }}>{message}</p>
          )}
        </form>

        <p style={{ marginTop: 20, fontSize: 13, color: "#6b7280" }}>
          Already have an account?{" "}
          <Link
            to="/login"
            style={{
              color: "#4f46e5",
              textDecoration: "none",
              fontWeight: 500,
            }}
          >
            Login
          </Link>
        </p>
      </div>

      {/* Animations */}
      <style>
        {`
          @keyframes slideUp {
            0% { transform: translateY(20px); opacity: 0; }
            100% { transform: translateY(0); opacity: 1; }
          }
          @keyframes fadeIn {
            0% { opacity: 0; }
            100% { opacity: 1; }
          }
        `}
      </style>
    </div>
  );
}
