import React, { useState, useEffect } from "react"
import { Text, View, ScrollView } from "react-native"
import { Button, Image } from "react-native-elements"
import { Camera } from "expo-camera"
import Feather from 'react-native-vector-icons/Feather';
import { getRes } from "../api"
import Reader from "./Speech"

const MyCamera = () => {
  const [camera, setCamera] = useState(null)
  const [hasPermission, setHasPermission] = useState(null)
  const [image, setImage] = useState(null)
  const [type, setType] = useState(Camera.Constants.Type.back)
  const [reader, setReader] = useState("")

  useEffect(() => {
    (async () => {
      const { status } = await Camera.requestPermissionsAsync()
      setHasPermission(status === "granted")
    })()
  }, [])

  const handleChangeCamera = () => setType(type === Camera.Constants.Type.back ? Camera.Constants.Type.front : Camera.Constants.Type.back)

  const handleTakePhoto = async () => {
    let image = await camera.takePictureAsync({
      quality: 1.0,
      base64: true
    })
    setImage(image)
    const res = await getRes(image)
    console.log("res", res)
    setReader(res)
  }
  if (hasPermission === null) {
    return <View />
  }
  if (hasPermission === false) {
    return <Text>No access to camera</Text>
  }
  return (
    <View style={{ flex: 1 }}>
      <Camera style={{ flex: 1 }} autoFocus={true} type={type} ratio="1:1" ref={camera => setCamera(camera)}>
        <View style={{ flex: 1, backgroundColor: "transparent", justifyContent: "flex-end", alignItems: "flex-end" }}>
          <Button onPress={handleChangeCamera} icon={<Feather name='rotate-cw' size={24} color={"white"} />} />
          <Button onPress={handleTakePhoto} icon={<Feather name='camera' size={24} color={"white"} />} />
        </View>
      </Camera>

      <ScrollView style={{ flex: 1 }}>
        <Text>{reader}</Text>
        <Reader text={reader} />
        <Image
          style={{ width: 200, margin: 150 }}
          source={{ uri: image?.uri }}
        />
      </ScrollView>
    </View >
  )
}

export default MyCamera