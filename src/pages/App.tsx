import { useEffect, useState } from "react";
import Auth from "./Auth";
import { loadUser } from "../helpers";
import { useUser } from "../context/UserContext";
import useLocalStorage from "../hooks/useLocalStorage";
import { Route, Routes } from "react-router-dom";
import Home from "./Home";
import Profile from "./Profile";
import Navigation from "../components/ux/Navigation";
import Button from "../components/form/Button";
import Input from "../components/form/Input";
import Checkbox from "../components/form/Checkbox";
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
    <>
      <Navigation />

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

      <Input setState={setEmail} label="Label" value={email} type="text" />
      <Input setState={setEmail} label="Label" value={email} type="text" />
      <Input setState={setEmail} label="Label" value={email} type="text" />
      <Checkbox setState={setOk} label="Label" value={ok} />
      {ok ? "ok" : "false"}
      <Button>Submit</Button>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/auth" element={<Auth />} />
        <Route path="/profile" element={<Profile />} />
      </Routes>
    </>
  );
}

export default App;
