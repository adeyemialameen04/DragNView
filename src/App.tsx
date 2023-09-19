import { useContext, useEffect } from "react";
import Auth from "./components/auth/Auth";
import Home from "./components/home/Home";
import { UserContext } from "./utils/context/UserContext";

function App() {
  const { currentUser } = useContext(UserContext);

  useEffect(() => {
    console.log(currentUser);
  }, [currentUser]);

  return (
    <>
      <>{currentUser ? <Home /> : <Auth />}</>
    </>
  );
}

export default App;
