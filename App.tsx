import React from 'react'
import { Text } from 'react-native'
import { NavigationContainer } from '@react-navigation/native';
import 'react-native-gesture-handler';
import { Navigator } from './src/navigator/Navigator';

export const App = () => {
  return (
    <NavigationContainer>
      <Navigator/>
    </NavigationContainer>
  )
}

export default App;