import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import MapView from 'react-native-maps';

export default class App extends React.Component {
  render() {
    return (
      <View style={styles.container}>
         <MapView
    initialRegion={{
        latitude: 30.044281,
        longitude: 31.340002,
        
    }}
    style={{  // required style for map appearance
        position: "absolute", 
        top: 0, 
        bottom: 0, 
        right: 0, 
        left: 0
    }}
/>
      </View>
    );
  }
}
export default function App() {
  return (
    <View style={styles.container}>
     
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
