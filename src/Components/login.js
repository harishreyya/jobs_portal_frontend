import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function Login() {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const navigate = useNavigate();

  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('https://jobs-portal-kp5e.onrender.com/api/auth/login', formData);
    // console.log(res.data)
      localStorage.setItem('token', res.data.token);
        localStorage.setItem('user',res.data.user.role);
    localStorage.setItem('name',res.data.user.name)
      navigate(res.data.user.role === 'admin' ? '/admin/jobs' : '/jobs');
    } catch (err) {
      if(err.response.status===400){
        alert('invalid credentials');
      }
     
    }
  };

  return (

    
    <form onSubmit={handleSubmit} className='login-form'>
      <h1>Login</h1>
      <input className='email-input' type="email" name="email" placeholder="Email" value={formData.email} onChange={handleChange} required /><br/>
      <input className='email-pass' type="password" name="password" placeholder="Password" value={formData.password} onChange={handleChange} required />
      <button className='login-btn' type="submit">Login</button>
    </form>
  );
}

export default Login;