"use client";
import Cookies from "js-cookie";
import { usePostLoginMutation } from "@/redux/api/auth";
import { useRouter } from "next/navigation";
import { SubmitHandler, useForm } from "react-hook-form";
import React, { FC, useState } from "react";
import scss from "./Login.module.scss";
import okuLoginLogo from "@/assets/Снимок экрана 2024-12-01 185323 1.png";
import Image from "next/image";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa";

interface ILogin {
  username: string;
  password: string;
}

interface IIsopen {
  setIsOpenAuth: (isOpen: boolean) => void;
}

const Login: FC<IIsopen> = ({ setIsOpenAuth }) => {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ILogin>();
  const [postLogin] = usePostLoginMutation();
  const [loginError, setLoginError] = useState<string | null>(null);
  const [showPassword, setShowPassword] = useState(false);
  const nav = useRouter();
  const onSubmit: SubmitHandler<ILogin> = async (data) => {
    try {
      const { data: responseData, error } = await postLogin(data);

      if (responseData) {
        Cookies.set("token", responseData.access, { expires: 360 });
        Cookies.set("refresh", responseData.refresh, { expires: 360 });
        Cookies.set("user", JSON.stringify(responseData.user), {
          expires: 360,
        });
        window.location.reload();
      } else {
        setLoginError("Ошибка входа, попробуйте еще раз.");
        console.error("Ошибка:", error);
      }
    } catch (error) {
      setLoginError("Ошибка входа, попробуйте еще раз.");
      console.error("Ошибка входа:", error);
    }
  };

  return (
    <div className={scss.Login}>
      <div className="container">
        <div className={scss.content}>
          <Image src={okuLoginLogo} alt="logo" width={100} height={21} />
          <form onSubmit={handleSubmit(onSubmit)} className={scss.form}>
            <input
              {...register("username", { required: "Имя обязательно" })}
              placeholder="Имя"
              className={errors.username ? scss.inputError : ""}
            />
            {errors.username && (
              <span className={scss.error}>{errors.username.message}</span>
            )}

            <div className={scss.passwordWrapper}>
              <input
                {...register("password", { required: "Пароль обязателен" })}
                placeholder="Пароль"
                type={showPassword ? "text" : "password"} // Тип поля ввода
                className={errors.password ? scss.inputError : ""}
              />
              <button
                type="button"
                className={scss.togglePassword}
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <FaRegEye /> : <FaRegEyeSlash />}
              </button>
            </div>
            {errors.password && (
              <span className={scss.error}>{errors.password.message}</span>
            )}

            <button type="submit">Войти</button>
          </form>
          {loginError && <div className={scss.loginError}>{loginError}</div>}
          <a onClick={() => setIsOpenAuth(true)}>
            <span> У вас нет аккаунта? </span>
            Зарегистрироваться
          </a>
          <a onClick={() => nav.push("/forgot")}>Забыли пароль</a>
        </div>
      </div>
    </div>
  );
};

export default Login;
