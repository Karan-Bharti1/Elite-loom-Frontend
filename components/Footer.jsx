import useFetch from "../useFetch"
import { Link } from "react-router-dom"
const Footer=()=>{
    const {data: categoriesData} = useFetch("https://e-commerce-backend-lyart-six.vercel.app/categories")
    const displayCategories=categoriesData?.map(category=>(
        <span key={category._id} className="py-2">
             <Link className="btn  text-center"  to={`/products/${category._id}`}>{category.categoryName}</Link>||
        </span>
    ))
    return(
        <footer className="mt-5">
<hr/>
<div className="container text-center py-2">
    <h2 className="text-danger">Shop With Us</h2>
    {displayCategories}
    <p className="text-secondary">&copy; 2025 Elite Loom. Copy Rights Reserved.</p>
    
</div>
        </footer>
    )
}
export default Footer