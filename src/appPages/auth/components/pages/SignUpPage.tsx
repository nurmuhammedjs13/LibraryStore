"use client";
import { usePostRegistrationMutation } from "@/redux/api/auth";
import { useForm, SubmitHandler } from "react-hook-form";
import { useRouter } from "next/navigation";
import scss from "./signup.module.scss";
import okuLoginLogo from "@/assets/Снимок экрана 2024-12-01 185323 1.png";
import Image from "next/image";
import { useState } from "react";

interface IFormInput {
  email: string;
  password: string;
  username: string;
}

const SignUpPage = () => {
  const { register, handleSubmit } = useForm<IFormInput>();
  const [postRegistration] = usePostRegistrationMutation();
  const route = useRouter();
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const onSubmit: SubmitHandler<IFormInput> = async (data) => {
    try {
      const { data: responseData, error } = await postRegistration(data);

      if (responseData) {
        localStorage.setItem("token", JSON.stringify(responseData));
        // route.push("/"); // Перенаправляем на главную
      } else if (error) {
        const err = error as { data?: { message?: string } };
        setErrorMessage(err?.data?.message || "Ошибка регистрации");
      }
    } catch (err) {
      setErrorMessage("Произошла ошибка. Попробуйте снова.");
    }
  };

  return (
    <div className={scss.Signup}>
      <div className="container">
        <div className={scss.content}>
          <Image src={okuLoginLogo} alt="logo" width={100} height={21} />
          <form onSubmit={handleSubmit(onSubmit)} className={scss.form}>
            <input    
              placeholder="Email"
              type="email"
              {...register("email", { required: "Email обязателен" })}
            />
            <input
              placeholder="Пароль"
              type="text"
              {...register("password", { required: "Пароль обязателен" })}
            />
            <input
              placeholder="Имя пользователя"
              {...register("username", { required: "Имя пользователя обязательно" })}
            />

            {errorMessage && <p className={scss.error}>{errorMessage}</p>}

            <button type="submit">Регистрация</button>
          </form>
          <a>
            У вас есть аккаунт? <span>Войти</span>
          </a>
        </div>
      </div>
    </div>
  );
};

export default SignUpPage;
