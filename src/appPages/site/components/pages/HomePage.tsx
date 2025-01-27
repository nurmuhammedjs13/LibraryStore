import React from "react";
import Welcome from "./homesection/Welcome/Welcome";
import AboutUs from "./homesection/aboutUs/AboutUs";
import HomeCards from "./homesection/HomeCards/HomeCards";
import DiscountSlider from "./homesection/DiscountSlider/DiscountSlider";

const HomePage = () => {
  return (
    <div>
      <Welcome />
      <HomeCards />
      <DiscountSlider />
      <AboutUs />
    </div>
  );
};

export default HomePage;
