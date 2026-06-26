import { useEffect, useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { Server_URL } from "../utils/config";
import AdminNavbar from "../components/adminnavbar";
import AdminFooter from "../components/AdminFooter";
import { ToastContainer } from 'react-toastify';

export default function adminLayout() {
  const [render,setRender] = useState(false);
  const [role, setRole] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const check = async () => {
      try {
        const res = await fetch(`${Server_URL}users/profile`, { credentials: 'include' });
        if (!res.ok) return navigate('/login');
        const data = await res.json();
        const r = data.user?.role;
        setRole(r);
        if (r === 'librarian' || r === 'admin') setRender(true);
        else navigate('/login');
      } catch (err) {
        navigate('/login');
      }
    };
    check();
  },[])


  return (
    <>

    {render ? <><AdminNavbar />
          <Outlet />
          <AdminFooter /></> :
          null
          }
          <ToastContainer
position="top-right"
autoClose={1000}
hideProgressBar={false}
newestOnTop={false}
closeOnClick
rtl={false}
pauseOnFocusLoss
draggable
pauseOnHover
theme="light"
/> 
    </>
  );
}
