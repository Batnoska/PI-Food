import React from "react";
import style from "./Pagination.module.css";
export default function Pagination({ recipeForPage, paginado, recipes}) {
    let page = [];
    for (let i = 1; i <= Math.ceil(recipes / recipeForPage); i++) {
        page.push(i);
    }
    return (
        <nav className={style.nav}>
            <ul className={style.ul}>
                {page?.map((number) => {
                    return (
                        <li key={number}>
                            <span
                                className={style.span}
                                onClick={() => {
                                    paginado(number);
                                }}
                            >
                                {number}
                            </span>
                        </li>
                    );
                })}
            </ul>
        </nav>
    );
}