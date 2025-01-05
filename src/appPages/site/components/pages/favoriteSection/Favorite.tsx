import React from "react";
import scss from "./Favorite.module.scss";
import { useGetFavoriteQuery } from "@/redux/api/favorite";
const Favorite = () => {
  // const {data}=useGetFavoriteQuery{}
  // console.log("🚀 ~ Favorite ~ data:", data)
  return (
    <section className={scss.Favorite}>
      <div className="container">
        <div className={scss.content}></div>
      </div>
    </section>
  );
};

export default Favorite;
