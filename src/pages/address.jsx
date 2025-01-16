import Header from "../../components/Header";
import { useState } from "react";

import { Link } from "react-router-dom";
const AddressForm = ({ addressData, handleChange, handleSubmit,profile }) => (
 
    <form onSubmit={handleSubmit}>
      <label htmlFor="receiverName">Receiver's Name:</label>
      <input
        type="text"
        name="recieversName"
        className="form-control my-2"
        value={addressData.recieversName}
        id="receiverName"
        onChange={handleChange}
        required
      />
      <label htmlFor="receiverMobile">Receiver's Contact:</label>
      <input
        type="text"
        name="recieversMobile"
        className="form-control my-2"
        value={addressData.recieversMobile}
        id="receiverMobile"
        onChange={handleChange}
        required
      />
      <label htmlFor="addressline1">Address Line 1:</label>
      <input
        type="text"
        className="form-control my-2"
        name="addressline1"
        id="addressline1"
        value={addressData.addressline1}
        onChange={handleChange}
        required
      />
      <label htmlFor="addressline2">Address Line 2:</label>
      <input
        type="text"
        className="form-control my-2"
        name="addressline2"
        id="addressline2"
        value={addressData.addressline2}
        onChange={handleChange}
        required
      />
      <label htmlFor="city">City:</label>
      <input
        type="text"
        name="city"
        className="form-control my-2"
        id="city"
        value={addressData.city}
        onChange={handleChange}
        required
      />
      <label htmlFor="state">State:</label>
      <input
        type="text"
        name="state"
        className="form-control my-2"
        id="state"
        value={addressData.state}
        onChange={handleChange}
        required
      />
      <label htmlFor="country">Country:</label>
      <input
        type="text"
        name="country"
        className="form-control my-2"
        id="country"
        value={addressData.country}
        onChange={handleChange}
        required
      />
      <label htmlFor="pincode">Pincode:</label>
      <input
        type="text"
        name="pincode"
        className="form-control my-2"
        id="pincode"
        value={addressData.pincode}
        onChange={handleChange}
        required
      />
      <button className="btn btn-danger" type="submit">
        Save
      </button>{profile?<Link className="btn btn-danger m-3" to="/profile">Back To Profile</Link>:<Link to="/chooseaddress" className="btn btn-danger m-3">Proceed</Link>}
    </form>
  );
const Address=({profile})=>{
 
    const [addressData,setAddressData]=useState({
        recieversName:"",
        recieversMobile:"",
        pincode:"",
        addressline1:"",
        addressline2:"",
        city:"",
        state:"",
        country:""
    })
    const [saveAlert,setSaveAlert]=useState({visible:false,message:""})
    const handleChange = (event) => {
        const { name, value } = event.target;
        setAddressData((prevData) => ({
          ...prevData,
          [name]: value,
        }));
      };
     
const handleSubmit=async(event)=>{
event.preventDefault()
console.log(addressData)
try {
   const response=await fetch ("https://e-commerce-backend-ten-gamma.vercel.app/address",{
    method:'POST',
    headers:{
        'Content-Type':'application/json'
    },
    body:JSON.stringify(addressData)
   })
   if(!response.ok){
    
    throw "Error occured while posting address data"
   }
   const data=response.json()
   if(data){
    setSaveAlert({visible:true,message:"Address saved successfully"})
   }
   setTimeout(()=>{
setSaveAlert({visible:false,message:""})
   },2000)
} catch (error) {
    console.log(error)
}
}

return(<>
<Header/>
<main className="container">
    {saveAlert.visible && <span className="top-10 end-0 text-white bg-danger position-fixed p-3 m-3">{saveAlert.message}</span>}
        <div className="col-md-6">
            <h2 className="py-2 my-3">Save and Proceed</h2>
            <AddressForm
              addressData={addressData}
              handleChange={handleChange}
              handleSubmit={handleSubmit}
              profile={profile}
            />
        </div>
      
    
</main>
</>)
}
export default Address;