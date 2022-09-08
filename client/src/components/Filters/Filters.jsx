import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
    FilterAZ,
    FilterMaxScore,
    FilterTypeDiet,
    getDiets
} from "../../redux/actions";
import Search from "../Search/Search";
import style from "./Filters.module.css";

export default function Filters({ setCurrentPage, setOrder }) {
    const dispatch = useDispatch();
    const dieta = useSelector((state) => state.dieta);

    useEffect(() => {
        dispatch(getDiets());
    }, [dispatch]);

    function handleAZ(e) {
        e.preventDefault();
        dispatch(FilterAZ(e.target.value));
        setCurrentPage(1);
        setOrder(e.target.value);
    }

    function handleScore(e) {
        e.preventDefault();
        dispatch(FilterMaxScore(e.target.value));
        setCurrentPage(1);
        setOrder(e.target.value);
    }

    function handleTypeDiet(e) {
        e.preventDefault();
        dispatch(FilterTypeDiet(e.target.value));
        setCurrentPage(1);
    }

    return (
        <div className={style.flex}>
            <div>
                <Search />
            </div>
            <div>
                <label className={style.type}>Type of Diet</label>
                <select
                    onChange={(e) => handleTypeDiet(e)}
                    className={style.input}
                >
                    <option value="all">ALL</option>
                    {dieta?.map((e, k) => {
                        return (
                            <option key={k} value={e.name}>
                                {e.name}
                            </option>
                        );
                    })}
                </select>
            </div>
            <div>
                <label className={style.type}>Order</label>
                <select onChange={(e) => handleAZ(e)}>
                    <option value="all">ALL</option>
                    <option value="A-Z">A-Z</option>
                    <option value="Z-A">Z-A</option>
                </select>
            </div>
            <div>
                <label className={style.type}>Health Score</label>
                <select onChange={(e) => handleScore(e)}>
                    <option value="all">ALL</option>
                    <option value="max">Max</option>
                    <option value="min">Min</option>
                </select>
            </div>
        </div>
    );
}