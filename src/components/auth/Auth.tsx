import { signInWithEmailAndPassword } from "firebase/auth";
import { useEffect, useState, useContext } from "react";
import { auth } from "../../config/firebase";
import { UserContext } from "../../utils/context/UserContext";
import "./auth.css";

const Auth = () => {
  const { currentUser } = useContext(UserContext);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const emailRegex = /^([a-zA-Z0-9._%-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,})$/;

  const clearErrorMessage = () => {
    setErrorMessage("");
  };

  const signIn = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    clearErrorMessage();
    try {
      if (!email.match(emailRegex)) {
        throw new Error("Invalid email format");
      }
      if (email.trim() === "" || password.trim() === "") {
        alert("You can submit an empty form");
        return;
      }
      await signInWithEmailAndPassword(auth, email, password);
      setPassword("");
      setEmail("");
    } catch (error: any) {
      console.error(error);
      switch (error.code) {
        case "auth/user-not-found":
          setErrorMessage("User not found. Please register.");
          break;
        case "auth/wrong-password":
          setErrorMessage("Invalid password");
          break;
        case "auth/invalid-email":
          setErrorMessage("Wrong email");
          break;
        case "auth/network-request-failed":
          setErrorMessage("No internet connection or network issue");
          break;
        default:
          setErrorMessage("An error during Sign in");
          break;
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    console.log(currentUser);
  }, [currentUser]);

  return (
    <main className="auth__main">
      <div className="container auth__container">
        <h1>Welcome DragNview</h1>
        <form onSubmit={signIn}>
          <input
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            type="text"
            placeholder="Type your email here ..."
          />
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
          />
          <button
            disabled={loading || !email.match(emailRegex) || !password}
            type="submit"
          >
            {loading ? "Loading" : "Log In"}
          </button>
        </form>
        <>{errorMessage && <p>{errorMessage}</p>}</>
      </div>
    </main>
  );
};

export default Auth;
