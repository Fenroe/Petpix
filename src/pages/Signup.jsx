import React, { useState, useRef } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { GiTurtleShell } from 'react-icons/gi'
import backgroundImage from '../assets/background.jpg'
import { continueWithGoogle, checkIfUserExists, emailSignup, createUser, addEmail } from '../firebase'

export const Signup = () => {
  const emailRef = useRef()

  const passwordRef = useRef()

  const confirmPasswordRef = useRef()

  const [errorMessage, setErrorMessage] = useState('')

  const navigate = useNavigate()

  const handleErrors = (error) => {
    setErrorMessage(error)
  }

  const resetErrorMessage = () => {
    setErrorMessage('')
  }

  const validateEmail = () => {
    if (!emailRef) return
    if (emailRef.current.value === '') return handleErrors('Email field can\'t be left blank')
    const email = /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/g
    if (!email.test(emailRef.current.value)) return handleErrors('Please enter a valid email')
    resetErrorMessage()
    return true
  }

  const validatePassword = () => {
    if (!passwordRef) return
    if (passwordRef.current.value.length < 6) return handleErrors('Your password must be at least six characters long')
    resetErrorMessage()
    return true
  }

  const validateConfirmPassword = () => {
    if (!confirmPasswordRef) return
    if (passwordRef.current.value === '') return
    if (passwordRef.current.value !== confirmPasswordRef.current.value) return handleErrors('Passwords don\'t match')
    resetErrorMessage()
    return true
  }

  const handleGoogleAuth = async (evt) => {
    evt.preventDefault()
    try {
      const userCredential = await continueWithGoogle()
      if (userCredential !== null) {
        checkIfUserExists().then(() => navigate('/'))
      }
    } catch (error) {
      handleErrors('Couldn\'t authenticate using Google')
    }
  }

  const handleSubmit = async (evt) => {
    evt.preventDefault()
    try {
      if (validateEmail() !== true) return
      if (validatePassword() !== true) return
      if (validateConfirmPassword() !== true) return
      emailSignup(emailRef.current.value, passwordRef.current.value)
        .then((result) => {
          if (result !== null) {
            createUser()
          }
        })
        .then(() => addEmail(emailRef.current.value))
        .then(() => navigate('/'))
    } catch (error) {
      handleErrors(error.message)
    }
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
            <h1 className="text-7xl font-bold font-serif text-center">Join Snapshot today</h1>
          </div>
          <form className="flex flex-col items-center mt-12" noValidate action="">
            <div className="w-80 mt-8">
              <button onClick={handleGoogleAuth} className="h-16 border-2 border-black rounded-full w-full text-xl bg-white hover:brightness-95">Continue with Google</button>
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
            <div className="relative border-2 border-slate-400 focus-within:border-blue-500 mb-3">
              <input ref={confirmPasswordRef} onBlur={validateConfirmPassword} required formNoValidate type="password" className="w-full px-3 pt-5 min-h-[64px] text-lg outline-none bg-none peer" />
              <label htmlFor="" className="ml-2 text-slate-400 absolute top-1/2 left-1 -translate-y-1/2 text-lg pointer-events-none duration-300 peer-valid:top-4 peer-valid:text-sm peer-focus:top-4 peer-focus:text-sm">Confirm Password</label>
            </div>
            <button onClick={(e) => handleSubmit(e)} className="mt-3 h-10 w-48 px-3 rounded-full border-2 border-white text-xl font-bold text-white bg-red-500 hover:brightness-125">Sign up</button>
            <div className="text-red-400 p-2 max-w-full">
              <span>{errorMessage}</span>
            </div>
          </form>
          <span className="text-lg mt-3 mb-3">Already have an account? <Link to="/login"><span className="text-red-500 cursor-pointer">Log in</span></Link></span>
        </div>
      </main>
    </div>
  )
}
