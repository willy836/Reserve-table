import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Logo from './Logo';

const LoginForm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showAlert, setShowAlert] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    if (email && password) {
      const user = { email, password };
      fetch('https://reserveatable.chickenkiller.com/api/v1/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(user),
      })
        .then((response) => {
          if (!response.ok) {
            setShowAlert(true);
            setLoading(false);
            throw new Error(`Failed to login user. Status ${response.status}`);
          } else {
            setLoading(false);
            return response.json();
          }
        })
        .then((data) => {
          localStorage.setItem(
            'user',
            JSON.stringify({
              name: data.user.name,
              isAdmin: data.user.isAdmin,
              token: data.token,
            }),
          );
          navigate('/homepage');
        })
        .catch((error) => {
          throw new Error(`Failed to login user. Error: ${error.message}`);
        });
    }
  };
  return (
    <div className="container session-container">
      {loading && (
        <div className="d-flex justify-content-center">
          <div className="spinner-border spin-color" role="status">
            <span className="sr-only" />
          </div>
        </div>
      )}

      <form onSubmit={handleSubmit} className="mt-5 card p-5 my-card">
        {showAlert && (
          <div className="alert alert-danger" role="alert">
            Invalid credentials
          </div>
        )}
        <div className="logo-container">
          <Logo />
        </div>
        <div className="form-group-session">
          <input
            type="email"
            id="email"
            name="email"
            className="form-control"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="form-group-session">
          <input
            type="password"
            id="password"
            name="password"
            className="form-control"
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        <div className="mt-4 btn-session">
          <button type="submit" className="session-btn">
            Login
          </button>
        </div>
        <div className="form-group-session mt-2">
          <p>Don&apos;t have an account?</p>
          <Link to="/register">Register</Link>
        </div>
      </form>
    </div>
  );
};

export default LoginForm;
