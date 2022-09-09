import { Link } from "react-router-dom"
import React from "react"
import style from "./Card.module.css";

export default function Card({ id, name, image, healthScore, diets, glutenFree, vegetarian, vegan, dairyFree}) {
    return (
        <div className={style.container}>
            <div className={style.image}>
                <img src={image} alt={name} />
            </div>
            <div className={style.description}>
                <p className={style.title}>{name}</p>
                <p className={style.healthScore}>Health Score: {healthScore}</p>
                <div className={style.diet}>
                    {diets?.map(diet => {
                        return (
                            <p key={diet}>{diet}</p>
                        )
                    })}
                    {glutenFree && !diets.includes("gluten free") && <p>Gluten Free</p>}
                    {vegan && !diets.includes("vegan") && <p>Vegan</p>}
                    {vegetarian && !diets.includes("vegetarian") && <p>Vegetarian</p>}
                    {dairyFree && !diets.includes("dairy free") && <p>Dairy Free</p>}
                </div>
                <Link to={`/recipes/${id}`} key = {id}>
                    <button className={style.button}>Recipe Detail</button>
                </Link>
            </div>
        </div>
    )
}