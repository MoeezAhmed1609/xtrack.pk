import React, { useEffect, useState } from 'react'
import '../styles/globals.css'
import 'bootstrap/dist/css/bootstrap.css'
import Head from 'next/head'
import CartStateContext from '../context/CartContext'
import StateContext from '../context/StateContext'
import commerce from '../lib/commerce'
import { app, database } from '../lib/firebase'
import emailjs from '@emailjs/browser'
import {
  getAuth,
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithRedirect,
  signInWithEmailAndPassword,
  updateProfile,
} from 'firebase/auth'
import { getDatabase, ref, set, child, get } from 'firebase/database'
import { Navigation, Footer } from '../components/index'
import { client } from '../lib/client'

function MyApp({ Component, pageProps }) {
  const [token, setToken] = useState(null)
  const [category, setCategory] = useState([])
  const [products, setProducts] = useState([])
  const [name, setName] = useState('')
  const [user, setUser] = useState({})
  const messageStyle = ['text-tiny']
  const [message, setMessage] = useState('')
  const [type, setType] = useState(1) // 1 is success , 0 is error
  const [title, setTitle] = useState('')

  // cart state

  const [cart, setCart] = useState([])

  const fetchCart = async () => {
    await commerce.cart.retrieve().then((cart) => setCart(cart))
  }
  const addToCart = async (id, quantity) => {
    await commerce.cart.add(id, quantity).then((cart) => {
      setCart(cart)
      // window.location = '/cart'
    })
  }
  const addSingleVariantToCart = async (id, quantity, group, variant) => {
    if (group == '' || variant == '') {
      alert('Please select a variant')
    }
    await commerce.cart
      .add(id, quantity, {
        [group]: variant,
      })
      .then((cart) => {
        setCart(cart)
        window.location = '/cart'
      })
  }
  const addMultiVariantToCart = async (
    id,
    quantity,
    group1,
    group2,
    variant1,
    variant2,
  ) => {
    if (group1 == '' || variant1 == '' || group2 == '' || variant2 == '') {
      alert('Please select a variant')
      return
    }
    await commerce.cart
      .add(id, quantity, {
        [group1]: variant1,
        [group2]: variant2,
      })
      .then((cart) => {
        setCart(cart)
        window.location = '/cart'
      })
  }

  const removeFromCart = async (id) => {
    await commerce.cart.remove(id).then((cart) => setCart(cart))
  }

  const emptyCart = async () => {
    await commerce.cart.empty().then((cart) => setCart(cart))
  }

  if (type) {
    messageStyle.push('text-success')
  } else {
    messageStyle.push('text-danger')
  }
  const auth = getAuth()
  const database = getDatabase()

  const registrationHandler = (event) => {
    event.preventDefault()
    const f_name = event.target.f_name.value
    const s_name = event.target.s_name.value
    const email = event.target.email.value
    const password = event.target.password.value
    const confirmPassword = event.target.confirmPassword.value
    if (password !== confirmPassword) {
      setMessage('Passwords do not match!')
      setType(0)
      return
    }
    setName(f_name + s_name)
    createUserWithEmailAndPassword(auth, email, password)
      .then((data) => {
        updateProfile(auth.currentUser, {
          displayName: f_name,
        })
        setMessage('Registration Successfull')
        setType(1)
        set(ref(database, 'users/' + f_name), {
          firstname: f_name,
          secondname: s_name,
          email: email,
        })
        event.target.f_name.value = ''
        event.target.s_name.value = ''
        event.target.email.value = ''
        event.target.password.value = ''
        event.target.confirmPassword.value = ''
        window.location = '/'
      })
      .catch((error) => {
        setMessage(error.message)
        setType(0)
      })
  }
  const loginHandler = (event) => {
    event.preventDefault()
    const email = event.target.email.value
    const password = event.target.password.value
    signInWithEmailAndPassword(auth, email, password)
      .then((data) => {
        setMessage('Login Successfull')
        setType(1)
        event.target.email.value = ''
        event.target.password.value = ''
        window.location = '/'
      })
      .catch((error) => {
        setMessage(error.message)
        setType(0)
      })
  }

  const logOutHandler = () => {
    auth.signOut().then(() => (window.location = '/'))
  }
  // console.log(token)
  //  Billing details to firebase database
  const [payment, setPayment] = useState('')
  const billingDataHandler = async (event) => {
    event.preventDefault()
    if (payment == '') {
      alert('Please select a payment method!')
      return
    }
    const date = new Date()
    const f_name = event.target.f_name.value
    const s_name = event.target.s_name.value
    const phone = event.target.phone.value
    const email = event.target.email.value
    const country = event.target.country.value
    const state = event.target.state.value
    const address = event.target.Address.value
    const zip = event.target.Zip.value
    let variants = []
    token?.line_items.map((item) =>
      item.selected_options?.map((variant) =>
        variants.push(variant.option_name),
      ),
    )

    const orderData = token?.line_items.map((item) => ({
      name: item.product_name,
      quantity: item.quantity,
      price: item.line_total.formatted_with_code,
      variants: variants,
    }))

    await set(
      ref(database, 'orders/' + f_name.toLowerCase() + '/' + token?.id),
      {
        date: date,
        products: orderData,
        f_name: f_name,
        s_name: s_name,
        phone: phone,
        email: email,
        state: state,
        address: address,
        payment: payment,
        zip: zip,
      },
    )
    await commerce.cart.refresh().then((cart) => setCart(cart))
    const params = {
      fname: f_name,
      sname: s_name,
      phone: phone,
      email: email,
      address: address,
      orderhtml: `
      <div>
          <table>
            <tr>
              <th>Product</th>
              <th>Quantity</th>
              <th>Price</th>
            </tr>
              <tr>
                <td>${token.line_items[0]?.product_name} ${
        token.line_items[0]?.selected_options[0]?.option_name
      } ${token.line_items[0]?.selected_options[1]?.option_name}</td>
                <td>${token.line_items[0]?.quantity}</td>
                <td>${token.line_items[0]?.price.formatted_with_code}</td>
              </tr>
              <tr>
                <td>${token.line_items[1]?.product_name} ${
        token.line_items[1]?.selected_options[0]?.option_name
      } ${token.line_items[1]?.selected_options[1]?.option_name}</td>
                <td>${token.line_items[1]?.quantity}</td>
                <td>${token.line_items[1]?.price.formatted_with_code}</td>
              </tr>
              ${
                token.line_items[2]
                  ? `
                  <tr>
                    <td>
                      ${token.line_items[2]?.product_name} 
                      ${token.line_items[2]?.selected_options[0]?.option_name}
                      ${token.line_items[2]?.selected_options[1]?.option_name}
                    </td>
                    <td>${token.line_items[2]?.quantity}</td>
                    <td>${token.line_items[2]?.price.formatted_with_code}</td>
                  </tr>
                `
                  : null
              }
              
              ${
                token.line_items[3]
                  ? `
                  <tr>
                    <td>
                      ${token.line_items[3]?.product_name} 
                      ${token.line_items[3]?.selected_options[0]?.option_name}
                      ${token.line_items[3]?.selected_options[1]?.option_name}
                    </td>
                    <td>${token.line_items[3]?.quantity}</td>
                    <td>${token.line_items[3]?.price.formatted_with_code}</td>
                  </tr>
                `
                  : null
              }
              ${
                token.line_items[4]
                  ? `
                  <tr>
                    <td>
                      ${token.line_items[4]?.product_name} 
                      ${token.line_items[4]?.selected_options[0]?.option_name}
                      ${token.line_items[4]?.selected_options[1]?.option_name}
                    </td>
                    <td>${token.line_items[4]?.quantity}</td>
                    <td>${token.line_items[4]?.price.formatted_with_code}</td>
                  </tr>
                `
                  : null
              }
              ${
                token.line_items[5]
                  ? `
                  <tr>
                    <td>
                      ${token.line_items[5]?.product_name} 
                      ${token.line_items[5]?.selected_options[0]?.option_name}
                      ${token.line_items[5]?.selected_options[1]?.option_name}
                    </td>
                    <td>${token.line_items[5]?.quantity}</td>
                    <td>${token.line_items[5]?.price.formatted_with_code}</td>
                  </tr>
                `
                  : null
              }
              ${
                token.line_items[6]
                  ? `
                  <tr>
                    <td>
                      ${token.line_items[6]?.product_name} 
                      ${token.line_items[6]?.selected_options[0]?.option_name}
                      ${token.line_items[6]?.selected_options[1]?.option_name}
                    </td>
                    <td>${token.line_items[6]?.quantity}</td>
                    <td>${token.line_items[6]?.price.formatted_with_code}</td>
                  </tr>
                `
                  : null
              }
              ${
                token.line_items[8]
                  ? `
                  <tr>
                    <td>
                      ${token.line_items[8]?.product_name} 
                      ${token.line_items[8]?.selected_options[0]?.option_name}
                      ${token.line_items[8]?.selected_options[1]?.option_name}
                    </td>
                    <td>${token.line_items[8]?.quantity}</td>
                    <td>${token.line_items[8]?.price.formatted_with_code}</td>
                  </tr>
                `
                  : null
              }
              ${
                token.line_items[9]
                  ? `
                  <tr>
                    <td>
                      ${token.line_items[9]?.product_name} 
                      ${token.line_items[9]?.selected_options[0]?.option_name}
                      ${token.line_items[9]?.selected_options[1]?.option_name}
                    </td>
                    <td>${token.line_items[9]?.quantity}</td>
                    <td>${token.line_items[9]?.price.formatted_with_code}</td>
                  </tr>
                `
                  : null
              }
          </table>
    </div>
      `,
    }
    await emailjs.send(
      'service_2ceha86',
      'template_31eib0b',
      params,
      '-tJB3Q51ddpz99KGg',
    )
    event.target.f_name.value = ''
    event.target.s_name.value = ''
    event.target.phone.value = ''
    event.target.email.value = ''
    event.target.country.value = ''
    event.target.state.value = ''
    event.target.Address.value = ''
    event.target.Zip.value = ''
    window.location = '/checkout/success'
  }

  const fetchProducts = async () => {
    await commerce.products.list({ limit: 150 }).then((data) => {
      setProducts(data)
    })
  }

  const fetchCategories = async () => {
    const { data } = await commerce.categories.list()
    setCategory(data)
  }
  useEffect(() => {
    fetchProducts()
    fetchCategories()
    fetchCart()
  }, [])
  useEffect(() => {
    import('bootstrap/dist/js/bootstrap')
    client
      .fetch(`*[_type == 'webtitle']`)
      .then((data) => {
        setTitle(data)
      })
      .catch(console.error)
  }, [])
  return (
    <CartStateContext.Provider
      value={{
        cart,
        setCart,
        addToCart,
        addSingleVariantToCart,
        addMultiVariantToCart,
        removeFromCart,
        emptyCart,
        setToken,
        token,
        billingDataHandler,
        setPayment,
      }}
    >
      <StateContext.Provider
        value={{
          auth,
          message,
          type,
          registrationHandler,
          loginHandler,
          logOutHandler,
          messageStyle,
          name,
          category,
          products,
          database,
          title,
        }}
      >
        <Head>
          <meta name="viewport" content="width=device-width, initial-scale=1" />
          <meta
            name="keywords"
            content="xtrack, xtrackpk, xtrack pk, supplements store, pakistan, gym, supplements, gym supplements, health supplements, supplements store in pakistan, fitness, fitness supplements, bodybuilding, health, how to lose weight, weight loss
, workout, diet, training, nutrition, mens health, fitness world, protein, mass gainer, weigth, shakers, gym accessories, gym wears, pre workout, creatine, protein in pakistan, whey protein, whey protein in pakistan, protein powder, buy supplement, buy supplement online"
          />
          <meta name="description" content={title[0]?.description} />
          <title>{title[0]?.title}</title>
          <link rel="icon" href="/xtrack.ico" />
        </Head>
        <header className="mb-5">
          <Navigation products={products} />
        </header>
        <Component {...pageProps} />
        <footer>
          <Footer />
        </footer>
      </StateContext.Provider>
    </CartStateContext.Provider>
  )
}

export default MyApp
