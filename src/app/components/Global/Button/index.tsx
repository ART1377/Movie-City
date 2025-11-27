import React from "react";
import style from "./Button.module.css";
type Props = {
  type: "button" | "submit" | "reset" | undefined;
  btnType: string;
  children?: any;
  css?: string;
  disable?:boolean;
  onClick?:
    | ((event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void)
    | undefined;
};

const Button = ({ type, btnType, children, css,disable ,onClick }: Props) => {
  return (
    <button
      onClick={onClick}
      type={type}
      disabled={disable?disable:false}
      className={`${css && css} ${disable&&style.disable} ${
        btnType == "main"
          ? style.main
          : btnType == "outline"
          ? style.outline
          : btnType == "mainSM"
          ? style.mainSM
          : btnType == "outlineSM"
          ? style.outlineSM
          : ""
      }`}
    >
      {children}
    </button>
  );
};

export default Button;
