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
            <Stack.Screen name="home" component={Home} ></Stack.Screen>
            <Stack.Screen name="game" component={Gamepage} ></Stack.Screen>
            <Stack.Screen name="level" component={Levelpage} ></Stack.Screen>
            <Stack.Screen name="win" component={Winpage}  ></Stack.Screen>
            <Stack.Screen name="lose" component={Losepage}  ></Stack.Screen>
        </Stack.Navigator>
    </NavigationContainer>
  )
}
// options={{headerShown:false}} 