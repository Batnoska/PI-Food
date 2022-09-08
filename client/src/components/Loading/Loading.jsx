import React from "react";
import style from "./Loading.module.css";

export default function Loading() {
    return (
        <div>
            <div className={style.loader}></div>
        </div>
    );
}