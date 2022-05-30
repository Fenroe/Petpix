import React, { useState, useRef } from 'react'
import { GiTurtleShell } from 'react-icons/gi'
import backgroundImage from '../assets/background.jpg'
import { emailSignup } from '../firebase'

export default function Login () {
  const unavailableEmails = ['example@123.com']

  const emailRef = useRef()

  const passwordRef = useRef()

  const [emailErrorMessage, setEmailErrorMessage] = useState('')

  const [passwordErrorMessage, setPasswordErrorMessage] = useState('')

  function handleErrors (error, input) {
    if (input === 'email') {
      if (!error) setEmailErrorMessage('')
      setEmailErrorMessage(error)
    }
    if (input === 'password') {
      if (!error) setPasswordErrorMessage('')
      setPasswordErrorMessage(error)
    }
  }

  function validateEmail () {
    let error = ''
    if (!emailRef) return
    const email = /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/g
    if (!email.test(emailRef.current.value)) error = 'Please enter a valid email'
    if (unavailableEmails.includes(emailRef.current.value)) error = 'That email is already in use'
    handleErrors(error, 'email')
    if (error) return false
    return true
  }

  function validatePassword () {
    let error = ''
    if (!passwordRef) return
    const password = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/gm
    if (!password.test(passwordRef.current.value)) error = 'Passwords must have eight or more characters and contain at least one lowercase letter, uppercase letter, and number'
    handleErrors(error, 'password')
    if (error) return false
    return true
  }

  function handleSubmit (evt) {
    evt.preventDefault()
    if (unavailableEmails.includes(emailRef.current.value)) {
      handleErrors('That email is already in use', 'email')
      return false
    }
    emailSignup(emailRef.current.value, passwordRef.current.value)
    emailRef.current.value = ''
    passwordRef.current.value = ''
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
              <button className="h-16 border-2 border-black rounded-full w-full text-xl bg-white hover:brightness-95">Continue with Google</button>
            </div>
            <div className="mt-8">
              <span>OR</span>
            </div>
            <div className="relative border-2 border-slate-400 mt-8 focus-within:border-blue-500">
              <input ref={emailRef} onBlur={validateEmail} required formNoValidate type="text" className="w-full px-3 pt-5 min-h-[64px] text-lg outline-none bg-none peer" />
              <label htmlFor="" className="ml-2 text-slate-400 absolute top-1/2 left-1 -translate-y-1/2 text-lg pointer-events-none duration-300 peer-valid:top-4 peer-valid:text-sm peer-focus:top-4 peer-focus:text-sm">Email</label>
            </div>
            <div className="text-red-400 p-2 max-w-full">
              <span>{emailErrorMessage}</span>
            </div>
            <div className="relative border-2 border-slate-400 focus-within:border-blue-500">
              <input ref={passwordRef} onBlur={validatePassword} required formNoValidate type="password" className="w-full px-3 pt-5 min-h-[64px] text-lg outline-none bg-none peer" />
              <label htmlFor="" className="ml-2 text-slate-400 absolute top-1/2 left-1 -translate-y-1/2 text-lg pointer-events-none duration-300 peer-valid:top-4 peer-valid:text-sm peer-focus:top-4 peer-focus:text-sm">Password</label>
            </div>
            <div className="text-red-400 p-2 max-w-full">
              <span>{passwordErrorMessage}</span>
            </div>
            <button onClick={(e) => handleSubmit(e)} className="mt-3 h-10 w-48 px-3 rounded-full border-2 border-white text-xl font-bold text-white bg-red-500 hover:brightness-125">Sign up</button>
          </form>
          <span className="text-lg mt-3 mb-3">Already have an account? <a className="text-red-500" href="/#/login">Log in</a></span>
        </div>
      </main>
    </div>
  )
}
