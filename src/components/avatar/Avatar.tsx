import React from "react";
import default_avatar from "../../assets/avatar.png";

const Avatar = () => {
  return (
    <div className="center">
      <img className="avatar" src={default_avatar} alt="" />
    </div>
  );
};

export default Avatar;
