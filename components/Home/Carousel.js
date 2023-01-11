import React from 'react'
import { Swiper, SwiperSlide } from 'swiper/react'
import X from '../../assets/xtrack.png'
import track from '../../assets/track-2.png'
import 'swiper/css'
import 'swiper/css/navigation'
import { Navigation, Autoplay } from 'swiper'
import { urlFor } from '../../lib/client'

const Carousel = ({ banner }) => {
  return (
    <>
      <Swiper
        navigation={true}
        centeredSlides={true}
        grabCursor={true}
        modules={[Navigation, Autoplay]}
        className="mySwiper d-flex justify-content-center carousel-body"
        slidesPerView={1}
        autoplay={{
          delay: 3500,
          disableOnInteraction: false,
        }}
      >
        {banner?.map((ban) => {
          return (
            <SwiperSlide key={ban._id} className="position-relative">
              <img
                src={urlFor(ban.image)}
                alt={ban.filename}
                className="banner-img"
              ></img>
            </SwiperSlide>
          )
        })}
      </Swiper>
    </>
  )
}

export default Carousel
