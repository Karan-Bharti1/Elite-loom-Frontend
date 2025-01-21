import { useParams } from "react-router-dom";
import Header from "../../components/Header"
import useFetch from "../../useFetch";
import { Link } from "react-router-dom";
import API_URL from "../Url";

const OrderSummary=()=>{
    const {orderId}=useParams()
    console.log(orderId)
    const {data,loading,error}=useFetch(`${API_URL}order/${orderId}`)
    console.log(data?.updatedAt)
    const subTotal=data?.items.reduce((acc,item)=>
        acc+(item.productDetails.price-((item.productDetails.price*item.productDetails.discountPercentage)/100)*item.quantity)
       ,0)
    const displayData=data?.items.map(item=>(<li className="list-group-item" key={item.productDetails._id}>
        <p className="d-flex justify-content-between "><span>{item.productDetails.productName}, Size: {item.selectedSize} x {item.quantity}</span>
        <span>Total Price: ₹{(item.productDetails.price-(item.productDetails.price*item.productDetails.discountPercentage/100))*item.quantity}</span></p>
    </li>))
     const convertToIST = (utcString) => {
      // Parse the UTC string into a Date object (which is in UTC)
      const utcDate = new Date(utcString);
      console.log("Parsed UTC Date:", utcDate);  // Logs the UTC Date object
    
      // IST is UTC + 5:30, so we add the offset in milliseconds
      const istOffset = 5.5 * 60 * 60 * 1000; // 5 hours 30 minutes in milliseconds
      const istDate = new Date(utcDate.getTime() + istOffset);
      console.log("IST Date (raw):", istDate);  // Logs the IST Date after offset applied
    
      // Format the IST date as "YYYY-MM-DD HH:mm:ss"
      const formattedIST = `${istDate.getUTCFullYear()}-${String(istDate.getUTCMonth() + 1).padStart(2, '0')}-${String(istDate.getUTCDate()).padStart(2, '0')} ${String(istDate.getUTCHours()).padStart(2, '0')}:${String(istDate.getUTCMinutes()).padStart(2, '0')}:${String(istDate.getUTCSeconds()).padStart(2, '0')}`;
    
      return formattedIST;
    };
    return(<>
    <Header/>
    <main className="container">
    <Link className="btn" to="/">Home</Link>/<Link to="/products" className="btn">Products</Link>/<Link className="btn" to="/profile">My Profile</Link>/<Link className="btn" to="/orders">My Orders</Link>
    {error && <h2 className="text-center">Failed to fetch order summary.</h2>}
       {!loading && !error &&(<><h2 className="fs-2 py-3 text-center">Order Summary</h2>
       
<div className="d-flex justify-content-between "><span>
    Order Id: {data?._id}</span> <span>Dated: {convertToIST(data?.updatedAt)}</span>
   </div>
    
    <ul className="list-group my-3">{displayData}</ul>
    <p >Sub-Total: ₹{subTotal}</p>
    <p >Delivers to: {data?.address}</p>
    
    </> )}
   
   
    {loading &&(
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
 
 ) }
    </main>
    </>)
}
export default OrderSummary;