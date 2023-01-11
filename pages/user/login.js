import React, { useContext } from 'react'
import Link from 'next/link'
import logo from '../../assets/xtrack.png'
import track from '../../assets/track-2.png'
import { AiOutlineGoogle } from 'react-icons/ai'
import StateContext from '../../context/StateContext'

const login = () => {
  const context = useContext(StateContext)

  return (
    <div className="container register-box my-5">
      <div className="row d-flex flex-column justify-content-center align-items-center text-center">
        <div className="py-5 col bg-dark">
          <Link href="/">
            <img src={logo} alt="logo" height={50} />
            <img src={track} alt="logo" height={45} />
          </Link>
        </div>
        <div className="pt-4 col text-uppercase text-center">
          <span>Login to your account</span>
          <br></br>
          <span className="text-tiny text-secondary">
            Don't have an account?
            <Link
              href="/user/registration"
              className="text-decoration-none ps-1"
            >
              Register
            </Link>
          </span>
        </div>
        <div className="py-2 col mt-3" style={{ width: '80%' }}>
          <form className="text-small text-start" onSubmit={context.loginHandler}>
            <div className="mb-3">
              <label htmlFor="exampleInputEmail1" className="form-label">
                Email address
              </label>
              <input
                type="email"
                name="email"
                className="form-control shadow-none border-dark"
                id="exampleInputEmail1"
                aria-describedby="emailHelp"
              />
            </div>
            <div className="mb-3">
              <label htmlFor="exampleInputPassword1" className="form-label">
                Password
              </label>
              <input
                type="password"
                name="password"
                className="form-control shadow-none border-dark"
                id="exampleInputPassword1"
              />
            </div>
            <span className={context.messageStyle.join(' ')}>{context.message}</span>
            <div className="d-flex justify-content-center">
              <button
                type="submit"
                className="btn btn-dark text-white"
                style={{ width: '100%' }}
              >
                Login
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

export default login
