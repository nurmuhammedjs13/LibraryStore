"use client";
import React from "react";
import scss from "./forgot.module.scss";
import { SubmitHandler, useForm } from "react-hook-form";
import { usePostResetPasswordMutation } from "@/redux/api/auth";
import { useRouter } from "next/navigation";
import Image from "next/image";
import okuLoginLogo from "@/assets/Снимок экрана 2024-12-01 185323 1.png";

interface IformResetPassword {
  email: string;
  reset_code: string;
  new_password: string;
}

const ResetPage = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IformResetPassword>();
  const [postResetPassword] = usePostResetPasswordMutation();
  const router = useRouter();

  const onSubmit: SubmitHandler<IformResetPassword> = async (data) => {
    try {
      const response = await postResetPassword({
        email: data.email,
        reset_code: data.reset_code, // Исправлено
        new_password: data.new_password, // Исправлено
      }).unwrap(); // Получаем данные ответа напрямую
      alert(response.message);
      router.push("/");
    } catch (error: any) {
      console.error("Ошибка:", error);
      alert(error?.data?.message || "Ошибка при сбросе пароля.");
    }
  };

  return (
    <section className={scss.Login}>
      <div className="container">
        <div className={scss.content}>
          <Image src={okuLoginLogo} alt="logo" width={100} height={21} />
          <p>
            Введите новый пароль и код сброса, которые вы получили на вашу почту.
            После этого вы сможете войти с новым паролем.
          </p>
          
          <form onSubmit={handleSubmit(onSubmit)} className={scss.form}>
            <input
              type="text"
              placeholder="Введите новый пароль"
              {...register("new_password", { required: "Поле обязательно" })}
            />
            {errors.new_password && (
              <p className={scss.error}>{errors.new_password.message}</p>
            )}

            <input
              type="text"
              placeholder="Введите email"
              {...register("email", { required: "Поле обязательно" })}
            />
            {errors.email && (
              <p className={scss.error}>{errors.email.message}</p>
            )}

            <input
              type="text"
              placeholder="Введите код сброса"
              {...register("reset_code", { required: "Поле обязательно" })}
            />
            {errors.reset_code && (
              <p className={scss.error}>{errors.reset_code.message}</p>
            )}

            <button type="submit">Сбросить пароль</button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default ResetPage;
