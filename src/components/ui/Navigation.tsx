import { Link, useNavigate } from "react-router-dom";
import Button from "../form/Button";
import { logoutUser } from "../../helpers";
import { useUser } from "../../context/UserContext";
import {
  MdAccountBox,
  MdHome,
  MdList,
  MdLogin,
  MdOutlineLogout,
  MdPlusOne,
} from "react-icons/md";

const Navigation = () => {
  const { user, setUser } = useUser();

  const navigate = useNavigate();

  const handleLogout = async () => {
    await logoutUser();
    setUser(null);
    navigate("/auth");
  };

  return (
    <ul className="flex-center-center flex-column ">
      <li>
        <Link className="link-icon" to="/">
          <MdHome />
        </Link>
      </li>
      {!user && (
        <li>
          <Link className="link-icon" to="/auth">
            <MdLogin />
          </Link>
        </li>
      )}
      {user && (
        <li>
          <Link className="link-icon" to="/profile">
            <MdAccountBox />
          </Link>
        </li>
      )}
      {user && (
        <li>
          <Link className="link-icon" to="/add-challenge">
            <MdPlusOne />
          </Link>
        </li>
      )}

      <li>
        <Link className="link-icon" to="/challenges">
          <MdList />
        </Link>
      </li>
      {user && (
        <li>
          <Button icon={<MdOutlineLogout />} onClick={handleLogout}></Button>
        </li>
      )}
    </ul>
  );
};

export default Navigation;
