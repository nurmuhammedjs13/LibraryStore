"use client";
import LayoutSite from "@/appPages/site/components/layout/LayoutSite";
import ReduxProvider from "@/providers/ReduxProvider";
import { FC, ReactNode } from "react";

interface LayoutClientProps {
    children: ReactNode;
}
const LayoutClient: FC<LayoutClientProps> = ({ children }) => {
    return (
        <>
            <ReduxProvider>
                <LayoutSite>{children}</LayoutSite>
            </ReduxProvider>
        </>
    );
};

export default LayoutClient;
