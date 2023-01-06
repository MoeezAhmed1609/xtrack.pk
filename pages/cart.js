import React, { useContext, useEffect } from 'react'
import Link from 'next/link'
import CartStateContext from '../context/CartContext'
import { AiOutlineDelete } from 'react-icons/ai'
import commerce from '../lib/commerce'

const cart = () => {
  const context = useContext(CartStateContext)
  const isEmpty = context.cart.line_items?.length === 0
  if (isEmpty) {
    return (
      <>
        <div className="container text-center empty-box">
          <span className="fs-6 ">Your cart is empty add some products!</span>
          <button className="btn btn-danger text-uppercase my-4">
            <Link href="/" className="text-white text-decoration-none">
              Go to shop
            </Link>
          </button>
        </div>
      </>
    )
  }
  return (
    <>
      <div className="container-fluid cart-box">
        <div className="row m-lg-3">
          <div className="col-lg-8 col-12 py-3 ">
            <div className="border-bottom border-danger mb-4">
              <span className="fs-4 text-danger text-uppercase col-9">
                Shopping Cart
              </span>
              <span className="fs-6 col-3 ps-3">
                ({context.cart.total_items} Items)
              </span>
            </div>
            <div className="container">
              <div className="row">
                <div className="col-12">
                  <table className="table">
                    <thead>
                      <tr className="col-12">
                        <th className="col-8" scope="col">
                          Products
                        </th>
                        <th className="col-2" scope="col">
                          Quantity
                        </th>
                        <th className="col-2" scope="col">
                          Price
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {context.cart.line_items?.map((item) => (
                        <>
                          <CartItem key={item.id} {...item} />
                        </>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
          <div className="col-lg-4 col-12 bg-light mt-5 border total-box">
            <CartTotal cart={context.cart} />
          </div>
        </div>
      </div>
    </>
  )
}

export default cart

const CartItem = ({
  selected_options,
  name,
  image,
  id,
  quantity,
  line_total,
}) => {
  const context = useContext(CartStateContext)

  const decrementQuantity = () => {
    quantity > 1
      ? commerce.cart
          .update(id, { quantity: quantity - 1 })
          .then((cart) => context.setCart(cart))
      : context.removeFromCart(id)
  }

  const incrementQuantity = () => {
    commerce.cart
      .update(id, { quantity: quantity + 1 })
      .then((cart) => context.setCart(cart))
  }

  return (
    <>
      <tr>
        <th scope="row" className="text-center d-flex align-items-center">
          <button
            type="button"
            className="btn text-danger px-lg-2 px-md-2 px-1"
            onClick={() => context.removeFromCart(id)}
          >
            <AiOutlineDelete />
          </button>
          <img
            className="ms-lg-3 ms-md-2 ms-0"
            src={image?.url}
            height={70}
          ></img>
          <span className="text-small text-uppercase fw-normal ps-3 d-none d-sm-block">
            {name}
          </span>
          <br></br>
          <span className="ps-1">
            {selected_options?.map((option) => (
              <span
                className="text-tiny px-1 d-none d-sm-block"
                key={option._id}
              >
                {option.option_name}
              </span>))}
          </span>
        </th>
        <td className="pt-4 pb-0">
          <div className="d-flex align-items-center">
            <button
              type="button"
              className="btn fs-5 px-1"
              onClick={decrementQuantity}
            >
              -
            </button>
            <p className="fs-6 px-lg-3 px-1">{quantity}</p>
            <button
              type="button"
              className="btn fs-6 px-1"
              onClick={incrementQuantity}
            >
              +
            </button>
          </div>
        </td>
        <td className="pt-4">{line_total.formatted}</td>
      </tr>
    </>
  )
}

const CartTotal = ({ cart }) => {
  return (
    <>
      <div className="container total-box">
        <div className="row">
          <div className="col-12 pt-4 border-bottom border-dark">
            <span className="text-uppercase fw-bold">Cart Total</span>
          </div>
          <div className="row pt-2 border-bottom border-seconary ms-1 my-2 py-1">
            <div className="col-4">
              <span className="text-uppercase text-small">subtotal</span>
            </div>
            <div className="col-8">
              <span className="text-uppercase text-small">
                {cart.subtotal?.formatted_with_code}
              </span>
            </div>
          </div>
          <div className="row pt-2 border-bottom border-seconary ms-1 my-2 pb-1">
            <div className="col-4">
              <span className="text-uppercase text-small">Shipping</span>
            </div>
            <div className="col-8">
              <span className="text-uppercase text-small">
                Delivery Charges (Free)
              </span>
            </div>
          </div>
          <div className="row pt-2 border-bottom border-seconary ms-1 my-2 pb-1">
            <div className="col-4">
              <span className="text-uppercase text-small">Total</span>
            </div>
            <div className="col-8">
              <span className="text-uppercase text-small">
                {cart.subtotal?.formatted_with_code}
              </span>
            </div>
          </div>
          <div className="row">
            <Link
              className="text-dark text-decoration-none"
              href="/checkout/address"
            >
              <button className="btn btn-danger rounded-0 my-4 ms-2">
                Proceed to checkout
              </button>
            </Link>
          </div>
        </div>
      </div>
    </>
  )
}
