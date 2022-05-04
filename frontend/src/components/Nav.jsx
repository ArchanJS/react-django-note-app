import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';

const Nav = () => {
  const navigate = useNavigate();
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-primary">
      <div className="container-fluid">
        <p className="navbar-brand my-0 ms-3 cursor-pointer" style={{ cursor: 'pointer' }} onClick={() => {
          navigate('/')
        }}>Note app</p>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon" />
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
            {
              !localStorage.getItem('noteToken')
              ?
              <>
              <li className="nav-item">
                <NavLink className="nav-link" to='/login'>Login</NavLink>
              </li>
              <li className="nav-item">
                <NavLink className="nav-link" to='/signup'>Signup</NavLink>
              </li>
            </>
            :
            <li className="nav-item my-0">
                <p className="nav-link my-0 pe-3" style={{cursor:'pointer'}} onClick={()=>{
                  localStorage.removeItem('noteToken');
                  navigate('/login')
                }} >Logout</p>
              </li>
            }
          </ul>
        </div>
      </div>
    </nav>
  )
}

export default Nav