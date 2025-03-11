import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { NavigationContainer } from "@react-navigation/native";
import { SingleProfileScreen } from '../screens/SingleProfile.screen';
import WeightLogsScreen from "../screens/WeightLogsScreen";
import VisitLogsScreen from "../screens/VisitLogsScreen";
import HealthLogsScreen from "../screens/HealthLogsScreen";

import Ionicons from '@expo/vector-icons/Ionicons';



const Tab = createBottomTabNavigator();



const TabNavigator = () => {
  return (
    <NavigationContainer>
      <Tab.Navigator
      >
        <Tab.Screen name="Home" component={SingleProfileScreen} />
        <Tab.Screen name="Weight History" component={WeightLogsScreen} />
        <Tab.Screen name="Health History" component={HealthLogsScreen} />
        <Tab.Screen name="VetVisits History" component={VisitLogsScreen} />

      </Tab.Navigator>
    </NavigationContainer>
  );
};
export default TabNavigator;