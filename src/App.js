import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { ApolloProvider } from "@apollo/client";
import { NhostProvider, useAuthenticationStatus } from "@nhost/react";
import { client, nhost } from "./nhost";

import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Dashboard from "./pages/Dashboard";

// Private route wrapper
function PrivateRoute({ children }) {
  const { isAuthenticated, isLoading } = useAuthenticationStatus();

  if (isLoading) return <p>Loading...</p>;

  return isAuthenticated ? children : <Navigate to="/login" replace />;
}

export default function App() {
  return (
    <NhostProvider nhost={nhost}>
      <ApolloProvider client={client}>
        <BrowserRouter>
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route
              path="/dashboard"
              element={
                <PrivateRoute>
                  <Dashboard />
                </PrivateRoute>
              }
            />
            <Route path="/" element={<Navigate to="/login" replace />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </BrowserRouter>
      </ApolloProvider>
    </NhostProvider>
  );
}
