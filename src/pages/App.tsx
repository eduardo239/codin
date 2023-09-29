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
import NewChallenge from "./new/Challenge";
import Challenge from "./Challenge";
import AllChallenges from "./Challenges";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import Footer from "../components/landing/Footer";
import GridMain from "../components/layout/GridMain";
import Message from "../components/ui/Message";

function App() {
  const { setUser } = useUser();
  const { message, setMessage } = useData();

  const [, setLocal] = useLocalStorage("user", "");

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
      {message && <Message />}
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
                <Route path="/add-challenge" element={<NewChallenge />} />
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
