import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import HomeScreen from "./HomeScreen";
import Horario from "./Horario";
import Examen from "./Examen";

const StackNavigator = createStackNavigator();

const MainStack = () => {
  return (
    <StackNavigator.Navigator>
      <StackNavigator.Screen
        name="lxMeets"
        component={HomeScreen}
        initialParams={{ post: "si" }}
        options={{
          headerShown: false,
        }}
      />
      <StackNavigator.Screen
        name="Horario"
        component={Horario}
        options={{
          headerStyle: {
            backgroundColor: "black",
          },
          headerTintColor: "#fff",
        }}
      />
      <StackNavigator.Screen
        name="Examen"
        component={Examen}
        options={{
          headerStyle: {
            backgroundColor: "black",
          },
          headerTintColor: "#fff",
        }}
      />
    </StackNavigator.Navigator>
  );
};

// eslint-disable-next-line no-undef
const App = () => {
  return (
    <NavigationContainer>
      <MainStack />
    </NavigationContainer>
  );
};

export default App;
