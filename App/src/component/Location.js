import React, { useState, useEffect } from "react"
import MapView, { Marker } from "react-native-maps"
import * as Location from "expo-location"
import { StyleSheet, Text, View, Dimensions } from "react-native"

const MyLocation = () => {
    const [location, setLocation] = useState(null)
    const [errorMsg, setErrorMsg] = useState(null)

    useEffect(() => {
        (async () => {
            let { status } = await Location.requestPermissionsAsync()
            if (status !== "granted") {
                setErrorMsg("Permission to access location was denied")
            }

            let location = await Location.getCurrentPositionAsync({})
            setLocation(location)
        })()
    })

    return (
        <View style={styles.container}>
            <Text  style={{textAlign:"left",textDecorationLine:"underline",padding:10,color:"gray", fontWeight:"800"}}>Current Location</Text>
            {location ? <Text>{`Latitude: ${location.coords.latitude}\nLongitude: ${location.coords.longitude}`}</Text> : null}
            {errorMsg ? <Text>{errorMsg}</Text> : null}

            <MapView style={styles.mapStyle} >
                {
                    location && location.coords
                        ? <Marker
                            coordinate={location.coords}
                            title={"Current Location"} />
                        : null
                }
            </MapView>
        </View>
    )
}

export default MyLocation

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff",
        alignItems: "center",
        justifyContent: "center",
    },
    mapStyle: {
        width: 250,
        height: 250,
    },
})
