import Header from "../../components/Header"
import { Link } from "react-router-dom"
import useFetch from "../../useFetch"
import { useState,useEffect } from "react"
const Profile=()=>{
      const [addressesData,setAddressesData]=useState([])
      const [addressDeleteAlert,setAddressDeleteAlert]=useState({visible:false,message:""})
    const {data:addressData}=useFetch("https://e-commerce-backend-ten-gamma.vercel.app/address")
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
        <div key={address._id} className="address-item my-3 p-3 card  ">
        <label htmlFor={address._id} className="d-block">
         
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
    return(
        <>
        <Header/>
        <main className="container">
        {addressDeleteAlert.visible && <span className="top-10 end-0 text-white bg-danger position-fixed p-3 m-3">{addressDeleteAlert.message}</span>}
            <h2 className="text-center fs-2 py-3 fw-bolder text-danger">My Profile</h2>
            <div className="card">
            <div className="row m-3">
<div className="col-md-4 ">
<img className="img-fluid" src="https://plus.unsplash.com/premium_photo-1689977968861-9c91dbb16049?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"/>
</div>
<div className="col-md-4 ">
<p className="fs-4 py-2"><strong>Name:</strong> John Doe</p>
<p className="fs-4 py-2"><strong>Example:</strong> johndoe@gmail.com </p>
<p className="fs-4 py-2"><strong>Contact:</strong> +919789009823</p>
<p className="fs-4 py-2"><strong>Gender:</strong> Male</p>
</div>
<div className="col-md-4  d-flex justify-content-end">
    <p className="text-danger fs-4 fw-bolder py-2">VIP Plus Member</p>
</div>
        </div>
            </div>
     
        <p className="pt-4 fs-4" >Your saved Addresses: </p>
        {displayData}
        <Link className="btn btn-danger" to="/address/profile">Add new Address</Link>
     
        <p className="pt-3 fs-4">You can view all your orders here:</p>
        <Link className="btn btn-danger my-3">Order History</Link>
        <p className="pt-3 fs-4">Additional Details:</p>
        <div className="card p-2 px-4 my-4">
            <div className="row">
                <div className="col-md-6">
                <p className="fs-4 py-2"><strong >D.O.B: </strong>29/08/1998</p>
            <p className="fs-4 py-2"><strong >Alternate Mobile Number: </strong>+918897689782</p>
            <p className="fs-4 py-2"><strong >Alternate Email Id: </strong>doe.john@yahoo.com</p>
                </div>
                <div className="col-md-6">
                <p className="fs-4 py-2"><strong >Location: </strong>Chandigarh</p>
                <p className="fs-4 py-2"><strong >Hint Name: </strong>John</p>
                </div>
            </div>
            
        </div>
        </main>
        </>
    )
}
export default Profile