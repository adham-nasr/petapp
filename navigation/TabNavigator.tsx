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
        <Tab.Screen name="Home" component={SingleProfileScreen} options={{
        tabBarIcon: ({ focused, color, size }) => (
          <Ionicons
            name={focused ? 'home' : 'home-outline'}
            size={size}
            color={color}
          />),
        }}/>
        <Tab.Screen name="Weight History" component={WeightLogsScreen} options={{
        tabBarIcon: ({ focused, color, size }) => (
          <Ionicons
            name={focused ? 'analytics' : 'analytics-outline'}
            size={size}
            color={"crimson"}
          />),
        }}/>
        <Tab.Screen name="Health History" component={HealthLogsScreen} options={{
        tabBarIcon: ({ focused, color, size }) => (
          <Ionicons
            name={focused ? 'heart' : 'heart-outline'}
            size={size}
            color="#40DD40"
          />),
        }}/>
        <Tab.Screen name="VetVisits History" component={VisitLogsScreen} options={{
        tabBarIcon: ({ focused, color, size }) => (
          <Ionicons
            name={focused ? 'car' : 'car-outline'}
            size={size}
            color={"black"}
          />),
        }}/>

      </Tab.Navigator>
    </NavigationContainer>
  );
};
export default TabNavigator;