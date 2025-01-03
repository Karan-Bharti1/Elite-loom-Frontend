import { useParams } from "react-router-dom";
import Header from "../../components/Header";
import useFetch from "../../useFetch";
import { Link } from "react-router-dom";
import { useState } from "react";
const Products=()=>{
    const [category,selectCategory]=useState('All')
    const {categoryId}=useParams()
    const {data,loading,error}=useFetch(categoryId===undefined?"https://e-commerce-backend-ten-gamma.vercel.app/products":`https://e-commerce-backend-ten-gamma.vercel.app/products/category/${categoryId}`)
    console.log(data)
    console.log(categoryId)
    
    const displayData=data?.map(product=>(
        <div key={product._id} className="col-md-4 my-3">
<div className="card border-0">
    <img src={product.imgURL} className="img-fluid" id="card-products-display" alt="Product Loading"/>
    <p className="d-flex justify-content-between align-content-center pt-2"><span>{product.productName}</span><span>{product.ratings}★</span></p>

<p><s>₹ {product.price}</s> <span>₹ {product.price-(product.discountPercentage*product.price)/100}/-</span> <span className="text-danger fw-bold">{product.discountPercentage}% off</span></p></div>
<p><Link className="btn btn-danger">Add to Wishlist</Link><Link className="btn btn-danger mx-3">Add to Cart</Link></p>
        </div>
    ))
return (
    <><Header/>
    <main>
      <div className="container d-flex justify-content-between align-content-center">
         <p ><Link className="btn" to="/">Home</Link>/<Link to="/products" className="btn">Products </Link></p>
      <div>{categoryId===undefined && (<select onChange={(event)=>selectCategory(event.target.value)}>
        <option value="">---Select Category---</option>
        <option value="Ethnic">Ethnic</option>
        <option value="Bottomwear">Bottomwear</option>
        <option value="Sportswear">Sportswear</option>
        <option value="KidsWear">KidsWear</option>
        <option value="Formal">Formal</option>
        <option value="Topwear">Topwear</option>
      </select>)}
      </div></div> 
<div className="row">
    <div className="col-md-2">
        <div className="border-end">
        <h2>Filters</h2>
        </div>
     
    </div>
    <div className="col-md-9 ">
<div className="row">
    {displayData}
    {
        loading && (<>
        <div className="row">
<div className="col-md-4 p-2">
    <div className="card">
        <div id="card-shimmer" className="bg-dark-subtle"></div>
        <span className="placeholder my-2" ></span>
        <span className="placeholder col-6 my-2"></span>
<span className="placeholder w-75 my-2"></span>

    </div>
    
</div>
<div className="col-md-4 p-2">
    <div className="card">
        <div id="card-shimmer" className="bg-dark-subtle"></div>
        <span className="placeholder my-2" ></span>
        <span className="placeholder col-6 my-2"></span>
<span className="placeholder w-75 my-2"></span>

    </div>
    
</div>
<div className="col-md-4 p-2">
    <div className="card">
        <div id="card-shimmer" className="bg-dark-subtle"></div>
        <span className="placeholder my-2" ></span>
        <span className="placeholder col-6 my-2"></span>
<span className="placeholder w-75 my-2"></span>

    </div>
    
</div>
<div className="col-md-4 p-2">
    <div className="card">
        <div id="card-shimmer" className="bg-dark-subtle"></div>
        <span className="placeholder my-2" ></span>
        <span className="placeholder col-6 my-2"></span>
<span className="placeholder w-75 my-2"></span>

    </div>
    
</div>
<div className="col-md-4 p-2">
    <div className="card">
        <div id="card-shimmer" className="bg-dark-subtle"></div>
        <span className="placeholder my-2" ></span>
        <span className="placeholder col-6 my-2"></span>
<span className="placeholder w-75 my-2"></span>

    </div>
    
</div>
<div className="col-md-4 p-2">
    <div className="card">
        <div id="card-shimmer" className="bg-dark-subtle"></div>
        <span className="placeholder my-2" ></span>
        <span className="placeholder col-6 my-2"></span>
<span className="placeholder w-75 my-2"></span>

    </div>
    
</div>


        </div>
        
        
        </>)
    }
</div>
    </div>
</div>
    </main>
    </>
)
}
export default Products;