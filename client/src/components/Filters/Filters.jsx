import React, { useState } from "react";
import { filterOrigin, filterRecipes, getRecipes, resetRecipes, sortRecipes } from "../../redux/actions";
import style from "./Filters.module.css";
import { useDispatch } from "react-redux"

export default function Filters({ setCurrentPage, setOrder, diets, setIsActive }) {
    const dispatch = useDispatch()
    const [filter, setFilter] = useState("")
    const [sort, setSort] = useState("")
    const [filterO, setFilterO] = useState("")
    function handleFilterDiet(e) {
        e.preventDefault()
        dispatch(filterRecipes(e.target.value))
        setCurrentPage(1)
        setIsActive(1)
        setFilter(e.target.value)
    }

    function handleSort(e) {
        e.preventDefault()
        dispatch(sortRecipes(e.target.value))
        setCurrentPage(1)
        setIsActive(1)
        setOrder("Order" + e.target.value)
        setSort(e.target.value)
    }

    function handleFilterOrigin(e) {
        e.preventDefault()
        setFilter(e.target.value)
        dispatch(filterOrigin(e.target.value))
        setCurrentPage(1)
        setIsActive(1)
    }

    function handleClick(e) {
        e.preventDefault()
        dispatch(resetRecipes())
        dispatch(getRecipes())
        setIsActive(1)
        setOrder("")
        setSort("")
        setFilter("")
        setFilterO("")
    }

    return (
        <div className={style.container}>
            <button onClick={e => handleClick(e)} className={style.button}>Clear Filters</button>
            <select name="" id="" value={sort} className={style.filter} onChange={e => handleSort(e)}>
                <option hidden> Sort Recipes</option>
                <option value="asc">Ascendant A-Z</option>
                <option value="desc">Descendant Z-A</option>
                <option value="ascH">Ascendant by Health Score</option>
                <option value="descH">Descendant by Health Score</option>
            </select>
            <select name="" id="" className={style.filter} value={filter} onChange={e=> handleFilterDiet(e)}>
                <option hidden> Filter by Diet </option>
                <option value="default">All</option>
                {diets.length > 0 && diets.map((diet) => {return <option key = {diet.id} value={diet.name}>{diet.name}</option>})}
            </select>
            <select value={filterO} onChange={e=> handleFilterOrigin(e)} className={style.filter}>
                <option hidden> Filter By Origin</option>
                <option value= "default">All</option>
                <option value="db">Created</option>
            </select>
        </div>
    )
}