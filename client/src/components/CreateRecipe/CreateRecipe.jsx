import { Link, useHistory } from "react-router-dom"
import React, {useEffect, useState} from "react"
import {getDiets, postRecipe} from "../../redux/actions";
import { useDispatch, useSelector } from "react-redux";

import style from "./CreateRecipe.module.css";

export default function CreateRecipe() {
    const dispatch = useDispatch()
    const history = useHistory()
    const diets = useSelector(state => state.diets)
    const errorServer= useSelector(state => state.errorServer)
    const [errors, setErrors] = useState({})
    const [ableToSubmit, setAbleToSubmit] = useState(true)
    const [input, setInput] = useState({
        name: "",
        summary:"",
        healthScore: 0,
        steps: "",
        image:"",
        diets: [],
    })
    //validacion de formulario
    function validate(input){
        let error = {}
        if(input.name.length > 2 && ( input.name.length < 3 || input.name.search(/[^{}*;@>!<]*$/g) !== 0)){
            error.name = "The name is required, must have more than 3 characters and cannot contain special characters"
        }
        if (input.summary.length > 2 && (!input.summary || input.summary.length<10)) {
            error.summary = "Summary is required and cannot contain less than ten characters"
        }
        if ((input.healthScore) < 0 || (input.healthScore) > 100 || isNaN(Number(input.healthScore))) {
            error.healthScore = "The health score must be a number between 0 and 100"
        }
        if (input.image.length && (input.image.slice(0, 4) !== "http" || input.image.slice(input.image.length -3 , input.image.length ) !== "jpg")) {
            error.image = "You must insert a valid image URL"
        }

        (!error.name && !error.summary && !error.healthScore) ? setAbleToSubmit(false) : setAbleToSubmit(true)

        return error;
    }

    const handleChange = (e) => {
        setInput({
            ...input,
            [e.target.name]: e.target.value
        })
        setErrors(validate({
            ...input,
            [e.target.name]: e.target.value
        }))
    }

    const handleCheck = (e) => {
        if (e.target.checked) {
            const existingDiets = input.diets.includes(e.target.name)
            if (!existingDiets) {
                setInput({
                    ...input,
                    diets: [...input.diets, e.target.name]
                })
            }
        } else if(!e.target.checked) {
            const deleteDiets = input.diets.filter(diet => diet !== e.target.name)
            setInput({
                ...input,
                diets: deleteDiets
            })
        }
    }

    const handleSubmit = (e) => {
        if(!input.name || !input.summary) {
            setInput({
                ...input
            })
            return alert("Name and summary are required")
        }
        if (Object.getOwnPropertyNames(errors).length === 0) {
            e.preventDefault()
            dispatch(postRecipe(input))
            setInput({
                name:"",
                summary:"",
                healthScore:0,
                steps: "",
                image: "",
                diets: []
            })
            alert("Recipe created successfully")
            history.push("/push")
        }
    }

    useEffect(() => {
        dispatch(getDiets())
    }, [dispatch])

    return (
        <div className={style.createContainer}>
            <div className={style.formContainer}>
                <div className={style.formHeader}>
                    <h1 className={style.formTitle}>Create your own recipe</h1>
                    <Link to='/home'><button className={style.button}>Go back</button></Link>
                </div>
                <form action="" className={style.form}>
                    <div className={style.inputBox}>
                        <label htmlFor="name">Name </label>
                        <input type="text" name="name" id="" onChange={e=>handleChange(e)} value={input.name}/>
                        {errors.name && ( <p className={style.errorText}>{errors.name}</p>)}
                    </div>
                    <div className={style.inputBox}>
                        <label htmlFor="summary">Summary </label>
                        <input type="text" name="summary" id="" onChange={e=>handleChange(e)} value={input.summary}/>
                        {errors.summary && (
                            <p className={style.errorText}>{errors.summary}</p>
                        )}
                    </div>
                    
                    <div className={style.inputBox}>
                        <label htmlFor="healthScore">HealthScore 0-100</label>
                        <input type="text" name="healthScore" id="" onChange={e=>handleChange(e)}  maxLength='15' value={input.healthScore}/>
                        {errors.healthScore && (
                            <p className={style.errorText} >{errors.healthScore}</p>
                        )}
                    </div>
                    <div className={style.inputBox}>
                        <label htmlFor="steps">Steps </label>
                        <input type="text" name="steps" id="" onChange={e=>handleChange(e)} value={input.steps}/>
                    </div>
                    <div className={style.inputBox}>
                        <label htmlFor="image">URL Image (jpg) </label>
                        <input type="text" name="image" id="" onChange={e=>handleChange(e)} value={input.image}/>
                        {errors.image && (
                            <p className={style.errorText} >{errors.image}</p>
                        )}
                    </div>
                    <div className={style.dietsBox}>
                        <label htmlFor="diets" className={style.dietTitle}>Diets </label>
                        <div className={style.dietContainer}>
                            {!errorServer ? (diets?.map(function(diet){
                                return(
                                    <div key={diet.id} className={style.dietItem}>
                                        <input type="checkbox" name={diet.name} onClick={e=>handleCheck(e)}></input>
                                        <label>{diet.name}</label>
                                    </div>
                                )
                            })): (<p className={style.errorText}>No diets found! Error: {errorServer}</p>)}
                        </div>
                    </div>       
                    <button className={!ableToSubmit ? style.buttonSubmit : style.buttonDisabled} disabled={ableToSubmit} type='submit' onClick={e=>handleSubmit(e)}>Create recipe</button>
                </form>
            </div>
        </div>
      )
}

