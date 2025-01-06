import Header from "../../components/Header";
import useFetch from "../../useFetch";
import {Link} from "react-router-dom";
const Cart = () => {
    const {data, loading, error} = useFetch("https://e-commerce-backend-ten-gamma.vercel.app/cart",[])
    
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
    const cartItems = Array.isArray(data) ? data : [];
    const displayCartItems =  cartItems?.map(item => (
            <div key={item._id} className="row mb-3 border">
                <div className="col-md-5">
                    <img src={item.productDetails.imgURL} className="img-fluid" id="cart-image"/>
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
                    <p>{item.productDetails.tagline}</p>
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
<div className="row">
<div className="col-md-6">
    <div className="fs-2 py-3 text-center">Cart Items</div >
    {cartItems.length===0 && !loading  && <h2 className="text-center">No items in the cart!</h2>}
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

</div > </div> </main>
</>)
}
export default Cart;