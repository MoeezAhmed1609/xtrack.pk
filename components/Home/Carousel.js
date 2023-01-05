import React from 'react'
import { Swiper, SwiperSlide } from 'swiper/react'
import X from '../../assets/xtrack.png'
import track from '../../assets/track-2.png'
import 'swiper/css'
import 'swiper/css/navigation'
import { Navigation, Autoplay } from 'swiper'
import { urlFor } from '../../lib/client'
import Image from 'next/image'

const Carousel = ({ banner }) => {
  // let banners = []
  // categories.map((cat) => {
  //   if (cat.slug == 'offers') {
  //     banners.push(cat.children[0])
  //   }
  // })
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
              {/* <span className='position-absolute fw-bold text-white text-uppercase carousel-text'>{ban.name}</span> */}
              {/* <div className='position-absolute logo-carousel'>
                <Image src={X} height={30} />
                <Image src={track} height={30} />
              </div> */}
            </SwiperSlide>
          )
        })}
      </Swiper>
    </>
  )
}

export default Carousel
