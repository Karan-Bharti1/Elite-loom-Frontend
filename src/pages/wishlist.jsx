import { useState,useEffect } from "react"
import Header from "../../components/Header"
import useFetch from "../../useFetch"
import {Link} from "react-router-dom"
const Wishlist=()=>{
    const {data,loading,error}=useFetch("https://e-commerce-backend-ten-gamma.vercel.app/wishlist")
   const [sizeData,setSizeData]=useState({})
   console.log(sizeData)
    const [wishlistData,setWishlistData]=useState([])
    const [deleteWishlistAlert,setDeleteWishlistAlert]=useState({visible:false,message:''})
    const [moveToCartAlert,setMoveToCartAlert]=useState({visible:false,message:''})
    useEffect(() => {
        if (Array.isArray(data)) {
            setWishlistData(data);
        } else {
            setWishlistData([]);
        }
    }, [data]);
    console.log(wishlistData)
    const handleDelete=async(wishlistId)=>{
try {
    const response=await fetch(`https://e-commerce-backend-ten-gamma.vercel.app/wishlist/${wishlistId}`,{
        method:'Delete'
    })
    if(!response.ok){
        throw "Failed to delete item from wishlist"
    }
    const data=await response.json()
    if(data){
        setWishlistData(prev=>prev.filter(item=>item._id !== wishlistId))
        setDeleteWishlistAlert({visible:true,message:'Item removed from wishlist'})

    }
    setTimeout(()=>setDeleteWishlistAlert({visible:false,message:''}),1500)
} catch (error) {
    console.log(error)
}
    }
    const handleSize=(productId,size)=>{
setSizeData(prev=>({...prev,[productId]:size}))
    }
    const handleSubmit=async(event,productId,wishlistId)=>{
event.preventDefault()
const requestData={ 
    selectedSize:sizeData[productId],
    productDetails:productId,
    quantity:1
}
try {
    const response=await fetch("https://e-commerce-backend-ten-gamma.vercel.app/cart",{
        method:'POST',
        headers:{
            'content-type':'application/json'
        },
        body:JSON.stringify(requestData)
    })
    if(!response.ok){
        throw 'Failed to add item to Cart'
    }
    const data=await response.json()
    if(data){
        setMoveToCartAlert({visible:true,message:'Item Moved To Cart'})
    }
    setTimeout(() => {
      setMoveToCartAlert({visible:false,message:''})  
    }, 1500);
    const deleteresponse= await fetch(`https://e-commerce-backend-ten-gamma.vercel.app/wishlist/${wishlistId}`,{
        method:'Delete'
    })
    if(!deleteresponse.ok){
        throw 'Failed to delete item'
    }
    const deletedData=await deleteresponse.json()
    if(deletedData){
        setWishlistData(prev=>prev.filter(item=>item._id!==wishlistId))
    }
} catch (error) {
    console.log(error)
}
    }
    const displayData=wishlistData?.map(item=>(
        <div key={item._id} className="col-md-3 my-3 ">
<div className="card  shadow-sm">
<Link to={`/products/product/${item.productDetails._id}`}>
    <img
        src={item.productDetails.imgURL}
        alt={item.productDetails.productName}
        className="img-fluid card-img-top"
        id="wishlist-cards-image"
    />
</Link>
<div className="card-body">
    <div className="d-flex justify-content-between align-content-center"><p>{item.productDetails.productName}</p><p>{item.productDetails.ratings} ★</p></div>
   <div className="d-flex justify-content-between align-content-center"> <p>     <s>₹ {item.productDetails.price}</s>
                        <span>₹ {item.productDetails.price - (item.productDetails.discountPercentage * item.productDetails.price) / 100}/-</span>
                        <span className="text-danger fw-bold">{item.productDetails.discountPercentage}% off</span></p>
                        <button onClick={()=>handleDelete(item._id)} className="btn btn-close"></button>
                        </div>
                        
                            <form className="d-flex justify-content-between align-content-center"  onSubmit={event=>handleSubmit(event,item.productDetails._id,item._id)}>
                          
                            <select  onClick={event=>handleSize(item.productDetails._id,event.target.value)} required>
                            <option value="">Your Size</option>
                            {item.productDetails
                                .sizes
                                .map(size => ( <> <option>{size}</option> </>))}
                        </select><br/>
                        <button type="submit" className="btn btn-danger">Add to Cart</button>
                   
                            </form>
                        
                  
</div>
</div>
        </div>
    ))
return(
    <>
    <Header/>
    <main className="container">
    <Link className="btn" to="/">Home</Link>/<Link to="/products" className="btn">Products</Link>/<Link className="btn " to="/wishlist">Wishlist</Link>
    {deleteWishlistAlert.visible && <span className="top-10 end-0 text-white bg-danger position-fixed p-3 m-3">{deleteWishlistAlert.message}</span>}
    {moveToCartAlert.visible && <span className="top-10 end-0 text-white bg-danger position-fixed p-3 m-3">{moveToCartAlert.message}</span>}
  {  !loading &&    <h1 className=" fs-2 py-3">My Wishlist ({wishlistData.length} Items)</h1>}
        {error && <h2>No Items in Wishlist</h2>}
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
 <div className="row">
 {displayData}
 </div>
       

    </main>
    </>
)
}
export default Wishlist