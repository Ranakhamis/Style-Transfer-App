import React, { useState, useEffect } from "react"
import { Button, Image, Text, View, Picker, ScrollView } from "react-native"
import * as ImagePicker from "expo-image-picker"
import Constants from "expo-constants"
import * as Permissions from "expo-permissions"
import * as ImageManipulator from "expo-image-manipulator"
import { getRes } from "../api"
import imageAfter from "/home/mohamed/stylrTrans/CBSD_Assignment/Project/Mobile App/assets/result.jpeg"
import { black } from "color-name";


const ImagePickerExample = () => {
    const [image, setImage] = useState(null)
    const [result, setResult] = useState(null)
    const [selectedValue, setSelectedValue] = useState("style1");

    const _pickImage = async () => {
        try {
            let result = await ImagePicker.launchImageLibraryAsync({
                mediaTypes: ImagePicker.MediaTypeOptions.All,
                allowsEditing: true,
                aspect: [4, 3],
                quality: 1,
            })
            if (!result.cancelled) {
                setImage(result)
                return result
            }
            console.log(result)
        } catch (E) {
            console.log(E)
        }
    }
    const getPermissionAsync = async () => {
        if (Constants.platform.ios) {
            const { status } = await Permissions.askAsync(Permissions.CAMERA_ROLL)
            if (status !== "granted") {
                alert("Sorry, we need camera roll permissions to make this work!")
            }
        }
    }
    const getResult = async () => {
        const uploadedImage = await _pickImage()
        let image = await ImageManipulator.manipulateAsync(
            uploadedImage.uri, [{ resize: { width: 640, height: 640 } }], { base64: true }
        )
        const res = await getRes(image, selectedValue, "192.168.0.6", "5020")

        //{result ? <Image source={{ uri: result}} style={{ width: 200, height: 200 }} /> : null}
        setResult(res)
    }

    useEffect(() => {
        getPermissionAsync()
    })

    return (
        <ScrollView contentContainerStyle={{ flex: 1, alignItems: "center", justifyContent: "space-around" }}>
            <View style={{ direction: "row" }}>
                <View>
                    {image ? <Text>Before</Text> : null}
                    {image ? <Image source={{ uri: image.uri }} style={{ width: 200, height: 200 }} /> : null}
                </View>
                <View>
                    {result ? <Text>After</Text> : null}
                    {result ? <Image source={require('../../assets/result.jpeg')} style={{ width: 200, height: 200 }} /> : null}
                </View>
            </View>


            <Button color="black" title="Upload image from your Gallery" onPress={getResult} />

            <Picker
                selectedValue={selectedValue}
                style={{ height: 50, width: 150 }}
                onValueChange={itemValue => setSelectedValue(itemValue)}
            >
                <Picker.Item label="mosaic" value="mosaic" />
                <Picker.Item label="cuphead" value="cuphead" />
                <Picker.Item label="starry night" value="starry night" />
            </Picker>
        </ScrollView>
    )
}

export default ImagePickerExample