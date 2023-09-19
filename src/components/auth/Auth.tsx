import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
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

  const handleAuth = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    clearErrorMessage();
    try {
      if (email.trim() === "" || password.trim() === "") {
        setErrorMessage("Email and password are required.");
        return;
      }
      await createUserWithEmailAndPassword(auth, email, password);
      toast.success("Sign-up successful!");
      setPassword("");
      setEmail("");
    } catch (error: any) {
      console.error(error);
      switch (error.code) {
        case "auth/email-already-in-use":
          // Email is already in use, inform the user
          console.log("Email is already registered.");
          await signInWithEmailAndPassword(auth, email, password);
          break;
        case "auth/invalid-email":
          // Invalid email format
          toast.error("Invalid email format.");
          break;
        case "auth/operation-not-allowed":
          // Email/password sign-up is not allowed
          toast.error("Email/password sign-up is not allowed.");
          break;
        case "auth/weak-password":
          // Weak password, provide feedback to user
          toast.error("Password is too weak.");
          break;
        case "auth/network-request-failed":
          // Network issue or Firebase down
          toast.error("Network error. Please check your internet connection.");
          break;
        case "auth/user-disabled":
          // User account is disabled by an admin
          toast.error("Your account has been disabled.");
          break;
        case "auth/invalid-argument":
          // Programming error, check your code
          toast.error("Invalid argument error.");
          break;
        case "auth/too-many-requests":
          // Rate limiting, ask user to try later
          toast.error("Too many sign-up requests. Please try again later.");
          break;
        case "auth/user-token-expired":
          // User's token has expired, prompt to sign in again
          toast.error("Your session has expired. Please sign in again.");
          break;
        case "auth/app-deleted":
          // Firebase project deleted
          toast.error("Firebase project associated with the app is deleted.");
          break;
        default:
          // Handle other errors
          toast.error("An error occurred during sign-up.");
          break;
      }
    } finally {
      setLoading(false);
    }
  };
  // const signIn = async (e: React.FormEvent<HTMLFormElement>) => {
  //   e.preventDefault();
  //   setLoading(true);
  //   clearErrorMessage();
  //   try {
  //     if (email.trim() === "" || password.trim() === "") {
  //       setErrorMessage("Email and password are required.");
  //       return;
  //     }
  //     await signInWithEmailAndPassword(auth, email, password);
  //     toast.success("Sign-in successful!");
  //     setPassword("");
  //     setEmail("");
  //   } catch (error: any) {
  //     console.error(error);
  //     switch (error.code) {
  //       case "auth/user-not-found":
  //         setErrorMessage("User not found. Please register.");
  //         toast.error("User not found. Please register.");
  //         break;
  //       case "auth/wrong-password":
  //         setErrorMessage("Invalid password");
  //         toast.error("Invalid password");
  //         break;
  //       case "auth/invalid-email":
  //         setErrorMessage("Wrong email");
  //         toast.error("Wrong email");
  //         break;
  //       case "auth/network-request-failed":
  //         setErrorMessage("No internet connection or network issue");
  //         toast.error("No internet connection or network issue");
  //         break;
  //       case "auth/invalid-credential": // Updated case label
  //         setErrorMessage(
  //           "Invalid login credentials. Check that you are passing valid email and password values."
  //         );
  //         toast.error(
  //           "Invalid login credentials. Check that you are passing valid email and password values."
  //         );
  //         break;
  //       default:
  //         setErrorMessage("An error occurred during Sign in");
  //         toast.error("An error occurred while signing you in");
  //         break;
  //     }
  //   } finally {
  //     setLoading(false);
  //   }
  // };

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
        <form onSubmit={handleAuth}>
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
