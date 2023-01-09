import React, { useState } from 'react'
import Link from 'next/link'
import { BiSearch } from 'react-icons/bi'

const Search = ({ products }) => {
  const [search, setSearch] = useState(false)
  const [query, setQuery] = useState('')

  return (
    <>
      <div className="col">
        <span
          href="#search_box"
          className="btn border-0 text-white fs-6"
          onClick={() => setSearch(!search)}
        >
          <BiSearch />
        </span>
        <form
          className={`${
            search && 'active'
          } ${'search_box , bg-white , rounded-3'}`}
          id="search_box"
          action="/search/"
          style={{ maxHeight: '480px', overflowY: 'scroll' }}
        >
          <input
            name="search"
            className="rounded-pill"
            placeholder="Search..."
            type="text"
            onChange={(c) => setQuery(c.target.value)}
          />
          {query == '' ? (
            <div className="row py-3">
              <div className="col-12 text-center">
                <span className="text-small text-secondary">
                  Search products
                </span>
              </div>
            </div>
          ) : (
            products.data
              .filter((product) => product.name.toLowerCase().includes(query.toLowerCase()))
              .map((product) => (
                <Link
                  href={`/products/${product.id}`}
                  className="text-decoration-none"
                  key={product.id}
                >
                  <div className="row py-3" onClick={() => setSearch(!search)}>
                    <div className="col-3 ms-sm-2">
                      <img
                        src={product.image.url}
                        alt="product-image"
                        width={50}
                      />
                    </div>
                    <div className="col-8">
                      <p className="text-secondary text-small text-black">
                        {product.name}
                      </p>
                    </div>
                  </div>
                </Link>
              ))
          )}
        </form>
      </div>
    </>
  )
}

export default Search
