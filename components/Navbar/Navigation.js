import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import OffCanvas from './OffCanvas'
import Search from './Search'
import User from './User'
import Cart from './Cart/Cart'
import logo from '../../assets/xtrack.png'
import track from '../../assets/track-2.png'

const Navigation = ({ products }) => {
  return (
    <>
      <div className="container-fluid bg-dark fixed-top">
        <div className="row ">
          <div className="col-1 d-lg-none p-0">
            <OffCanvas />
          </div>
          <div className="col-lg-5 d-none d-lg-block d-md-none ps-0">
            <>
              <nav className="navbar navbar-expand-lg navbar-light">
                <div className="container-fluid">
                  <ul className="navbar-nav text-uppercase text-small">
                    <li className="nav-item">
                      <Link
                        className="nav-link active text-white"
                        aria-current="page"
                        href="/"
                      >
                        Home
                      </Link>
                    </li>
                    <li className="nav-item ">
                      <span
                        className="nav-link dropdown-toggle active text-white position-relative cursor-p"
                        aria-current="page"
                        data-bs-toggle="dropdown"
                        aria-expanded="false"
                      >
                        All Categories
                      </span>
                      <ul className="dropdown-menu position-absolute ms-5 shadow">
                        <li className="supplement">
                          <span className="dropdown-item text-small py-3">
                            Supplements
                            <span className="ps-2 fs-6">&#8250;</span>
                          </span>
                          <div className="nest-dropdown position-absolute bg-white rounded shadow">
                            <ul className="nest-list text-small p-0 py-2">
                              <li className="p-3">
                                <Link
                                  href="/categories/proteins"
                                  className="text-dark text-decoration-none"
                                >
                                  Proteins
                                </Link>
                              </li>
                              <li className="p-3">
                                <Link
                                  href="/categories/weight-gainers"
                                  className="text-dark text-decoration-none"
                                >
                                  Weight gainers
                                </Link>
                              </li>
                              <li className="health">
                                <span className="dropdown-item text-small py-3">
                                  General Health
                                  <span className="ps-1 fs-6">&#8250;</span>
                                </span>
                                <div className="nest-dropdownet bg-white rounded shadow">
                                  <ul className="nest-list text-small p-0 py-2">
                                    <li className="p-3">
                                      <Link
                                        href="/categories/testosterone-boosters"
                                        className="text-dark text-decoration-none"
                                      >
                                        testosterone boosters
                                      </Link>
                                    </li>
                                    <li className="p-3">
                                      <Link
                                        href="/categories/fish-oil"
                                        className="text-dark text-decoration-none"
                                      >
                                        Fish Oil
                                      </Link>
                                    </li>
                                    <li className="p-3">
                                      <Link
                                        href="/categories/zma"
                                        className="text-dark text-decoration-none"
                                      >
                                        ZMA
                                      </Link>
                                    </li>
                                    <li className="p-3">
                                      <Link
                                        href="/categories/multivitamins"
                                        className="text-dark text-decoration-none"
                                      >
                                        multivitamins
                                      </Link>
                                    </li>
                                  </ul>
                                </div>
                              </li>
                              <li className="p-3">
                                <Link
                                  href="/categories/fat-loss-products"
                                  className="text-dark text-decoration-none"
                                >
                                  Fat loss products
                                </Link>
                              </li>
                              <li className="p-3">
                                <Link
                                  href="/categories/pre-workouts"
                                  className="text-dark text-decoration-none"
                                >
                                  Pre-workout
                                </Link>
                              </li>
                              <li className="p-3">
                                <Link
                                  href="/categories/bcaa-eaa"
                                  className="text-dark text-decoration-none"
                                >
                                  BCAA & EAA
                                </Link>
                              </li>
                              <li className="p-3">
                                <Link
                                  href="/categories/creatine"
                                  className="text-dark text-decoration-none"
                                >
                                  Creatine
                                </Link>
                              </li>
                            </ul>
                          </div>
                        </li>
                        <li>
                          <span className="dropdown-item text-small py-3">
                            <Link
                              href="/categories/accessories"
                              className="text-dark text-decoration-none"
                            >
                              Accessories
                            </Link>
                          </span>
                        </li>
                        <li className="supplement">
                          <span className="dropdown-item text-small py-3">
                            Gym Wear<span className="ps-4 fs-6">&#8250;</span>
                          </span>
                          <div className="nest-dropdown position-absolute bg-white rounded shadow">
                            <ul className="nest-list text-small p-0 py-2">
                              <li className="p-3">
                                <Link
                                  href="/categories/bottoms"
                                  className="text-dark text-decoration-none"
                                >
                                  Bottoms
                                </Link>
                              </li>
                              <li className="p-3">
                                <Link
                                  href="/categories/tops"
                                  className="text-dark text-decoration-none"
                                >
                                  Tops
                                </Link>
                              </li>
                              <li className="p-3">
                                <Link
                                  href="/categories/tank-tops"
                                  className="text-dark text-decoration-none"
                                >
                                  Tank Tops
                                </Link>
                              </li>
                              <li className="p-3">
                                <Link
                                  href="/categories/shorts"
                                  className="text-dark text-decoration-none"
                                >
                                  Shorts
                                </Link>
                              </li>
                              <li className="p-3">
                                <Link
                                  href="/categories/yoga-pants"
                                  className="text-dark text-decoration-none"
                                >
                                  Yoga Pants
                                </Link>
                              </li>
                              <li className="p-3">
                                <Link
                                  href="/categories/track-suits"
                                  className="text-dark text-decoration-none"
                                >
                                  Track Suits
                                </Link>
                              </li>
                            </ul>
                          </div>
                        </li>
                      </ul>
                    </li>

                    <li className="nav-item ps-3">
                      <Link
                        className="nav-link active text-small text-white"
                        href="/connect"
                      >
                        Connect
                      </Link>
                    </li>
                    <li className="nav-item ps-3">
                      <Link
                        className="nav-link active text-small text-white"
                        href="/blog"
                      >
                        Blogs
                      </Link>
                    </li>
                  </ul>
                </div>
              </nav>
            </>
          </div>
          <div className="col p-0 align-self-center ms-lg-3 ms-4">
            <Link href="/">
              <Image
                src={logo}
                alt="logo"
                className="img-fluid logo-x"
                height={45}
                width={45}
              />
              <Image
                src={track}
                alt="logo"
                className="img-fluid logo-t"
                height={45}
                width={140}
              />
            </Link>
          </div>
          <ul className="nav col justify-content-end align-items-center">
            <li className="nav-item px-lg-2">
              <span className="nav-link p-0">
                <Search products={products} />
              </span>
            </li>
            <li className="nav-item px-lg-2 user-dash">
              <span className="nav-link p-0">
                <User />
              </span>
            </li>
            <li className="nav-item px-lg-2">
              <span className="nav-link p-0">
                <Cart />
              </span>
            </li>
          </ul>
        </div>
      </div>
    </>
  )
}

export default Navigation
