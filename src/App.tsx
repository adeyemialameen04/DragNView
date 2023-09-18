import Auth from "./components/auth/Auth";
import { UserContextProvider } from "./utils/context/UserContext";

function App() {
  return (
    <>
      <UserContextProvider>
        <Auth />
      </UserContextProvider>
    </>
  );
}

export default App;
