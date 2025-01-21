import {useParams} from "react-router-dom"
import Header from "../../components/Header"
import useFetch from "../../useFetch"
import {Link} from "react-router-dom"
import { useEffect, useState } from "react"

import {Products} from "./products"
const ProductDescription = () => {
    const [size,setSelectedSize]=useState()
    const {productId} = useParams()
    
    const [alert,setAlert]=useState({visible:false,message:''})
    const [wishlistTrigger,setWishlistTrigger]=useState(false)
    const [wishlistItems,setWishlistItems]=useState([])
    const [wishlistAlert,setWishlistAlert]=useState({visible:false,message:''})
    const [alreadyWishlistedAlert,setAlreadyWishlistedAlert]=useState({visible:false,message:''})
    const {data,loading, error} = useFetch(`https://e-commerce-backend-lyart-six.vercel.app/products/${productId}`)
    const {data:wishlistData}=useFetch("https://e-commerce-backend-lyart-six.vercel.app/wishlist")
    console.log(wishlistData)
    useEffect(() => {
      const fetchWishlist = async () => {
        try {
          const response = await fetch("https://e-commerce-backend-lyart-six.vercel.app/wishlist");
          const wishListItemsData = await response.json();
          if(Array.isArray(wishListItemsData))
  { setWishlistItems(wishListItemsData)}
        } catch (error) {
          console.error("Error fetching wishlist:", error);
        }
      };
    
      fetchWishlist();
    }, [wishlistTrigger]);
   const handleSubmit=async(event)=>{
event.preventDefault()
const requestData={
    selectedSize:size,
    productDetails:productId,
    quantity:1
}
try {
  const response=await fetch("https://e-commerce-backend-lyart-six.vercel.app/cart",{
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
   const handleWishlistClick=async(productId)=>{
const requestData={
  productDetails:productId
}
try {
  const isInWishlist=wishlistItems.some(item=>item.productDetails._id===productId)
  if(isInWishlist){

setAlreadyWishlistedAlert(
  { visible:true,message:'Already Wishlisted'}
 )
  }
  setTimeout(() => {
    setAlreadyWishlistedAlert({
     visible:false,
    })
   }, 1500);
  if(!isInWishlist)
{  const response=await fetch("https://e-commerce-backend-lyart-six.vercel.app/wishlist",{
    method:'POST',
    headers:{
        'Content-Type':'application/json'
    },
    body:JSON.stringify(requestData)
     })
  
  const data=await response.json()
  if(data ){
    setWishlistTrigger(!wishlistTrigger)
    setWishlistAlert({visible:true,message:'Wishlisted'})
  }
  setTimeout(() => {
    setWishlistAlert({
     visible:false,
    })
   }, 1500)
  }
} catch (error) {
  console.log(error)
}
   }
    return ( <>
    
      <main className = "container" > <p >
     {
        alert.visible && <span id="alert" className="bg-danger text-light position-fixed top-10 end-0 p-3 m-3 rounded">{alert.message}</span>
    }
    {
      alreadyWishlistedAlert.visible && <span id="alert" className="bg-danger text-light position-fixed top-10 end-0 p-3 m-3 rounded">{alreadyWishlistedAlert.message}</span>
    }
      {
      wishlistAlert.visible && <span id="alert" className="bg-danger text-light position-fixed top-10 end-0 p-3 m-3 rounded">{wishlistAlert.message}</span>
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
 
 )}
    {error && <h2 className="text-center">Failed to get product data</h2>}
  {!loading && !error &&<div className = "row" > <div className="col-md-7">

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
<p className="fs-4 text-danger-emphasis">{data?.tagline} </p >
 <div className="d-flex align-content-center justify-content-between"><div>
 <span className="fs-5 border px-2">{data
            ?.ratings}
        ★</span> <s> ₹ {
        data
            ?.price
    } </s> <span>₹ {data?.price-(data?.discountPercentage*data?.price)/100
} / - </span> < span className = "text-danger fw-bold" > {
    data
        ?.discountPercentage
} % off </span>
 </div>
 <button className="btn btn-danger mx-3" onClick={()=>handleWishlistClick(data?._id)}>🤍</button>
 </div>
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
</main > 
</>)
}
const Details=()=>{
const [searchTerm,setSearchTerm]=useState("")
return(<>
<Header searchBar={true} setSearchTerm={setSearchTerm}/>
{searchTerm.length===0 && <ProductDescription/>}
{searchTerm.length>1 && <Products searchTerm={searchTerm}/>}
</>)
}
export default Details;