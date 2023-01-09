import React, { useContext, useState } from 'react'
import StateContext from '../../context/StateContext'
import Link from 'next/link'
import { AiOutlineStar } from 'react-icons/ai'
import { BiCart } from 'react-icons/bi'
import commerce from '../../lib/commerce'
import Spinner from '../../components/Spinner'

export async function getServerSideProps({ params }) {
  const { slug } = params
  return {
    props: {
      slug,
    },
  }
}

const CategoryList = ({ slug }) => {
  const context = useContext(StateContext)
  const pageProducts = []
  const pageCategory = []
  context.products.data?.map((product) =>
    product.categories.map((category) =>
      category.slug == slug ? pageProducts.push(product) : null,
    ),
  )
  context.category.map((cat) =>
    cat.slug == slug ? pageCategory.push(cat) : null
  )
  return (
    <>
      <div className="container category-box my-4">
        <div className="container">
          <span className="text-uppercase fs-3">{pageCategory[0]?.name}</span>
          <span className="fs-6 ps-3">
            Listing all ( {pageCategory[0]?.products} ) Products
          </span>
        </div>
        <div className="row pt-4">
          {pageProducts?.length > 0 ? (
            pageProducts?.map((product) => (
              <div className="col-lg-3 col-md-4 col-12" key={product.id}>
                <div className="card card-product text-center">
                  <Link
                    href={`/products/${product.id}`}
                    className="text-decoration-none text-dark"
                  >
                    <img
                      src={product.image.url}
                      className="card-img-top mx-auto mt-2 cat-p-img"
                      alt="Card Image"
                      style={{maxHeight : '200px'}}
                    />
                  </Link>
                  <div className="card-body">
                    <span className="text-danger text-tiny text-uppercase">
                      {product.categories[0].name}
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
                    <div className="row align-items-center text-center">
                      <span className="col-12 p-0 pt-3">
                        <span className="fs-6 ps-2 fw-bold">
                          {product.price.formatted_with_symbol}
                        </span>
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <>
              <div className="container empty-box">
                <div className="text-center text-uppercase">
                  <span className="fs-4">Products Coming Soon...</span>
                  <br></br>
                  <Link href="/">
                    <button
                      type="button"
                      className="btn btn-danger my-4"
                      style={{ width: '30vw' }}
                    >
                      Go to shop
                    </button>
                  </Link>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </>
  )
}

export default CategoryList
