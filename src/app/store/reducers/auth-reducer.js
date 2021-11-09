import { LOG_IN, LOG_OUT,LOG_IN_SHOP } from "../types/auth-types"

const initialState = {
    id: "",
    isAuth: false,
    phone: "",
    isShop: false,
    isLoadAuthFromLs: true
}

const authReducer = (state = initialState, payload) => {
    switch (payload.type) {
        case LOG_IN:
            //save ls
            sessionStorage.setItem("user_infomation", JSON.stringify(payload.user));

            return { ...state, isAuth: true, ...payload.user, isLoadAuthFromLs: false }
        case LOG_IN_SHOP:
                //save ls
                sessionStorage.setItem("user_infomation", JSON.stringify(payload.user));
    
                return { ...state, isAuth: true, ...payload.user, isLoadAuthFromLs: false, isShop: true }
        case LOG_OUT:
            sessionStorage.removeItem("user_infomation");
            console.log("logout")

            return { ...state, isAuth: false, id: "", phone: "", isShop: false }
        default:
            return state
    }
}

export default authReducer
