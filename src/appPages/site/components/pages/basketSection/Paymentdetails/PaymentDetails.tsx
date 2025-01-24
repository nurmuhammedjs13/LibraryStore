"use client";
import React from "react";
import styles from "./PaymentDetails.module.scss";
import Image from "next/image";
import Link from "next/link";
import { useGetPaymentdetailsQuery } from "@/redux/api/paymentDetails";

const PaymentDetails = () => {
    const {
        data,
        isLoading: isGlobalLoading,
        isError: isGlobalError,
    } = useGetPaymentdetailsQuery();

    const {
        data: paymentDetailData = [],
        isLoading: isLocalLoading,
        isError: isLocalError,
    } = useGetPaymentdetailsQuery(undefined, {
        selectFromResult: ({ data, isLoading, isError }) => ({
            data: data || [],
            isLoading,
            isError,
        }),
    });

    if (isGlobalLoading || isLocalLoading) {
        return <>Loading...</>;
    }

    if (isGlobalError || isLocalError) {
        return <>Error</>;
    }

    return (
        <div className={styles.detailsMain}>
            <div className={styles.details}>
                <div className="container">
                    <div className={styles.breatCrums}>
                        <h3>
                            <Link href="/">Главная </Link>
                            <span>/ Корзина</span>
                        </h3>
                    </div>
                </div>

                <div className={styles.detailsBlock}>
                    <div className="container">
                        <h2>Реквизиты для оплаты</h2>
                        <div className={styles.chek}>
                            {paymentDetailData.map((el, index) => (
                                <div key={index} className={styles.detailsBox}>
                                    <Image
                                        width={100}
                                        height={17}
                                        className={styles.BankName}
                                        src={el.image_name_bank}
                                        alt="img"
                                    />
                                    <Image
                                        width={100}
                                        height={100}
                                        className={styles.QrCode}
                                        src={el.image_qr_code}
                                        alt="img"
                                    />
                                    <h2>Счет:{el.cart_number}</h2>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PaymentDetails;
