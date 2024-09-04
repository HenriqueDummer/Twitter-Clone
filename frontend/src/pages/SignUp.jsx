import { useMutation } from '@tanstack/react-query'
import React, { useRef } from 'react'
import { queryClient, submitSignUp } from '../util/http'
import { useNavigate } from 'react-router-dom'
import { stringify } from 'uuid'

const SignUp = () => {
  const emailRef = useRef()
  const passwordRef = useRef()
  const fullNameRef = useRef()
  const userNameRef = useRef()

  const navigate = useNavigate()

  const {mutate, isPending, isError, error} = useMutation({
    mutationFn: submitSignUp,
    onSuccess: ({userName}) => {
        queryClient.invalidateQueries({queryKey: ["authUser"]})
        navigate('/profile/' + userName)
    }
  })

  console.log(error)

  function handleSubmit(){
    console.log("click")
    mutate({
        userName: userNameRef.current.value,
        fullName: fullNameRef.current.value,
        email: emailRef.current.value,
        password: passwordRef.current.value
    })
  }

  if(isPending) return <h1>Loading...</h1>
  return (
    <div>
        <h1>Sign up</h1>
        <form>
            <p>
                <label htmlFor="email">Email</label>
                <input type="email" id="email" ref={emailRef} />
            </p>
            <p>
                <label htmlFor="password">password</label>
                <input type="password" id="password" ref={passwordRef} />
            </p>
            <p>
                <label htmlFor="userName">Username</label>
                <input type="text" id="userName" ref={userNameRef} />
            </p>
            <p>
                <label htmlFor="fullName">Full name</label>
                <input type="text" id="fullName" ref={fullNameRef} />
            </p>
            <button type='button' onClick={handleSubmit}>
                Sign Up
            </button>
        </form>
    </div>
  )
}

export default SignUp