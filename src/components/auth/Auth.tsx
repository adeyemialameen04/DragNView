import { signInWithEmailAndPassword, signOut } from "firebase/auth";
import { useEffect, useState, useContext } from "react";
import { auth } from "../../config/firebase";
import { UserContext } from "../../utils/context/UserContext";
import "./auth.css";
import { toast } from "react-hot-toast";

const Auth = () => {
  const { currentUser } = useContext(UserContext);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const clearErrorMessage = () => {
    setErrorMessage("");
  };

  const signIn = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    clearErrorMessage();
    try {
      if (email.trim() === "" || password.trim() === "") {
        setErrorMessage("Email and password are required.");
        return;
      }
      await signInWithEmailAndPassword(auth, email, password);
      toast.success("Sign-in successful!");
      setPassword("");
      setEmail("");
    } catch (error: any) {
      console.error(error);
      switch (error.code) {
        case "auth/user-not-found":
          setErrorMessage("User not found. Please register.");
          toast.error("User not found. Please register.");
          break;
        case "auth/wrong-password":
          setErrorMessage("Invalid password");
          toast.error("Invalid password");
          break;
        case "auth/invalid-email":
          setErrorMessage("Wrong email");
          toast.error("Wrong email");
          break;
        case "auth/network-request-failed":
          setErrorMessage("No internet connection or network issue");
          toast.error("No internet connection or network issue");
          break;
        case "auth/invalid-login-credential":
          setErrorMessage(
            "Invalid login credentials, Check that you are passing valid email and password values."
          );
          toast.error(
            "Invalid login credentials, Check that you are passing valid email and password values."
          );
          break;
        default:
          setErrorMessage("An error during Sign in");
          toast.error("An error occured while during signing you in");
          break;
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    console.log(currentUser);
  }, [currentUser]);

  // //* Signs Out users automatically when they leave the page
  // useEffect(() => {
  //   // Add an event listener for the "beforeunload" event
  //   const handleUnload = async () => {
  //     try {
  //       await signOut(auth);
  //       console.log("User signed out on page unload");
  //     } catch (error) {
  //       console.error(error);
  //     }
  //   };

  //   window.addEventListener("beforeunload", handleUnload);

  //   return () => {
  //     // Remove the event listener when the component unmounts
  //     window.removeEventListener("beforeunload", handleUnload);
  //   };
  // }, []);

  return (
    <main className="auth__main">
      <div className="container auth__container">
        <h1>Welcome DragNview</h1>
        <form onSubmit={signIn}>
          <input
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
              clearErrorMessage();
            }}
            type="text"
            placeholder="Type your email here ..."
          />
          <input
            type="password"
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
              clearErrorMessage();
            }}
            placeholder="Password"
          />
          <button disabled={loading || !password} type="submit">
            {loading ? "Loading" : "Log In"}
          </button>
        </form>
        <>{errorMessage && <p>{errorMessage}</p>}</>
      </div>
    </main>
  );
};

export default Auth;
