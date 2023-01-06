import React, { useContext , useState } from 'react'
import Link from 'next/link'
import { BiUser } from 'react-icons/bi'
import StateContext from '../../context/StateContext'

const User = () => {
  let user;
  const context = useContext(StateContext)
  context.user ? user = context.user : null

  return (
    <>
      <div className="col dropdown user-dropdown justify-content-center align-items-center p-0">
        <span
          className="dropdown-toggle text-white fs-6"
          id="navbarDropdown"
          role="button"
          data-bs-toggle="dropdown"
          aria-expanded="false"
        >
          <BiUser />
        </span>
        <ul
          className="dropdown-menu border-0 rounded-0 bg-dark"
          aria-labelledby="navbarDropdown"
        >
          {/* login register */}
          {context.auth.currentUser?.email ? (
            <>
              {/* registerd user name display */}
              <li>
                <span className="dropdown-item text-small text-white py-3">
                  <span className="fs-6 text-white">Welcome {context.auth.currentUser?.displayName}</span>
                  <br></br>
                  Logged in with
                  <br></br>
                  <span className="text-small text-white">
                    {context.auth.currentUser?.email}
                  </span>
                </span>
              </li>
              <li>
                <Link href='/user/dashboard' className='text-decoration-none'>
                  <span className="dropdown-item text-small text-white">
                    Head to Dashboard
                  </span>
                </Link>
              </li>
            </>
          ) : (
            <>
              <li>
                <Link href="/user/login" className="text-decoration-none">
                  <span
                    className="dropdown-item text-small text-white"
                    href="#"
                  >
                    Login
                  </span>
                </Link>
              </li>
              <li>
                <Link
                  href="/user/registration"
                  className="text-decoration-none"
                >
                  <span
                    className="dropdown-item text-small text-white"
                    href="/"
                  >
                    Register
                  </span>
                </Link>
              </li>
            </>
          )}
        </ul>
      </div>
    </>
  )
}

export default User
