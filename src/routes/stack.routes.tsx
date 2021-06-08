import React from "react";
import { createStackNavigator } from "@react-navigation/stack";

import Welcome from "../screens/Welcome";
import UserIdentification from "../screens/UserIdentification";
import Confirmation from "../screens/Confirmation";
import PlantSave from "../screens/PlantSave";

import colors from "../styles/colors";
import authRoutes from "./tab.routes";

const stackRoutes = createStackNavigator();

const AppRoutes: React.FC = () => ( // AppRoutes: React.FC diz que AppRoutes é um React Funcional Componente
  <stackRoutes.Navigator
    headerMode="none"
    screenOptions={{
      cardStyle: { 
        backgroundColor: colors.white
      }
    }}
  >

    <stackRoutes.Screen 
      name="Welcome"
      component={Welcome}
    />

    <stackRoutes.Screen 
      name="UserIdentification"
      component={UserIdentification}
    />

    <stackRoutes.Screen 
      name="Confirmation"
      component={Confirmation}
    />

    <stackRoutes.Screen 
      name="PlantSelection"
      component={authRoutes}
    />

    <stackRoutes.Screen 
      name="PlantSave"
      component={PlantSave}
    />

    <stackRoutes.Screen 
      name="MyPlants"
      component={authRoutes}
    />

  </stackRoutes.Navigator>
);  

export default AppRoutes;