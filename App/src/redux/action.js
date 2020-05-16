// Auth Action
import firebase from "../config/index"
import { AsyncStorage } from "react-native"

export const USER_SIGN_UP = "USER_SIGN_UP"
export const USER_SIGN_IN = "USER_SIGN_IN"
export const USER_SIGN_IN_WITH_CACHE = "USER_SIGN_IN_WITH_CACHE"
export const USER_SIGN_OUT = "USER_SIGN_OUT"
export const USER_AUTH_ERROR = "USER_AUTH_ERROR"

export const signUp = signUpUser => async dispatch => {
    try {
        const { user } = await firebase.auth().createUserWithEmailAndPassword(signUpUser.email, signUpUser.password)
    const signedUpInUser = { email: signUpUser.email,password: signUpUser.password, refreshToken: user.refreshToken, name: signUpUser.name}

        await AsyncStorage.setItem("user", JSON.stringify(signedUpInUser))

        dispatch({ type: USER_SIGN_UP, payload: signedUpInUser })
    } catch (err) {

        dispatch({ type: USER_AUTH_ERROR, payload: err.message })
    }
}
export const signIn = signInUser => async dispatch => {
    try {
        const { user } = await firebase.auth().signInWithEmailAndPassword(signInUser.email, signInUser.password)
        const signedInUser = { email: user.email, password: signInUser.password, refreshToken: user.refreshToken }

        await AsyncStorage.setItem("user", JSON.stringify(signedInUser))

        dispatch({ type: USER_SIGN_IN, payload: signedInUser })
    } catch (err) {
        dispatch({ type: USER_AUTH_ERROR, payload: err.message })
    }
}
export const signInWithCache = user => async dispatch => {
    try {
        const userObj = JSON.parse(user)
        dispatch({ type: USER_SIGN_IN_WITH_CACHE, payload: userObj })
    } catch (err) {
        console.log("err", err)
    }
}
export const signOut = () => async dispatch => {
    try {
        await AsyncStorage.removeItem("user")
        await firebase.auth().signOut()
        dispatch({ type: USER_SIGN_OUT })
    } catch (err) {
        console.log("err", err)
    }
}