import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Logo from './Logo';

const RegistrationForm = () => {
  const navigate = useNavigate();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);

    if (name && email && password) {
      const newUser = { name, email, password };
      fetch('https://reserveatable.chickenkiller.com/api/v1/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newUser),
      })
        .then((response) => {
          if (response.ok) {
            setLoading(false);
            navigate('/');
          } else {
            throw new Error(
              `Failed to register user. Status ${response.status}`,
            );
          }
        })
        .catch((error) => {
          throw new Error(`Failed to register user. Error: ${error.message}`);
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
        <div className="logo-container">
          <Logo />
        </div>
        <div className="form-group-session">
          <input
            type="text"
            id="name"
            name="name"
            className="form-control"
            placeholder="Enter your name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
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

        <div className="form-group-session mt-4">
          <button type="submit" className="session-btn">
            Register
          </button>
        </div>
        <div className="form-group-session mt-2 my-link">
          <p>Have an account?</p>
          <Link to="/">Log In</Link>
        </div>
      </form>
    </div>
  );
};

export default RegistrationForm;
