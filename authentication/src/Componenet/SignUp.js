import React, { useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
const SignUp = () => {
  const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const formData = new FormData(e.target);
      const jsonData = {};
      formData.forEach((value, key) => {
        jsonData[key] = value;
      });

      const response = await axios.post('http://localhost/T_C/server/signup.php', jsonData, {
        headers: {
          'Content-Type': 'application/json',
        },
      });

      // Check the success field in the response
      if (response.data.success) {
        // Registration successful
        setMessage('User registered successfully');
      } else {
        // Registration failed, display error message
        if (response.data.errorCode === 'USERNAME_EXISTS') {
          setMessage('Username already exists. Please choose a different username.');
        } else {
          setMessage('Registration failed. Please try again later.');
        }
      }
    } catch (error) {
      console.error('Error:', error);
      setMessage('An unexpected error occurred. Please try again later.');
    }
  };

  return (
    <div>
      <h2>Sign Up</h2>
      <form onSubmit={handleSubmit}>
        <label>Username: </label>
        <input type="text" name="username" placeholder="Username" required />
        <br />
        <label>Password: </label>
        <input type="password" name="password" placeholder="Password" required />
        <br />
        <button type="submit">Sign Up</button>
        <p><Link to="/login">Login</Link></p>
      </form>

      {message && <p>{message}</p>}
    </div>
  );
};

export default SignUp;
