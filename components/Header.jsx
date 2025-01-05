import { NavLink } from "react-router-dom"

const Header=()=>{
return(
    <header >
        <div className="container">
          <nav className="navbar navbar-expand-lg" >
      <div className="container-fluid" >
        <NavLink className="navbar-brand text-danger fs-2 fw-bold   fst-italic px-3" to="/">Elite Loom</NavLink>
       
  <input type="text" className="d-flex justify-content-center"  placeholder="Search..."/>
 

        <button className="navbar-toggler " type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon" ></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNavAltMarkup" >
          <div className="navbar-nav ms-auto mb-2 mb-lg-0 " >
          
        <NavLink className="nav-link display-2 px-4">Login</NavLink>
        <NavLink className="nav-link display-2 px-4">♡ Wishlist</NavLink>
        <NavLink to="/cart" className="nav-link display-2 px-4">🛒Cart</NavLink>
          </div>
        </div>
      </div>
    </nav> 
    </div> 
    <hr/>
    </header>
)
}
export default Header