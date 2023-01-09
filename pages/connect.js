import React from 'react'
import Link from 'next/link'
import supplement from '../assets/supplement-box.jpg'
import {
  AiOutlineInstagram,
  AiOutlineFacebook,
  AiOutlineGooglePlus,
  AiOutlineYoutube
} from 'react-icons/ai'

const connect = () => {
  return (
    <div className="conatiner-fluid connect-box">
      <div className="row d-flex">
        <div className="col-lg-3 col-md-6 col-12 c-supplement">
          <Link
            href="https://www.instagram.com/x_track.pk/"
            target="_blank"
            className="text-white text-decoration-none d-flex flex-column text-center"
          >
            <span className="fs-1">
              <AiOutlineInstagram />
            </span>
            <span className="text-uppercase fs-6 fw-bold">
              Connect with us on Instagram
            </span>
          </Link>
        </div>
        <div className="col-lg-3 col-md-6 col-12 c-supplement">
          <Link
            href="https://www.youtube.com/channel/UCY4IDvLi8yxG6MRROmqd65A"
            target="_blank"
            className="text-white text-decoration-none d-flex flex-column text-center"
          >
            <span className="fs-1">
              <AiOutlineYoutube />
            </span>
            <span className="text-uppercase fs-6 fw-bold">
              Subscribe us on Youtube
            </span>
          </Link>
        </div>
        <div className="col-lg-3 col-md-6 col-12 c-accessories">
          <Link
            href="https://www.facebook.com/profile.php?id=100088634175544"
            target="_blank"
            className="text-white text-decoration-none d-flex flex-column text-center"
          >
            <span className="fs-1">
              <AiOutlineFacebook />
            </span>
            <span className="text-uppercase fs-6 fw-bold">
              Connect with us on Facebook
            </span>
          </Link>
        </div>
        <div className="col-lg-3 col-md-6 col-12 c-wear">
          <Link
            href="mailto: xtrack.pk@gmail.com"
            target="blank"
            className="text-white text-decoration-none d-flex flex-column text-center"
          >
            <span className="fs-1">
              <AiOutlineGooglePlus />
            </span>
            <span className="text-uppercase fs-6 fw-bold">
              Ask any Query on Gmail
            </span>
          </Link>
        </div>
      </div>
    </div>
  )
}

export default connect
