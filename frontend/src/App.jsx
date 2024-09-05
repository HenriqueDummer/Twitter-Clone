import {
  BrowserRouter,
  Route,
  Routes,
  Navigate,
  useNavigate
} from "react-router-dom";
import { QueryClientProvider, useQuery } from "@tanstack/react-query";

import { getMe } from "./util/http.js";

import SignUp from "./pages/SignUp";
import LogIn from "./pages/LogIn";
import Profile from "./pages/Profile.jsx";
import Home from "./pages/Home.jsx";
import Navbar from "./components/Navbar.jsx";

function App() {
  const navigate = useNavigate()
  const {
    data: authUser,
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["authUser"],
    queryFn: getMe,
    retry: false,
  });

  if(isLoading) return <h1>Loading</h1>


  return (
    <div className="flex h-screen bg-slate-900">
      {authUser && <Navbar />}
      <Routes>
        <Route path="/" element={authUser ? <Home/> : <Navigate to="/login" /> } />
        <Route path='/login' element={!authUser ? <LogIn /> : <Navigate to='/' />} />
        <Route path='/profile/:userName' element={authUser ? <Profile /> : <Navigate to='/login' />} />
      </Routes>
    </div>
  );
}

export default App;
