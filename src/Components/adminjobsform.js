import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function AdminJobsForm() {
  const [jobData, setJobData] = useState({ companyName: '', position: '', contract: '', location: '' });
  const navigate = useNavigate();

  const handleChange = (e) => setJobData({ ...jobData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('https://jobs-portal-kp5e.onrender.com/api/jobs', jobData, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
      });
      alert('Job posted successfully');
      navigate('/admin/jobs');
    } catch (err) {
      alert('Error: ' + (err.response?.data.msg || err.message));
    }
  };

  return (
    <form className='form' onSubmit={handleSubmit}>
      <input
        type="text"
        name="companyName"
        placeholder="Company Name"
        value={jobData.companyName}
        onChange={handleChange}
        required
      />
      <input
        type="text"
        name="position"
        placeholder="Position"
        value={jobData.position}
        onChange={handleChange}
        required
      />
      <input
        type="text"
        name="contract"
        placeholder="Contract"
        value={jobData.contract}
        onChange={handleChange}
        required
      />
      <input
        type="text"
        name="location"
        placeholder="Location"
        value={jobData.location}
        onChange={handleChange}
        required
      />
      <button type="submit">Post Job</button>
    </form>
  );
}

export default AdminJobsForm;
