import React, { useState, useRef } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { GiTurtleShell } from 'react-icons/gi'
import backgroundImage from '../assets/background.jpg'
import { continueWithGoogle, checkIfUserExists, emailSignup, createUser, addEmail, emailLogin } from '../firebase'

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

  const handleTestAccountLogin = async (evt) => {
    evt.preventDefault()
    try {
      const userCredential = await emailLogin(process.env.REACT_APP_TEST_EMAIL, process.env.REACT_APP_TEST_PASSWORD)
      if (userCredential !== null) navigate('/')
    } catch (err) {
      switch (err.code) {
        case 'auth/user-not-found': {
          handleErrors('Wrong email or password')
          break
        }
        case 'auth/wrong-password': {
          handleErrors('Wrong email or password')
          break
        }
        case 'auth/too-many-requests': {
          handleErrors('Too many login attempts, try later')
          break
        }
        default : {
          handleErrors('Sorry, we couldn\'t verify your login details')
          console.log(err.code)
          break
        }
      }
    }
  }

  return (
    <div className="flex flex-col-reverse overflow-x-hidden md:flex-row">
      <div className="flex-1 hidden md:flex">
        <img className="md:h-full md:w-full object-cover" src={backgroundImage} />
      </div>
      <main className="flex-1 h-screen min-h-screen bg-neutral-100 flex flex-col justify-center">
        <div className="flex flex-col gap-3 items-center w-[90%] mx-auto max-h-[700px]">
          <div className="flex flex-col justify-start items-center w-full gap-3">
            <GiTurtleShell className="text-5xl"/>
            <h1 className="text-5xl font-bold font-serif text-center">Join Snapshot today</h1>
          </div>
          <form className="flex flex-col items-center" noValidate action="">
            <div className="w-80">
              <button onClick={handleGoogleAuth} className="transition-transform mt-4 h-14 border-2 border-neutral-900 rounded-full w-full text-xl bg-neutral-100 hover:scale-110 hover:bg-neutral-200 focus:scale-110">Continue with Google</button>
            </div>
            <div className="mt-4">
              <span>OR</span>
            </div>
            <div className="relative border-2 border-slate-400 mt-4 focus-within:border-blue-500 mb-3 focus-within:scale-110">
              <input ref={emailRef} onBlur={validateEmail} required formNoValidate type="text" className="w-full px-3 pt-5 min-h-[64px] text-lg outline-blue-500 bg-none peer" />
              <label htmlFor="" className="ml-2 text-slate-400 absolute top-1/2 left-1 -translate-y-1/2 text-lg pointer-events-none duration-100 peer-valid:top-4 peer-valid:text-sm peer-focus:top-4 peer-focus:text-sm">Email</label>
            </div>
            <div className="relative border-2 border-slate-400 focus-within:border-blue-500 mb-3 focus-within:scale-110">
              <input ref={passwordRef} onBlur={validatePassword} required formNoValidate type="password" className="w-full px-3 pt-5 min-h-[64px] text-lg outline-blue-500 bg-none peer" />
              <label htmlFor="" className="ml-2 text-slate-400 absolute top-1/2 left-1 -translate-y-1/2 text-lg pointer-events-none duration-100 peer-valid:top-4 peer-valid:text-sm peer-focus:top-4 peer-focus:text-sm">Password</label>
            </div>
            <div className="relative border-2 border-slate-400 focus-within:border-blue-500 mb-3 focus-within:scale-110">
              <input ref={confirmPasswordRef} onBlur={validateConfirmPassword} required formNoValidate type="password" className="w-full px-3 pt-5 min-h-[64px] text-lg outline-blue-500 bg-none peer" />
              <label htmlFor="" className="ml-2 text-slate-400 absolute top-1/2 left-1 -translate-y-1/2 text-lg pointer-events-none duration-100 peer-valid:top-4 peer-valid:text-sm peer-focus:top-4 peer-focus:text-sm">Confirm Password</label>
            </div>
            <button onClick={(e) => handleSubmit(e)} className="transition-transform mt-3 h-10 w-48 px-3 rounded-full border-2 border-neutral-100 text-xl font-bold text-neutral-100 bg-red-500 hover:bg-red-600 hover:scale-110 focus:scale-110">Sign up</button>
            <button onClick={(e) => handleTestAccountLogin(e)} className="transition-transform mt-3 h-10 w-48 px-3 rounded-full border-2 border-neutral-100 text-xl font-bold text-neutral-100 bg-red-500 hover:bg-red-600 hover:scale-110 focus:scale-110">Use test account</button>
            <div className="text-red-500 font-bold p-2 max-w-full h-">
              <span>{errorMessage}</span>
            </div>
          </form>
          <span className="text-lg">Already have an account? <Link to="/login"><span className="text-red-500 cursor-pointer font-bold hover:underline">Log in</span></Link></span>
        </div>
      </main>
    </div>
  )
}
