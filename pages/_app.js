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
import { v4 as uuidv4 } from 'uuid'

function MyApp({ Component, pageProps }) {
  const [token, setToken] = useState(null)
  const [category, setCategory] = useState([])
  const [products, setProducts] = useState([])
  const [name, setName] = useState('')
  const [user, setUser] = useState({})
  const messageStyle = ['text-tiny']
  const [message, setMessage] = useState('')
  const [type, setType] = useState(1) // 1 is success , 0 is error
  // console.log(orderId)

  // cart state

  const [cart, setCart] = useState([])

  const fetchCart = async () => {
    await commerce.cart.retrieve().then((cart) => setCart(cart))
  }
  const addToCart = async (id, quantity) => {
    await commerce.cart.add(id, quantity).then((cart) => {
      setCart(cart)
      window.location = '/cart'
    })
  }
  const addSingleVariantToCart = async (id, quantity, group, variant) => {
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
        // console.log(auth)
        // return
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
        console.log(error)
        setMessage(error.message)
        setType(0)
      })
  }
  // console.log(auth)

  // const googleLoginHandler = () => {
  //   const provider = new GoogleAuthProvider()
  //   signInWithRedirect(auth, provider)
  //     .then((result) => {
  //       setMessage('Login Successfull')
  //       setType(1)
  //       window.location = '/'
  //     })
  //     .catch((error) => {
  //       setMessage(error.message)
  //       setType(0)
  //     })
  // }
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
  // const dbRef = ref(database)
  // get(child(dbRef, `users/${name}`))
  //   .then((snapshot) => {
  //     if (snapshot.exists()) {
  //       setUser(snapshot.val())
  //     } else {
  //       console.log('No data available')
  //     }
  //   })
  //   .catch((error) => {
  //     console.error(error)
  //   })

  console.log(token)

  const logOutHandler = () => {
    auth.signOut().then(() => (window.location = '/'))
  }

  //  Billing details to firebase database
  const [payment, setPayment] = useState('')
  const billingDataHandler = async (event) => {
    event.preventDefault()
    const f_name = event.target.f_name.value
    const s_name = event.target.s_name.value
    const phone = event.target.phone.value
    const email = event.target.email.value
    const country = event.target.country.value
    const state = event.target.state.value
    const address = event.target.Address.value
    const zip = event.target.Zip.value

    await set(
      ref(
        database,
        'orders/' + f_name.toLowerCase() + '/' + token?.line_items[0].permalink,
      ),
      {
        f_name: f_name,
        s_name: s_name,
        phone: phone,
        email: email,
        country: country,
        state: state,
        address: address,
        payment: payment,
        zip: zip,
        products: token?.line_items,
      },
    )

    await commerce.cart.refresh().then((cart) => setCart(cart))
    const params = {
      f_name: f_name,
      s_name: s_name,
      phone: phone,
      email: email,
      address: address,
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
  // console.log(auth.currentUser.displayName.toLowerCase())
  // const fetchOrderDetails = () => {
  //   const dbRef = ref(database)
  //   get(child(dbRef, `orders/${auth.currentUser?.displayName?.toLowerCase()}`))
  //     .then((snapshot) => {
  //       setUserOrder(snapshot.val())
  //     })
  //     .catch((error) => {
  //       console.error(error)
  //     })
  // }
  // console.log(userOrder)

  const fetchProducts = async () => {
    await commerce.products.list({ limit: 150 }).then((data) => {
      setProducts(data)
    })
  }

  const fetchCategories = async () => {
    const { data } = await commerce.categories.list()
    
    setCategory(data)
  }

  // var origArray = [0, 1, 2, 3, 4, 5]
  // var cloneArray = origArray.slice()
  // var i = 3

  // cloneArray.splice(i, 1)

  // console.log(cloneArray)
  useEffect(() => {
    import('bootstrap/dist/js/bootstrap')
    fetchProducts()
    fetchCategories()
    fetchCart()
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
        }}
      >
        <Head>
          <meta name="viewport" content="width=device-width, initial-scale=1" />
          <title>Xtrack GYM Store</title>
        </Head>
        <header>
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
