import User from "@/appPages/auth/components/pages/User";
import HomePage from "@/appPages/site/components/pages/HomePage";
import React from "react";

const page = () => {
    return (
        <div>
            <HomePage />
            <User/>
        </div>
    );
};

export default page;
