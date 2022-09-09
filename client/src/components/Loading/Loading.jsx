import React from "react";
import style from "./Loading.module.css";
import gif from "../../images/loading.gif"

export default function Loading() {
    return (
        <div className={style.container}>
            <div className={style.loader}>
                <img src={gif} alt="" />
            </div>
        </div>
    )
}