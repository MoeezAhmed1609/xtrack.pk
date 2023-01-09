import React, { useEffect, useState, useContext } from 'react'
import { ref , get , child } from 'firebase/database'
import Head from 'next/head'
import {
  Carousel,
  Delievery,
  Stacks,
  OfferProducts,
  Categories,
  Companies,
} from '../components/index'
import commerce from '../lib/commerce'
import { client } from '../lib/client'
import StateContext from '../context/StateContext'

export default function Home({ products }) {
  const context = useContext(StateContext)
  const [banner, setbanner] = useState()
  const [discount, setDiscount] = useState()
  useEffect(() => {
    client
      .fetch(`*[_type == 'banner']`)
      .then((data) => {
        setbanner(data)
      })
      .catch(console.error)
    client
      .fetch(`*[_type == 'discount']`)
      .then((data) => {
        setDiscount(data)
      })
      .catch(console.error)
  }, [])

  return (
    <div>
      <Delievery />
      <Carousel banner={banner} />
      <OfferProducts products={products} discount={discount} />
      <Stacks products={products} />
      <Categories categories={context.category} products={products} />
      <Companies categories={context.category} />
    </div>
  )
}

export async function getStaticProps() {
  const { data: products } = await commerce.products.list({ limit: 150 })
  return {
    props: {
      products,
    },
  }
}
