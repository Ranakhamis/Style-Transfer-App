import React, { useState, useEffect } from 'react'
import { KeyboardAvoidingView, AsyncStorage } from 'react-native'
import { Input, Text, Button } from "react-native-elements"
import Feather from "react-native-vector-icons/Feather"
import { primary } from "../utils"
import { connect } from "react-redux"
import { signIn, signInWithCache } from "../redux/action"

const SignIn = ({ refreshToken, error, signIn, signInWithCache, navigation }) => {
    const [signInForm, setSignInForm] = useState({ email: "", password: "", error: "" })

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
    })

    if (refreshToken) {
        return navigation.navigate("app")
    }
    return (
        <KeyboardAvoidingView behavior="padding" style={{ marginTop: 35, alignItems: "center" }}>
            <Text h2>Sign In</Text>
            <Input
                label="Email"
                value={signInForm.email}
                onChangeText={newText => setSignInForm({ ...signInForm, email: newText })}
                inputStyle={{ paddingLeft: 10 }}
                containerStyle={{ margin: 10 }}
                placeholder='Enter your email here'
                autoCompleteType="email"
                leftIcon={<Feather name="user" size={24} color={primary} />}
            />
            <Input
                label="Password"
                value={signInForm.password}
                onChangeText={newText => setSignInForm({ ...signInForm, password: newText })}
                inputStyle={{ paddingLeft: 10 }}
                containerStyle={{ margin: 10 }}
                placeholder=' **********'
                leftIcon={<Feather name="lock" size={24} color={primary} />}
                secureTextEntry={true}
            />
            {error ? <Text>{error}</Text> : null}
            <Button title="Sign In" containerStyle={{ width: "95%", margin: 15 }} onPress={() => signIn(signInForm)} />
        </KeyboardAvoidingView>
    )
}

const mapStateToProps = ({ auth }) => ({
    error: auth.error,
    refreshToken: auth.refreshToken
})
const mapDispatchToProps = dispatch => ({
    signIn: user => dispatch(signIn(user)),
    signInWithCache: cacheUser => dispatch(signInWithCache(cacheUser))
})

export default connect(mapStateToProps, mapDispatchToProps)(SignIn)