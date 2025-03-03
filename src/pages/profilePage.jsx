import Header from "../../components/Header"
import { Link } from "react-router-dom"
import useFetch from "../../useFetch"
import { useState,useEffect } from "react"
import Footer from "../../components/Footer"
import { Products } from "./products"
import API_URL, { PROFILEPIC_URL } from "../Url"

const Profile=()=>{
      const [addressesData,setAddressesData]=useState([])
      const [addressDeleteAlert,setAddressDeleteAlert]=useState({visible:false,message:""})
    const {data:addressData,error}=useFetch(`${API_URL}address`)
    useEffect(()=>{
        if(Array.isArray(addressData)){
            setAddressesData(addressData)
        }else{
            setAddressesData([])
        }
    },[addressData])
    const handleDelete=async(addressId)=>{
        try {
            const response=await fetch(`${API_URL}address/${addressId}`,{
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
        <div className=" d-flex justify-content-between">
        <Link to={`/chooseaddress/${address._id}`} className="btn btn-danger">Edit</Link>
        <button className="btn btn-close" onClick={()=>handleDelete(address._id)}></button>
        </div>
      
      </div>
    ))
    return(
        <>
      
        <main className="container">
        <Link className="btn" to="/">Home</Link>/<Link to="/products" className="btn">Products</Link>/<Link className="btn" to="/profile">My Profile</Link>
        {addressDeleteAlert.visible && <span id="alert" className="top-10 end-0 text-white bg-danger position-fixed p-3 m-3">{addressDeleteAlert.message}</span>}
            <h2 className="text-center fs-2 py-3 fw-bolder text-danger">My Profile</h2>
            <div className="card">
            <div className="row m-3">
<div className="col-md-4 ">
<img className="img-fluid" src={PROFILEPIC_URL}/>
</div>
<div className="col-md-4 ">
<p className="fs-4 py-2"><strong>Name:</strong> John Doe</p>
<p className="fs-4 py-2"><strong>Email-Id:</strong> johndoe@gmail.com </p>
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
        {error&& <h2 className="text-center fs-4">Failed to load address data</h2>}
        <Link className="btn btn-danger" to="/address/profile">Add new Address</Link>
     
        <p className="pt-3 fs-4">You can view your all orders here:</p>
        <Link className="btn btn-danger my-3" to="/orders">Order History</Link>
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
        <Footer/>
        </>
    )
}
const ProfilePage=()=>{
    const [searchTerm,setSearchTerm]=useState('')
    return(<>
      <Header setSearchTerm={setSearchTerm} searchBar={true}/>
      {searchTerm.length===0 && <Profile/>}
      {searchTerm.length>0 && <Products searchTerm={searchTerm}/>}

    </>)
}
export default ProfilePage