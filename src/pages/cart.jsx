import Header from "../../components/Header";
import useFetch from "../../useFetch";
import { useState,useEffect } from "react";
import {Link} from "react-router-dom";
const Cart = () => {
    const {data, loading, error} = useFetch("https://e-commerce-backend-ten-gamma.vercel.app/cart",[])
    const [quantity,setQuantity]=useState({})
    const cartItems = Array.isArray(data) ? data : [];

useEffect(()=>{
    if(cartItems.length>0){
        const initialQuantities=cartItems.reduce((acc,curr)=>{
            acc[curr._id]=curr.quantity
            return acc
        },{})
        setQuantity(initialQuantities)
    }
},[cartItems])
const handleQuantityChange=async(cartId,updatedQuantity)=>{
    const requestData={quantity:updatedQuantity}
    if(updatedQuantity<1) return;
   
try{
    const response=await fetch(`https://e-commerce-backend-ten-gamma.vercel.app/cart/${cartId}`,{
        method:'POST',
        headers:{
            'content-type':'application/json '
        },
        body:JSON.stringify(requestData)
       })
  if(!response.ok){
    throw 'Failed to add item into the cart'
  }
  const cartData=await response.json()
  if(cartData){
    window.location.reload()
  }
}catch(error){
    console.log(error)
}

}
    const handleClickIncrease=(cartId)=>{
handleQuantityChange(cartId,quantity[cartId]+1)
    }
   const handleClickDecrease=(cartId)=>{
    handleQuantityChange(cartId,quantity[cartId]-1)
    }
    console.log(error)
    const handleDelete=async(cartId)=>{
try{
const response=await fetch(`https://e-commerce-backend-ten-gamma.vercel.app/cart/${cartId}`,{
    method:"DELETE"
})
if(!response.ok){
    throw "Failed to delete item from cart"
}
const data=await response.json()
if(data){
    window.location.reload()
}
}catch(error){
console.log(error)
}
    }
   
    const displayCartItems =  cartItems?.map(item => (
            <div key={item._id} className="row mb-3 border">
                <div className="col-md-5">
                    <Link to={`/products/product/${item.productDetails._id}`}>
                    <img src={item.productDetails.imgURL} className="img-fluid" id="cart-image"/></Link>
                   
                </div>
                <div className="col-md-7">
                    <div className="fs-4">{item.productDetails.productName}</div>
                    <div>~ {item.productDetails.brand}</div>
                    <p>
                        <span className="fs-5 border px-2">{item.productDetails.ratings}
                            ★</span>
                        <s>
                            ₹ {item.productDetails.price
}
                        </s>
                        <span>₹ {item.productDetails.price - (item.productDetails.discountPercentage * item.productDetails.price) / 100
}
                            / -
                        </span>
                        < span className="text-danger fw-bold">
                            {item.productDetails.discountPercentage
}
                            % off
                        </span>
                    </p>
                   <button onClick={()=>handleClickIncrease(item._id)}>+</button ><span className="px-2">{item.quantity}</span><button onClick={()=>handleClickDecrease(item._id)}>-</button>
                   <span className="mx-3">Selected Size : <span className="text-danger">{item.selectedSize}</span></span>
                   <br/><br/>
                    <button className=" btn btn-danger p-1 m-1" onClick={()=>handleDelete(item._id)}>Delete Item</button>
                    <button className=" btn btn-danger p-1 m-1">Add to Wishlist</button>
                </div>
            </div>
        ))
        const displayProductDetails=cartItems?.map(item => (
            <p key={item._id} className="fs-5  pt-3 text-center">
Total Price of {item.productDetails.productName}: ₹{(item.productDetails.price - (item.productDetails.price * item.productDetails.discountPercentage) / 100) * item.quantity}
</p>
        ))
        const subtotal=cartItems?.reduce((acc,curr)=>acc+(curr.productDetails.price-(curr.productDetails.price*curr.productDetails.discountPercentage)/100)*curr.quantity,0)
    
    return ( <> <Header/> <main className = "container" > <Link className="btn" to="/">Home</Link>/<Link to="/products" className=" btn ">Products
 </Link>/ <Link className = "btn" to = "/cart" > Cart </Link>
 {error && <h2>No Items in Cart</h2>}
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
{!loading &&<div className="row">
<div className="col-md-6">
    <div className="fs-2 py-3 text-center">Cart Items</div >
    {cartItems.length===0 && loading  && <h2 className="text-center">No items in the cart!</h2>}
     {displayCartItems} </div>
<div className="col-md-6 px-5">
    <div className="border border-2 mt-5">
    <div className="fs-2 text-center">
Price Details
</div > <div >
        <p className="fs-4 text-center">
           Items: ({cartItems
                ?.length})
        </p>
        {displayProductDetails}
            
            <hr/>
            <h4 className="text-center">Sub-Total: ₹ {subtotal}</h4>
    </div> </div>

</div > </div> }</main>
</>)
}
export default Cart;