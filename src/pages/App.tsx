import { useEffect, useState } from "react";
import Auth from "./Auth";
import { loadUser } from "../helpers";
import { useUser } from "../context/UserContext";
import useLocalStorage from "../hooks/useLocalStorage";
import { Route, Routes } from "react-router-dom";
import Home from "./Home";
import Profile from "./Profile";
import Navigation from "../components/ux/Navigation";
import Avatar from "../components/avatar/Avatar";
import AddChallenge from "./AddChallenge";
import Challenge from "./Challenge";
import AllChallenges from "./AllChallenges";

function App() {
  const { setUser, user } = useUser();

  const [local, setLocal] = useLocalStorage("user", "");
  const [email, setEmail] = useState("");
  const [ok, setOk] = useState<boolean>(false);

  const getUser = async () => {
    const u = await loadUser();
    setUser(u);
    setLocal(JSON.stringify(u));
  };

  useEffect(() => {
    getUser();
    return () => {};
  }, []);

  return (
    <div className="container">
      <div className="row">
        <div className="col-3">
          <Avatar />
          <hr />
          <Navigation />
        </div>

        <div className="col-9">
          <div className="padding">
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

      {/* <Progress value={0.3} />
      <Progress value={0.66} />
      <h1>Lorem ipsum dolor sit.</h1>
      <h2>Whereas recognition of the inherent dignity</h2>
      <p>
        This change was made both to follow more closely the convention
        established by the react-dom package and to help users understand better
        what a StaticRouter is for and when it should be used (on the server).
      </p>
      <p>
        Since version 6 the order of arguments passed to matchPath function has
        changed. Also pattern options has changed.
      </p>

      <div className="padding">
        <Input setState={setEmail} label="Label" value={email} type="text" />
        <Input setState={setEmail} label="Label" value={email} type="text" />
        <Checkbox setState={setOk} label="Label" value={!ok} />
        <Checkbox setState={setOk} label="Label" value={ok} />
        {ok ? "ok" : "false"}
        <Button>Submit</Button> 
      </div>*/}
    </div>
  );
}

export default App;
