import React, { useState, useEffect, useContext } from 'react'
import commerce from '../../lib/commerce'
import { client } from '../../lib/client'
import CartStateContext from '../../context/CartContext'
import { AiOutlineStar, AiFillStar } from 'react-icons/ai'
import { HiUserCircle } from 'react-icons/hi'
import { GoVerified } from 'react-icons/go'
import { Swiper, SwiperSlide } from 'swiper/react'
import { app, database } from '../../lib/firebase'
import { ref, child, get } from 'firebase/database'
import StateContext from '../../context/StateContext'
import Slider from '../../components/Slider'

import 'swiper/css'
import 'swiper/css/pagination'
import 'swiper/css/navigation'

import { Navigation } from 'swiper'
import { startAfter } from 'firebase/firestore'

export async function getServerSideProps({ params }) {
  const { id } = params
  const product = await commerce.products.retrieve(id)

  return {
    props: {
      product,
    },
  }
}

const Product = ({ product }) => {
  const context = useContext(CartStateContext)
  const state = useContext(StateContext)

  const [sizeId, setSizeId] = useState('')
  const [flavourId, setFlavourId] = useState('')
  const [size, setSize] = useState('')
  const [flavour, setFlavour] = useState('')
  const [usage, setUsage] = useState('')
  const [reviews, setReviews] = useState([])

  const disableBtn = size == '' || flavour == '' ? 'cursor-d' : null;

  const getVariantSize = (id, variantId) => {
    setSizeId(id)
    setSize(variantId)
    console.log(sizeId, size)
  }
  const getVariantFlavour = (id, variantId) => {
    setFlavourId(id)
    setFlavour(variantId)
  }
  const [quantity, setQuantity] = useState(1)
  const increment = () => {
    setQuantity(quantity + 1)
  }
  const decrement = () => {
    if (quantity > 0) {
      setQuantity(1)
    } else {
      setQuantity(quantity - 1)
    }
  }
  const openInNewTab = (url) => {
    window.open(url, '_blank', 'noopener,noreferrer')
  }
  const starRatings = []
  let averageReview = ''
  Object.values(reviews)?.map((review) => {
    starRatings.push(Number(review.rating))
  })
  averageReview =
    starRatings.length > 0
      ? starRatings.reduce((a, b) => a + b) / starRatings.length
      : null

  useEffect(() => {
    client
      .fetch(`*[_type == 'usage']`)
      .then((data) => setUsage(data))
      .catch(console.error)
  }, [])
  useEffect(() => {
    const dbRef = ref(state.database)
    get(child(dbRef, `reviews/${product.name}`))
      .then((snapshot) => {
        if (snapshot.exists()) {
          setReviews(snapshot.val())
        } else {
          console.log('No data available')
        }
      })
      .catch((error) => {
        console.error(error)
      })
  }, [])

  return (
    <>
      <div className="container-fluid product-box">
        <div className="row">
          <div className="col-lg-6 col-12 d-flex justify-content-center align-items-center ">
            {product.assets.length > 1 ? (
              <>
                <Swiper
                  navigation={true}
                  modules={[Navigation]}
                  className="mySwiper swiper-product"
                  slidesPerView={1}
                >
                  {product.assets.map((asset) => (
                    <>
                      <SwiperSlide
                        className="swiper-slide-product"
                        key={asset.id}
                      >
                        <img
                          src={asset.url}
                          alt={asset.name}
                          className="swipre-product-img"
                        />
                      </SwiperSlide>
                    </>
                  ))}
                </Swiper>
              </>
            ) : (
              <img
                src={product.assets[0].url}
                alt={product.name}
                className="cursor-p"
                style={{ height: '350px' }}
                onClick={() => openInNewTab(product.assets[0].url)}
              />
            )}
          </div>
          <div className="col-lg-6 col-12 d-flex flex-column pt-4 ps-lg-2 ps-5">
            <div className="row text-small">
              {product.inventory.available > 0 ? (
                <span className="text-danger text-uppercase col ps-2">
                  In Stock
                </span>
              ) : (
                <span className="text-danger text-uppercase col ps-2">
                  Out Of Stock
                </span>
              )}
            </div>
            <h2 className="text-uppercase">{product.name}</h2>
            <span className="fs-3 text-danger">
              {product.variant_groups[0]?.options[0]?.id == size
                ? product.variant_groups[0].options[0].price.formatted_with_code
                : product.variant_groups[0]?.options[1]?.id == size
                ? product.variant_groups[0].options[1].price.formatted_with_code
                : product.price.formatted_with_code}
            </span>
            <div className="row ps-3 py-1">
              {reviews ? (
                <div className="">
                  <span className="fs-4 ps-2">
                    {Math.ceil(averageReview)}.0
                    <AiFillStar className="text-warning" />
                    <div className="row pb-1" style={{ marginTop: '-12px' }}>
                      <span className="text-small">
                        Based on {Object.values(reviews).length} reviews
                      </span>
                    </div>
                  </span>
                </div>
              ) : (
                <div className="">
                  <span className="fs-4">
                    0
                    <AiFillStar className="text-warning" />
                  </span>
                </div>
              )}
            </div>

            <div className="d-flex flex-column">
              <div className="py-2">
                <span className="ps-2">{product.variant_groups[0]?.name}</span>
                {product.variant_groups
                  ? product.variant_groups[0].options.map((option) => {
                      return (
                        <>
                          <div
                            onChange={(e) =>
                              getVariantSize(
                                product.variant_groups[0].id,
                                e.target.value,
                              )
                            }
                          >
                            <label className="fs-6 ps-2 check-label">
                              <input
                                type="radio"
                                required
                                name="size_option"
                                value={option.id}
                              />
                              <i>{option.name}</i>
                            </label>
                          </div>
                        </>
                      )
                    })
                  : null}
              </div>
              <div className="col py-2">
                <span className="ps-2">{product.variant_groups[1]?.name}</span>
                {product.variant_groups
                  ? product.variant_groups[1]?.options.map((option) => {
                      return (
                        <>
                          <div
                            onChange={(e) =>
                              getVariantFlavour(
                                product.variant_groups[1].id,
                                e.target.value,
                              )
                            }
                          >
                            <label className="fs-6 ps-2 check-label">
                              <input
                                type="radio"
                                required
                                name="flavor_option"
                                value={option.id}
                              />
                              <i>{option.name}</i>
                            </label>
                          </div>
                        </>
                      )
                    })
                  : null}
              </div>
            </div>

            <div className="p-2">
              <span>Quantity</span>
              <div className="pt-2">
                <button
                  type="button"
                  className="btn btn-danger btn-sm"
                  onClick={decrement}
                >
                  -
                </button>
                <span className="px-4">{quantity}</span>
                <button
                  type="button"
                  className="btn btn-danger btn-sm"
                  onClick={increment}
                >
                  +
                </button>
              </div>
              <div
                className="d-flex justify-content-center align-items-center mt-2"
                style={{ height: '100px' }}
              >
                {product.inventory?.available > 0 ? (
                  product.variant_groups.length > 1 ? (
                    <button
                      type="button"
                      className={`btn btn-danger text-uppercase ${disableBtn}`}
                      style={{ width: '80%' }}
                      onClick={() =>
                        context.addMultiVariantToCart(
                          product.id,
                          quantity,
                          sizeId,
                          flavourId,
                          size,
                          flavour,
                        )
                      }
                    >
                      Add to cart
                    </button>
                  ) : product.variant_groups.length > 0 ? (
                    <button
                      type="button"
                      className={`btn btn-danger text-uppercase ${disableBtn}`}
                      style={{ width: '80%' }}
                      onClick={() =>
                        context.addSingleVariantToCart(
                          product.id,
                          quantity,
                          sizeId,
                          size,
                        )
                      }
                    >
                      Add to cart
                    </button>
                  ) : (
                    <button
                      type="button"
                      className="btn btn-danger text-uppercase"
                      style={{ width: '80%' }}
                      onClick={() => context.addToCart(product.id, quantity)}
                    >
                      Add to cart
                    </button>
                  )
                ) : (
                  <button
                    type="button"
                    className="btn btn-danger text-uppercase"
                    style={{ width: '80%' }}
                    disabled
                  >
                    Add to cart
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="container py-4">
        <div className="tab-box">
          <ul className="nav nav-tabs" id="myTab" role="tablist">
            <li className="nav-item" role="presentation">
              <button
                className="nav-link bg-dark text-white me-lg-1 me-md-1 me-0"
                id="home-tab"
                data-bs-toggle="tab"
                data-bs-target="#home"
                type="button"
                role="tab"
                aria-controls="home"
                aria-selected="true"
              >
                Description
              </button>
            </li>
            <li className="nav-item" role="presentation">
              <button
                className="nav-link bg-dark text-white me-lg-1 me-md-1 me-0"
                id="profile-tab"
                data-bs-toggle="tab"
                data-bs-target="#profile"
                type="button"
                role="tab"
                aria-controls="profile"
                aria-selected="false"
              >
                Usage
              </button>
            </li>
            <li className="nav-item" role="presentation">
              <button
                className="nav-link bg-dark text-white"
                id="contact-tab"
                data-bs-toggle="tab"
                data-bs-target="#contact"
                type="button"
                role="tab"
                aria-controls="contact"
                aria-selected="false"
              >
                Reviews
              </button>
            </li>
          </ul>
          <div
            className="tab-content border border-2"
            style={{ minHeight: '200px' }}
            id="myTabContent"
          >
            <div
              className="tab-pane fade show active p-3 description-tab"
              id="home"
              role="tabpanel"
              aria-labelledby="home-tab"
            >
              <span
                className="pt-2"
                dangerouslySetInnerHTML={{ __html: product.description }}
              ></span>
            </div>
            <div
              className="tab-pane fade p-3"
              id="profile"
              role="tabpanel"
              aria-labelledby="profile-tab"
            >
              {product.name.toUpperCase() == usage[0]?.name.toUpperCase() ? (
                <span>{usage[0].usage}</span>
              ) : (
                <span>Not Prescribed</span>
              )}
            </div>
            <div
              className="tab-pane fade p-3 review-tab"
              id="contact"
              role="tabpanel"
              aria-labelledby="contact-tab"
            >
              {reviews ? (
                <div className="text-center">
                  <span className="fs-6">Reviews for {product.name}</span>
                  <br />
                  <span className="fs-4">
                    {Math.ceil(averageReview)}.0
                    <AiFillStar className="text-warning" />
                    <div className="row pb-1" style={{ marginTop: '-12px' }}>
                      <span className="text-small">
                        Based on {Object.values(reviews).length} reviews
                      </span>
                    </div>
                  </span>
                </div>
              ) : (
                <div className="text-center">
                  <span className="fs-6">No reviews for this product!</span>
                </div>
              )}

              {reviews ? (
                Object.values(reviews)?.map((review, index) => (
                  <div className="row mt-3" key={index}>
                    <div className="col-6 d-flex align-items-center">
                      <span className="fs-2">
                        <HiUserCircle />
                      </span>
                      <span className="text-small ps-2">
                        {review.user}
                        <span
                          className="text-small text-success"
                          style={{ marginTop: '-15px' }}
                        >
                          <GoVerified />
                        </span>
                      </span>
                    </div>
                    <div className="col-6 text-end pe-4">
                      {review.rating
                        ? Array.from({ length: 5 }, (elem, index) => {
                            return (
                              <span className="fs-6 text-warning" key={index}>
                                {review.rating >= index ? (
                                  <AiFillStar />
                                ) : (
                                  <AiOutlineStar />
                                )}
                              </span>
                            )
                          })
                        : null}
                    </div>
                    <div className="col-12 px-5">
                      <span className="text-small">{review.review}</span>
                    </div>
                  </div>
                ))
              ) : (
                <div className="container text-center py-4">
                  <span className="fs-6">
                    No reviews for this product! <strong>Be the first!</strong>
                  </span>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
      <div className="container-fluid">
        {product.related_products.length > 0 ? (
          <>
            <h3 className="text-uppercase py-4 ps-lg-4 ps-2 fw-bold">
              Related products
            </h3>
            <Slider medium={2} products={product.related_products} />
          </>
        ) : null}
      </div>
    </>
  )
}

export default Product
