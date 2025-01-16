import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import {createBrowserRouter,RouterProvider} from "react-router-dom"
import App from './App.jsx'
import Products from './pages/products.jsx'
import ProductDescription from './pages/productDescription.jsx'
import Cart from './pages/cart.jsx'
import Wishlist from './pages/wishlist.jsx'
import Address from './pages/address.jsx'
import ChooseAddress from './pages/chooseAddressData.jsx'
import Profile from './pages/profilePage.jsx'
import Orders from './pages/orders.jsx'
import OrderSummary from './pages/orderSummaryPage.jsx'

const router=createBrowserRouter([
  {
    path:"/",
    element:<App/>
  },{
    path:"/products",
    element:<Products/>
  },
  {
    path:"/products/:categoryId",
    element:<Products/>
  },{
    path:"/products/product/:productId",
    element:<ProductDescription/>
  },{
    path:"/cart",
    element:<Cart/>
  },{
    path:"/wishlist",
    element:<Wishlist/>
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
    element:<Profile/>
  },{
    path:"/orders",
    element:<Orders/>
  },{
    path:"/orders/:orderId",
    element:<OrderSummary/>
  }
])
createRoot(document.getElementById('root')).render(
  <StrictMode>
 <RouterProvider router={router}/>
  </StrictMode>,
)
