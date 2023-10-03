import { useEffect, useState } from "react";
import { userLogin, userRegister } from "../helpers";
import Input from "../components/form/Input";
import Button from "../components/form/Button";
import { useUser } from "../context/UserContext";
import useLocalStorage from "../hooks/useLocalStorage";
import {
  MdOutlineAccountCircle,
  MdOutlineBook,
  MdOutlineEmail,
  MdOutlinePassword,
} from "react-icons/md";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import Logo from "../components/ui/Logo";

const Auth = () => {
  const navigate = useNavigate();

  const { user, setUser } = useUser();
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
      navigate("/");
    } else alert("login error");
  };

  useEffect(() => {
    if (user) navigate("/");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user]);

  return (
    <div className="form-container">
      <br />

      <div className="form">
        <Logo center size="sm" />
        <h2>Registro</h2>
        <p>Inicie sessão para continuar</p>
        <Input
          icon={<MdOutlineEmail />}
          type="email"
          label="E-mail"
          value={email}
          setState={setEmail}
          id="register-email"
        />

        <Input
          icon={<MdOutlinePassword />}
          type="password"
          label="Password"
          value={password}
          setState={setPassword}
          id="register-password"
        />

        <Button full icon={<MdOutlineBook />} onClick={registerNewUser}>
          Registrar
        </Button>

        <hr />
        <br />

        <Link to="/auth">
          <small>Cria uma conta aqui.</small>
        </Link>
      </div>

      <hr />

      <div className="form">
        <h2>Entrar</h2>
        <Input
          icon={<MdOutlineEmail />}
          type="email"
          label="E-mail"
          value={email}
          setState={setEmail}
          id="login-email"
        />

        <Input
          icon={<MdOutlinePassword />}
          type="password"
          label="Password"
          value={password}
          setState={setPassword}
          id="login-password"
        />

        <Button full icon={<MdOutlineAccountCircle />} onClick={loginUser}>
          Entrar
        </Button>

        <hr />
        <br />

        <Link to="/auth">
          <small>Acesse sua conta aqui.</small>
        </Link>
      </div>
    </div>
  );
};

export default Auth;
