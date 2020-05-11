import PropTypes from 'prop-types';
import React, { Component } from 'react';
import styles from './SideMenu.style';
import { NavigationActions } from 'react-navigation';
import { ScrollView, Text, View } from 'react-native';
import HomeIcon from '@material-ui/icons/Home';
import { MaterialIcons } from '@expo/vector-icons';
import { SimpleLineIcons } from '@expo/vector-icons'; 

class SideMenu extends Component {
    navigateToScreen = (route) => () => {
        const navigateAction = NavigationActions.navigate({
            routeName: route
        });
        this.props.navigation.dispatch(navigateAction);
    }

    render() {
        return (
            <View style={styles.container}>

                <View>


                    <View style={{ flexDirection: "row" }}>
                    <MaterialIcons name='home' size={35} color="blue" style={styles.icon} onPress={this.navigateToScreen('Home')}/>
                        <Text style={styles.navItemStyle} onPress={this.navigateToScreen('Home')}>
                            Home
                            </Text>
                    </View>

                </View>
                <View>
                    <View style={{ flexDirection: "row" }}>
                    <SimpleLineIcons name="user" size={30} color="blue" style={styles.icon} onPress={this.navigateToScreen('Profile')}/>
                        <Text style={styles.navItemStyle} onPress={this.navigateToScreen('Profile')}>
                            Profile
                         </Text>    
                    </View>
                </View>

            </View>
        );
    }
}

SideMenu.propTypes = {
    navigation: PropTypes.object
};

export default SideMenu;