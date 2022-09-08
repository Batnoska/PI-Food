import React from "react";
import { Link } from "react-router-dom";
import style from "./NavBar.module.css";

export default function NavBar() {
    return (
        <header>
            <nav className={style.nav}>
                <div>
                    <Link to={"/"}>
                        <button className={style.btn}>
                            Back to Start
                        </button>
                    </Link>
                </div>
                <div>
                    <Link to={"/create"}>
                        <button className={style.btn2}>
                            Create your own recipe!
                        </button>
                    </Link>
                </div>
            </nav>
        </header>
    );
}