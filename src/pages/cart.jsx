import Header from "../../components/Header";
import useFetch from "../../useFetch";
import {Link} from "react-router-dom";
const Cart = () => {
    const {data, loading, error} = useFetch("https://e-commerce-backend-ten-gamma.vercel.app/cart")
    console.log(data)
    const displayCartItems = data
        ?.map(item => (
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
                    <button className=" btn btn-danger p-1 m-1">Delete Item</button>
                    <button className=" btn btn-danger p-1 m-1">Add to Wishlist</button>
                </div>
            </div>
        ))
        const subtotal=data?.reduce((acc,curr)=>acc+(curr.productDetails.price-(curr.productDetails.price*curr.productDetails.discountPercentage)/100)*curr.quantity,0)
    return ( <> <Header/> <main className = "container" > <Link className="btn" to="/">Home</Link>/<Link to="/products" className=" btn ">Products
 </Link>/ <Link className = "btn" to = "/cart" > Cart </Link>
<div className="row">
<div className="col-md-6">
    <div className="fs-2 py-3 text-center">Cart Items</div > {
        displayCartItems
    } </div>
<div className="col-md-6 px-5">
    <div className="border border-2 mt-5">
    <div className="fs-2 text-center">
Price Details
</div > <div >
        <p className="fs-4 text-center">
           Items: ({data
                ?.length})
        </p>
        {data ?.map(item => (
                <p key={item._id} className="fs-5  pt-3 text-center">
 Total Price of {item.productDetails.productName}: ₹{(item.productDetails.price - (item.productDetails.price * item.productDetails.discountPercentage) / 100) * item.quantity}
  </p>
            ))}
            
            <hr/>
            <h4 className="text-center">Sub-Total: ₹ {subtotal}</h4>
    </div> </div>

</div > </div> </main>
</>)
}
export default Cart;