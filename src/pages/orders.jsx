import Header from "../../components/Header";
import useFetch from "../../useFetch";
import { useEffect,useState } from "react";
import {Link} from "react-router-dom"
const Orders=()=>{
    const {data,loading}=useFetch("https://e-commerce-backend-lyart-six.vercel.app/orders")
    const [ordersData,setOrdersData]=useState([])
    console.log(data)
    useEffect(()=>{
if(Array.isArray(data)){
    setOrdersData(data)
}else{
    setOrdersData()
}
    })
    const displayData=ordersData?.map(order=>(
        <li key={order._id} className="list-group-item">
              <Link to={`/orders/${order._id}`} className="text-decoration-none text-dark">
            <p className="py-2"> <strong>Order Id:</strong> {order._id}{" "}</p>
            {order.items.map(item=>(
                <>
                <img id="orderImage" src={item.productDetails.imgURL} className="img-fluid mx-4"/></>
            ))}
            <p  className="py-2"> <strong>Date: </strong> {order.updatedAt.split("T")[0]} <strong>Time: </strong>{order.updatedAt.split('T')[1].replace('Z', '')}</p>
           
            </Link>
        </li>
    ))
    return(<>
    <Header/>
    <main className="container">
        <h2 className="fs-2 py-3">My Orders</h2>
      
        <ul className="list-group my-4">
        {displayData}
        </ul>
       
    </main>
    </>)
}
export default Orders;