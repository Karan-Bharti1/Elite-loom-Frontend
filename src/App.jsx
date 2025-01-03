import { useState } from 'react'
import "bootstrap/dist/css/bootstrap.min.css"
import "bootstrap/dist/js/bootstrap.bundle.min.js"
import './App.css'
import useFetch from '../useFetch'
import Header from '../components/Header'
import { Link } from 'react-router-dom'

function App() {
  const {data,loading,error}=useFetch("https://e-commerce-backend-ten-gamma.vercel.app/categories")
  console.log(data)
const displayData=data?.map(category=>(
  <>
  <div className='col-md-2 my-2'>
    <div className='card'>
    <img src={category.categoryImageURL} className="card-img-top " id="category-card" alt="..."/> 
    <div className="card-img-overlay">
        
       
        <Link className="btn bg-danger-subtle" to="/products">{category.categoryName}</Link>
           </div>
         
    </div>
  </div>
  </>
))
  return (
    <>
  <Header/>
  <main>
    <div className='container '>
<h1 className='display-3 py-4'>Explore wide Range of our collections</h1>
</div>
<section className='container'>
<div className="card text-bg-dark" >
<img className="img-fluid" id="introductoryImg" src="https://images.pexels.com/photos/5490979/pexels-photo-5490979.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"/>
    
      <div className="card-img-overlay">
        
   <h2>Elite Loom: Where Elegance Meets Everyday Comfort.</h2>
   <Link className="btn btn-danger" to="/products">Shop Now</Link>
      </div>
    </div>
</section>
<div className='container text-center py-4 display-5'> Top Categories to choose from...</div>
<section className='container text-center'>
  <div className='row'>
{displayData}
</div>
</section>
  </main>
    </>
  )
}

export default App
