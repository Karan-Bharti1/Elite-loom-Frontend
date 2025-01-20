import Header from "../../components/Header";


import { useState,useEffect } from "react";
import {Link} from "react-router-dom";
import useFetch from "../../useFetch";
const Cart = () => {
    const [quantity,setQuantity]=useState({})
   
const {data, loading, error} = useFetch("https://e-commerce-backend-lyart-six.vercel.app/cart")
const[deleteItemAlert,setDeleteItemAlert]=useState({visible:false,message:''})
const [quantityAlert,setQuantityAlert]=useState({visible:false,message:''})
const [moveToWishlistAlert,setMoveToWishlistAlert]=useState({visible:false,message:''})
const {data:productsData}=useFetch("https://e-commerce-backend-lyart-six.vercel.app/products")
console.log(productsData)

const {data:addressData}=useFetch("https://e-commerce-backend-lyart-six.vercel.app/address")
console.log(addressData)

const cartItems = Array.isArray(data) ? data : [];
    const [cartData,setCartData]=useState([])
    

useEffect(()=>{
    if(cartItems.length>0){
        const initialQuantities=cartItems.reduce((acc,curr)=>{
            acc[curr._id]=curr.quantity
            return acc
        },{})
        setQuantity(initialQuantities)
        setCartData(cartItems)
    }
},[cartItems])
console.log(quantity)
const handleQuantityChange=async(cartId,updatedQuantity)=>{
    const requestData={quantity:updatedQuantity}
    if(updatedQuantity<1) return;
   
try{
    const response=await fetch(`https://e-commerce-backend-lyart-six.vercel.app/cart/${cartId}`,{
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
    setQuantity(prev=>({...prev,[cartId]:updatedQuantity}))
   setCartData(prev=>{
    return  prev.map(item=>{
        if (item._id===cartId){
            return {...item,quantity:updatedQuantity}
        }
        return item
    })
   })
  }
}catch(error){
    console.log(error)
}

}
    const handleClickIncrease=(cartId)=>{
handleQuantityChange(cartId,quantity[cartId]+1)
setQuantityAlert({visible:true,message:'Quantity Increased'})
setTimeout(()=>setQuantityAlert({visible:false,message:''}),1000)
    }
   const handleClickDecrease=(cartId)=>{
    handleQuantityChange(cartId,quantity[cartId]-1)
if (quantity[cartId] >1)
    {    setQuantityAlert({visible:true,message:'Quantity Decreased'})
    setTimeout(()=>setQuantityAlert({visible:false,message:''}),1500)}
    }
    console.log(error)
    const handleDelete=async(cartId)=>{
try{
const response=await fetch(`https://e-commerce-backend-lyart-six.vercel.app/cart/${cartId}`,{
    method:"DELETE"
})
if(!response.ok){
    throw "Failed to delete item from cart"
}
const data=await response.json()
if(data){
    setQuantity(prev => {
        const newQuantities = { ...prev };
        delete newQuantities[cartId];
        return newQuantities;
    })
    setCartData(prev => prev.filter(item => item._id !== cartId));
    setDeleteItemAlert({visible:true,message:'Item deleted Successfully'})
}
setTimeout(()=>{
    setDeleteItemAlert({visible:false,message:''})
},2000)
}catch(error){
console.log(error)
}
    }
    function getRandomProducts(products, num) {
        if (!Array.isArray(products)) {
            return [];
        }
        const shuffled = products?.sort(() => 0.5 - Math.random());
        console.log(shuffled)

        return shuffled.slice(0, num);
    }
    const randomProducts = getRandomProducts(productsData, 4);
    const displayProducts=randomProducts?.map(item=>(
        <div key={item._id} className="col-md-3 mb-5">
        <div className="card">
            <Link to={`/products/product/${item._id}`}>
            <img src={item.imgURL} className="card-img-top" alt={item.name} id="image-noWishlist" /></Link>
           
            <div className="card-body">
                <h5 className="card-title">{item.name}</h5>
                <p className="card-text"><s>Price: ₹{item.price}</s><span> ₹ {item.price-(item.price*(item.discountPercentage/100))}/- <span className="text-danger fw-bold">{item.discountPercentage}% off</span></span></p>
            </div>
        </div>
    </div>
    ))
    const handleWishlist=async(cartId,productId)=>{
        const requestData={
         productDetails:productId
        }
try {
    const response=await fetch("https://e-commerce-backend-lyart-six.vercel.app/wishlist",{
        method:'POST',
        headers:{
          'content-type':'application/json'
        },
        body:JSON.stringify(requestData)
    })
    const deleteResponse=await fetch(`https://e-commerce-backend-lyart-six.vercel.app/cart/${cartId}`,{
        method:"DELETE"
    })
    const data=await deleteResponse.json()
    if(data){
        setCartData(prev => prev.filter(item => item._id !== cartId));
        setQuantity(prev=>{
const newQuanities={...prev}
delete newQuanities[cartId]
return newQuanities
        })
        setMoveToWishlistAlert({visible:true,message:'Item moved to wishlist'})
    }
    setTimeout(()=>setMoveToWishlistAlert({visible:false,message:''}),1500)
} catch (error) {
    console.log(error)
}
    }
    const displayCartItems =  cartData?.map((item) => (
            <div key={item._id} className="row my-3 border-0">
                <div className="col-md-3 text-center py-1">
                    <Link to={`/products/product/${item.productDetails._id}`}>
                    <img src={item.productDetails.imgURL} className="img-fluid" id="cart-image"/></Link>
                   
                </div>
                <div className="col-md-8 text-center py-1">
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
                   <button onClick={()=>handleClickIncrease(item._id)}>+</button ><span className="px-2">{quantity[item._id]}</span><button onClick={()=>handleClickDecrease(item._id)}>-</button>
                   <span className="mx-3">Selected Size : <span className="text-danger">{item.selectedSize}</span></span>
                   <br/><br/>
                    <button className=" btn btn-danger p-1 m-1" onClick={()=>handleDelete(item._id)}>Delete Item</button>
                    <button className=" btn btn-danger p-1 m-1" onClick={()=>handleWishlist(item._id,item.productDetails._id)}>Move to wishlist</button>
                </div>
            </div>
        ))
        const displayProductDetails=cartData?.map(item => (
            <p key={item._id} className="fs-5  pt-3 p-1 text-center">
Total Price of {item.productDetails.productName}: ₹{(item.productDetails.price - (item.productDetails.price * item.productDetails.discountPercentage) / 100) * quantity[item._id]}
</p>
        ))
        const subtotal=cartData?.reduce((acc,curr)=>acc+(curr.productDetails.price-(curr.productDetails.price*curr.productDetails.discountPercentage)/100)*quantity[curr._id],0)
    
    return ( <> <Header/>
    {
      deleteItemAlert.visible&& <span id="alert" className="top-10 end-0 text-white bg-danger position-fixed p-3 m-3">{deleteItemAlert.message}</span>
    } 
    {
        quantityAlert.visible && <span id="alert" className="top-10 end-0 text-white bg-danger position-fixed p-3 m-3">{quantityAlert.message}</span>
    }
    {moveToWishlistAlert.visible && <span id="alert" className="top-10 end-0 text-white bg-danger position-fixed p-3 m-3">{moveToWishlistAlert.message}</span>}
    <main className = "container" > <Link className="btn" to="/">Home</Link>/<Link to="/products" className=" btn ">Products
 </Link>/ <Link className = "btn" to = "/cart" > Cart </Link>
 {error && <h2 className="text-center py-2">Fail to fetch cart items</h2>}
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
{!loading && !error&& cartData.length>0 &&<div className="row">
<div className="col-md-6">
    <div className="fs-2 py-3 text-center">Cart Items</div >
    {cartItems.length===0 && loading  && <h2 className="text-center">No items in the cart!</h2>}
     {displayCartItems} </div>
<div className="col-md-6 ">
    <div className="border-0 mt-5">
    <div className="fs-2 text-center">
Price Details
</div > <div >
        <p className="fs-4 text-center">
           Items: ({cartData
                ?.length})
        </p>
        {displayProductDetails}
            
            <hr/>
            <h4 className="text-center">Sub-Total: ₹ {subtotal}/-</h4>
    </div> </div>
    <div className="text-center py-4">
  <Link className="btn btn-danger" to="/chooseaddress">Select Address</Link>
    </div>

</div > </div> }
{!loading && cartData.length===0 && (<>
    <div>
    <h1 className="text-center"> No Items present in your Cart .</h1>
    <div className="text-center"><Link className="btn btn-danger fw-bold my-3" to="/products">Explore us</Link></div>
    <div className="row">
    {displayProducts}
    </div>
   
    </div>

</>)}
</main>
</>)
}
export default Cart;