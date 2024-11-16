import React from "react";
import Home from "./PuzzelGame2/home";
import Gamepage from "./PuzzelGame2/gamepage";
import Levelpage from "./PuzzelGame2/levelpage";
import Winpage from "./PuzzelGame2/winpage";
import Losepage from "./PuzzelGame2/losepage";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from '@react-navigation/native-stack';
const Stack = createNativeStackNavigator();

export default function App()
{

  return(
    <NavigationContainer>
        <Stack.Navigator>
            <Stack.Screen name="home" component={Home} options={{headerShown:false}} ></Stack.Screen>
            <Stack.Screen name="game" component={Gamepage} options={{headerShown:false}}></Stack.Screen>
            <Stack.Screen name="level" component={Levelpage} options={{headerShown:false}}></Stack.Screen>
            <Stack.Screen name="win" component={Winpage} options={{headerShown:false}} ></Stack.Screen>
            <Stack.Screen name="lose" component={Losepage} options={{headerShown:false}} ></Stack.Screen>
        </Stack.Navigator>
    </NavigationContainer>
  )
}