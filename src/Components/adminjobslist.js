import { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

function AdminJobsList() {
  const [jobs, setJobs] = useState([]);

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const res = await axios.get('https://jobs-portal-kp5e.onrender.com/api/jobs', {
          headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
        });
        setJobs(res.data);
      } catch (err) {
        alert('Error: ' + (err.response ? err.response.data.msg : err.message));
      }
    };
    fetchJobs();
  }, []);

  const handleDelete = async (id) => {
    try {
      await axios.delete(`https://jobs-portal-kp5e.onrender.com/api/jobs/${id}`, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
      });
      setJobs(jobs.filter(job => job._id !== id));
      alert('Job deleted successfully');
    } catch (err) {
      console.error('Error deleting job:', err.response ? err.response.data.msg : err.message);
      alert('Error: ' + (err.response ? err.response.data.msg : err.message));
    }
  };

  return (
    <div className="container">
      <Link to="/admin/jobs/new">
        <button>Create New Job</button>
      </Link>
      <h1>Job Listings</h1>
      <table>
        <thead>
          <tr>
            <th>Company Name</th>
            <th>Position</th>
            <th>Contract</th>
            <th>Location</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {jobs.map(job => (
            <tr key={job._id}>
              <td>{job.companyName}</td>
              <td>{job.position}</td>
              <td>{job.contract}</td>
              <td>{job.location}</td>
              <td>
                <button onClick={() => handleDelete(job._id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default AdminJobsList;
