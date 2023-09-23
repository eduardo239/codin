import { useEffect } from "react";
import Auth from "./Auth";
import { useUser } from "../context/UserContext";
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

function App() {
  const { setUser } = useUser();

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
    <div className="main">
      <div className="container flex-1">
        <div className="row">
          <div className="col-2">
            <Avatar />
            <hr />
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
    </div>
  );
}

export default App;
