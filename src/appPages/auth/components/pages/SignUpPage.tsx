"use client";
import { usePostRegistrationMutation } from "@/redux/api/auth";
import { useForm, SubmitHandler } from "react-hook-form";
import { useRouter } from "next/navigation";
import scss from "./signup.module.scss";
import okuLoginLogo from "@/assets/Снимок экрана 2024-12-01 185323 1.png";
import Image from "next/image";
import { FC, useState } from "react";

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

  const onSubmit: SubmitHandler<IFormInput> = async (data) => {
    setIsOpenAuth(false);
    try {
      const response = await postRegistration(data).unwrap();
      console.log("Успешная регистрация:", response);

      // if (response) {
      //   localStorage.setItem("token", response.username);
      //   route.push("/");
      // }
    } catch (error: any) {
      console.error("Ошибка:", error);
      setErrorMessage(error?.data?.message || "Ошибка регистрации");
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
            {errors.email && <p>{errors.email.message}</p>}

            <input
              placeholder="Пароль"
              type="text"
              {...register("password", { required: "Пароль обязателен" })}
            />
            {errors.password && <p>{errors.password.message}</p>}

            <input
              placeholder="Имя пользователя"
              {...register("username", {
                required: "Имя пользователя обязательно",
              })}
            />
            {errors.username && <p>{errors.username.message}</p>}

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
