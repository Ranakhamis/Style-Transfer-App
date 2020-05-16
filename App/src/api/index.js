export const getRes = async (image, style, ipAdrr, port) => {
    try {
        const myHeaders = {
            "Content-Type": "application/json"
        }
        const splitImage = image.base64
        const raw = JSON.stringify({ 
            Base64Image: splitImage,
            style
        })
        console.log(style, splitImage.substring(0, 10));
        const requestOptions = {
            method: 'POST',
            redirect: 'follow',
            headers: myHeaders,
            body: raw
        }
        //const response = await fetch("http://192.168.0.6:5020/predict/mido", requestOptions)
        const requestInfo = "http://" + ipAdrr + ":" + port + "/predict/mido";
        const response = await fetch(requestInfo, requestOptions)
        const data = await response.json()
        console.log(data)
        return data
    } catch (err) {
        console.log("err", err)
    }
}