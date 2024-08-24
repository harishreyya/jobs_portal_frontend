import { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function UserJobsList() {
  const [jobs, setJobs] = useState([]);
  const [appliedJobs, setAppliedJobs] = useState([]);
  const navigate = useNavigate();

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

 
    // const fetchAppliedJobs = async () => {
    //   try {
    //     const res = await axios.get('http://localhost:5003/api/user/applied-jobs', {
    //       headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
    //     });
    //     setAppliedJobs(res.data); // Set the IDs of applied jobs
    //   } catch (err) {
    //     alert('Error: ' + (err.response ? err.response.data.msg : err.message));
    //   }
    // };
    // fetchAppliedJobs();
  }, []);


  const handleApply = async (id) => {
    try {
      await axios.post(`https://jobs-portal-kp5e.onrender.com/api/jobs/apply/${id}`, {}, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
      });
      setAppliedJobs([...appliedJobs, id]); 
      alert('Applied successfully');
    } catch (err) {
      console.error('Error applying to job:', err.response ? err.response.data.msg : err.message);
      if (err.response.data.msg === "Token is not valid") {
        alert("Please login/signup first");
        navigate("/login");
      } else {
        alert('Error: ' + (err.response ? err.response.data.msg : err.message));
      }
    }
  };

  return (
    <div className="container">
      <h1 className='center'>Job Listings</h1>
      <div className='grid'>
        {jobs.map(job => (
          <div key={job._id} className='job-container'>
            <h3>{job.companyName}</h3>
            <p>Position: {job.position}</p>
            <p>Contract: {job.contract}</p>
            <p>Location: {job.location}</p>
            {appliedJobs.includes(job._id) ? (
              <button disabled>Applied</button>
            ) : (
              <button className='apply-btn' onClick={() => handleApply(job._id)}>Apply</button>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

export default UserJobsList;
