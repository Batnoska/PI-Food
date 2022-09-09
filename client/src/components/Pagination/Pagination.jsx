import React from "react";
import style from "./Pagination.module.css";

export default function Pagination({recipesPerPage, pagination, allRecipes, setIsActive, isActive, currentPage}) {
    const pageNumbers = [];
    for (let i = 1; i < Math.ceil(allRecipes/recipesPerPage); i++) {
        pageNumbers.push(i)
    }

    const handleClick = (number) => {
        pagination(number)
        setIsActive(number)
    }
    return(
        <div className={style.container}>
            <ul className={style.list}>
                {(currentPage> 1) && <li className={style.itemList} onClick={currentPage >1 ? () => handleClick(currentPage-1):null} >&lt;</li>}
                {pageNumbers?.map(number => {
                    return (
                        <li key={number} className={(isActive===number) ? style.active : style.itemList} onClick={() => handleClick(number)}>
                            {number}
                        </li>
                    )
                })}
                { (currentPage < (pageNumbers.length)) && <li className={style.itemList} onClick={currentPage < (pageNumbers.length) ? () => handleClick(currentPage+1):null}>&gt;</li>}
            </ul>
        </div>
    )
}