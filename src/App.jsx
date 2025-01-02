import { useState } from 'react'
import "bootstrap/dist/css/bootstrap.min.css"
import "bootstrap/dist/js/bootstrap.bundle.min.js"
import './App.css'
import useFetch from '../../useFetch'
import Header from '../components/Header'

function App() {
  const {data,loading,error}=useFetch("https://e-commerce-backend-ten-gamma.vercel.app/categories")
  console.log(data)

  return (
    <>
  <Header/>
  
    </>
  )
}

export default App
