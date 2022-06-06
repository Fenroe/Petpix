import React, { useState, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import { GiTurtleShell } from 'react-icons/gi'
import backgroundImage from '../assets/background.jpg'
import { emailLogin } from '../firebase'

export default function Login () {
  const emailRef = useRef()

  const passwordRef = useRef()

  const [errorMessage, setErrorMessage] = useState('')

  const navigate = useNavigate()

  function handleErrors (error, input) {
    if (!error) setErrorMessage('')
    setErrorMessage(error)
  }

  function resetErrorMessage () {
    setErrorMessage('')
  }

  function validateEmail () {
    if (!emailRef) return
    if (emailRef.current.value === '') return handleErrors('Email field can\'t be left blank')
    const email = /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/g
    if (!email.test(emailRef.current.value)) return handleErrors('Please enter a valid email')
    resetErrorMessage()
    return true
  }

  function validatePassword () {
    if (!passwordRef) return
    if (emailRef.current.value === '') return handleErrors('Password field can\'t be left blank')
    const password = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/gm
    if (!password.test(passwordRef.current.value)) return handleErrors('Passwords must have eight or more characters and contain at least one lowercase letter, uppercase letter, and number')
    resetErrorMessage()
    return true
  }

  async function handleSubmit (evt) {
    evt.preventDefault()
    if (validateEmail() !== true) return
    if (validatePassword() !== true) return
    emailLogin(emailRef.current.value, passwordRef.current.value, handleErrors).then(() => navigate('/'))
  }

  return (
    <div className="flex flex-col-reverse md:flex-row">
      <div className="">
        <img className="w-[500px] md:h-full md:w-full object-cover" src={backgroundImage} />
      </div>
      <main className="min-w-[500px] max-w-[500px] h-full min-h-screen bg-white flex flex-col justify-center">
        <div className="flex flex-col items-center w-[90%] mx-auto">
          <div className="flex flex-col justify-start w-full gap-3">
            <GiTurtleShell className="text-7xl"/>
            <h1 className="text-7xl font-bold font-serif">Welcome back</h1>
          </div>
          <form className="flex flex-col items-center mt-12" noValidate>
            <div className="w-80 mt-8">
              <button className="h-16 border-2 border-black rounded-full w-full text-xl bg-white hover:brightness-95">Continue with Google</button>
            </div>
            <div className="mt-8">
              <span>OR</span>
            </div>
            <div className="relative border-2 border-slate-400 mt-8 focus-within:border-blue-500 mb-3">
              <input ref={emailRef} onBlur={validateEmail} required formNoValidate type="text" className="w-full px-3 pt-5 min-h-[64px] text-lg outline-none bg-none peer" />
              <label htmlFor="" className="ml-2 text-slate-400 absolute top-1/2 left-1 -translate-y-1/2 text-lg pointer-events-none duration-300 peer-valid:top-4 peer-valid:text-sm peer-focus:top-4 peer-focus:text-sm">Email</label>
            </div>
            <div className="relative border-2 border-slate-400 focus-within:border-blue-500 mb-3">
              <input ref={passwordRef} onBlur={validatePassword} required formNoValidate type="password" className="w-full px-3 pt-5 min-h-[64px] text-lg outline-none bg-none peer" />
              <label htmlFor="" className="ml-2 text-slate-400 absolute top-1/2 left-1 -translate-y-1/2 text-lg pointer-events-none duration-300 peer-valid:top-4 peer-valid:text-sm peer-focus:top-4 peer-focus:text-sm">Password</label>
            </div>
            <button onClick={(e) => handleSubmit(e)} className="mt-3 h-10 w-48 px-3 rounded-full border-2 border-white text-xl font-bold text-white bg-red-500 hover:brightness-125">Log in</button>
            <div className="text-red-400 p-2 max-w-full">
              <span>{errorMessage}</span>
            </div>
          </form>
          <span className="text-lg mt-3 mb-3">Don&apos;t have an account? <a className="text-red-500" href="/#/signup">Sign up</a></span>
        </div>
      </main>
    </div>
  )
}
