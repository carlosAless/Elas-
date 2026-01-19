// App.js
import React, { useState, useEffect } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { supabase } from "./helper/supabaseClient";
import { Login } from "./pages/auth/login/Login";
import { Register } from "./pages/auth/register/Register";
import { Dashboard } from "./pages/dashboard/Dashboard";
import { Home } from "./pages/Home/Home";
import "./App.css";

function App() {
  const [session, setSession] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setLoading(false);
    });

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
      setLoading(false);
    });

    return () => subscription.unsubscribe();
  }, []);

  if (loading) {
    return (
      <div className="loading-container">
        <div className="bubble-orchestra">
          <div className="main-bubble"></div>

          <div className="bubble-particle particle-1"></div>
          <div className="bubble-particle particle-2"></div>
          <div className="bubble-particle particle-3"></div>
          <div className="bubble-particle particle-4"></div>
          <div className="bubble-particle particle-5"></div>
          <div className="bubble-particle particle-6"></div>
        </div>
        <p className="loading-text">Carregando...</p>
      </div>
    );
  }

  return (
    <Router>
      <div className="App">
        <Routes>
          <Route
            path="/login"
            element={!session ? <Login /> : <Navigate to="/dashboard" />}
          />
          <Route
            path="/cadastro"
            element={!session ? <Register /> : <Navigate to="/dashboard" />}
          />
          <Route path="/" element={<Home />} />
          <Route
            path="/dashboard/*"
            element={
              session ? (
                <Dashboard session={session} />
              ) : (
                <Navigate to="/login" />
              )
            }
          />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
