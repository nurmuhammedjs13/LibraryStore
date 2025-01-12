import { FC, ReactNode, useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";
import { useGetMeQuery, usePostRefreshTokenMutation } from "@/redux/api/auth";
import Cookies from "js-cookie";

interface SessionProviderProps {
  children: ReactNode;
}

export const SessionProvider: FC<SessionProviderProps> = ({ children }) => {
  const { status } = useGetMeQuery();
  const [refreshTokenMutation] = usePostRefreshTokenMutation();
  const pathname = usePathname();

  const handleRefreshToken = async () => {
    const token = Cookies.get("token");
    const refreshToken = Cookies.get("refresh");

    // Проверка на наличие токенов
    if (!refreshToken || !token) {
      console.warn("Токен или refresh токен отсутствуют.");
      return;
    }

    try {
      const { exp } = JSON.parse(atob(token.split(".")[1]));
      const accessTokenExpiration = exp * 1000;

      console.log(
        "🚀 ~ handleRefreshToken ~ accessTokenExpiration:",
        accessTokenExpiration
      );

      if (accessTokenExpiration < new Date().getTime()) {
        Cookies.remove("token");

        const { data: responseData } = await refreshTokenMutation({
          refresh: refreshToken,
        });

        Cookies.set("token", responseData?.access as string);
        Cookies.set("refresh", responseData?.refresh as string);
        window.location.reload();
        console.log("Токены обновлены.");
      } else {
        console.log("Токен еще действителен");
      }
    } catch (error) {
      console.error("Ошибка обновления токена:", error);

      Cookies.remove("token");
      Cookies.remove("refresh");
    }
  };

  useEffect(() => {
    handleRefreshToken();
  }, []);

  return <>{children}</>;
};
