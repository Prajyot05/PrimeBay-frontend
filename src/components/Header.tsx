import { useState } from "react"
import { FaSearch, FaShoppingCart, FaSignInAlt, FaSignOutAlt, FaUser } from "react-icons/fa"
import { Link } from "react-router-dom"
import { User } from "../types/types";
import { signOut } from "firebase/auth";
import { auth } from "../firebase";
import toast from "react-hot-toast";

interface PropsType {
  user: User | null,

}

function Header({user}:PropsType) {

  const [isOpen, setIsOpen] = useState<boolean>(false);

  const logoutHandler = async () => {
    try {
      await signOut(auth);
      toast.success("Sign out Successful");
      setIsOpen(false);
    } catch (error) {
      toast.error("Sign out Failed");
    }
  };

  return (
    <nav className="header">
      <div className="header-left">
        <Link to={"/"}><h1>PrimeBay</h1></Link>
      </div>
      <div className="header-right">
        <Link onClick={() => setIsOpen(false)} to={"/"}>Home</Link>
        <Link onClick={() => setIsOpen(false)} to={"/search"}><FaSearch /></Link>
        <Link onClick={() => setIsOpen(false)} to={"/cart"}><FaShoppingCart /></Link>
        {
          user?._id ? (
            <>
              <button onClick={() => setIsOpen(prev => !prev)}>
                <FaUser />
              </button>
              <dialog open={isOpen}>
                <div>
                  {
                    user.role === "admin" && (
                      <Link onClick={() => setIsOpen(false)} to="/admin/dashboard">Admin</Link>
                    )
                  }
                  <Link onClick={() => setIsOpen(false)} to="/orders">Orders</Link>
                  <button onClick={logoutHandler}>
                    <FaSignOutAlt />
                  </button>
                </div>
              </dialog>
            </>
          ) : <Link to={"/login"}><FaSignInAlt /></Link>
        }
      </div>
    </nav>
  )
}

export default Header