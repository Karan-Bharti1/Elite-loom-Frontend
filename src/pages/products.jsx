import {useParams} from "react-router-dom";
import Header from "../../components/Header";
import useFetch from "../../useFetch";
import {Link} from "react-router-dom";
import {useState} from "react";
const Products = () => {
    const [sortData,
        setSortData] = useState("All")
    const [genderFilter,
        setGenderFilter] = useState("All")
    const [ratingRange,
        setRatingRange] = useState(2)
    const [categoryCheckbox,
        setCategoryCheckbox] = useState([])
    
    const {categoryId} = useParams()
    const {data, loading, error} = useFetch(categoryId === undefined
        ? "https://e-commerce-backend-ten-gamma.vercel.app/products"
        : `https://e-commerce-backend-ten-gamma.vercel.app/products/category/${categoryId}`)

    const {data: categoriesData} = useFetch("https://e-commerce-backend-ten-gamma.vercel.app/categories")
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
            const matchesCategoryData = categoryCheckbox.length === 0 || categoryCheckbox.includes(product.category.categoryName);
            return matchesGenderFilter && matchesRatingRange && matchesCategoryData
        })
    if (sortData === "lowToHigh") {
        filteredData.sort((a, b) => a.price - b.price)
    } else if (sortData === "highToLow") {
        filteredData.sort((a, b) => b.price - a.price)
    }
    const displayData = filteredData
        ?.map(product => (
            <div key={product._id} className="col-md-4 my-3">

                <div className="card border-0">
                    <Link to={`/products/product/${product._id}`} className="text-decoration-none">
                        <img
                            src={product.imgURL}
                            className="img-fluid"
                            id="card-products-display"
                            alt="Product Loading"/>

                    </Link>
                    <p className="d-flex justify-content-between align-content-center pt-2">
                        <span>{product.productName}</span>
                        <span>{product.ratings}★</span>
                        <button className="btn p-0 ">❤️</button>
                    </p>

                    <p>
                        <s>₹ {product.price}</s>
                        <span>₹ {product.price - (product.discountPercentage * product.price) / 100}/-</span>
                        <span className="text-danger fw-bold">{product.discountPercentage}% off</span>

                    </p>
                </div>

                <form >
                    <div className="d-flex justify-content-between align-content-center">
                        <select >
                            <option value="">Your Size</option>
                            {product
                                .sizes
                                .map(size => ( <> <option>{size}</option> </>))}
                        </select>
                        <button type="submit" className="btn btn-danger">Add to Cart</button>
                    </div>
                </form>

            </div>
        ))
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
    return ( <>< Header /> <main className="container">

        <Link className="btn" to="/">Home</Link>/<Link to="/products" className="btn">Products</Link>
        {categoryId != undefined &&<span>&gt; {" "}
        { currentCategoryData
                ?.categoryName
        } </span>}
        <br/>
        <div className="row">
            {filteredData
                ?.length === 0 && <h2 className="text-center py-5">No Prouducts Found</h2>}
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
    </main> </>
)
}
export default Products;