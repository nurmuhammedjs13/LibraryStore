"use client";
import React from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { usePostForgotPasswordMutation } from "@/redux/api/auth";
import scss from "./forgot.module.scss";
import okuLoginLogo from "@/assets/Снимок экрана 2024-12-01 185323 1.png";
import Image from "next/image";
import { useRouter } from "next/navigation";

interface IFormForgotPassword {
  email: string;
}

const ForgotPage = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IFormForgotPassword>();
  const [postForgotPassword] = usePostForgotPasswordMutation();
  const router = useRouter();

  const onSubmit: SubmitHandler<IFormForgotPassword> = async (data) => {
    console.log(
      "🚀 ~ constonSubmit:SubmitHandler<IFormForgotPassword>= ~ data:",
      data
    );

    try {
      const response = await postForgotPassword(data).unwrap();
      alert(response.status); // Сообщение об успешном выполнении
      router.push("/reset"); // Переход на страницу сброса
    } catch (error) {
      console.error("Ошибка запроса:", error);
      alert("Ошибка при отправке запроса."); // Вывод сообщения об ошибке
    }
  };

  return (
    <div className={scss.Login}>
      <div className="container">
        <div className={scss.content}>
          <Image src={okuLoginLogo} alt="logo" width={100} height={21} />
          <p>
            На вашу почту придет письмо с инструкциями по сбросу пароля.
            Пожалуйста, не трогайте его.
          </p>
          <form onSubmit={handleSubmit(onSubmit)} className={scss.form}>
            <input
              type="email"
              placeholder="Введите email"
              {...register("email", {
                required: "Введите email",
              })}
            />
            {errors.email && (
              <p className={scss.error}>{errors.email.message}</p>
            )}
            <button type="submit">Отправить письмо сброса</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ForgotPage;
