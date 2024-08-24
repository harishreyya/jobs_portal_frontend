import { Link, useNavigate } from 'react-router-dom';

function Header() {
  const isLoggedIn = !!localStorage.getItem('token');
  const navigate = useNavigate();
  let named = localStorage.getItem('name')  

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    localStorage.removeItem('name');
    window.location.href = '/login';
  };

  const adminCheck = () => {
    let user = localStorage.getItem('user');
    if (user === 'user') {
      alert("Unauthorised access");
      navigate('/jobs');
    }
  };

  return (
    <header>
      <div className='flex header-tab'>
        <img src='https://alphaware.io/wp-content/uploads/2023/03/Alphaware-Next_technologies-logo.svg' alt='logo' />
        <h1>Careers</h1>
        {!isLoggedIn ? (
          <div className='flex header-routes'>
            <p><Link to="/signup" className='route-words'>Signup</Link></p>
            <p><Link to="/login" className='route-words'>Login</Link></p>
             <p><Link to="/jobs" className='route-words'>Jobs</Link></p>
          </div>
        ) : (
          <div className='flex header-routes'>
            <p><Link to="/jobs" className='route-words'>Jobs</Link></p>
            <p onClick={adminCheck}><Link className='route-words' to="/admin/jobs">Admin Panel</Link></p>
          </div>
        )}
        {isLoggedIn ? (
          <>
            <p>&#128100; {named}</p>
            <button className='logout-btn' onClick={handleLogout}>Logout</button>
          </>
        ) : (
          <p>&#128100; Guest</p>
        )}
      </div>
    </header>
  );
}

export default Header;
