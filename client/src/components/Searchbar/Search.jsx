import React, {useState} from "react";
import style from "./Search.module.css";
import { searchByName } from "../../redux/actions";
import { useDispatch } from "react-redux"

export default function Searchbar({setShow}) {
    const dispatch = useDispatch()
    const [recipe, setRecipe] = useState("")

    function handleInputChange(e) {
        e.preventDefault()
        setRecipe(e.target.value)
    }
    function handleSubmit(e) {
        e.preventDefault()
        dispatch(searchByName(recipe))
        setRecipe("")
        setShow("cargado")
    }
    function reset() {
        setShow("cargado")
    }

    return (
        <form className={style.container} onSubmit={e => handleSubmit(e)}>
            <input type="text" className={style.input} value={recipe} placeholder="Search..." onChange={e=> handleInputChange(e)} />
            <button type="submit" className={style.button} onClick={reset}>Search</button>
        </form>
    )
}