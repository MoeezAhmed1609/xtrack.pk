import React from 'react'
import { BsCreditCard2Front, BsShieldCheck, BsTelephone , BsTruck } from 'react-icons/bs'

const Delievery = () => {
  return (
    <div className="container-fluid bg-danger">
      <div className="row align-items-center justify-content-center text-center fw-bolder">
        <div className="col-lg-3 col-md-6 col-sm-12">
          <span className="text-white ps-2 fs-3 fw-bold">
            <BsCreditCard2Front />
          </span>
          <span className="text-white ps-2 text-small text-uppercase align-self-center">
            Low Price Guaranteed
          </span>
        </div>
        <div className="col-lg-3 col-md-6 col-sm-12">
          <span className="text-white ps-2 fs-3 fw-bold">
            <BsShieldCheck />
          </span>
          <span className="text-white ps-2 text-small text-uppercase align-self-center">
            100% Authentic Products
          </span>
        </div>
        <div className="col-lg-3 col-md-6 col-sm-12">
          <span className="text-white ps-2 fs-2 fw-bold">
            <BsTruck />
          </span>
          <span className="text-white ps-2 text-small text-uppercase align-self-center">
            Free Delievery all over pakistan
          </span>
        </div>
        <div className="col-lg-3 col-md-6 col-sm-12">
          <span className="text-white ps-2 fs-4 fw-bold">
            <BsTelephone />
          </span>
          <span className="text-white ps-2 text-small text-uppercase align-self-center">
            Ask any query:
            <span className="text-black ps-1">+923272026242</span>
          </span>
        </div>
      </div>
    </div>
  )
}

export default Delievery
