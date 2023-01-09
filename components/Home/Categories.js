import React from 'react'
import Link from 'next/link'
import Category from './Category'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Navigation } from 'swiper'
import 'swiper/css'
import 'swiper/css/navigation'

const Categories = ({ products, categories, slug, setSlug }) => {
  const proteinSlug = []

  categories?.map((category) => {
    if (category.slug == 'proteins') {
      proteinSlug.push(category)
    }
  })
  const gainerSlug = []

  categories?.map((category) => {
    if (category.slug == 'weight-gainers') {
      gainerSlug.push(category)
    }
  })
  const aminosSlug = []

  categories?.map((category) => {
    if (category.slug == 'bcaa-eaa' || category.slug == 'pre-workouts') {
      aminosSlug.push(category)
    }
  })
  const healthSlug = []

  categories?.map((category) => {
    if (category.slug == 'multivitamins') {
      healthSlug.push(category)
    }
  })
  const accessoriesSlug = []
  categories?.map((category) => {
    if (category.slug == 'accessories') {
      accessoriesSlug.push(category)
    }
  })

  const proteinP = []
  const gainerP = []
  const workoutP = []
  const healthP = []
  const accessoriesP = []
  const brands = []
  products?.map((product) => {
    if (product.categories[0]?.slug == 'proteins') {
      proteinP.push(product)
    }
  })
  products?.map((product) => {
    if (product.categories[0]?.slug == 'weight-gainers') {
      gainerP.push(product)
    }
  })
  products?.map((product) => {
    if (product.categories[0]?.slug == 'pre-workouts') {
      workoutP.push(product)
    }
  })
  products?.map((product) => {
    if (product.categories[0]?.slug == 'fat-loss-products') {
      healthP.push(product)
    }
  })
  products?.map((product) => {
    if (product.categories[0]?.slug == 'accessories') {
      accessoriesP.push(product)
    }
  })
  categories?.map((cat) => {
    brands.push(cat)
  })
  return (
    <div className="container-fluid mb-4 px-2">
      <div className="text-center bg-dark my-4 py-3">
        <span className="text-uppercase text-white fs-6 ">
          All at one place
        </span>
        <br />
        <span className="text-uppercase fs-2 text-danger fw-bold">
          Shop By Categories
        </span>
      </div>
      <div className="container-fluid">
        <div className="row justify-content-center align-items-center">
          <Swiper
            navigation={true}
            grabCursor={true}
            modules={[Navigation]}
            className="mySwiper px-3 py-3"
            breakpoints={{
              0: {
                slidesPerView: 1,
                spaceBetween: 30,
              },
              480: {
                slidesPerView: 2,
                spaceBetween: 30,
              },
              768: {
                slidesPerView: 3,
                spaceBetween: 40,
              },
              1024: {
                slidesPerView: 4,
                spaceBetween: 40,
              },
            }}
          >
            {brands?.map((cat) => {
              return (
                <SwiperSlide key={cat.id}>
                  <Link
                    href={`/categories/${cat.slug}`}
                    className="text-decoration-none text-dark"
                  >
                    <div
                      className="card border-0 rounded-0 m-4"
                      style={{ width: '15rem' }}
                    >
                      <img
                        src={cat.assets[0]?.url}
                        className="card-img-top mx-auto my-auto"
                        alt={cat.name}
                      />
                      <div className="card-body text-center">
                        <span className="text-uppercase text-small fw-bold">
                          {cat.name}
                        </span>
                      </div>
                    </div>
                  </Link>
                </SwiperSlide>
              )
            })}
          </Swiper>
          <div className="text-center bg-dark my-4 py-3">
            <span className="text-uppercase fs-2 text-danger fw-bold">
              Popular Categories
            </span>
          </div>
          <Category
            title="Proteins"
            products={proteinP}
            categories={proteinSlug}
          />
          <Category
            title="Weight Gainers"
            products={gainerP}
            categories={gainerSlug}
          />
          <Category
            title="Pre-workout"
            products={workoutP}
            categories={aminosSlug}
          />
          <Category
            title="Fat Loss products"
            products={healthP}
            categories={healthSlug}
          />
          <Category
            title="Accessories"
            products={accessoriesP}
            categories={accessoriesSlug}
          />
        </div>
      </div>
    </div>
  )
}

export default Categories
