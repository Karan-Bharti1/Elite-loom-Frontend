import { useParams } from "react-router-dom"
import Header from "../../components/Header"
import useFetch from "../../useFetch"
import API_URL from "../Url"
import { useState,useEffect } from "react"
import { AddressForm } from "./address"
const UpdateAdress=()=>{
    const [addressData,setAddressData]=useState({})
    const {addressId}=useParams()
    const [saveAlert,setSaveAlert]=useState({visible:false,message:""})
    const {data}=useFetch(`${API_URL}address/${addressId}`)
    useEffect(()=>{
        if(data){
            setAddressData(data)
        }else{
            setAddressData({})
        }
    },[data])
   const handleChange=(event)=>{
const {name,value}=event.target
setAddressData((prevData) => ({
    ...prevData,
    [name]: value,
  }))
   }
   console.log(addressData)
   const handleSubmit=async(event)=>{
    event.preventDefault()
try {
    const response=await fetch(`${API_URL}address/${addressId}`,{
        method:"POST",
        headers:{
            'Content-Type':'application/json'
        },
        body:JSON.stringify(addressData)
       
    })
    if(!response.ok){
    
        throw "Error occured while updating address data"
       }
const data=await response.json()
if(data){

    setSaveAlert({visible:true,message:"Address Updated successfully"})
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
    {saveAlert.visible && <span id="alert" className="top-10 end-0 text-white bg-danger position-fixed p-3 m-3">{saveAlert.message}</span>}
    <div className="w-50">
            <h2 className="py-2 my-3">Update Address Details</h2>
            <AddressForm
              addressData={addressData}
              handleChange={handleChange}
              handleSubmit={handleSubmit}
            //   profile={profile}
            />
        </div>
    </main>

    </>)
}
export default UpdateAdress