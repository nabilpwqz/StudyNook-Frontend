// export const Server_URL  = 'http://localhost:5000/'
export const Server_URL = import.meta.env.VITE_BACKEND_URL?.replace(/\/$/, "") || "https://backend-s541.onrender.com";
