import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import colors from '../styles/colors';

import PlantSelection from '../screens/PlantSelection';
import MyPlants from '../screens/MyPlants';

import { MaterialIcons } from '@expo/vector-icons';

const AppTab = createBottomTabNavigator();

const authRoutes = () => {
  return (
    <AppTab.Navigator
      tabBarOptions={{
        activeTintColor: colors.green,
        inactiveTintColor: colors.heading,
        labelPosition: 'beside-icon',
        style: {
          paddingVertical: 20,
          height: 77
        }
      }}
    >

      <AppTab.Screen
        name='Nova planta'
        component={PlantSelection}
        options={{
          tabBarIcon: (({ size, color }) => (
            <MaterialIcons 
              name='add-circle-outline'
              size={size}
              color={color}
            />
          ))
        }}
      />

      <AppTab.Screen
        name='Minhas plantas'
        component={MyPlants}
        options={{
          tabBarIcon: (({ size, color }) => (
            <MaterialIcons 
              name='format-list-bulleted'
              size={size}
              color={color}
            />
          ))
        }}
      />

    </AppTab.Navigator>
  );
}

export default authRoutes