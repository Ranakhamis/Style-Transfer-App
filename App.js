import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import MapView ,{Marker} from 'react-native-maps';
import { recoveredProps } from 'expo-error-recovery';
import * as Permissions from 'expo-permissions';



export default class App extends React.Component {

  constructor (Props){
    super(Props);
    this.state = {
      latitude :0,
      longitude:0,
      error: null,

    }
  } 
  
  componentDidMount(){
    navigator.geolocation.getCurrentPosition(position=> {
      this.setState({
        latitude : position.coords.latitude,
        longitude: position.coords.longitude,
        error: null,
      });
    }, error=> this.setState({error: error.message}),
      {enableHighAccuracy : true, 
      timeout: 2000, maximumAge: 2000} 
    );
  }

  render() {
    return (
      <View style={styles.container}>
         <MapView
    initialRegion={{
        latitude: 30.044281,
        longitude: 31.340002,
        latitudeDelta: 0.195,
        longitudeDelta: 0.2,
        //cairo
    }}
    style={{  // required style for map appearance
        position: "absolute", 
        top: 0, 
        bottom: 0, 
        right: 0, 
        left: 0,
    }}
/>
    <Marker coordinate={this.state} title={Marker.title}description={Marker.description}
/>    
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
