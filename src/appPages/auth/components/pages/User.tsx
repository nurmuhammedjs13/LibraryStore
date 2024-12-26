import React from "react";
interface IUser {}
const User = () => {
  const user = localStorage.getItem("user");
  console.log("🚀 ~ User ~ user:", user);

  return <div></div>;
};

export default User;
