"use client";
import React from "react";
import scss from "./forgot.module.scss";
import { useSearchParams } from "next/navigation";
import { SubmitHandler, useForm } from "react-hook-form";
import { usePostResetPasswordMutation } from "@/redux/api/auth";
import { useRouter } from "next/navigation";
import Image from "next/image";
import okuLoginLogo from "@/assets/Снимок экрана 2024-12-01 185323 1.png";

interface IformResetPassword {
  newPassword: string;
  email: string;
  resetcode: number;
}
const ResetPage = () => {
  const { register, handleSubmit } = useForm<IformResetPassword>();
  const [patchResetPassword] = usePostResetPasswordMutation();
  const searchParams = useSearchParams();
  const router = useRouter();
  const onSubmit: SubmitHandler<IformResetPassword> = async (data) => {
    const newData = {
      email: data.email,
      resetcode: data.resetcode,
      newPassword: data.newPassword,
    };
    // @ts-ignore
    const { data: responseData, error } = await patchResetPassword(newData);
    if (responseData) {
      router.push("/");
      alert(responseData.message);
    } else {
      const errorMessage = error as { data: { message: string } };
      alert(errorMessage.data.message);
    }
  };

  return (
    <section className={scss.Login}>
      <div className="container">
        <div className={scss.content}>
          <Image src={okuLoginLogo} alt="logo" width={100} height={21} />

          <form onSubmit={handleSubmit(onSubmit)} className={scss.form}>
            <input
              type="text"
              placeholder="new password"
              {...register("newPassword", { required: true })}
            />
            <input
              type="text"
              placeholder="email"
              {...register("email", { required: true })}
            />
            <input
              type="text"
              placeholder="resetcode"
              {...register("resetcode", { required: true })}
            />
            <button type="submit">reset</button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default ResetPage;
