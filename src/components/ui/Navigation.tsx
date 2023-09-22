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
    <nav className="navigation-container">
      <ul>
        <li>
          <Link to="/">
            <MdHome />
          </Link>
        </li>
        {!user && (
          <li>
            <Link to="/auth">
              <MdLogin />
            </Link>
          </li>
        )}
        {user && (
          <li>
            <Link to="/profile">
              <MdAccountBox />
            </Link>
          </li>
        )}
        {user && (
          <li>
            <Link to="/add-challenge">
              <MdPlusOne />
            </Link>
          </li>
        )}

        <li>
          <Link to="/challenges">
            <MdList />
          </Link>
        </li>
        {user && (
          <li>
            <Button icon={<MdOutlineLogout />} onClick={handleLogout}></Button>
          </li>
        )}
      </ul>
    </nav>
  );
};

export default Navigation;
