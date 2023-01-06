import React, { useState, useEffect, useContext } from 'react'
import Link from 'next/link'
import CartStateContext from '../../context/CartContext'
import StateContext from '../../context/StateContext'
import commerce from '../../lib/commerce'

const checkout = () => {
  const context = useContext(CartStateContext)
  const stated = useContext(StateContext)
  const cartId = context.cart.id
  const setToken = context.setToken
  const token = context.token

  const [fname, setFname] = useState('')
  const [sname, setSname] = useState('')
  const [phone, setPhone] = useState('')
  const [email, setEmail] = useState('')
  const [address, setAddress] = useState('')
  const [country, setCountry] = useState([])
  const [countryCode, setCountryCode] = useState('')
  const [states, setStates] = useState([])
  const [state, setState] = useState('')
  const [zip, setZip] = useState('')
  const [payment, setPayment] = useState('')

  const provinces = Object.entries(states).map(([code, name]) => ({
    id: code,
    name: name,
  }))

  const setPaymentMethod = (method) => {
    context.setPayment(method)
  }

  const fetchCountries = async (checkoutId) => {
    const { countries } = await commerce.services.localeListShippingCountries(
      checkoutId,
    )
    setCountry(countries.PK)
    setCountryCode(Object.keys(countries))
  }
  const fetchStates = async (countryCode) => {
    const { subdivisions } = await commerce.services.localeListSubdivisions(
      countryCode,
    )
    setStates(subdivisions)
    setState(Object.keys(subdivisions)[0])
  }

  // const orderData = {
  //   line_items: token.lineItems,
  //   custmer: { firstname: fname, lastname: sname, email: email },
  //   shipping: { 
  //     name: 'Domestic',
  //     street: address, 
  //     county_state: state,
  //     postal_zip_code : zip,
  //     shipping_country : countryCode,
  //    },
  //   fulfillment: {
  //     shipping_method: token.shipping_methods[0]
  //   },
  // }

  useEffect(() => {
    const generateToken = async () => {
      try {
        await commerce.checkout
          .generateToken(cartId, { type: 'cart' })
          .then((data) => {
            setToken(data)
            fetchCountries(data.id)
          })
      } catch (error) {
        console.log(error)
      }
    }

    generateToken()
  }, [])
  useEffect(() => {
    if (countryCode) {
      fetchStates(countryCode)
    }
  }, [countryCode])
  return (
    <div className="container my-5">
      <div className="row">
        <div className="col-lg-6 col-12">
          <div className="border-bottom border-danger">
            <span className="fs-4 text-uppercase text-danger">Checkout</span>
          </div>
          <div className="container">
            <div className="row">
              {/* && context.setBillingData({ fname , sname , phone , email , country , state , address  }) */}
              <form onSubmit={context.billingDataHandler}>
                <div className="col-12 py-3">
                  <span className="fs-5 fw-bold text-uppercase">
                    Billing Details
                  </span>
                </div>
                <div className="row">
                  <div className="col-6">
                    <label
                      htmlFor="f-name"
                      className="form-label text-tiny text-uppercase"
                    >
                      First Name<span className="text-danger ps-1">*</span>
                    </label>
                    <input
                      className="form-control form-control-sm mn-1 shadow-none border-dark text-capitalize"
                      id="f-name"
                      name="f_name"
                      required
                      type="text"
                      placeholder="Khizar"
                      onChange={(e) => setFname(e.target.value)}
                      aria-label=".form-control-sm example"
                    ></input>
                  </div>
                  <div className="col-6">
                    <label
                      htmlFor="s-name"
                      className="form-label text-tiny text-uppercase shadow-0"
                    >
                      Second Name<span className="text-danger ps-1">*</span>
                    </label>
                    <input
                      className="form-control form-control-sm mn-1 shadow-none border-dark text-capitalize"
                      id="s-name"
                      name="s_name"
                      required
                      type="text"
                      placeholder="Hasan"
                      onChange={(e) => setSname(e.target.value)}
                      aria-label=".form-control-sm example"
                    ></input>
                  </div>
                  <div className="col-6 pt-2">
                    <label
                      htmlFor="phone"
                      className="form-label text-tiny text-uppercase shadow-0"
                    >
                      phone number<span className="text-danger ps-1">*</span>
                    </label>
                    <input
                      className="form-control form-control-sm mn-1 shadow-none border-dark"
                      id="phone"
                      name="phone"
                      required
                      type="text"
                      placeholder="03*********"
                      onChange={(e) => setPhone(e.target.value)}
                      aria-label="phone"
                    ></input>
                  </div>
                  <div className="col-6 pt-2">
                    <label
                      htmlFor="email"
                      className="form-label text-tiny text-uppercase shadow-0"
                    >
                      email<span className="text-danger ps-1">*</span>
                    </label>
                    <input
                      className="form-control form-control-sm mn-1 shadow-none border-dark"
                      id="email"
                      name="email"
                      required
                      type="text"
                      placeholder="xtrack.pk@gmail.com"
                      value={stated.auth?.currentUser ? stated.auth.currentUser?.email : null}
                      onChange={(e) => setEmail(e.target.value)}
                      aria-label="email"
                    ></input>
                  </div>
                  <div className="col-6 pt-2">
                    <label
                      htmlFor="country"
                      className="form-label text-tiny text-uppercase shadow-0"
                    >
                      country<span className="text-danger ps-1">*</span>
                    </label>
                    <input
                      className="form-control form-control-sm mn-1 shadow-none border-dark"
                      id="country"
                      name="country"
                      required
                      type="text"
                      placeholder="Pakistan"
                      value={country}
                      aria-label="country"
                      readOnly
                    ></input>
                  </div>
                  <div className="col-6 pt-2">
                    <label
                      htmlFor="state"
                      className="form-label text-tiny text-uppercase shadow-0"
                    >
                      state / province
                      <span className="text-danger ps-1">*</span>
                    </label>
                    <select
                      className="form-select form-select-sm text-small shadow-none mn-1 border-dark"
                      aria-label=".form-select-sm example"
                      name="state"
                      required
                      style={{ width: '100%' }}
                      value={state}
                      onChange={(e) => setState(e.target.value)}
                    >
                      {provinces?.map((p) => (
                        <option key={p.id} value={p.id}>
                          {p.name}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div className="col-9 pt-2">
                    <label
                      htmlFor="Address"
                      className="form-label text-tiny text-uppercase shadow-0"
                    >
                      Address<span className="text-danger ps-1">*</span>
                    </label>
                    <input
                      className="form-control form-control-sm mn-1 shadow-none border-dark"
                      id="Address"
                      name="Address"
                      required
                      type="text"
                      placeholder="Full delievery address"
                      onChange={(e) => setAddress(e.target.value)}
                      aria-label="Address"
                    ></input>
                  </div>
                  <div className="col-3 pt-2">
                    <label
                      htmlFor="Zip"
                      className="form-label text-tiny text-uppercase shadow-0"
                    >
                      Zip Code<span className="text-danger ps-1">*</span>
                    </label>
                    <input
                      className="form-control form-control-sm mn-1 shadow-none border-dark"
                      id="Zip"
                      name="Zip"
                      required
                      type="text"
                      placeholder="ZIP"
                      onChange={(e) => setZip(e.target.value)}
                      aria-label="Zip"
                    ></input>
                  </div>
                </div>
                <div className="col-12 mt-4">
                  <button
                    type="submit"
                    className="btn btn-danger btn-lg text-uppercase fs-6"
                    style={{ width: '100%' }}
                  >
                    Place Order
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
        <div className="col-lg-6 col-12">
          <>
            <div className="container total-box">
              <div className="row">
                <div className="col-12 pt-4 border-bottom border-dark">
                  <span className="text-uppercase fw-bold">Cart Total</span>
                </div>
                <div className="row">
                  <div className="col-12 text-small">
                    <table className="table">
                      <thead>
                        <tr>
                          <th scope="col" className="col-9">
                            Products
                          </th>
                          <th scope="col" className="col-3">
                            Total
                          </th>
                        </tr>
                      </thead>
                      {token?.line_items.map((item) => (
                        <tbody key={item.id}>
                          <tr>
                            <th scope="row" className="ps-3 fw-normal">
                              <span className="text-small fw-bold">
                                {item.product_name}
                              </span>
                            </th>
                            <td>{item.line_total.formatted_with_code}</td>
                          </tr>
                        </tbody>
                      ))}
                    </table>
                  </div>
                  <div className="border-bottom col-9 text-small pb-1">
                    <span className=" fw-bold ps-3 pb-2">Delivery Charges</span>
                  </div>
                  <div className="border-bottom col-3 text-small pb-1">
                    <span className="pb-2">
                      {token?.shipping_methods[0].price.formatted_with_code}
                    </span>
                  </div>
                </div>
                <div className="border-bottom col-9 text-small pt-3 pb-1">
                  <span className=" fw-bold ps-3 pb-2">Subtotal</span>
                </div>
                <div className="border-bottom col-3 text-small pt-3 pb-1">
                  <span className="pb-2 fw-bold">
                    {token?.total.raw + token?.shipping_methods[0].price.raw}.00
                    PKR
                  </span>
                </div>
              </div>
              <div className="pt-3">
                <span className="fs-6 fw-bold">Select a payment method</span>
              </div>
              <div className="d-flex align-items-start col-12 my-2">
                <div
                  className="nav flex-column nav-pills me-3 text-small col-4"
                  id="v-pills-tab"
                  role="tablist"
                  aria-orientation="vertical"
                >
                  <button
                    className="nav-link text-uppercase text-dark p-0 text-start py-1 px-2 my-1 border border-danger"
                    id="v-pills-home-tab"
                    data-bs-toggle="pill"
                    data-bs-target="#v-pills-home"
                    type="button"
                    role="tab"
                    aria-controls="v-pills-home"
                    aria-selected="true"
                    onClick={() => setPaymentMethod('COD')}
                  >
                    Cash on delievery
                  </button>
                  <button
                    className="nav-link text-uppercase text-dark p-0 text-start py-1 px-2 my-1 border border-danger"
                    id="v-pills-disabled-tab"
                    data-bs-toggle="pill"
                    data-bs-target="#v-pills-disabled"
                    type="button"
                    role="tab"
                    aria-controls="v-pills-disabled"
                    aria-selected="false"
                    onClick={() => setPaymentMethod('Easypaisa')}
                  >
                    Easypaisa
                  </button>
                  <button
                    className="nav-link text-uppercase text-dark p-0 text-start py-1 px-2 my-1 border border-danger"
                    id="v-pills-messages-tab"
                    data-bs-toggle="pill"
                    data-bs-target="#v-pills-messages"
                    type="button"
                    role="tab"
                    aria-controls="v-pills-messages"
                    aria-selected="false"
                    onClick={() => setPaymentMethod('Bank Transfer')}
                  >
                    Bank Transfer
                  </button>
                </div>
                <div className="tab-content" id="v-pills-tabContent">
                  <div
                    className="tab-pane fade show active"
                    id="v-pills-home"
                    role="tabpanel"
                    aria-labelledby="v-pills-home-tab"
                    tabIndex={0}
                  >
                    <span className="text-small fw-bold">
                      Pay with cash on delievery.
                    </span>
                    <br />
                    <span className="text-small">
                      <strong>Note*</strong> Cash on delivery service is not
                      available in Villages, Self Collection or Incomplete
                      Address (Without House Number). In this condition you can
                      pay through Bank Transfer, Easypaisa or Jazzcash.
                    </span>
                  </div>
                  <div
                    className="tab-pane fade"
                    id="v-pills-disabled"
                    role="tabpanel"
                    aria-labelledby="v-pills-disabled-tab"
                    tabIndex={0}
                  >
                    <span className="text-small fw-bold">
                      Pay with Easypaisa.
                    </span>
                    <br />
                    <span className="text-small">
                      <strong>Note*</strong> Please share screenshot of
                      transaction slip with your Order ID at Whatsapp
                      0333-2117276 or Email at xtrack.pk@gmail.com.
                    </span>
                    <br />
                    <div className="text-small pt-2">
                      <strong>Easypaisa account details:</strong>
                      <br />
                      <span className="pt-2 ps-2">
                        Account Title: <strong>Khizar Hasan</strong>
                      </span>
                      <br />
                      <span className="pt-2 ps-2">
                        Mobile Number: <strong>0333-2117276</strong>
                      </span>
                    </div>
                  </div>
                  <div
                    className="tab-pane fade"
                    id="v-pills-messages"
                    role="tabpanel"
                    aria-labelledby="v-pills-messages-tab"
                    tabIndex={0}
                  >
                    <span className="text-small fw-bold">
                      Pay with direct Bank Transfer.
                    </span>
                    <br />
                    <span className="text-small">
                      <strong>Note*</strong> Please share screenshot of
                      transaction slip with your Order ID at Whatsapp
                      0333-2117276 or Email at xtrack.pk@gmail.com.
                    </span>
                    <br />
                    <span className="text-small">
                      Your order will not be dispatch until the amount have
                      cleared in our bank account.
                    </span>
                    <br />
                    <div className="text-small pt-2">
                      <strong>Bank account details:</strong>
                      <br />
                      <span className="pt-2 ps-2">
                        Account Title: <strong>Khizar Hasan</strong>
                      </span>
                      <br />
                      <span className="pt-2 ps-2">
                        Account Number: <strong>0333-2117276</strong>
                      </span>
                      <br />
                      <span className="pt-2 ps-2">
                        IBAN Number: <strong>0333-2117276</strong>
                      </span>
                      <br />
                      <span className="pt-2 ps-2">
                        BANK: <strong>0333-2117276</strong>
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </>
        </div>
      </div>
    </div>
  )
}

export default checkout
