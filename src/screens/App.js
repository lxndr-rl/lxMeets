import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import Main from './HomeScreen';
import Details from './Details';
import Examen from './Examen';
import Notas from './Notas';
import NotasView from './NotasView';
import linking from '../assets/linking';

const StackNavigator = createStackNavigator();

const MainStack = () => {
  return (
    <StackNavigator.Navigator>
      <StackNavigator.Screen
        name="Main"
        component={Main}
        initialParams={{post: 'si'}}
        options={{
          headerShown: false,
        }}
      />
      <StackNavigator.Screen
        name="Horario"
        component={Details}
        options={{
          headerStyle: {
            backgroundColor: 'black',
          },
          headerTintColor: '#fff',
        }}
      />
      <StackNavigator.Screen
        name="Notas"
        component={Notas}
        options={{
          headerStyle: {
            backgroundColor: 'black',
          },
          headerTintColor: '#fff',
        }}
      />
      <StackNavigator.Screen
        name="Examen"
        component={Examen}
        options={{
          headerStyle: {
            backgroundColor: 'black',
          },
          headerTintColor: '#fff',
        }}
      />
      <StackNavigator.Screen
        name="Vista de Notas"
        component={NotasView}
        options={{
          headerStyle: {
            backgroundColor: 'black',
          },
          headerTintColor: '#fff',
        }}
      />
    </StackNavigator.Navigator>
  );
};

// eslint-disable-next-line no-undef
export default App = () => {
  return (
    <NavigationContainer linking={linking}>
      <MainStack />
    </NavigationContainer>
  );
};
