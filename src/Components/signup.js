import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function Signup() {
  const [formData, setFormData] = useState({ name: '', email: '', password: '' });
  const navigate = useNavigate();

  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      
      const res = await axios.post('https://jobs-portal-kp5e.onrender.com/api/auth/signup', formData);
      localStorage.setItem('token', res.data.token);
      navigate(res.data.user.role === 'admin' ? '/admin/jobs' : '/jobs');
      localStorage.setItem('user',res.data.user.role)
      localStorage.setItem('name',res.data.user.name)
    } catch (err) {
      alert('Error: ' + err);
    }
  };

  return (
    <form onSubmit={handleSubmit} className='login-form'>
      <h1>Sign Up</h1>
      <input className='email-name' type="text" name="name" placeholder="Name" value={formData.name} onChange={handleChange} required />
      <input className='email-input' type="email" name="email" placeholder="Email" value={formData.email} onChange={handleChange} required />
      <input className='email-pass' type="password" name="password" placeholder="Password" value={formData.password} onChange={handleChange} required />
      <button className='login-btn' type="submit">Sign Up</button>
    </form>
  );
}

export default Signup;
