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
          className="btn border-0 text-white"
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
          style={{maxHeight : '480px' , overflowY : 'scroll'}}
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
            products.data.filter((product) => product.name.toLowerCase().includes(query))
              .map((product) => (
                <Link href={`/products/${product.id}`} className='text-decoration-none' key={product.id}>
                <div className="row py-3">
                  <div className="col-3 ms-sm-2">
                    <img
                      src={product.image.url}
                      alt="product-image"
                      width={50}
                    />
                  </div>
                  <div className="col-8">
                    <Link href="/" className="text-decoration-none">
                      <p className="text-secondary text-small text-black">
                        {product.name}
                      </p>
                    </Link>
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
