import React from 'react';
import { StyleSheet, View, Text, Image, TextInput, TouchableOpacity } from 'react-native';
import { globalStyles } from '../styles/global';
import SafeAreaView from 'react-native-safe-area-view';

export default function About() {
    return (
        <SafeAreaView>
            <View style={globalStyles.container}>
                <Text style={{fontWeight:'bold', fontSize:30, marginLeft:80, marginTop:-30}}>Your Profile</Text>
            </View>
            <View style={{ flexDirection: "row" }}>
                <View>
                    <Image style={styles.ImageStyle}
                        source={require('../assets/profile-1.png')} />
                </View>
                <Text style={{ marginLeft: 18, marginTop: 10, color: 'darkgrey', fontSize: 22, fontWeight:'bold' }}>Username</Text>

            </View>
            <TextInput style={{
                width: 260,
                marginLeft: 120,
                marginTop:-80,
                paddingHorizontal: 8,
                paddingVertical: 6,
                borderBottomWidth: 1,
                borderBottomColor: '#ddd',
            }}></TextInput>
            <Text style={{ marginTop: 15, marginLeft: 122, color: 'darkgrey', fontSize: 22, fontWeight:'bold' }}>Email</Text>
            <TextInput style={styles.TextInput}></TextInput>
            <Text style={{ marginTop: 15, marginLeft: 122, color: 'darkgrey', fontSize: 22, fontWeight:'bold' }}>Password</Text>
            <TextInput secureTextEntry={true} style={styles.TextInput}></TextInput>
            <TouchableOpacity style={styles.buttonStyle}>
                <Text style={{ color: 'white', fontSize: 22 }}>Save Changes </Text>
            </TouchableOpacity>
        </SafeAreaView>
    );
}
const styles = StyleSheet.create({
    ImageStyle: {
        width: 100,
        height: 120,
        marginLeft: 5,
        marginTop: 0,
    },
    TextInput:
    {
        width: 260,
        marginLeft: 120,
        marginTop:0,
        paddingHorizontal: 8,
        paddingVertical: 6,
        borderBottomWidth: 1,
        borderBottomColor: '#ddd',
    },
    buttonStyle: {
        backgroundColor: "mediumblue",
        marginTop: 80,
        marginLeft: 10,
        height: 55,
        borderRadius: 5,
        alignItems: "center",
        justifyContent: "center",
        width: 385,
    },
});