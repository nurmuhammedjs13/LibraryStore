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
      // Декодируем токен
      const { exp } = JSON.parse(atob(token.split(".")[1]));
      const accessTokenExpiration = exp * 1000;

      console.log(
        "🚀 ~ handleRefreshToken ~ accessTokenExpiration:",
        accessTokenExpiration
      );

      if (accessTokenExpiration < new Date().getTime()) {
        // Удаляем старые токены
        Cookies.remove("token");

        // Отправляем запрос на обновление токенов
        const { data: responseData } = await refreshTokenMutation({
          refresh: refreshToken,
        });

        // Сохраняем новые токены
        Cookies.set("token", responseData?.access as string);
        Cookies.set("refresh", responseData?.refresh as string);

        console.log("Токены обновлены.");
      } else {
        console.log("Токен еще действителен");
      }
    } catch (error) {
      console.error("Ошибка обновления токена:", error);

      // Удаляем токены при ошибке
      Cookies.remove("token");
      Cookies.remove("refresh");
    }
  };

  useEffect(() => {
    handleRefreshToken();
  }, []);

  return <>{children}</>;
};
