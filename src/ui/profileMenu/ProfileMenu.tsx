"use client";

import { TbLogout2 } from "react-icons/tb";
import scss from "./ProfileMenu.module.scss";
import { useHeaderStore } from "@/stores/useHeaderStore";
import { useGetMeQuery } from "@/redux/api/auth";
import Image from "next/image";
import Login from "@/appPages/auth/components/pages/login";
import { useEffect, useState } from "react";
import SignUpPage from "@/appPages/auth/components/pages/SignUpPage";

interface IUser {
  username: string;
  email: string;
  user_image?: string;
}

const ProfileMenu = () => {
  const { isOpenProfileMenu } = useHeaderStore();
  const { data, status } = useGetMeQuery();
  const [isOpenAuth, setIsOpenAuth] = useState(true);

  const user = localStorage.getItem("user");

  const displayStatus = user === null ? "rejected" : status;

  const handleLogout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("token");
  };
  useEffect(() => {
    handleLogout();
  }, []);
  return (
    <div
      className={`${scss.ProfileMenu} ${isOpenProfileMenu ? scss.active : ""}`}
      onClick={(e) => e.stopPropagation()}
    >
      <div className={scss.content}>
        {displayStatus === "rejected" ? (
          <>{isOpenAuth ? <Login /> : <SignUpPage />}</>
        ) : (
          <div className={scss.user}>
            <div className={scss.user_cont}>
              <Image
                src={data?.user_image || "/default-avatar.png"}
                alt={data?.username || "User"}
                width={50}
                height={50}
                className={scss.avatar}
              />
              <h2>{data?.username}</h2>
              {/* <p>{data?.email}</p> Показываем email пользователя */}
            </div>
            <button className={scss.logout} onClick={handleLogout}>
              <TbLogout2 />
              Logout
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProfileMenu;
