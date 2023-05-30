import React from 'react'
import Link from 'next/link'
import Slider from '../Slider'

const Category = ({ title, products , categories }) => {
  return (
    <>
        <div className="col-lg-2 col-md-3 col-12 my-2 text-center bg-dark product-tag-box">
          <Link className="text-decoration-none text-danger cursor-p" href={`/categories/${categories[0]?.slug}`} >
            <span className="fs-5 text-uppercase ">{title}</span>
            <br />
            <span className="text-small text-white">View All Products</span>
          </Link>
        </div>
        <div className="col-lg-10 col-md-9 col-12 p-0">
          <Slider medium='2' products={products} />
        </div>
    </>
  )
}

export default Category
