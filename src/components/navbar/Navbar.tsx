import { useContext } from "react";
import { UserContext } from "../../utils/context/UserContext";
import { signOut } from "firebase/auth";
import { auth } from "../../config/firebase";
import { toast } from "react-hot-toast";
import "./navbar.css";

const Navbar = () => {
  const { currentUser } = useContext(UserContext);

  const logout = async () => {
    try {
      await signOut(auth);
      toast.success("Successfully signed out!");
      window.location.reload();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <nav>
      <div className="container nav__container">
        <div className="logo">DragNview</div>
        <div className="user">
          <h1>
            Signed in as: <span>{currentUser.email}</span>
          </h1>
          <button onClick={logout}>Logout</button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
