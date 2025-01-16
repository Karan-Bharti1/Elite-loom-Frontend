import { useState } from 'react'
import "bootstrap/dist/css/bootstrap.min.css"
import "bootstrap/dist/js/bootstrap.bundle.min.js"
import './App.css'
import useFetch from '../useFetch'
import Header from '../components/Header'
import { Link } from 'react-router-dom'
import Footer from '../components/Footer'

function App() {
  const {data,loading,error}=useFetch("https://e-commerce-backend-lyart-six.vercel.app/categories")
  console.log(data)
const displayData=data?.map(category=>(
  <>
  <div className='col-md-2 my-2' key={category._id}>
    <div className='card'>
    <img src={category.categoryImageURL} className="card-img-top " id="category-card" alt="..."/> 
    <div className="card-img-overlay d-flex flex-column justify-content-end">
        
       
        <Link className="btn bg-danger-subtle text-center"  to={`/products/${category._id}`}>{category.categoryName}</Link>
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

</div>
<section className="container">
  <div className="card text-bg-dark">
    <img
      className="img-fluid"
      id="introductoryImg"
      src="https://images.pexels.com/photos/5706277/pexels-photo-5706277.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
      alt="Introductory"
    />
    <div className="card-img-overlay d-flex flex-column  align-items-center">
      <h2 className="text-dark text-center mb-3">
        Elite Loom: Where Elegance Meets Everyday Comfort.
      </h2>
      <Link className="btn btn-danger" to="/products">
        Shop Now
      </Link>
    </div>
  </div>
</section>

<div className='container text-center py-4 display-5'> Top Categories to choose from...</div>
<section className='container text-center'>
  <div className='row container'>
{displayData}
</div>
</section>

  {loading && (<>
  <div className='container'>
  <div className='row '>
<div className='col-md-2 '>
<div className="card bg-dark-subtle" id="home-load-placeholder" aria-hidden="true">
<p className='p-5'></p>
</div>

</div>
<div className='col-md-2'>
<div className="card bg-dark-subtle" id="home-load-placeholder" aria-hidden="true">
<p className='p-5'></p>
 
</div>

</div>
<div className='col-md-2'>
<div className="card bg-dark-subtle" id="home-load-placeholder" aria-hidden="true"><p className='p-5'></p>
</div>

</div>
<div className='col-md-2'>
<div className="card bg-dark-subtle" id="home-load-placeholder" aria-hidden="true">
<p className='p-5'></p>
 
</div>

</div>
<div className='col-md-2'>
<div className="card bg-dark-subtle" id="home-load-placeholder" aria-hidden="true"><p className='p-5'></p>
</div>

</div>
<div className='col-md-2'>
<div className="card bg-dark-subtle" id="home-load-placeholder" aria-hidden="true">
<p className='p-5'></p>
 
</div>

</div>

    
  </div></div>
  
  </>)}

  </main>
  <Footer/>
    </>
  )
}

export default App
