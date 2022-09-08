import React, { useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import {
    getDetail,
    cleanDetail
} from "../../redux/actions";
import {useDispatch, useSelector} from "react-redux";
import Loading from "../Loading/Loading";
import style from "./Detail.module.css";

export default function Detail() {
    const dispatch = useDispatch();
    const detalles = useSelector((state) => state.details);
    const { id } = useParams();
    useEffect(() => {
        dispatch(getDetail(id));
    }, [dispatch, id]);

    function back() {
        dispatch(cleanDetail(dispatch));
    }

    return (
        <div className={style.fondo}>
            {detalles.length > 0 ? (
                <div className={style.div}>
                    <div>
                        <h2 className={style.sub}>
                            {detalles[0].name.toUpperCase()}
                        </h2>
                        <img
                            className={style.img}
                            src={detalles[0].image}
                            alt="img not found"
                            width={"250px"}
                            height={"250px"}
                        />
                        <h3>Diets:</h3>
                        {detalles[0].diets.length === 0 ? (
                            <p className={style.pasos}>There is no diet</p>
                        ): (
                            <p className={style.pasos}>
                                {detalles[0].diets.map((e) => e.name + ",")}
                            </p>
                        )}
                    </div>
                    <div>
                        <h3>Health Score: {detalles[0].heathScore}</h3>
                        <h3>Type of Dish:</h3>
                        <p className={style.pasos}>
                            {detalles[0].dishtypes.toString()}
                        </p>
                        <h4>Summary:</h4>
                        {detalles[0].summary.length === 0 ? (
                            <p className={style.parrafo}>There is no Summary</p>
                        ): (
                            <p className={style.parrafo}>
                                {detalles[0].summary.replace(/<[^>]*>/g, '')}
                            </p>
                        )}
                    </div>
                    <div className={style.steps}>
                        <h4>Steps:</h4>
                        {!detalles[0].steps ? (
                            <p className={style.pasos}>
                                There are no steps
                            </p>
                        ) : typeof detalles[0].steps === "object" && 
                          detalles[0].steps.length > 0 ? (
                            detalles[0].steps.map((e, k) => {
                                return (
                                    <p className={style.pasos2} key={k}>
                                        Paso N°{e.number}:{e.step}
                                        <br />
                                    </p>
                                );
                            })
                          ) : typeof detalles[0].steps === "object" &&
                          detalles[0].steps.length === 0 ? (
                            <p className={style.pasos}>
                                There are no steps
                            </p>
                          ) : (
                            <p className={style.otro}>
                                {detalles[0].steps}
                            </p>
                          )
                        }
                    </div>
                    <div>
                        <Link to={"/home"}>
                            <button
                                className={style.box}
                                onClick={() => back()}
                            >
                                Back to Home
                            </button>
                        </Link>
                    </div>
                </div>
            ) : (
                <div className={style.loading}>
                    <Loading />
                </div>
            )}
        </div>
    );
}