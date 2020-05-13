import React, {useEffect} from "react"
import Navigation from "./src/navigation"
import { Provider } from "react-redux"
import store from "./src/redux/store"
import {handleNotificationButton} from "./src/component/Notification"
console.disableYellowBox = true;

const App = () => {
    useEffect(()=>{
        handleNotificationButton("Hello", "Always remember to apply styles on your photos")
    }, [])
    return (
        <Provider store={store}>
            <Navigation />
        </Provider>
    )
}

export default App