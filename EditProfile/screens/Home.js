import React, { useState } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, FlatList } from 'react-native';
import { globalStyles } from '../styles/global';
import SafeAreaView from 'react-native-safe-area-view';

export default function Home({ navigation }) {

    return (
        <SafeAreaView>
            <View style={globalStyles.container}>
                <Text> Main Application</Text>
            </View>
        </SafeAreaView>

    );
}