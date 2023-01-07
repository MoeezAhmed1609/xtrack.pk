import React, { useContext, useEffect, useState } from 'react'
import Link from 'next/link'
import StateContext from '../../context/StateContext'
import CartStateContext from '../../context/CartContext'
import { app, database } from '../../lib/firebase'
import { getAuth } from 'firebase/auth'
import { getDatabase, set, ref, child, get } from 'firebase/database'
import { MdOutlineRateReview } from 'react-icons/md'
import { AiOutlineCheck } from 'react-icons/ai'
import { AiOutlineStar, AiFillStar } from 'react-icons/ai'
import { v4 as uuid } from 'uuid'

const dashboard = () => {
  const [userOrder, setUserOrder] = useState([])
  const reviewNumber = uuid()
  const context = useContext(StateContext)
  const auth = getAuth()
  const database = getDatabase()
  const dbRef = ref(database)

  const reviewSubmitHandler = (product_name) => {
    return (event) => {
      event.preventDefault()
      const date = new Date();
      const review = event.target.review.value
      const product = product_name
      const rating = event.target.rating.value
      set(ref(database, 'reviews/' + product + '/' + reviewNumber), {
        date : date,
        user: auth.currentUser.displayName,
        email: auth.currentUser.email,
        quantity: reviewNumber,
        product: product,
        review: review,
        rating: rating,
      })
      alert('Thanks for Review!')
      window.location.reload()
    }
  }

  useEffect(() => {
    get(child(dbRef, `orders/${auth.currentUser?.displayName?.toLowerCase()}`))
      .then((snapshot) => {
        setUserOrder(snapshot.val())
      })
      .catch((error) => {
        console.error(error)
      })
  }, [auth.currentUser])
  return (
    <div style={{ minHeight: '70vh' }}>
      {context.auth.currentUser ? (
        <>
          <div className="container my-5">
            <ul className="nav nav-tabs tab-link" id="myTab" role="tablist">
              <li className="nav-item text-small" role="presentation">
                <button
                  className="nav-link active bg-dark text-white text-uppercase text-small me-2"
                  id="home-tab"
                  data-bs-toggle="tab"
                  data-bs-target="#home"
                  type="button"
                  role="tab"
                  aria-controls="home"
                  aria-selected="true"
                >
                  Dashboard
                </button>
              </li>
              <li className="nav-item text-small" role="presentation">
                <button
                  className="nav-link bg-dark text-white text-uppercase me-1"
                  id="profile-tab"
                  data-bs-toggle="tab"
                  data-bs-target="#profile"
                  type="button"
                  role="tab"
                  aria-controls="profile"
                  aria-selected="false"
                >
                  Orders
                </button>
              </li>
            </ul>
            <div className="tab-content border border-2" id="myTabContent">
              <div
                className="tab-pane fade show active p-4"
                id="home"
                role="tabpanel"
                aria-labelledby="home-tab"
              >
                {context.auth.currentUser?.email ? (
                  <>
                    <span className="fs-4">
                      Welcome {context.auth?.currentUser?.displayName}!
                    </span>
                    <br></br>
                    Logged in with
                    <br></br>
                    <span>{context.auth.currentUser?.email}</span>
                    <br></br>
                    <span className="pt-3">
                      You can access your order details and account information
                      here!
                    </span>
                    <br />
                    <button
                      type="button"
                      className="btn btn-danger mt-3"
                      onClick={context.logOutHandler}
                    >
                      Logout
                    </button>
                  </>
                ) : null}
              </div>
              <div
                className="tab-pane fade p-lg-4 p-md-3 p-1"
                id="profile"
                role="tabpanel"
                aria-labelledby="profile-tab"
              >
                <div className="col-12">
                  {userOrder ? (
                    <>
                      <span className="fs-6 fw-bold">
                        Kindly give rating & review
                        <span className="text-danger fs-4 px-2">
                          <MdOutlineRateReview />
                        </span>
                        for every product!
                      </span>
                      <table className="table">
                        <thead>
                          <tr className="col-12">
                            <th className="col-lg-9 col-8" scope="col">
                              Products
                            </th>
                            <th className="col" scope="col">
                              Quantity
                            </th>
                            <th className="col" scope="col">
                              Price
                            </th>
                          </tr>
                        </thead>
                        <tbody>
                          {Object.values(userOrder).map((order) =>
                            order.products.map((product) => (
                              <tr key={product.id}>
                                <th
                                  scope="row"
                                  className="position-relative d-flex align-items-center"
                                >
                                  <div className="dropdown">
                                    <button
                                      type="button"
                                      className="btn dropdown-toggle text-danger px-0 border-0"
                                      id="review-btn"
                                      data-bs-toggle="dropdown"
                                      aria-expanded="false"
                                      data-bs-auto-close="false"
                                    >
                                      <MdOutlineRateReview />
                                    </button>
                                    <form
                                      className="dropdown-menu review-panel py-0"
                                      onSubmit={reviewSubmitHandler(
                                        product.product_name,
                                      )}
                                    >
                                      <div className="form-floating bg-white">
                                        <textarea
                                          className="form-control"
                                          placeholder="Leave a review here"
                                          name="review"
                                          id="floatingTextarea"
                                          style={{ minHeight: '180px' }}
                                        ></textarea>
                                        <label
                                          for="floatingTextarea"
                                          className="text-small"
                                        >
                                          {product.product_name}
                                        </label>
                                      </div>
                                      <div className="col-auto">
                                        <label
                                          className="visually-hidden"
                                          htmlFor="autoSizingInput"
                                        >
                                          Rate this product...
                                        </label>
                                        <input
                                          type="number"
                                          className="form-control"
                                          id="autoSizingInput"
                                          placeholder="5 stars"
                                          name="rating"
                                          min="1"
                                          max="5"
                                        />
                                      </div>

                                      <button
                                        type="submit"
                                        className="btn btn-danger btn-sm p-0 text-tiny"
                                        style={{ width: '100%' }}
                                      >
                                        <AiOutlineCheck />
                                      </button>
                                    </form>
                                  </div>
                                  <img
                                    src={product.image?.url}
                                    height="70px"
                                    alt={product.product_name}
                                  />
                                  <span className="text-small d-none d-sm-block">
                                    {product.product_name}
                                  </span>
                                  <span className="ps-1 d-none d-sm-block">
                                    (
                                    {product.selected_options?.map((option) => (
                                      <span
                                        className="text-tiny px-1"
                                        key={option._id}
                                      >
                                        {option.option_name}
                                      </span>
                                    ))}
                                    )
                                  </span>
                                </th>
                                <td>
                                  <div className="pt-2">
                                    {product?.quantity}
                                  </div>
                                </td>
                                <td>
                                  <div className="pt-2">
                                    {product.line_total?.formatted}
                                  </div>
                                </td>
                              </tr>
                            )),
                          )}
                        </tbody>
                      </table>
                    </>
                  ) : (
                    <div className="container d-flex flex-column justify-content-center align-items-center">
                      <span className="fs-5">No orders yet!</span>
                      <Link href='/' className='text-decoration-none text-white'>
                        <button type="button" className="btn btn-danger mt-3">
                          Go to Shop
                        </button>
                      </Link>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </>
      ) : (
        <>
          <div className="container my-5 text-center width-400">
            <h2>Welcome! please login to access dashboard.</h2>
            <Link href="/user/login">
              <button
                type="button"
                className="btn btn-danger mt-3 p-2 text-uppercase"
                style={{ width: '20vw' }}
              >
                Login
              </button>
            </Link>
          </div>
        </>
      )}
    </div>
  )
}

export default dashboard
