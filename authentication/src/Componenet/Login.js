import React, { useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../AuthContext';


const Login = () => {
  const [message, setMessage] = useState('');
  const { login } = useAuth();
  const navigate= useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const formData = new FormData(e.target);
      const jsonData = {};
      formData.forEach((value, key) => {
        jsonData[key] = value;
      });

      const response = await axios.post('http://localhost/T_C/server/login.php', jsonData, {
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (response.data.success) {
        login();
        setMessage('Login successful');
        navigate('/');
      } else {
        setMessage(response.data.message);
      }
    } catch (error) {
      console.error('Error:', error);
      setMessage('An unexpected error occurred. Please try again later.');
    }
  };

  return (
    <div>
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <label>Username: </label>
        <input type="text" name="username" placeholder="Username" required />
        <br />
        <label>Password: </label>
        <input type="password" name="password" placeholder="Password" required />
        <br />
        <button type="submit">Login</button>
      </form>

      {message && <p>{message}</p>}
      <p>Don't have an account? <Link to="/signup">Sign Up</Link></p>
    </div>
  );
};

export default Login;
