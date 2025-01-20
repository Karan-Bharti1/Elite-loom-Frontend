import {useParams} from "react-router-dom";
import Header from "../../components/Header";
import useFetch from "../../useFetch";
import {Link} from "react-router-dom";
import {useState,useEffect} from "react";
import Footer from "../../components/Footer";
 export const Products = ({searchTerm}) => {
    const [sortData,
        setSortData] = useState("All")
    const [genderFilter,
        setGenderFilter] = useState("All")
    const [ratingRange,
        setRatingRange] = useState(2)
    const [categoryCheckbox,
        setCategoryCheckbox] = useState([])
       const [sizeAlert,setSizeAlert]=useState({visible:false,message:''})
    const [size,setSize]=useState({})
    const [alert,setAlert]=useState({visible:false,message:''})
    const[wishlistAlert,setWishlistAlert]=useState({visible:false,message:''})
    const[wishlistItemAlreadyExistingAlert,setWishlistItemAlreadyExistingAlert]=useState({visible:false,message:''})
    const {categoryId} = useParams()
    const [wishlistItems, setWishlistItems] = useState([]);
    const [wishlistUpdateTrigger, setWishlistUpdateTrigger] = useState(false);
    const {data, loading, error} = useFetch(categoryId === undefined
        ? "https://e-commerce-backend-lyart-six.vercel.app/products"
        : `https://e-commerce-backend-lyart-six.vercel.app/products/category/${categoryId}`)

    const {data: categoriesData} = useFetch("https://e-commerce-backend-lyart-six.vercel.app/categories")
   
   useEffect(() => {
    const fetchWishlist = async () => {
      try {
        const response = await fetch("https://e-commerce-backend-lyart-six.vercel.app/wishlist");
        const wishListItemsData = await response.json();
        if(Array.isArray(wishListItemsData))
{ setWishlistItems(wishListItemsData)}
      } catch (error) {
        console.error("Error fetching wishlist:", error);
      }
    };
  
    fetchWishlist();
  }, [wishlistUpdateTrigger]);
  
   
    console.log(categoriesData)
    const currentCategoryData = categoriesData
        ?.find(category => category._id === categoryId)
    console.log(currentCategoryData)
    const handleCheckBox = (event) => {
        const {value, checked} = event.target
        if (checked) {
            setCategoryCheckbox(prevData => [
                ...prevData,
                value
            ])
        } else {
            setCategoryCheckbox(prev => prev.filter(category => category != value))
        }
    }
    const handleSort = (event) => {
        setSortData(event.target.value)
    }

    const filteredData = data
        ?.filter(product => {
            const matchesGenderFilter = genderFilter === "All" || product.gender === genderFilter
            const matchesRatingRange = product.ratings > ratingRange
           const matchesSearch=searchTerm===""||product.brand.toLowerCase().includes(searchTerm.toLowerCase())||
           product.category.categoryName.toLowerCase().includes(searchTerm.toLowerCase())||product.productName.toLowerCase().includes(searchTerm.toLowerCase())||product.details?.some(detail=>detail.toLowerCase().includes(searchTerm.toLowerCase()))
            const matchesCategoryData = categoryCheckbox.length === 0 || categoryCheckbox.includes(product.category.categoryName);
            return matchesGenderFilter && matchesRatingRange && matchesCategoryData && matchesSearch
        })
    if (sortData === "lowToHigh") {
        filteredData.sort((a, b) => a.price - b.price)
    } else if (sortData === "highToLow") {
        filteredData.sort((a, b) => b.price - a.price)
    }
  const handleSizeUpdate=async(productId,size)=>{
setSize((prev)=>({...prev,[productId]:size}))
    }
    console.log(size)
    const handleSubmit=async(productId)=>{
        if(!size[productId] ){
            setSizeAlert({visible:true,message:"Please Select a size to continue"})
            setTimeout(() => setSizeAlert({visible: false, message: ''}), 1500);
         
        }
       
        const requestData={
          
            selectedSize:size[productId],
            productDetails:productId,
            quantity:1
        }
      console.log(requestData)
      try {
       const response=await fetch("https://e-commerce-backend-lyart-six.vercel.app/cart",{
        method:'POST',
        headers:{
            'content-type':'application/json '
        },
        body:JSON.stringify(requestData)
       })
  if(!response.ok){
    throw 'Failed to add item into the cart'
  }
  const data=await response.json()
  if(data){
    
   setAlert({visible:true,messsage:"Item Added to Cart Successfuly"})
  }
  setTimeout(()=>{
    setAlert({visible:false,message:''})
},3000)
      } catch (error) {
       console.log(error)
      }
    }
    const handlewishlistClick=async(productId)=>{
        const requestData={
            productDetails:productId
        }
        const isInWishList= wishlistItems?.some(item=>item.productDetails._id===productId)
        console.log(isInWishList)
try {
    
    if( isInWishList){
   setWishlistItemAlreadyExistingAlert({visible:true,message:"Already Wishlisted"})
    }
    setTimeout(()=>setWishlistItemAlreadyExistingAlert({visible:false,message:''}),2000)
 const response   =await fetch("https://e-commerce-backend-lyart-six.vercel.app/wishlist",{
method:'POST',
headers:{
    'Content-Type':'application/json'
},
body:JSON.stringify(requestData)
 })
 if(!response.ok){
    throw "Failed to add item to the wishlist"
 }
 const wishlistItemData=response.json()
 if(wishlistItemData){
    
    setWishlistAlert({visible:true,message:'Wishlisted'})
 }
 setTimeout(()=>setWishlistAlert({visible:false,message:''}),2000)
setWishlistUpdateTrigger(!wishlistUpdateTrigger)
} catch (error) {
    console.log(error)
}
    }
    const displayData = filteredData
        ?.map(product => {
           
  
            return (
            <div key={product._id} className="col-md-4 my-3">

                <div className="card border-0 shadow-sm p-3">
                    <Link to={`/products/product/${product._id}`} className="text-decoration-none">
                        <img
                            src={product.imgURL}
                            className="img-fluid"
                            id="card-products-display"
                            alt="Product Loading"/>

                    </Link>
                    <p className="d-flex justify-content-between align-content-center pt-2">
                        <span>{product.productName}</span>
                      
                        <button className="btn btn-danger p-1" onClick={()=>handlewishlistClick(product._id)}>🤍</button>
                    </p>
<div className="d-flex justify-content-between align-content-center">
<p>
                        <s>₹ {product.price}</s>
                        <span>₹ {product.price - (product.discountPercentage * product.price) / 100}/-</span>
                        <span className="text-danger fw-bold">{product.discountPercentage}% off</span>

                    </p><p>{product.ratings} ★</p>
</div>

                    <div className="d-flex justify-content-between align-content-center">
                        <select  required onClick={(event)=>handleSizeUpdate(product._id,event.target.value)}>
                            <option value="">Your Size</option>
                            {product
                                .sizes
                                .map(size => ( <> <option>{size}</option> </>))}
                        </select><br/>
                        <button  className="btn btn-danger" onClick={()=>handleSubmit(product._id)}>Add to Cart</button>
                    </div>
              
                </div>

          

            </div>
        )})
    const ShimmerUICard = () => (
        <div className="col-md-4 p-2">
            <div className="card">
                <div id="card-shimmer" className="bg-dark-subtle"></div>
                <span className="placeholder my-2"></span>
                <span className="placeholder col-6 my-2"></span>
                <span className="placeholder my-2"></span>
            </div>
        </div>
    )
    return ( <>

                     <main className="container">
                    {alert.visible && (
                        <span id="alert" className="bg-danger text-light position-fixed top-10 end-0 p-3 m-3"  role="alert">
                        Item added to cart successfully
                      </span>
                    )}
                    {
                        wishlistAlert.visible && (
                            <span id="alert" className="bg-danger text-light position-fixed top-10 end-0 p-3 m-3">{wishlistAlert.message}</span>
                        )
                    }
                    {
                        wishlistItemAlreadyExistingAlert.visible && (
                            <span id="alert" className="bg-danger text-light position-fixed top-10 end-0 p-3 m-3">{wishlistItemAlreadyExistingAlert.message}</span>
                        )
                    }
                    {
                        sizeAlert.visible && (
                            <span id="alert" className="bg-danger text-light position-fixed top-10 end-0 p-3 m-3">{sizeAlert.message}</span>
                        )
                    }
        <Link className="btn" to="/">Home</Link>/<Link to="/products" className="btn">Products</Link>
        {categoryId != undefined &&<span>&gt; {" "}
        { currentCategoryData
                ?.categoryName
        } </span>}
        <br/>
        
        <div className="row">
            {filteredData
                ?.length === 0 && <h2 className="text-center py-5">No Products Found</h2>}
            <div className="col-md-9 ">
                <div className="row">
                    {displayData}
                    
                    {loading && ( <> <div className="row">
                        <ShimmerUICard/>
                        <ShimmerUICard/>
                        <ShimmerUICard/>
                        <ShimmerUICard/>
                        <ShimmerUICard/>
                        <ShimmerUICard/>

                    </div> </>)}
                    {error && <h2 className="text-center">Failed to get products data</h2>}
                </div>

            </div>
            <div className="col-md-2">
                <div className="border-start px-4">
                    <h2 >Filters</h2>
                    <label className="text-danger">Gender :
                    </label><br/>
                    <label htmlFor="male"><input
                        type="radio"
                        value="male"
                        name="gender"
                        onChange={(event) => setGenderFilter(event.target.value)}
                        id="male"/>
                         For Him</label>
                    <br/>
                    <label htmlFor="female"><input
                        type="radio"
                        value="female"
                        onChange={(event) => setGenderFilter(event.target.value)}
                        name="gender"
                        id="female"/>
                         For Her</label>
                    <br/>
                    <label htmlFor="unisex"><input
                        type="radio"
                        value="unisex"
                        onChange={(event) => setGenderFilter(event.target.value)}
                        name="gender"
                        id="unisex"/>
                         Unisex</label>
                    <br/>
                    <label htmlFor="customRange2" className="form-label text-danger">Rating ★ :</label>
                    <input
                        type="range"
                        value={ratingRange}
                        onChange={event => setRatingRange(event.target.value)}
                        step="0.5"
                        className="form-range"
                        min="0"
                        max="5"
                        id="customRange2"/>
                    <p>
                        Greater Than: {ratingRange}
                        ★</p>

                    {categoryId === undefined && ( <> <label className="text-danger">Categories :
                    </label> < br /> {
                        categoriesData
                            ?.map(category => ( <> <label htmlFor={category.categoryName}><input
                                type="checkbox"
                                id={category.categoryName}
                                name="Categories"
                                value={category.categoryName}
                                onChange={handleCheckBox}/> {category.categoryName}</label> < br /> </>))
                    } </>)}
                    <label className="text-danger">Sort Data By Price :</label><br/>
                    <label htmlFor="lowToHigh"><input
                        type="radio"
                        id="lowToHigh"
                        name="price"
                        onChange={handleSort}
                        value="lowToHigh"/>
                         Low To High</label><br/>
                    <label htmlFor="highToLow"><input
                        type="radio"
                        id="highToLow"
                        name="price"
                        onChange={handleSort}
                        value="highToLow"/>
                         High To Low</label><br/>

                    <button
                        className="btn btn-danger my-4"
                        onClick={() => window.location.reload()}>Clear Filters</button>
                </div>

            </div>
        </div>
    </main>
    <Footer/> </>
)
}
const DisplayProducts=()=>{
    const [searchTerm,setSearchTerm]=useState('')
    return(<>
    <Header setSearchTerm={setSearchTerm} searchBar={true} />
    <Products searchTerm={searchTerm}/></>)

}
export default DisplayProducts;