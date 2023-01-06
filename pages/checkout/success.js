import React, { useContext } from 'react'
import Link from 'next/link'
import CartStateContext from '../../context/CartContext'
import StateContext from '../../context/StateContext'

const success = () => {
  const context = useContext(CartStateContext)
  const state = useContext(StateContext)

  return (
    <div className="container text-center empty-box">
      <div className="text-upprecase fs-5">
        <span>Thanks for your order!</span>
        {state.auth.currentUser?.email ? (
          <>
            <br></br>
            <span className="text-small">
              <strong>
              Visit 
                <Link href="/user/dashboard" className='ps-1'>dashboard</Link> to track your order
                details.
              </strong>
            </span>
            <br></br>
            <span className="text-small">
              Your order has been placed we will contact you as soon as
              possible.
            </span>
          </>
        ) : (
          <>
            <br></br>
            <span className="text-small">
              <strong>
                <Link href="/user/login">Login</Link> to track your order
                details.
              </strong>
            </span>
            <br></br>
            <span className="text-small">
              Your order has been placed we will contact you as soon as
              possible.
            </span>
          </>
        )}
      </div>
      <div className="mt-3">
        <Link href="/">
          <button type="button" class="btn btn-danger">
            Go to shop
          </button>
        </Link>
      </div>
    </div>
  )
}

export default success
