import {useState, useEffect} from "react"
import Header from "../../components/Header"
import useFetch from "../../useFetch"
import {Link} from "react-router-dom"
import API_URL from "../Url";
const ChooseAddress = () => {
    const [addressesData,
        setAddressesData] = useState([])
    const [cartsData,
        setCartsData] = useState([])
    const {data: addressData, loading, error} = useFetch(`${API_URL}address`)
    const [addressDeleteAlert,
        setAddressDeleteAlert] = useState({visible: false, message: ""})
    const {data: cartData, loading: cartLoading, error: cartError} = useFetch(`${API_URL}cart`)
    const [selectedAddress,
        setSelectedAddress] = useState("")
    const [result,
        setResult] = useState()
    const [selectAddressAlert,
        setSelectAddressAlert] = useState({visible: false, message: ""})
    useEffect(() => {
        if (Array.isArray(addressData)) {
            setAddressesData(addressData)
        } else {
            setAddressesData([])
        }
    }, [addressData])
    useEffect(() => {
        if (Array.isArray(cartData)) {
            setCartsData(cartData)
        } else {
            setCartsData([])
        }
    }, [cartData])
    const displayCart = cartsData.map(item => (
        <li key={item._id} className="list-group-item">
            <span>{item.productDetails.productName}-{" "}Size: {item.selectedSize}
                Price:
                <s>
                    ₹{item.productDetails.price}</s>
                ₹ {item.productDetails.price - (item.productDetails.price * (item.productDetails.discountPercentage / 100))}/-
                <span className="text-danger fw-bold">{item.productDetails.discountPercentage}% off</span>
                X {item.quantity}
            </span>
        </li>
    ))
    const subtotal = cartsData
        ?.reduce((acc, curr) => acc + (curr.productDetails.price - (curr.productDetails.price * curr.productDetails.discountPercentage) / 100) * curr.quantity, 0)

    const ordersData = cartsData.map(item => ({quantity: item.quantity, productDetails: item.productDetails._id, selectedSize: item.selectedSize}))
    console.log(ordersData)

    const handleDelete = async(addressId) => {
        try {
            const response = await fetch(`${API_URL}address/${addressId}`, {method: "Delete"})
            if (!response.ok) {
                throw "Failed to delete address"
            }
            const data = await response.json()
            if (data) {
                setAddressDeleteAlert({visible: true, message: "Address Deleted successfully"})
                setAddressesData(prev => prev.filter(add => add._id != addressId))
            }
            setTimeout(() => {
                setAddressDeleteAlert({visible: false, message: ""})
            }, 2000)
        } catch (error) {
            console.log(error)
        }
    }
    const displayData = addressesData.map(address => (
        <div key={address._id} className="address-item my-3 p-3 card shadow ">
            <label htmlFor={address._id} className="d-block">
                <input
                    id={address._id}
                    name="address"
                    type="radio"
                    className="me-2"
                    value={`${address.addressline1} ,${address.addressline2}, ${address.city}, ${address.state}, ${address.country}, ${address.pincode}`}
                    onChange={(event) => setSelectedAddress(event.target.value)}/>
                <span>{address.recieversName}, Contact: {address.recieversMobile}</span>

                <p className="mb-0">
                    {address.addressline1}, {address.addressline2}, {address.city}, {address.state}, {address.country}
                </p>
                <p>Pincode: {address.pincode}</p>
            </label>
            <div className="d-flex justify-content-between">
                <Link to={`/chooseaddress/${address._id}`} className="btn btn-danger">Edit</Link>
                <button className="btn btn-close" onClick={() => handleDelete(address._id)}></button>
            </div>

        </div>
    ))

    const handleCheckout = async() => {
        const requestedData = {
            address: selectedAddress,
            items: ordersData
        }
        if (selectedAddress.length > 0) {
            const response = await fetch(`${API_URL}orders`, {
                method: 'POST',
                headers: {
                    'content-type': 'application/json'
                },
                body: JSON.stringify(requestedData)
            })
            if (!response.ok) {
                throw "Failed to Place Order"
            }
            const data = await response.json()
            if (data) {
                setResult(data)
                const deleteResponse = await fetch(`${API_URL}cart`, {method: "Delete"})
                if (!deleteResponse.ok) {
                    throw "Failed to empty cart"
                }
                const deletedData = await deleteResponse.json()
                if (deletedData) {
                    setCartsData([])
                }
            }
        } else {
            setSelectAddressAlert({visible: true, message: "Please Select a valid address to continue!!"})
            setTimeout(() => setSelectAddressAlert({visible: false, message: ""}), 1500)
        }
    }
    console.log(result)
    const {data: lastOrder} = useFetch(`${API_URL}order/${result
        ?._id}`)
    console.log(lastOrder)

    return (<> <Header/> <main className = "container" > {
        !loading && cartsData.length > 0 && (
        <> {
            addressDeleteAlert.visible && <span
                    id="alert"
                    className="top-10 end-0 text-white bg-danger position-fixed p-3 m-3">{addressDeleteAlert.message}</span>
        }
        {
            selectAddressAlert.visible && <span
                    id="alert"
                    className="bg-danger text-light position-fixed top-10 end-0 p-3 m-3 rounded">{selectAddressAlert.message}</span>
        } < div className = "row py-3" > <div className="col-md-6 ">
            <h1 className="fs-2 py-3">Choose Delivery Address</h1>
            {error && <h2 className="py-2">Failed to fetch address data.</h2>}
            {!loading && !error && addressesData.length === 0 && <h1 className="fs-2 py-5">To choose address,please add new address first</h1>}

            {displayData
}
            <Link to="/address" className="btn btn-danger ">Add new address</Link>
        </div> < div className = "col-md-6" > {
            cartError && <h2 className="py-2">Fail to get order confirmation data.</h2>
        }
        {
            cartsData.length > 0 && !cartError && (<><h1 className = "fs-2 py-3" > Confirm Your Order </h1>
<ul className="list-group">
    {cartError && <h2 className="py-2">Failed to fetch order confirmation data</h2 >}
        {displayCart} </ul>
<Link to="/cart" className=" btn btn-danger p-1 my-3 ">Edit Your Order</Link>
 < h2 className = "fs-3 py-3" > Total Payable Amount: ₹ {subtotal} / - </h2> < button className = "btn btn-danger w-100" onClick = {
            () => handleCheckout()
        } > Checkout </button></>)
    } </div>
        </div> </>)}
{
    cartsData.length === 0 && !cartError && !cartLoading && (<> <p className="fs-2 pt-4">Your Order has been placed successfully.</p> <div className = "" > 
       { result && ( <> <p className="fs-3 pt-4">Your Order's Summary:</p> < ul className = "list-group" > {
            lastOrder
                ?.items
                    .map(item => (
                        <li className="list-group-item w-75 fs-5" key={item.productDetails._id}>

                            {item.productDetails.productName}: ₹{(item.productDetails.price - (item.productDetails.price * item.productDetails.discountPercentage) / 100)}
                            x {item.quantity}

                        </li>
                    ))
        } </ul>
       <p className="fs-3 pt-4">Sub-total: ₹{lastOrder?.items.reduce((acc,curr)=>acc+(curr.productDetails.price-(curr.productDetails.price*curr.productDetails.discountPercentage)/100) * curr.quantity,
        0)
    } / - </p> < p className = "fs-5 py-2" > Delivers to : {
        " "
    }
    {
        lastOrder
            ?.address
    } </p></>)
} <Link to = "/" className = "btn btn-danger" > Back to Home </Link>
     <Link className="btn btn-danger mx-2" to="/orders"> Order History</Link>
 </div>
        
        </ >)
}

{
loading && cartLoading && (
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

)} </main>
    </>)
}

export default ChooseAddress;