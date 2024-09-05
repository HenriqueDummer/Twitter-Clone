import { useMutation, useQuery } from "@tanstack/react-query";
import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { queryClient, submitLogOut } from "../util/http";

const Navbar = () => {
  const navigate = useNavigate()
  const {mutate: logout , isLoading, isError, error} = useMutation({
    mutationFn: submitLogOut,
    onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ["authUser"] });
    }
  })
  const { data: authUser } = useQuery({ queryKey: ["authUser"] });

  const listStyle = "w-full "
  const linkStyle = "w-full bg-zinc-700 py-1 px-2 rounded-lg  text-slate-300 text-xl"
  return (
    <nav className="h-full w-1/4 bg-slate-900 flex flex-col justify-between items-center">
      <div className="profile">
        <img
          className="w-40 h-40 rounded-[10rem]"
          src={authUser?.profileImg}
          alt=""
        />
        <h2 className="text-zinc-300 text-lg">{authUser?.fullName}</h2>
        <p className="text-zinc-400">@{authUser?.userName}</p>
      </div>
      <ul className="flex flex-col gap-5 w-full px-2">
        <li className={listStyle}>
          <Link className={linkStyle} to="/">Home</Link>
        </li>
        <li className={listStyle}>
          <Link className={linkStyle}  to="/notificaions/">Notifications</Link>
        </li>
        <li className={listStyle}>
          <Link className={linkStyle}  to={`/profile/${authUser?.userName}`}>Profile</Link>
        </li>
      </ul>
      <button className="w-full mb-8 bg-zinc-700 py-2 px-2 rounded-lg  text-slate-300 text-xl" onClick={logout}>
        Logout
      </button>
    </nav>
  );
};

export default Navbar;
