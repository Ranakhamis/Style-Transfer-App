import { createDrawerNavigator, DrawerItems } from 'react-navigation-drawer';
import { createAppContainer, ScrollView, contentComponent } from 'react-navigation';
import React, { useState } from 'react';
import { StyleSheet, View, Text, Image, TextInput, TouchableOpacity } from 'react-native';
import SideMenu from '../SideMenu/SideMenu';

// stacks
import HomeStack from './homeStack';
import ProfileStack from './profileStack';


// drawer navigation options
const RootDrawerNavigator = createDrawerNavigator({

  Home: {
    screen: HomeStack,
  },
  Profile: {
    screen:ProfileStack,
  },
},{
  contentComponent: SideMenu,
  //drawerWidth: 300
});


export default createAppContainer(RootDrawerNavigator);
