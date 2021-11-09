import { LOG_IN, LOG_OUT, LOG_IN_SHOP } from "../types/auth-types"

export const logIn = (user) => dispatch => {
    dispatch({
        type: LOG_IN,
        user
    })
}
export const logInAdmin = (user) => dispatch => {
    dispatch({
        type: LOG_IN_SHOP,
        user
    })
}

export const logOut = () => dispatch => {
    dispatch({
        type: LOG_OUT
    })
}