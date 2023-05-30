import React, { useContext } from "react";
import avatar from "../../../assets/images/placeholder.jpg";
import { AuthContext } from "../../../providers/AuthProvider";

const Avatar = () => {
  const { user } = useContext(AuthContext);
  return (
    <img
      className="rounded-full"
      src={user && user.photoURL ? user.photoURL : avatar}
      alt="avatar image in navbar"
      height="30"
      width="30"
    />
  );
};

export default Avatar;
