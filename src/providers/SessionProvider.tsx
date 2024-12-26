import { FC, ReactNode, useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";
import { useGetMeQuery, usePostLoginMutation } from "@/redux/api/auth";

interface SessionProviderProps {
  children: ReactNode;
}

export const SessionProvider: FC<SessionProviderProps> = ({ children }) => {
  const { status } = useGetMeQuery();
  console.log("🚀 ~ status:", status);
  const [postLogin] = usePostLoginMutation();
  console.log("🚀 ~ postLogin:", postLogin);

  const pathname = usePathname();
  const router = useRouter();

//   const handleRefreshToken = async () => {
//     const localStorageData = JSON.parse(localStorage.getItem("tokens")!);
//     if (localStorageData === "undefined" || localStorageData === undefined) {
//       localStorage.removeItem("tokens");
//     }
//     if (localStorageData) {
//       const { accessTokenExpiration, refreshToken } = localStorageData;
//       if (accessTokenExpiration < new Date().getTime()) {
//         localStorage.removeItem("tokens");
//         const { data } = await postLogin({ refresh });
//         localStorage.setItem("tokens", JSON.stringify(data));
//         window.location.reload();
//       } else {
//         console.log("refreshToken живой!");
//       }
//     }
//   };
  const handleNavigation = () => {
    switch (pathname) {
      case "login/":
      case "register/":
        // case '/auth/reset-password':
        // case '/auth/forgot':
        if (status === "fulfilled") {
          router.push("/");
        }
        break;
      case "/":
      case "/profile":
        if (status === "rejected") {
          router.push("/auth/sign-in");
        }
        break;
      default:
        break;
    }
  };

//   useEffect(() => {
//     handleRefreshToken();
//   }, [pathname]);

  useEffect(() => {
    handleNavigation();
  }, [status, pathname, router]);

  return children;
};
