import React from "react";
import default_avatar from "../../assets/avatar.png";
import { useUser } from "../../context/UserContext";
import Logo from "../ui/Logo";

const Avatar = () => {
  const { user } = useUser();

  return (
    <div className="aside">
      <Logo />

      <div className="center">
        <img className="avatar" src={default_avatar} alt="" />
      </div>

      <p className="center padding-md">
        <small>{user && user.email?.split("@")[0].slice(0, 10) + "..."}</small>
      </p>
    </div>
  );
};

export default Avatar;
