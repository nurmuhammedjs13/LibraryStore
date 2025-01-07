"use client";
import { usePostRegistrationMutation } from "@/redux/api/auth";
import { useForm, SubmitHandler } from "react-hook-form";
import { useRouter } from "next/navigation";
import scss from "./signup.module.scss";
import okuLoginLogo from "@/assets/Снимок экрана 2024-12-01 185323 1.png";
import Image from "next/image";
import { FC, useState } from "react";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa";

interface IFormInput {
  email: string;
  password: string;
  username: string;
}
interface IIsopen {
  setIsOpenAuth: (isOpen: boolean) => void;
}

const SignUpPage: FC<IIsopen> = ({ setIsOpenAuth }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IFormInput>();
  const [postRegistration] = usePostRegistrationMutation();
  const route = useRouter();
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [showPassword, setShowPassword] = useState(false); // Состояние для отображения пароля

  const onSubmit: SubmitHandler<IFormInput> = async (data) => {
    setIsOpenAuth(false);
    try {
      const response = await postRegistration(data).unwrap();
      console.log("Успешная регистрация:", response);
      // route.push("/");
    } catch (error) {
      console.error("Ошибка:", error);
      setErrorMessage("Ошибка регистрации, попробуйте ещё раз.");
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
            {errors.email && <p className={scss.error}>{errors.email.message}</p>}

            <div className={scss.passwordWrapper}>
              <input
                placeholder="Пароль"
                type={showPassword ? "text" : "password"} // Тип поля ввода
                {...register("password", { required: "Пароль обязателен" })}
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
              <p className={scss.error}>{errors.password.message}</p>
            )}

            <input
              placeholder="Имя пользователя"
              {...register("username", {
                required: "Имя пользователя обязательно",
              })}
            />
            {errors.username && (
              <p className={scss.error}>{errors.username.message}</p>
            )}

            {errorMessage && <p className={scss.error}>{errorMessage}</p>}

            <button type="submit">Регистрация</button>
          </form>
          <a>
            У вас есть аккаунт?{" "}
            <span onClick={() => setIsOpenAuth(false)}>Войти</span>
          </a>
        </div>
      </div>
    </div>
  );
};

export default SignUpPage;
