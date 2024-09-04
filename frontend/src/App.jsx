import {
  BrowserRouter,
  createBrowserRouter,
  RouterProvider,
  Route,
  Routes,
  Navigate
} from "react-router-dom";
import { QueryClientProvider, useQuery } from "@tanstack/react-query";

import { getMe } from "./util/http.js";

import SignUp from "./pages/SignUp";
import LogIn from "./pages/LogIn";
import Profile from "./pages/Profile.jsx";
import Home from "./pages/Home.jsx";
import Navbar from "./components/Navbar.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <SignUp />,
  },
  {
    path: "/login",
    element: <LogIn />,
  },
  {
    path: "/profile/:userName",
    element: <Profile />,
  },
]);

function App() {
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
    <BrowserRouter>
    <div className="flex h-screen bg-slate-900">
      {authUser && <Navbar />}
      <Routes>
        <Route path="/" element={authUser ? <Home/> : <Navigate to="/login" /> } />
        <Route path="/login" element={<LogIn/>} />
      </Routes>
    </div>
    </BrowserRouter>
  );
}

export default App;
