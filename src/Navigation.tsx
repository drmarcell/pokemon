import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Home from './containers/Home';
import Profile from './containers/Profile';
import { StackParamList } from './helpers/types';

const Stack = createNativeStackNavigator<StackParamList>();

const Navigation = (): JSX.Element => {
  return (
    <Stack.Navigator>
      <Stack.Group
        screenOptions={{
          headerStyle: { backgroundColor: '#CC3C3B' },
          headerTitleStyle: { color: 'white', fontWeight: 'bold' },
          headerBackTitle: 'Back',
          headerTintColor: 'white',
        }}>
        <Stack.Screen
          name="Home"
          component={Home}
          options={{ headerShown: true, title: 'Pokemons' }}
        />
        <Stack.Screen
          name="Profile"
          component={Profile}
          options={{ headerShown: true, title: 'Pokemon Profile' }}
        />
      </Stack.Group>
    </Stack.Navigator>
  );
};

export default Navigation;
