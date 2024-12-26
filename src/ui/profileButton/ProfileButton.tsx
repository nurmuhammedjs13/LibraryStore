"use client";
import scss from "./ProfileButton.module.scss";
import { useHeaderStore } from "@/stores/useHeaderStore";
import Image from "next/image";
import profile from "@/assets/Icons/proicons_person.svg";

const ProfileButton = () => {
  const { isOpenProfileMenu, setIsOpenProfileMenu } = useHeaderStore();

  return (
    <div
      className={scss.ProfileButton}
      onClick={(e) => {
        e.stopPropagation();
        setIsOpenProfileMenu(!isOpenProfileMenu);
      }}
    >
      <div className={scss.content}>
        <Image width={35} height={35} src={profile} alt="avatar" />
      </div>
    </div>
  );
};

export default ProfileButton;
