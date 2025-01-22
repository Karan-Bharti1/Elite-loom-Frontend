import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import {createBrowserRouter,RouterProvider} from "react-router-dom"

import Products from './pages/products.jsx'

import Cart from './pages/cart.jsx'

import Address from './pages/address.jsx'
import ChooseAddress from './pages/chooseAddressData.jsx'

import Orders from './pages/orders.jsx'
import OrderSummary from './pages/orderSummaryPage.jsx'
import Details from './pages/productDescription.jsx'
import Home from './App.jsx'
import ProfilePage from './pages/profilePage.jsx'
import WishlistPage from './pages/wishlist.jsx'
import UpdateAdress from './pages/updateAddress.jsx'

const router=createBrowserRouter([
  {
    path:"/",
    element:<Home/>
  },{
    path:"/products",
    element:<Products/>
  },
  {
    path:"/products/:categoryId",
    element:<Products/>
  },{
    path:"/products/product/:productId",
    element:<Details/>
  },{
    path:"/cart",
    element:<Cart/>
  },{
    path:"/wishlist",
    element:<WishlistPage/>
  },{
    path:"/address",
    element:<Address profile={false}/>
  },{
    path:"/address/profile",
    element:<Address profile={true}/>
  },{
    path:"/chooseaddress",
    element:<ChooseAddress/>
  },{
    path:"/profile",
    element:<ProfilePage/>
  },{
    path:"/orders",
    element:<Orders/>
  },{
    path:"/orders/:orderId",
    element:<OrderSummary/>
  },{
    path:"/chooseaddress/:addressId",
    element:<UpdateAdress/>
  }
])
createRoot(document.getElementById('root')).render(
  <StrictMode>
 <RouterProvider router={router}/>
  </StrictMode>,
)
