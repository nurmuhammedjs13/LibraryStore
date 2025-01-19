"use client";
import LayoutAuth from "@/appPages/auth/components/layout/LayoutAuth";
import LayoutSite from "@/appPages/site/components/layout/LayoutSite";
import ReduxProvider from "@/providers/ReduxProvider";
import { FC, ReactNode } from "react";
import  {SessionProvider} from"@/providers/SessionProvider"

interface LayoutClientProps {
  children: ReactNode;
}
const LayoutClient: FC<LayoutClientProps> = ({ children }) => {
  return (
    <>
      <ReduxProvider>
        <SessionProvider>
          <LayoutSite>
            <LayoutAuth>{children}</LayoutAuth>
          </LayoutSite>
        </SessionProvider>
      </ReduxProvider>
    </>
  );
};

export default LayoutClient;
