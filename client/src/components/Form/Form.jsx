import React, { useEffect, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { postRecipe, getDiets} from "../../redux/actions";
import style from "./Form.module.css";

export default function Creation() {
    const dispatch = useDispatch();
    const dieta = useSelector((state) => state.diets);
    const [errors, setError] = useState({});
    const [input, setInput] = useState({
        name: "",
        image: "",
        summary: "",
        healthScore: "",
        dishtypes: "",
        steps: "",
        diets: [],
    });
    const history = useHistory();
    useEffect(() => {
        dispatch(getDiets());
    }, [dispatch]);

    function validate() {
        let errors = {};
        if (!input.name || input.name.length < 3) {
            errors.name = "Longer Name is Required";
        }
        if (input.summary.length < 20) {
            errors.summary = "Summary min. 20 characters";
        }
        if (input.healthScore < 0 || input.healthScore > 100) {
            errors.healthScore = "Health Score can't surpass 100";
        }
        if (!input.dishtypes) {
            errors.dishtypes = "Type of dish is empty"
        }
        if (!input.image.includes("https")) {
            errors.image = "Please insert a valid image URL"
        }
        if (input.steps.length < 60) {
            errors.steps = "Steps min. is 60 characters"
        }
        return errors;
    }

    function handleChange(e) {
        setInput({
            ...input,
            [e.target.name]: e.target.value,
        });
        setError(
            validate({
                ...input,
                [e.target.name]: e.target.value,
            })
        );
    }
    function handleSelect(e) {
        setInput({
            ...input,
            diets: [...input.diets, e.target.value],
        });
    }

    function handleDelect(e) {
        setInput({
            ...input,
            diets: input.diets.filter((dieta) => dieta !== e)
        });
    }

    function handleSubmit(e) {
        e.preventDefault();
        if (
            !input.name ||
            !input.image ||
            !input.summary ||
            !input.healthScore ||
            !input.dishtypes ||
            !input.steps ||
            !input.diets
        ) {
            alert("Some options are empty");
        } else {
            dispatch(postRecipe(input));
            setInput({
                name: "",
                image: "",
                summary: "",
                healthScore: "",
                dishtypes: "",
                steps: "",
                diets: [],
            });
            history.push("/home");
            window.location.reload()
        }
    }
    return (
        <div className={style.fondo}>
            <div>
                <Link to={"/home"}>
                    <button className={style.box}>Back to Home</button>
                </Link>
            </div>
            <h2 className={style.h2}>Create your recipe!</h2>
            <form onSubmit={(e) => handleSubmit(e)} className={style.fondoform}>
                <button type="submit" className={style.boxes}>
                    Create
                </button>
                <div>
                    <div className={style.primero}>
                        <label className={style.definicion}>NAME:</label>
                        <input 
                            className={style.inputt}
                            type="text"
                            value={input.name}
                            placeholder="Name..."
                            name="name"
                            onChange={(e) => handleChange(e)}
                        />
                        {errors.name && (
                            <p className={style.error}>{errors.name}</p>
                        )}
                    </div>
                    <div className={style.primero}>
                        <label className={style.definicion}>Image:</label>
                        <input
                            className={style.inputt}
                            type="text"
                            name="image"
                            value={input.image}
                            placeholder="Insert a valid image URL..."
                            onChange={(e) => handleChange(e)}
                        />
                        {errors.image && (
                            <p className={style.error}>{errors.image}</p>
                        )}
                    </div>
                    <div className={style.primero}>
                        <label className={style.definicion}>
                            Health Score:
                        </label>
                        <input
                            className={style.inputt}
                            type="number"
                            name="healthScore"
                            value={input.healthScore}
                            min="0"
                            max={"100"}
                            onChange={(e) => handleChange(e)}
                        />
                        {errors.healthScore && (
                            <p className={style.error}>{errors.healthScore}</p>
                        )}
                    </div>
                    <div className={style.primero}>
                        <label className={style.definicion}>
                            Type Of Dish:
                        </label>
                        <input
                            type="text"
                            className={style.inputt}
                            value={input.dishtypes}
                            name="dishtypes"
                            placeholder="Dish Types..."
                            onChange={(e) => handleChange(e)}
                        />
                        {errors.dishtypes && (
                            <p className={style.error}>{errors.dishtypes}</p>
                        )}
                    </div>
                </div>
                <div>
                    <div className={style.primero}>
                        <label className={style.definicion}>
                            Steps:
                        </label>
                        <textarea
                            className={style.inputl}
                            value={input.steps}
                            placeholder="Steps..."
                            name="steps"
                            onChange={(e) => handleChange(e)}
                        />
                        {errors.steps && (
                            <p className={style.error}>{errors.steps}</p>
                        )}
                    </div>
                    <div className={style.primero}>
                        <label className={style.definicion}>Summary:</label>
                        <textarea
                            value={input.summary}
                            onChange={(e) => handleChange(e)}
                            placeholder="Summary..."
                            name="summary"
                            className={style.inputl}
                        />
                        {errors.summary && (
                            <p className={style.error}>{errors.summary}</p>
                        )}
                    </div>
                    <div className={style.definicion2}>
                        <label>Diets:</label>
                        <select
                            onChange={(e) => handleSelect(e)}
                            className={style.select}
                        >
                            <option>Type of Diets</option>
                            {dieta?.map((e, k) => {
                                return (
                                    <option key={k} value={e.name}>
                                        {e.name}
                                    </option>
                                );
                            })}
                        </select>
                    </div>
                </div>
            </form>
            {input.diets?.map((e) => {
                return (
                    <div key={e} className={style.boxis}>
                        <p className={style.letra}>{e}</p>
                        <button
                            className={style.btnDelect}
                            onClick={() => handleDelect(e)}
                        >
                            X
                        </button>
                    </div>
                );
            })}
        </div>
    )
}