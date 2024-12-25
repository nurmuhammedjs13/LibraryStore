"use client";
import React, { useEffect } from "react";
import styles from "./ModalWindowBascket.module.scss";
import ModalImg from "@/assets/Icons/ModalImg";

interface ModalWindowBascketProps {
  isVisible: boolean; 
  onClose: () => void; 
}

const ModalWindowBascket: React.FC<ModalWindowBascketProps> = ({ isVisible, onClose }) => {
  useEffect(() => {
    if (isVisible) {
      const timer = setTimeout(() => {
        onClose();
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [isVisible, onClose]);

  if (!isVisible) return null;
  return (
    <div className={styles.mainblock}>
      <div className={styles.block}>
        <h3>Товар добавлен в корзину</h3>
        <ModalImg />
      </div>
    </div>
  );
};

export default ModalWindowBascket;
