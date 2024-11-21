import React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'
import Login from './Login';
import Cadastro from './Cadastro';

const Stack = createStackNavigator();


const App = () => {
  return (
    <NavigationContainer>
    <Stack.Navigator initialRouteName='Login'>
        <Stack.Screen name='Cadastro' component={Cadastro} />
        <Stack.Screen name='Login' component={Login} />
    </Stack.Navigator>
    </NavigationContainer>
    )

}

export default App