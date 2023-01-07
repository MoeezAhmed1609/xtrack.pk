import React from 'react'
import Link from 'next/link'
import Image from 'next/image'
import logo from '../assets/xtrack.png'
import track from '../assets/track-2.png'
import {
  AiOutlineMail,
  AiOutlinePhone,
  AiOutlineWhatsApp,
  AiOutlineFacebook,
  AiOutlineInstagram,
  AiOutlineTwitter,
  AiOutlineGooglePlus,
} from 'react-icons/ai'

const Footer = () => {
  return (
    <>
      <div className="container-fluid p-0 bg-dark">
        <div className="text-center">
          <div className="row m-0 py-2 align-items-center bg-dark bg-gradient">
            <div className="col-lg-3 col-md-6 col-12">
              <span className="text-white fw-bold text-uppercase">
                We’re Always Here To Help
              </span>
            </div>
            <div className="col-lg-3 col-md-6 col-12 text-white text-uppercase">
              <span className="fs-5 p-2 rounded-circle">
                <AiOutlineMail />
              </span>
              <span className="text-tiny">
                Email support : <span className='text-lowercase'>xtrack.pk@gmail.com</span>
              </span>
            </div>
            <div className="col-lg-3 col-md-6 col-12 text-white text-uppercase">
              <span className="fs-5 p-2 rounded-circle">
                <AiOutlinePhone />
              </span>
              <span className="text-tiny">Phone support : +923272026242</span>
            </div>
            <div className="col-lg-3 col-md-6 col-12 text-white text-uppercase">
              <span className="fs-5 p-2 rounded-circle">
                <AiOutlineWhatsApp />
              </span>
              <span className="text-tiny">
                WhatsApp support : +923272026242
              </span>
            </div>
          </div>
          <div className="col py-4">
            <Link href="/">
              <Image src={logo} alt="logo" height={50} />
              <Image src={track} alt="logo" height={45} />
            </Link>
          </div>
          <div className="row m-0 px-4 py-3">
            <div className="container">
              <ul className="list-group">
              <li className="list-group-item bg-transparent border-0 py-0">
                  <Link
                    href="/docs/about"
                    className="text-small text-decoration-none text-white"
                  >
                    About us
                  </Link>
                </li>
                <li className="list-group-item bg-transparent border-0 py-0">
                  <Link
                    href="/docs/terms-and-conditions"
                    className="text-small text-decoration-none text-white"
                  >
                    Terms & Conditions
                  </Link>
                </li>
                <li className="list-group-item bg-transparent border-0 py-0">
                  <Link
                    href="/blog"
                    className="text-small text-decoration-none text-white"
                  >
                    Blog
                  </Link>
                </li>
              </ul>
            </div>
          </div>
          <div className="row m-0 px-5 py-3">
            <div className="col">
              <div className="social-menu">
                <ul className="p-0">
                  <li>
                    <a
                      href="https://www.facebook.com/profile.php?id=100088634175544"
                      target="blank"
                    >
                      <span>
                        <AiOutlineFacebook />
                      </span>
                    </a>
                  </li>
                  <li>
                    <a
                      href="https://www.instagram.com/x_track.pk/"
                      target="blank"
                    >
                      <span>
                        <AiOutlineInstagram />
                      </span>
                    </a>
                  </li>
                  <li>
                    <a href="mailto: xtrack.pk@gmail.com" target="blank">
                      <span>
                        <AiOutlineGooglePlus />
                      </span>
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default Footer
