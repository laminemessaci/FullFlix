import React from 'react';
import {View, Text} from 'react-native';

import {createNativeStackNavigator} from '@react-navigation/native-stack';
import HomeScreen from '../screens/HomeScreen';

import {NavigationContainer} from '@react-navigation/native';
import CastList from '../screens/CastList';
import DetailScreen from '../screens/DetailScreen';

const Stack = createNativeStackNavigator();

const StackNavigator = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerStyle: {
            backgroundColor: 'grey',
          },
          headerTintColor: 'white',
          headerBackTitle: 'Back',
        }}>
        <Stack.Screen
          name="ScreenHome"
          component={HomeScreen}
          options={{headerShown: false}}
        />

        <Stack.Screen
          name="CastList"
          component={CastList}
          options={{
            headerShown: true,
            title: 'List casting',
          }}
        />

        <Stack.Screen
          name="FilmDetails"
          component={DetailScreen}
          options={{
            headerShown: true,
            title: 'Détails du film',
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default StackNavigator;
