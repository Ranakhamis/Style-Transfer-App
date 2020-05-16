import React, { useState, useEffect } from "react"
import { KeyboardAvoidingView } from "react-native"

import { Input, Text, Button, AsyncStorage } from "react-native-elements"
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons"
import Feather from "react-native-vector-icons/Feather"
import { primary } from "../utils"

import { connect } from "react-redux"
import { signUp, signInWithCache } from "../redux/action"

const SignUp = ({ signUp, signInWithCache, error, auth, navigation }) => {
    const [SignUpForm, setSignUpForm] = useState({ name: "", email: "", password: "", error: "" })
    console.log("auth.refreshToken", auth.refreshToken)
    if (auth.refreshToken) {
        navigation.navigate("app")
    }
    useEffect(() => {
        (async () => {
            try {
                const cacheUser = await AsyncStorage.getItem("user")
                console.log(`user in cache: ${cacheUser}`)
                signInWithCache(cacheUser)
            } catch (err) {
                console.log("No user in cache")
            }
        })()
    }, [])
    return (
        <KeyboardAvoidingView behavior="padding" style={{ marginTop: 35, justifyContent: "center", alignItems: "center" }}>
            <Text h2>Sign Up</Text>
            <Input
                label="Username"
                value={SignUpForm.name}
                onChangeText={newText => setSignUpForm({ ...SignUpForm, name: newText })}
                inputStyle={{ paddingLeft: 10 }}
                containerStyle={{ margin: 10 }}
                placeholder="Enter your name here"
                leftIcon={<Feather name="user" size={24} color={primary} />}
            />
            <Input
                label="Email"
                value={SignUpForm.email}
                onChangeText={newText => setSignUpForm({ ...SignUpForm, email: newText })}
                inputStyle={{ paddingLeft: 10 }}
                containerStyle={{ margin: 10 }}
                placeholder="Enter your email here"
                autoCompleteType="email"
                leftIcon={<Feather name="mail" size={24} color={primary} />}
            />

            <Input
                label="Password"
                value={SignUpForm.password}
                onChangeText={newText => setSignUpForm({ ...SignUpForm, password: newText })}
                inputStyle={{ paddingLeft: 10 }}
                containerStyle={{ margin: 10 }}
                placeholder=" **********"
                leftIcon={<Feather name="lock" size={24} color={primary} />}
                secureTextEntry={true}
            />
            {error ? <Text style={{ color: "red", fontSize: 12 }}>{error}</Text> : null}
            
            <Button title="Sign Up" onPress={() => signUp(SignUpForm)} containerStyle={{ width: "95%", margin: 15 }} />
        </KeyboardAvoidingView>
    )
}

const mapStateToProps = ({ auth }) => ({
    error: auth.error,
    auth: auth,
    refreshToken: auth.refreshToken
})
const mapDispatchToProps = dispatch => ({
    signUp: user => dispatch(signUp(user)),
    signInWithCache: cacheUser => dispatch(signInWithCache(cacheUser))
})

export default connect(mapStateToProps, mapDispatchToProps)(SignUp)