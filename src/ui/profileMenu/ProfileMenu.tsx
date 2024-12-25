"use client";
import { TbLogout2 } from "react-icons/tb";
import scss from "./ProfileMenu.module.scss";
import { useHeaderStore } from "@/stores/useHeaderStore";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useGetUserQuery } from "@/redux/api/auth";
import Image from "next/image";

const ProfileMenu = () => {
  const { isOpenProfileMenu, logout, links } = useHeaderStore();
  const router = useRouter();
  const { data } = useGetUserQuery();
  console.log("🚀 ~ ProfileMenu ~ data:", data)
  return (
    <div
      className={
        isOpenProfileMenu
          ? `${scss.ProfileMenu} ${scss.active}`
          : `${scss.ProfileMenu}`
      }
      onClick={(e) => {
        e.stopPropagation();
      }}
    >
      <div className={scss.content}>
        <div className={scss.user}>
          (
          <div className={scss.user_cont} key={data?.id}>
            <h1>{data?.username}</h1>
            {/* <Image src={data?.user_image} alt={data?.username} /> */}
            <h2>{data?.username}</h2>
            <h3>{data?.email}</h3>
          </div>
          )
        </div>
        <button className={scss.logout} onClick={logout}>
          <TbLogout2 />
          logout
        </button>
      </div>
    </div>
  );
};

export default ProfileMenu;
