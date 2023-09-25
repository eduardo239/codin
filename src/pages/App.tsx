import { useEffect } from "react";
import Auth from "./Auth";
import { useUser } from "../context/UserContext";
import { useData } from "../context/DataContext";
import useLocalStorage from "../hooks/useLocalStorage";
import { Route, Routes } from "react-router-dom";
import Home from "./Home";
import Profile from "./Profile";
import Navigation from "../components/ui/Navigation";
import Avatar from "../components/avatar/Avatar";
import AddChallenge from "./AddChallenge";
import Challenge from "./Challenge";
import AllChallenges from "./AllChallenges";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import Footer from "../components/landing/Footer";
import { MdOutline10K, MdOutlineClose } from "react-icons/md";
import Button from "../components/form/Button";
import GridMain from "../components/layout/GridMain";

function App() {
  const { setUser } = useUser();
  const { message, setMessage } = useData();

  const [local, setLocal] = useLocalStorage("user", "");

  const getUser = async () => {
    const auth = getAuth();
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser(user);
        setLocal(JSON.stringify(user));
      }
    });
  };

  useEffect(() => {
    getUser();
    return () => {};
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <GridMain>
      {message && (
        <div
          className={`message-container ${
            message.type === "success"
              ? "message-success "
              : message.type === "info"
              ? "message-info"
              : message.type === "error"
              ? "message-error"
              : message.type === "warning"
              ? "message-warning"
              : ""
          }`}
        >
          <div>
            <MdOutline10K />
          </div>
          <p>{message.message}</p>

          <div onClick={() => setMessage(null)}>
            <MdOutlineClose />
          </div>
        </div>
      )}
      <div className="container flex-1">
        <div className="row">
          <div className="col-2">
            <Avatar />
            <Navigation />
          </div>

          <div className="col-10">
            <div className="padding-lg">
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/auth" element={<Auth />} />
                <Route path="/profile" element={<Profile />} />
                <Route path="/add-challenge" element={<AddChallenge />} />
                <Route path="/challenge" element={<Challenge />} />
                <Route path="/challenges" element={<AllChallenges />} />
              </Routes>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </GridMain>
  );
}

export default App;
