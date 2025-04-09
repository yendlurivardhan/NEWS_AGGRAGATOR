import { Link } from "react-router-dom";
import { FaHome, FaSearch } from "react-icons/fa";

const Navbar = () => {
  return (
    <nav style={{ display: "flex", justifyContent: "space-between", padding: "10px", background: "#333", color: "white" }}>
      <h1>News App</h1>
      <div>
        <Link to="/" style={{ color: "white", margin: "0 10px", textDecoration: "none" }}>
          <FaHome /> Home
        </Link>
        <Link to="/search" style={{ color: "white", margin: "0 10px", textDecoration: "none" }}>
          <FaSearch /> Search
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;
