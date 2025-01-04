import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import {createBrowserRouter,RouterProvider} from "react-router-dom"
import App from './App.jsx'
import Products from './pages/products.jsx'
import ProductDescription from './pages/productDescription.jsx'

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
  }
])
createRoot(document.getElementById('root')).render(
  <StrictMode>
 <RouterProvider router={router}/>
  </StrictMode>,
)
