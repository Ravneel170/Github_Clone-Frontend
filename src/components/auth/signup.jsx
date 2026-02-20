
import logo from "../../assets/github-mark-white.svg";

import "./auth.css";

import { Link } from "react-router-dom";

import { Button } from "@primer/react";

import { PageHeader } from "@primer/react";

import axios from 'axios';

import { useAuth } from "../../authContext";

import { useState } from "react";

const API_URL = 'https://abcd1234.ngrok.io';


const Signup = () => {

  const [email, setEmail] = useState('');

  const [username, setUsername] = useState('');

  const [password, setPassword] = useState('');

  const [loading, setLoading] = useState(false);

  const { setUser } = useAuth();

  const handleSignup = async (event) => {

    event.preventDefault();

    try {

      setLoading(true);

      const res = await axios.post(`${API_URL}/signup`, {

        username: username,
        email: email,
        password: password
      });

      const token = res.data.token;

      const userId = res.data.userId;

      localStorage.setItem('token', token);

      localStorage.setItem('userId', userId);

      setUser(res.data.userId);

      setLoading(true);

      window.location.href = '/';

    } catch (error) {

      console.error(error.message);

      alert('Signup Error!')
    }
  }
  return (
    <div className="login-wrapper" >
      <div className="login-logo-container">
        <img className="logo-login" src={logo} alt="Logo" />
      </div>

      <div className="login-box-wrapper">
        <div className="login-heading">

          <PageHeader>
            <PageHeader.TitleArea variant="large">
              <PageHeader.Title>Sign Up</PageHeader.Title>
            </PageHeader.TitleArea>
          </PageHeader>
        </div>

        <div className="login-box">
          <div>
            <label className="label">Username</label>
            <input
              autoComplete="off"
              name="Username"
              id="Username"
              className="input"
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>

          <div>
            <label className="label">Email address</label>
            <input
              autoComplete="off"
              name="Email"
              id="Email"
              className="input"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div className="div">
            <label className="label">Password</label>
            <input
              autoComplete="off"
              name="Password"
              id="Password"
              className="input"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <Button variant="primary" className="login-btn"

            disabled={loading}

            onClick={handleSignup}
          >

            {loading ? "Loading" : "Signup"}

          </Button>
        </div>

        <div className="pass-box">
          <p>
            Already have an account? <Link to="/auth">Login</Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Signup;
