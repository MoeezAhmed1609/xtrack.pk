import React , {useContext} from 'react'
import Link from 'next/link'
import { BiCart } from 'react-icons/bi'
import CartStateContext from '../../../context/CartContext'
const Cart = () => {
  const context = useContext(CartStateContext)
  return (
    <>
      <div className="col  justify-content-center align-items-center">
        <Link href='/cart'>
          <button
            type="button"
            className="btn border-0 position-relative text-white"
          >
            <BiCart />
            <span
              className="position-absolute top-50 start-100 translate-middle badge rounded-pill bg-light text-black"
              style={{ fontSize: '10px' }}
            >
              {context.cart.total_items > 0 ? context.cart.total_items : 0}
            </span>
          </button>
        </Link>
      </div>
    </>
  )
}

export default Cart
