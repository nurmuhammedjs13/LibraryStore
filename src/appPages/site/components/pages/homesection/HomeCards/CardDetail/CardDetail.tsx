import React from "react";
import scss from "./CardDetail.module.scss";
import back from "../../../../../../../assets/Icons/Back.png";
import Image from "next/image";

const CardDetail = () => {
    return (
        <section className={scss.CardDetail}>
            <div className="container">
                <div className={scss.content}></div>
            </div>
        </section>
    );
};

export default CardDetail;
