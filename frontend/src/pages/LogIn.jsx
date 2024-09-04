import React, { useRef } from "react";
import { useMutation } from "@tanstack/react-query";
import { queryClient, submitLogIn } from "../util/http";
import { useNavigate } from "react-router-dom";

const LogIn = () => {
  const emailRef = useRef();
  const passwordRef = useRef();
  const navigate = useNavigate();

  const { mutate, isLoading, isError, error } = useMutation({
    mutationFn: submitLogIn,
    onSuccess: ({ userName }) => {
      queryClient.invalidateQueries({ queryKey: ["authUser"] });
      navigate("/home" );
    },
  });

  function handleSubmit() {
    console.log("click");
    mutate({
      email: emailRef.current.value,
      password: passwordRef.current.value,
    });
  }

  if (isLoading) return <h2>Loading</h2>;

  return (
    <div>
      <h1>Log in</h1>
      <form>
        <p>
          <label htmlFor="email">Email</label>
          <input type="email" id="email" ref={emailRef} />
        </p>
        <p>
          <label htmlFor="password">password</label>
          <input type="password" id="password" ref={passwordRef} />
        </p>
        <button type="button" onClick={handleSubmit}>
          Log in
        </button>
      </form>
    </div>
  );
};

export default LogIn;
