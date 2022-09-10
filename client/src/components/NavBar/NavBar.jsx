import React, { useEffect } from "react";
import { Link } from "react-router-dom"
import Seachbar from "../Searchbar/Search"
import style from "./Navbar.module.css"

export default function Navbar() {
    const [show, setShow] = React.useState("")
    useEffect(() => {}, [show])
    return (
        <header className={style.container}>
            <p className={style.logo}>FoodBook PI</p>
            <Seachbar setShow = {setShow} />
            <Link to="/create"><button className={style.create}>Create Recipe!</button></Link>
        </header>
    )
}