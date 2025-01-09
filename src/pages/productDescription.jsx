import {useParams} from "react-router-dom"
import Header from "../../components/Header"
import useFetch from "../../useFetch"
import {Link} from "react-router-dom"
import { useState } from "react"
const ProductDescription = () => {
    const [size,setSelectedSize]=useState()
    const {productId} = useParams()
    console.log(size)
    const [alert,setAlert]=useState({visible:false,message:''})
    const {data,loading, error} = useFetch(`https://e-commerce-backend-ten-gamma.vercel.app/products/${productId}`)
   const handleSubmit=async(event)=>{
event.preventDefault()
const requestData={
    selectedSize:size,
    productDetails:productId,
    quantity:1
}
try {
  const response=await fetch("https://e-commerce-backend-ten-gamma.vercel.app/cart",{
    method:'POST',
    headers:{
        'content-type':'application/json',
    },
    body:JSON.stringify(requestData)
  }) ;
  if(!response.ok){
    throw 'Failed to add item into the cart'
  }
  const data=await response.json() 
  if(data){
   setAlert({visible:true,message:"Items added to cart successfully"})
  }
  setTimeout(()=>setAlert({visible:false,message:''}),2000)
} catch (error) {
    console.log(error)
}
   }
    return ( <>
    
     <Header/> <main className = "container" > <p >
     {
        alert.visible && <span className="bg-danger text-light position-fixed top-10 end-0 p-3 m-3 rounded">{alert.message}</span>
    }
        <Link className="btn" to="/">Home</Link>/<Link to="/products" className="btn">Products
        </Link>
        &gt; {data
            ?.productName}
    </p>
    {loading && (
    <div className="text-center py-5">
           <div className="spinner-grow" role="status">
    <span className="visually-hidden">Loading...</span>
  </div>
  <div className="spinner-grow" role="status">
    <span className="visually-hidden">Loading...</span>
  </div>
  <div className="spinner-grow" role="status">
    <span className="visually-hidden">Loading...</span>
  </div>
  <div className="spinner-grow" role="status">
    <span className="visually-hidden">Loading...</span>
  </div>
    </div>
 
 )} {!loading &&<div className = "row" > <div className="col-md-7">
        <img
            src={data
            ?.imgURL}
            id="productDescImg"
            className="image-fluid"/>
    </div> <div className = "col-md-5" > <h2>{data
            ?.productName}</h2> < p >~ {
        data
            ?.brand
    } </p>
<p className="fs-4 text-danger-emphasis">{data?.tagline} </p > <span className="fs-5 border px-2">{data
            ?.ratings}
        ★</span> <s> ₹ {
        data
            ?.price
    } </s> <span>₹ {data?.price-(data?.discountPercentage*data?.price)/100
} / - </span> < span className = "text-danger fw-bold" > {
    data
        ?.discountPercentage
} % off </span>
<hr/ > <label className="fs-5">Select Your Size From Available Sizes:
</label> < br /> 
<form onSubmit={handleSubmit}>{
    data?.sizes
            .map((size, index) => (<label className="mx-2" key={index} htmlFor={size}>
                <input type="radio" required  name="sizes" value={size} id={size} onChange={event=>setSelectedSize(event.target.value)}  />
                {" "} {size}</label>
                       ))
} <br/> <button className = "btn btn-danger m-2" type="submit" > Add to Cart </button>
</form>

<hr/> <p className = "fs-5" > Product Details </p>
{data?.details.map((detail,index)=>(<li key={index}>{detail}</li >))
} < hr /> <p className="fs-5">Product Description</p>
{
data
    ?.description
} < hr /> <p className="fs-5">Product Features</p>
{
data?.features
        .map((feature, index) => (
            <li key={index}>{feature}</li>
        ))
} < hr /> <p className="fs-5">Additional Details</p> < p > Gender Preference : {
data?.gender
} </p>
<p>Exhange Policy: {data?.exchangePolicy}</p > </div> </div>}
</main > </>)
}
export default ProductDescription