import { useState, useEffect } from "react";
import { userRegister } from "../helpers";
import Input from "../components/form/Input";
import Button from "../components/form/Button";
import { useUser } from "../context/UserContext";

const Auth = () => {
  const { setUser, user } = useUser();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const registerNewUser = async () => {
    const user = { email, password };
    const response = await userRegister(user);
    console.log(typeof response);
    if (response) setUser(response);
  };

  useEffect(() => {
    return () => {};
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div>
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

      <Button onClick={registerNewUser}>Submit</Button>
    </div>
  );
};

export default Auth;
