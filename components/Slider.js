import React from 'react'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Navigation } from 'swiper'
import 'swiper/css'
import 'swiper/css/navigation'
import Card from './Card'

const Slider = ({ medium, products , discount }) => {
  return (
    <>
      <div className="justify-content-center text-center px-3 py-3">
        <Swiper
          navigation={true}
          grabCursor={true}
          modules={[Navigation]}
          className="mySwiper"
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
              slidesPerView: medium,
              spaceBetween: 40,
            },
            1024: {
              slidesPerView: 4,
              spaceBetween: 40,
            },
          }}
        >
          {products?.map((product) => {
              return (
                <SwiperSlide key={product.id}>
                  <Card product={product} discount={discount} />
                </SwiperSlide>
              )
          })}
        </Swiper>
      </div>
    </>
  )
}

export default Slider
