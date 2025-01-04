import { useParams } from "react-router-dom"
import Header from "../../components/Header"
import useFetch from "../../useFetch"
import { Link } from "react-router-dom"
const ProductDescription=()=>{
    const {productId}=useParams()
    console.log(productId)
    const {data,loading,error}=useFetch(`https://e-commerce-backend-ten-gamma.vercel.app/products/${productId}`)
    console.log(data)
return(<>
<Header/>
<main className="container">
<p ><Link className="btn" to="/">Home</Link>/<Link to="/products" className="btn">Products </Link> &gt; {data?.productName}
</p>
<div className="row">
    <div className="col-md-7">
     <img src={data?.imgURL} id="productDescImg" className="image-fluid"/>
    </div>
    <div className="col-md-5">
<h2>{data?.productName}</h2>
<p>~ {data?.brand}</p>
<p className="fs-4 text-danger-emphasis">{data?.tagline} </p>

<span className="fs-5 border px-2">{data?.ratings} ★</span> <s> ₹ {data?.price}</s> <span>₹ {data?.price-(data?.discountPercentage*data?.price)/100}/-</span> <span className="text-danger fw-bold">{data?.discountPercentage}% off</span>
<hr/>
<label className="fs-5">Select Your Size From Available Sizes: </label><br/>
{data?.sizes.map((size,index)=>(<buton key={index} className="btn bg-danger-subtle m-2">{size}</buton>))}
<p className="py-2"><Link className="btn btn-danger">Add to Wishlist</Link><Link className="btn btn-danger mx-3">Add to Cart</Link></p>
<hr/>
<p className="fs-5">Product Details</p>
{data?.details.map((detail,index)=>(<li key={index}>{detail}</li>))}
<hr/>
<p className="fs-5">Product Description</p>
{data?.description}
<hr/>
<p className="fs-5">Product Features</p>
{data?.features.map((feature,index)=>(<li key={index}>{feature}</li>))}
<hr/>
<p className="fs-5">Additional Details</p>
<p>Gender Preference: {data?.gender}</p>
<p>Exhange Policy: {data?.exchangePolicy}</p>
    </div>
</div>
</main>
</>)
}
export default ProductDescription