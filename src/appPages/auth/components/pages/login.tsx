"use client";
import { usePostLoginMutation } from "@/redux/api/auth";
import { useRouter } from "next/navigation";
import { SubmitHandler, useForm } from "react-hook-form";
import React from "react";
import scss from "./Login.module.scss";
import okuLoginLogo from "@/assets/Снимок экрана 2024-12-01 185323 1.png";
import Image from "next/image";
interface ILogin {
  username: string;
  password: string;
}
const Login = () => {
  const router = useRouter();
  const { register, handleSubmit } = useForm<ILogin>();
  const [postLogin] = usePostLoginMutation();

  const onSubmit: SubmitHandler<ILogin> = async (data) => {
    try {
      const { data: responseData, error } = await postLogin(data);
      if (responseData) {
        localStorage.setItem("token", JSON.stringify(responseData.access));
        localStorage.setItem("refresh", JSON.stringify(responseData.refresh));
        localStorage.setItem("user", JSON.stringify(responseData.user));
      } else {
        // const errorMessage = error as { data: { message: string } };
        // alert(errorMessage.data.message);
      }
      // console.log(error);
    } catch (error) {
      console.table(error);
    }
  };
  return (
    <div className={scss.Login}>
      <div className="container">
        <div className={scss.content}>
          <Image src={okuLoginLogo} alt="logo" width={100} height={21} />
          <form onSubmit={handleSubmit(onSubmit)} className={scss.form}>
            <input
              {...register("username", { required: true })}
              placeholder="Имя"
            />
            <input
              {...register("password", { required: true })}
              placeholder="Пароль"
            />
            <button type="submit">Войти</button>
          </form>
          <a href="">
            У вас нет аккаунта? <span>Зарегистрироваться</span>
          </a>
        </div>
      </div>
    </div>
  );
};

export default Login;
