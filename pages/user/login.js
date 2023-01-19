import React, { useContext } from 'react'
import Link from 'next/link'
import StateContext from '../../context/StateContext'
import { urlFor } from '../../lib/client'
import Head from 'next/head'

const login = () => {
  const context = useContext(StateContext)
  const title = context.title[0]

  return (
    <>
      <Head>
        <title>Login | Xtrack.pk</title>
      </Head>
      <div className="container register-box my-5">
        <div className="row d-flex flex-column justify-content-center align-items-center text-center">
          <div className="py-5 col bg-dark">
            <Link href="/">
              {title ? (
                <img
                  src={urlFor(title?.logo)}
                  alt="xtrack"
                  className=""
                  height="60px"
                />
              ) : null}
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
            <form
              className="text-small text-start"
              onSubmit={context.loginHandler}
            >
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
              <span className={context.messageStyle.join(' ')}>
                {context.message}
              </span>
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
    </>
  )
}

export default login
