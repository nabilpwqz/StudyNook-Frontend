import React,{useState, useEffect} from "react";
import {Link,useNavigate} from "react-router-dom";
import "./adminnavbar.css"
import { Server_URL } from "../utils/config";

export default function AdminNavbar(){

    const [menuOpen, setMenuOpen] = useState(false);
  const [role, setRole] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await fetch(`${Server_URL}users/profile`, { credentials: 'include' });
        if (!res.ok) return navigate('/admin-login');
        const data = await res.json();
        setRole(data.user?.role);
      } catch (err) {
        navigate('/admin-login');
      }
    };
    fetchProfile();
  }, []);

  const handleLogout = async () => {
    try {
      await fetch(`${Server_URL}users/logout`, { method: 'POST', credentials: 'include' });
    } catch (err) {
      // ignore
    }
    navigate("/admin-login");
  };


    return(
    <nav className="navbar navbar-expand-lg navbar-dark bg-primary shadow">
    <div className="container">
     
      <Link className="navbar-brand fw-bold" to="/admin">
        📚 StudyNook
      </Link>

    
      <button
        className="navbar-toggler"
        type="button"
        onClick={() => setMenuOpen(!menuOpen)}
      >
        <span className="navbar-toggler-icon"></span>
      </button>

      {/* Navbar Links */}
      <div className={`collapse navbar-collapse ${menuOpen ? "show" : ""}`}>
        <ul className="navbar-nav me-auto">
          <li className="nav-item">
            <Link className="nav-link" to="/admin">Dashboard</Link>
          </li>
          <li className="nav-item dropdown">
  <Link 
    className="nav-link dropdown-toggle" 
    to="#" 
    id="navbarDropdown" 
    role="button" 
    data-bs-toggle="dropdown" 
    aria-expanded="false"
  >
    Books
  </Link>
  <ul className="dropdown-menu" aria-labelledby="navbarDropdown">
    <li>
      <Link className="dropdown-item" to="/admin/addbook">Add Book</Link>
    </li>
    <li>
      <Link className="dropdown-item" to="/admin/viewbook">View Books</Link>
    </li>
  </ul>
</li>

{role == "librarian"?<li className="nav-item">
            <Link className="nav-link" to="/admin/issuerequest">Issue Request</Link>
          </li> :null}

          {role == "librarian"?<li className="nav-item">
            <Link className="nav-link" to="/admin/returnrequest">Return Request</Link>
          </li> :null}

          <li className="nav-item">
            <Link className="nav-link" to="/admin/issued">Books Borrowed</Link>
          </li>

          {role == "admin"?<li className="nav-item">
            <Link className="nav-link" to="/admin/addlibrarian">Add Librarian</Link>
          </li> :null}
        </ul>

       
        <ul className="navbar-nav">
          {token ? (
            

            <li className="nav-item dropdown">
              <button
                className="btn btn-light dropdown-toggle"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                👤 Profile
              </button>
              <ul className="dropdown-menu dropdown-menu-end">
                <li>
                  <Link className="dropdown-item" to="/admin">Dashboard</Link>
                </li>
                <li><hr className="dropdown-divider" /></li>
                <li>
                  <button className="dropdown-item" onClick={handleLogout}>
                    Logout
                  </button>
                </li>
              </ul>
            </li>
          ) : (
            <>
              <li className="nav-item">
                <Link className="btn btn-light me-2" to="/admin-login">Login</Link>
              </li>
            </>
          )}
        </ul>
      </div>
    </div>
  </nav>
    )
}