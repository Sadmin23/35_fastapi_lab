import React, { useState } from 'react';

const RegistrationForm = () => {
  const [formData, setFormData] = useState({
    username: '',
    password: '',
    confirmPassword: '', // Only used for validation, not sent to the server
    email: '',
    phone: ''
  });

  const [errors, setErrors] = useState({
    username: '',
    password: '',
    email: '',
    phone: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Validation logic
    let hasError = false;

    if (formData.username.length <= 5) {
      setErrors(prevErrors => ({
        ...prevErrors,
        username: 'Username must be more than 5 characters.'
      }));
      hasError = true;
    }

    if (formData.password.length <= 6) {
      setErrors(prevErrors => ({
        ...prevErrors,
        password: 'Password must be more than 6 characters.'
      }));
      hasError = true;
    }

    if (formData.password !== formData.confirmPassword) {
      setErrors(prevErrors => ({
        ...prevErrors,
        confirmPassword: 'Passwords do not match.'
      }));
      hasError = true;
    }

    if (!/^\S+@\S+\.\S+$/.test(formData.email)) {
      setErrors(prevErrors => ({
        ...prevErrors,
        email: 'Invalid email format.'
      }));
      hasError = true;
    }

    if (!/^\d{11}$/.test(formData.phone)) {
      setErrors(prevErrors => ({
        ...prevErrors,
        phone: 'Phone number must have exactly 11 digits.'
      }));
      hasError = true;
    }

    if (!hasError) {
      // Remove confirmPassword from formData before sending
      const { confirmPassword, ...dataToSend } = formData;

      // Send data to the server
      fetch('http://127.0.0.1:8000/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(dataToSend)
      })
        .then(response => {
          if (!response.ok) {
            alert('Registration failed')
            throw new Error('Network response was not ok');
          }
          return response.json();
        })
        .then(data => {
          alert('Registration successful')
          console.log('Registration successful:', data);
        })
        .catch(error => {
          console.error('There was an error during registration:', error.message);
        });
    }
  };

  return (
    <div>
      <h2 className='text-lg font-semibold'>Registration Form</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Username:</label>
          <input
            type="text"
            name="username"
            value={formData.username}
            onChange={handleChange}
            className='border-2'
            required
          />
          {errors.username && <span>{errors.username}</span>}
        </div>
        <div>
          <label>Password:</label>
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            className='border-2'
            required
          />
          {errors.password && <span>{errors.password}</span>}
        </div>
        <div>
          <label>Confirm Password:</label>
          <input
            type="password"
            name="confirmPassword"
            value={formData.confirmPassword}
            onChange={handleChange}
            className='border-2'
            required
          />
          {errors.confirmPassword && <span>{errors.confirmPassword}</span>}
        </div>
        <div>
          <label>Email:</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className='border-2'
            required
          />
          {errors.email && <span>{errors.email}</span>}
        </div>
        <div>
          <label>Phone Number:</label>
          <input
            type="tel"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            className='border-2'
            required
          />
          {errors.phone && <span>{errors.phone}</span>}
        </div>
        <button type="submit" className='bg-black w-20 text-white rounded-md h-10 mt-4'>Register</button>
      </form>
    </div>
  );
};

export default RegistrationForm;