import React from 'react'
import Link from 'next/link'
import Image from 'next/image'
import X from '../../assets/xtrack.png'
import Track from '../../assets/track-2.png'
import { AiOutlineMenu, AiOutlineCloseCircle } from 'react-icons/ai'

const OffCanvas = () => {
  return (
    <>
      <button
        className="btn border-0 pt-2 text-white fs-5"
        type="button"
        data-bs-toggle="offcanvas"
        data-bs-target="#offcanvasRight"
        aria-controls="offcanvasRight"
      >
        <AiOutlineMenu />
      </button>
      <div
        className="offcanvas offcanvas-start bg-black"
        style={{ width: '300px' }}
        tabIndex={-1}
        id="offcanvasRight"
        aria-labelledby="offcanvasRightLabel"
      >
        <div className="offcanvas-header">
          {/* Change logo here */}
          <div className="col p-0 align-self-center ms-lg-3">
            <Link href="/">
              <Image
                src={X}
                alt="logo"
                className="img-fluid logo-x"
                height={45}
                width={45}
              />
              <Image
                src={Track}
                alt="logo"
                className="img-fluid logo-t"
                height={45}
                width={140}
              />
            </Link>
          </div>
          <button
            type="button"
            className="btn border-0 fs-5 text-danger"
            data-bs-dismiss="offcanvas"
            aria-label="Close"
          >
            <AiOutlineCloseCircle />
          </button>
        </div>
        <div className="offcanvas-body text-center">
          <ul className="navbar-nav text-uppercase text-small text-white">
            <li className="nav-item">
              <Link className="nav-link active" aria-current="page" href="/">
                Home
              </Link>
            </li>
            <li className="nav-item">
              <span className="nav-link border-bottom border-danger">
                Categories
              </span>
              <span className="fs-5">&#8964;</span>
              <ul className="offcanvas-list text-center p-0 pt-2 pb-3">
                <li className="py-1">
                  <span className="text-decoration-none text-white">
                    Supplements<span className="fs-5 ps-2">&#8964;</span>
                  </span>
                  <ul className="offcanvas-list text-start p-0 ps-3 py-2">
                    <li>
                      <Link className="nav-link py-2" href="/categories/proteins">
                        Proteins
                      </Link>
                    </li>
                    <li>
                      <Link className="nav-link py-2" href="/categories/weight-gainers">
                        Weight gainers
                      </Link>
                    </li>
                    <li>
                      <Link className="nav-link py-2" href="/categories/fat-loss-products">
                        fat loss products
                      </Link>
                    </li>
                    <li>
                      <Link className="nav-link py-2" href="/categories/pre-workouts">
                        Pre-workout
                      </Link>
                    </li>
                    <li>
                      <Link className="nav-link py-2" href="/categories/bcaa-eaa">
                        BCAA & EAA
                      </Link>
                    </li>
                    <li>
                      <Link className="nav-link py-2" href="/categories/creatine">
                        Creatine
                      </Link>
                    </li>
                    <li className="py-1 text-center">
                      <span className="text-decoration-none text-white">
                        General Health<span className="fs-5 ps-2">&#8964;</span>
                      </span>
                      <ul className="offcanvas-list text-start p-0 ps-3 py-2">
                        <li>
                          <Link className="nav-link py-2" href="/categories/testosterone-boosters">
                            testosterone boosters
                          </Link>
                        </li>
                        <li>
                          <Link className="nav-link py-2" href="/categories/fish-oil">
                            fish oil
                          </Link>
                        </li>
                        <li>
                          <Link className="nav-link py-2" href="/categories/zma">
                            ZMA
                          </Link>
                        </li>
                        <li>
                          <Link className="nav-link py-2" href="/categories/multivitamins">
                            multivitamins
                          </Link>
                        </li>
                      </ul>
                    </li>
                  </ul>
                </li>
                <li className="py-2">
                  <Link href="/categories/accessories" className="text-decoration-none text-white">
                    Accessories
                  </Link>
                  {/* <ul className="offcanvas-list text-start p-0 ps-3 py-2">
                    <li>
                      <a className="nav-link py-2" href="#">
                        Shakers
                      </a>
                    </li>
                    <li>
                      <a className="nav-link py-2" href="#">
                        Lifting belts
                      </a>
                    </li>
                    <li>
                      <a className="nav-link py-2" href="#">
                        Hand Wraps & grips
                      </a>
                    </li>
                  </ul> */}
                </li>
                <li className="py-1">
                  <span className="text-decoration-none text-white">
                    Gym Wear<span className="fs-5 ps-2">&#8964;</span>
                  </span>
                  <ul className="offcanvas-list text-start p-0 ps-3 py-2">
                    <li>
                      <Link className="nav-link py-2" href="/categories/bottoms">
                        Bottoms
                      </Link>
                    </li>
                    <li>
                      <Link className="nav-link py-2" href="/categories/tops">
                        Tops
                      </Link>
                    </li>
                    <li>
                      <Link className="nav-link py-2" href="/categories/tank-tops">
                        Tank Tops
                      </Link>
                    </li>
                    <li>
                      <Link className="nav-link py-2" href="/categories/shorts">
                        Shorts
                      </Link>
                    </li>
                    <li>
                      <Link className="nav-link py-2" href="/categories/yoga-pants">
                        Yoga Pants
                      </Link>
                    </li>
                    <li>
                      <Link className="nav-link py-2" href="/categories/track-suits">
                        Track Suits
                      </Link>
                    </li>
                  </ul>
                </li>
              </ul>
            </li>
            <li className="nav-item pt-2">
              <Link className="nav-link border-top border-danger" href="/connect">
                Connect with us
              </Link>
            </li>
            <li className="nav-item pt-2">
              <Link className="nav-link border-top border-danger" href="/blog">
                Blogs
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </>
  )
}

export default OffCanvas
