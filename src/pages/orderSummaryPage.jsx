import { useParams } from "react-router-dom";
import Header from "../../components/Header"
import useFetch from "../../useFetch";

const OrderSummary=()=>{
    const {orderId}=useParams()
    console.log(orderId)
    const {data,loading,error}=useFetch(`https://e-commerce-backend-lyart-six.vercel.app/order/${orderId}`)
    console.log(data)
    const subTotal=data?.items.reduce((acc,item)=>
        acc+(item.productDetails.price-((item.productDetails.price*item.productDetails.discountPercentage)/100)*item.quantity)
       ,0)
    const displayData=data?.items.map(item=>(<li className="list-group-item" key={item.productDetails._id}>
        <p className="d-flex justify-content-between fs-5"><span>{item.productDetails.productName}, Size: {item.selectedSize} x {item.quantity}</span>
        <span className="fs-4">Total Price: ₹{(item.productDetails.price-(item.productDetails.price*item.productDetails.discountPercentage/100))*item.quantity}</span></p>
    </li>))
    return(<>
    <Header/>
    <main className="container">
       {!loading &&(<><h2 className="fs-2 py-3 text-center">Order Summary</h2>
<div className="d-flex justify-content-between fs-4"><span>
    Order Id: {data?._id}</span> <span>Dated: {data?.updatedAt.split("T")[0]}</span>
    <span>Time: {data?.updatedAt.split('T')[1].replace('Z', '')}</span></div>
    
    <ul className="list-group my-3">{displayData}</ul>
    <p className="fs-4">Sub-Total: ₹{subTotal}</p>
    <p className="fs-4">Delivers to: {data?.address}</p>
    
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