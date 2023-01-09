import React from 'react'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Navigation } from 'swiper'
import 'swiper/css'
import 'swiper/css/navigation'
import Link from 'next/link'
const Companies = ({ categories }) => {
  const brands = []
  categories?.map((cat) => {
    if (cat.slug == 'brands') {
      brands.push(cat.children)
    }
  })
  return (
    <>
      <div className="container-fluid">
        <div className="text-center bg-dark my-4 py-3">
          <span className="text-uppercase text-white fs-6 ">
            Brands we deals with
          </span>
          <br />
          <span className="text-uppercase fs-2 text-danger fw-bold">
            Shop with Popular Brands
          </span>
        </div>
        <div className="row mb-4 justify-content-center align-items-center">
          <Swiper
            navigation={true}
            grabCursor={true}
            modules={[Navigation]}
            className="mySwiper px-3 py-3"
            style={{height : '230px'}}
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
            {brands[0]?.map((cat) => {
              return (
                <SwiperSlide key={cat.id} className='d-flex justify-content-center align-items-center'>
                  <Link href={`/categories/${cat.slug}`} className="text-decoration-none text-dark">
                    <div
                      className="card border-0 rounded-0 my-4"
                      style={{ width: '15rem' }}
                    >
                      <img
                        src={cat.assets[0].url}
                        className="card-img-top comapny-image mx-auto my-auto"
                        alt="brand"
                      />
                    </div>
                  </Link>
                </SwiperSlide>
              )
            })}
          </Swiper>
        </div>
      </div>
    </>
  )
}

export default Companies
