import { useState,useEffect } from "react"
import Header from "../../components/Header"
import useFetch from "../../useFetch"
import { Link } from "react-router-dom"
const ChooseAddress=()=>{
    const [addressesData,setAddressesData]=useState([])
const {data:addressData,loading,error}=useFetch("https://e-commerce-backend-ten-gamma.vercel.app/address")
const [addressDeleteAlert,setAddressDeleteAlert]=useState({visible:false,message:""})
console.log(addressesData)
useEffect(()=>{
    if(Array.isArray(addressData)){
        setAddressesData(addressData)
    }else{
        setAddressesData([])
    }
},[addressData])
const handleDelete=async(addressId)=>{
try {
    const response=await fetch(`https://e-commerce-backend-ten-gamma.vercel.app/address/${addressId}`,{
        method:"Delete"
    })
    if(!response.ok){
        throw "Failed to delete address"
    }
    const data=await response.json()
    if(data){
        setAddressDeleteAlert({visible:true,message:"Address Deleted successfully"})
        setAddressesData(prev=>prev.filter(add=>add._id!=addressId))
       }
       setTimeout(()=>{
    setAddressDeleteAlert({visible:false,message:""})
       },2000)
} catch (error) {
    console.log(error)
}
}
const displayData=addressesData.map(address=>(
    <div key={address._id} className="address-item my-3 p-3 card shadow ">
    <label htmlFor={address._id} className="d-block">
      <input id={address._id} name="address" type="radio" className="me-2" />
      <span>{address.recieversName}, Contact: {address.recieversMobile}</span>
      
    
    <p className="mb-0">
      {address.addressline1}, {address.addressline2}, {address.city}, {address.state}, {address.country}
    </p>
    <p>Pincode: {address.pincode}</p>
    </label>
    <div className=" d-flex justify-content-end">
    <button className="btn btn-close" onClick={()=>handleDelete(address._id)}></button>
    </div>
  
  </div>
))
    return (<>
    <Header/>
    <main className="container">
    {addressDeleteAlert.visible && <span className="top-10 end-0 text-white bg-danger position-fixed p-3 m-3">{addressDeleteAlert.message}</span>}
            
                
        <div className="row">
            <div className="col-md-6">
            <h1 className="fs- py-3">Choose Delivery Address</h1>
            {!loading && addressesData.length===0&& <h1 className="fs-2 py-5">To choose address,please add new address first</h1>}
    {
        displayData
    }
<Link to="/address" className="btn btn-danger ">Add new address</Link>
    </div>
            <div className="col-md-6">


            </div>
        </div>

            
       

    </main>
    </>)
}

export default ChooseAddress;