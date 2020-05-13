import { USER_SIGN_UP, USER_SIGN_IN, USER_SIGN_OUT, USER_AUTH_ERROR, USER_SIGN_IN_WITH_CACHE } from "./action"

const defaultAuth = { userName: "", email: "", error: "" }

export const authReducer = (state = defaultAuth, action) => {
    switch (action.type) {
        case USER_SIGN_UP:
            return { email: action.payload.email,password:action.payload.password, refreshToken: action.payload.refreshToken }
        case USER_SIGN_IN:
            return { email: action.payload.email,password:action.payload.password, refreshToken: action.payload.refreshToken }
        case USER_AUTH_ERROR:
            return { ...state, error: action.payload }
        case USER_SIGN_OUT:
            return defaultAuth
        case USER_SIGN_IN_WITH_CACHE:
            return { email: action.payload.email, refreshToken: action.payload.refreshToken }
        default:
            return state
    }
}