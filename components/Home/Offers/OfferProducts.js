import React from 'react'
import Slider from '../../Slider'

const NewsProducts = ({ products , discount }) => {
  const offerP = []
  products.map((product) => {
    if(product.categories[0].slug == 'offers'){
      offerP.push(product)
    }
  })
  return (
    <div className="">
      <div className="container-fluid text-center mb-4 p-0">
        <div className="text-center bg-dark mb-4 py-3">
          <span className="text-uppercase text-white fs-6 ">
            Shop with best dicsount offers
          </span>
          <br />
          <span className="text-uppercase fs-2 text-danger fw-bold">
            Latest Offers
          </span>
        </div>
      </div>
      <Slider medium="3" products={offerP} discount={discount} />
    </div>
  )
}

export default NewsProducts
