import React, { useContext } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import logo from '../../assets/xtrack.png'
import track from '../../assets/track-2.png'
import { AiOutlineGoogle } from 'react-icons/ai'
import StateContext from '../../context/StateContext'

const registration = () => {
  const context = useContext(StateContext)

  return (
    <div className="container register-box my-5">
      <div className="row d-flex flex-column justify-content-center align-items-center text-center">
        <div className="py-5 col bg-dark">
          <Link href="/">
            <Image src={logo} alt="logo" height={50} />
            <Image src={track} alt="logo" height={45} />
          </Link>
        </div>
        <div className="pt-3 col text-uppercase text-center">
          <span>Create Your Account</span>
          <br></br>
          <span className="text-tiny text-secondary">
            Already have an account?
            <Link href="/user/login" className="text-decoration-none ps-1">
              Log In
            </Link>
          </span>
        </div>
        {/* <div className="width-400 col py-2">
          <button
            type="button"
            class="btn btn-dark"
            style={{ width: '80%' }}
            onClick={context.googleLoginHandler}
          >
            <span className="pe-2">
              <AiOutlineGoogle />
            </span>
            <span className="text-small">Log in with Google</span>
          </button>
        </div> */}
        {/* <span className="text-center text-tiny pt-2 col">OR</span> */}
        <div className="py-2 mt-3 col" style={{ width: '80%' }}>
          <form
            className="text-small text-start"
            onSubmit={context.registrationHandler}
          >
            <div className='row'>
              <div className="mb-3 col-6">
                <label htmlFor="exampleName" className="form-label">
                  First Name
                </label>
                <input
                  type="text"
                  name="f_name"
                  className="form-control shadow-none border-dark text-capitalize"
                  id="exampleName"
                  aria-describedby="emailHelp"
                />
              </div>
              <div className="mb-3 col-6">
                <label htmlFor="exampleName" className="form-label">
                  Second Name
                </label>
                <input
                  type="text"
                  name="s_name"
                  className="form-control shadow-none border-dark text-capitalize"
                  id="exampleName"
                  aria-describedby="emailHelp"
                />
              </div>
            </div>
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
            <div className="mb-3">
              <label htmlFor="exampleInputPassword2" className="form-label">
                Confirm Password
              </label>
              <input
                type="password"
                name="confirmPassword"
                className="form-control shadow-none border-dark"
                id="exampleInputPassword2"
              />
            </div>
            <span className={context.messageStyle.join(' ')}>
              {context.message}
            </span>
            <div className="d-flex justify-content-center">
              <button
                type="submit"
                className="btn btn-dark text-white"
                style={{ width: '100%' }}
              >
                Register
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

export default registration
