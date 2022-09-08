import {
    CLEAN_DIETS,
    CLEAN_RECIPE,
    FILTER_A_Z,
    FILTER_BY_NAME,
    FILTER_DIET,
    FILTER_SCORE,
    GET_DETAIL,
    GET_DIETS,
    GET_RECIPE,
    POST_RECIPE,
    CLEAN_DETAIL,
} from "./actions";

const initialState = {
    recipes: [],
    allRecipes: [],
    diets: [],
    details: [],
};

export default function rootReducer(state = initialState, action) {
    switch (action.type) {
        case GET_RECIPE:
            return {
                ...state,
                recipes: action.payload,
                allRecipes: action.payload
            };
        case CLEAN_RECIPE:
            return {
                ...state,
                recipes: action.payload,
            };
        case GET_DIETS:
            return {
                ...state,
                diets: action.payload,
            };
        case CLEAN_DIETS:
            return {
                ...state,
                diets: action.payload,
            };
        case CLEAN_DETAIL:
            return {
                ...state,
                details: action.payload,
            };
        case FILTER_DIET:
            let copyD = [...state.allRecipes];
            let tipoDieta =
                action.payload = "all"
                    ? copyD
                    : copyD.filter((e) => 
                            e.diets.some((e) => e.name === action.payload)
                    );
            if (tipoDieta.length <= 0) {
                tipoDieta = copyD;
                alert("There are no recipe of the indicated type");
            }
            return {
                ...state,
                recipes: tipoDieta,
            };
        case FILTER_A_Z:
            let copyAZ = [...state.allRecipes];
            let filterAZ =
                action.payload === "A-Z"
                    ? copyAZ.sort((a, b) => {
                        if (a.name > b.name) {
                            return 1;
                        }
                        if (b.name > a.name) {
                            return -1;
                        }
                        return 0
                    })
                    : copyAZ.sort((a, b) => {
                        if (a.name > b.name) {
                            return -1;
                        }
                        if (b.name > a.name) {
                            return 1
                        }
                        return 0;
                    });
                return {
                    ...state,
                    recipes: action.payload === "all" ? state.allRecipes : filterAZ,
                };
        case FILTER_SCORE:
            let copyS = [...state.allRecipes];
            let filterScore =
                action.payload === "min"
                    ? copyS.sort((a, b) => {
                        if (a.healthScore > b.healthScore) {
                            return 1;
                        }
                        if (b.healthScore > a.healthScore) {
                            return -1;
                        }
                        return 0;
                    })
                    : copyS.sort((a, b) => {
                        if (a.healthScore > b.healthScore) {
                            return -1;
                        }
                        if (b.healthScore > a.healthScore) {
                            return 1;
                        }
                        return 0;
                    });
            return {
                ...state,
                recipes: action.payload === "all" ? state.allRecipes : filterScore,
            };
        case FILTER_BY_NAME:
            return {
                ...state,
                recipes: action.payload,
            };
        case GET_DETAIL:
            return {
                ...state,
                details: action.payload,
            };
        case POST_RECIPE:
            return {
                ...state,
            };
        default:
            return { ...state };
    }
}