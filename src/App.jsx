import { useState } from 'react'
import "bootstrap/dist/css/bootstrap.min.css"
import "bootstrap/dist/js/bootstrap.bundle.min.js"
import './App.css'
import useFetch from '../useFetch'
import Header from '../components/Header'
import { Link } from 'react-router-dom'
import Footer from '../components/Footer'
import { Products } from './pages/products'
import API_URL, { HOME_PAGE_URL } from './Url'

function App() {
  const {data,loading,error}=useFetch(`${API_URL}categories`)
  console.log(data)
const displayData=data?.map(category=>(
  <>
  <div className='col-md-2 my-2 ' key={category._id}>
    <div className="card border-0">
    <img src={category.categoryImageURL} className="card-img-top " id="category-card" alt="..."/> 
    <div className="card-img-overlay d-flex flex-column justify-content-end">
        
       
        <Link className="btn bg-danger-subtle text-center"  to={`/products/${category._id}`}>{category.categoryName}</Link>
           </div>
         
    </div>
  </div>
  </>
))
const CategoryShimmer=()=>(<div className='col-md-2'>
  <div className="card bg-dark-subtle" id="home-load-placeholder" aria-hidden="true">
  <p className='p-5'></p>
   
  </div>
  
  </div>)
  return (
    <>
 
  <main>
    <div className='container '>

</div>
<section className="container">
  <div className="card text-bg-dark border-0">
    <img
      className="img-fluid"
      id="introductoryImg"
      src={HOME_PAGE_URL}
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
  <div className='row '>
    {error && <h2>Failed to fetch category data</h2>}
{displayData}
</div>
</section>

  {loading && (<>
  <div className='container'>
  <div className='row '>
<CategoryShimmer/>
<CategoryShimmer/>
<CategoryShimmer/>
<CategoryShimmer/>
<CategoryShimmer/>
<CategoryShimmer/>
  </div></div>
  </>)}
  </main>
  <Footer/>
    </>
  )
}
const Home=()=>{
  const [searchTerm,setSearchTerm]=useState('')
  return(<>
  <Header setSearchTerm={setSearchTerm} searchBar={true} />
  {searchTerm.length===0 && <App/>}
  {searchTerm.length>0 && <Products searchTerm={searchTerm}/>}
  </>)
}
export default Home
