import { useState } from "react";
import { userLogin, userRegister } from "../helpers";
import Input from "../components/form/Input";
import Button from "../components/form/Button";
import { useUser } from "../context/UserContext";
import useLocalStorage from "../hooks/useLocalStorage";
import { MdOutlineAccountCircle, MdOutlineBook } from "react-icons/md";

const Auth = () => {
  const { setUser } = useUser();
  const [, setLocal] = useLocalStorage("user", "");

  const [email, setEmail] = useState<string | number>("");
  const [password, setPassword] = useState<string | number>("");

  const registerNewUser = async () => {
    const isEmailString = typeof email === "string";
    const isPasswordString = typeof password === "string";
    const response = await userRegister({
      email: isEmailString ? email : email.toString(),
      password: isPasswordString ? password : password.toString(),
    });
    if (response) {
      setUser(response);
      setLocal(JSON.stringify(response));
    } else alert("register error");
  };

  const loginUser = async () => {
    const isEmailString = typeof email === "string";
    const isPasswordString = typeof password === "string";
    const user = {
      email: isEmailString ? email : email.toString(),
      password: isPasswordString ? password : password.toString(),
    };
    const response = await userLogin(user);
    if (response) {
      setUser(response);
      setLocal(JSON.stringify(response));
    } else alert("login error");
  };

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

        <Button icon={<MdOutlineBook />} full onClick={registerNewUser}>
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

        <Button icon={<MdOutlineAccountCircle />} full onClick={loginUser}>
          Submit
        </Button>
      </div>
    </div>
  );
};

export default Auth;
