import React, { useEffect, useState } from 'react'
import { ScrollView, View, AsyncStorage, Image } from 'react-native'
import { Button, Input } from "react-native-elements"
import { connect } from "react-redux"
import { signOut } from "../redux/action"
import Notification from "../component/Notification"
import Feather from "react-native-vector-icons/Feather"
import { primary } from "../utils"
import Location from "../component/Location"
const Settings = ({ auth, signOut, navigation }) => {
    const [user, setUser] = useState({ age: "", id: "", name: "", age: "" })

    useEffect(() => {
        (async () => {
            try {
                const user = await AsyncStorage.getItem("user")
                console.log("user", user)
                const userObj = await JSON.parse(user)
                setUser(userObj)
            } catch {

            }
        })()
    }, [])

    const handleSignOut = () => {
        signOut()
        navigation.navigate("auth")
    }
    const handleSave = async () => {
        await AsyncStorage.removeItem("user")
        await AsyncStorage.setItem("user", JSON.stringify(user))

    }
    return (
        <ScrollView style={{ margin: 15 }}>
            <View style={{flex:1, alignItems:"center"}}>
                <Image style={{
                    width: 100,
                    height: 120,
                    marginLeft: 5,
                    marginTop: 0,
                }
                }
                    source={require('../../assets/profile-1.png')} />
            </View>
            <Input 
                containerStyle={{ padding: 15 }}
                label="Username"
                value={user.name}
                onChangeText={newText => setUser({ ...user, name: newText })}
                inputStyle={{ paddingLeft: 10 }}
                containerStyle={{ margin: 10 }}
                leftIcon={<Feather name="user" size={24} color={primary} />}
            />

            <Input
                containerStyle={{ padding: 15 }}
                label="Email"
                value={user.email}
                onChangeText={newText => setUser({ ...user, email: newText })}
                inputStyle={{ paddingLeft: 10 }}
                containerStyle={{ margin: 10 }}
                leftIcon={<Feather name="mail" size={24} color={primary} />}
            />

            <Input
                containerStyle={{ padding: 15 }}
                label="Password"
                value={user.password}
                onChangeText={newText => setUser({ ...user, email: newText })}
                inputStyle={{ paddingLeft: 10 }}
                containerStyle={{ margin: 10 }}
                leftIcon={<Feather name="lock" size={24} color={primary} />}
            />

            <Location style={{ marginTop: 5, marginBottom: 5 }} />

            <Button containerStyle={{ padding: 15 }} title="Save Changes" onPress={handleSave} />

            <Button containerStyle={{ padding: 15 }} title="Sign out" onPress={handleSignOut} />
            <Notification />
        </ScrollView>
    )
}

const mapStateToProps = ({ auth }) => ({
    error: auth.error,
    auth: auth
})
const mapDispatchToProps = dispatch => ({
    signOut: () => dispatch(signOut())
})
export default connect(mapStateToProps, mapDispatchToProps)(Settings)