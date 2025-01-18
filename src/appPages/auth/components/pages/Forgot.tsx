"use client";
import React from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { usePostForgotPasswordMutation } from "@/redux/api/auth";
import scss from "./forgot.module.scss";
import okuLoginLogo from "@/assets/Снимок экрана 2024-12-01 185323 1.png";
import Image from "next/image";
import { useRouter } from "next/navigation";
interface IformForgotPassword {
  email: string;
}
const ForgotPage = () => {
  const { register, handleSubmit } = useForm<IformForgotPassword>();
  const [postForgotPassword] = usePostForgotPasswordMutation();
  const nav = useRouter();
  const onSubmit: SubmitHandler<IformForgotPassword> = async (data) => {
    const newData = {
      email: data.email,
    };
    const { data: responseData, error } = await postForgotPassword(newData);
    if (responseData) {
      alert(responseData.message);
      nav.push("/reset");
    } else {
      const errorMessage = error as { data: { message: string } };
      alert(errorMessage.data.message);
    }
  };

  return (
    <div className={scss.Login}>
      <div className="container">
        <div className={scss.content}>
          <Image src={okuLoginLogo} alt="logo" width={100} height={21} />
          <form onSubmit={handleSubmit(onSubmit)} className={scss.form}>
            <input
              type="text"
              placeholder="email"
              {...register("email", { required: true })}
            />
            <button type="submit">отправить письмо сброса</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ForgotPage;
