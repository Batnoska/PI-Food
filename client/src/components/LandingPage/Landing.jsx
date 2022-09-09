import React from "react";
import style from "./Landing.module.css";
import { Link } from "react-router-dom";

export default function Landing() {
    return (
        <div className={style.container}>
            <div className={style.box}>
                <p className={style.text}>Welcome to The</p>
                <p className={style.title}>Recipes APP!</p>
                <p className={style.text}>By Santiago Batnoska</p>
                <Link to="/home"><button className={style.button}>Start searching right now!</button></Link>
            </div>
        </div>
    )
}