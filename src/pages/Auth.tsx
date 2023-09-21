import { useState, useEffect } from "react";
import { userLogin, userRegister } from "../helpers";
import Input from "../components/form/Input";
import Button from "../components/form/Button";
import { useUser } from "../context/UserContext";
import useLocalStorage from "../hooks/useLocalStorage";

const Auth = () => {
  const { setUser, user } = useUser();
  const [local, setLocal] = useLocalStorage("user", "");

  const [email, setEmail] = useState<string | number>("");
  const [password, setPassword] = useState<string | number>("");

  const registerNewUser = async () => {
    const user = { email: email, password };
    const response = await userRegister(user);
    if (response) {
      setUser(response);
      setLocal(JSON.stringify(response));
    } else alert("register error");
  };

  const loginUser = async () => {
    const user = { email, password };
    const response = await userLogin(user);
    if (response) {
      setUser(response);
      setLocal(JSON.stringify(response));
    } else alert("login error");
  };

  useEffect(() => {
    return () => {};
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="flex-center-center">
      <div className="form">
        <h2>Registro</h2>
        <Input
          type="email"
          label="E-mail"
          value={email}
          setState={setEmail}
          id="register-email"
        />

        <Input
          type="password"
          label="Password"
          value={password}
          setState={setPassword}
          id="register-password"
        />

        <Button full onClick={registerNewUser}>
          Submit
        </Button>
      </div>

      <div className="form">
        <h2>Entrar</h2>
        <Input
          type="email"
          label="E-mail"
          value={email}
          setState={setEmail}
          id="login-email"
        />

        <Input
          type="password"
          label="Password"
          value={password}
          setState={setPassword}
          id="login-password"
        />

        <Button full onClick={loginUser}>
          Submit
        </Button>
      </div>
    </div>
  );
};

export default Auth;
