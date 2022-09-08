import React from "react";
import { Link } from "react-router-dom";
import style from "./LandingPage.module.css";

export default function LandingPage() {
    return (
        <div className={style.fondo}>
            <Link to={"/home"}>
                <button className={style.box}>Welcome to the Recipes App!</button>
            </Link>
        </div>
    )
}