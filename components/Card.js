import React from 'react'
import Link from 'next/link'

const Card = ({ product, discount }) => {
  return (
    <>
      <div
        className="card card-width position-relative border-0 rounded-0"
        style={{ width: '97%' }}
      >
        {discount ? (
          <div
            className="bg-danger p-1 rounded position-absolute top-0 start-0"
            style={{ zIndex: '99' }}
          >
            <span className="text-white text-small">
              {discount?.map((disc) => {
                if (product.name.toUpperCase() == disc.name.toUpperCase()) {
                  return (
                    <span>
                      {disc.percentage} %
                    </span>
                  )
                }
              })}
            </span>
          </div>
        ) : null}

        <Link
          href={`/products/${product.id}`}
          className="text-decoration-none text-dark"
        >
          <img
            src={product.image.url}
            className="card-img-top mx-auto mt-2"
            alt="Card Image"
            style={{minHeight : '190px' , maxHeight : '192px'}}
          />
        </Link>
        <div className="card-body">
          <span className="text-danger text-tiny text-uppercase">
            {product.categories ? product.categories[0].name : null}
          </span>
          <br></br>
          <div
            style={{ height: '70px' }}
            className="pb-2 d-flex flex-column justify-content-center align-items-center"
          >
            <span className="card-title text-uppercase text-small col-12">
              {product.name}
            </span>
          </div>
          <hr className="bg-white mt-1 mb-0" />
          <div className="row align-items-center text-center pt-3">
            <span className="col p-0">
              <span className="fs-6 ps-2 fw-bold">
                {product.price.formatted_with_symbol}
                <br />
                {discount?.map((disc) => {
                  if (product.name.toUpperCase() == disc.name.toUpperCase()) {
                    return (
                      <span
                        key={disc._id}
                        className="fw-normal fs-6 text-decoration-line-through text-secondary"
                      >
                        Rs{disc.discount}.00
                      </span>
                    )
                  }
                })}
              </span>
            </span>
          </div>
        </div>
      </div>
    </>
  )
}

export default Card
