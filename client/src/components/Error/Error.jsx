import React from "react";
import error from "../../images/error.jpg";
import style from "./Error.module.css";

export default function Error() {
    function reset() {
        window.location.reload();
    }

    return (
        <div>
            <div className={style.error}>
                <img className={style.image} src={error} alt="img not found" />
                <button className={style.box} onClick={() => reset()}>
                    Back
                </button>
            </div>
        </div>
    );
}