import React from 'react'
import Slider from '../../Slider'

const Stacks = ({products}) => {
  const stackP = []
  products.map((product) => {
    if(product.categories[0]?.slug == 'stacks'){
      stackP.push(product)
    }
  })
  return (
    <>
      <div className="container-fluid bg-dark">
        <div className="row justify-content-center align-itmes-center">
          <div className="text-center bg-dark my-4 py-3">
            <span className="text-uppercase text-white fs-6 ">
              Get discounted stacks
            </span>
            <br />
            <span className="text-uppercase fs-2 text-danger fw-bold">
              stacks available
            </span>
          </div>
        </div>
      </div>
      <Slider medium='2' products={stackP} />
    </>
  )
}

export default Stacks
