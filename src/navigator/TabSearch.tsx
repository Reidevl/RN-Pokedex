import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { PokemonScreen } from "../screens/PokemonScreen";
import { SearchScreen } from "../screens/SearchScreen";
import { SimplePokemon } from "../interface/pokemon.interface";

export type RootStackParams = {
    HomeScreen: undefined;
    PokemonScreen: { simplePokemon: SimplePokemon, color: string };
} 
  
const TabSearch = createStackNavigator<RootStackParams>();

export const TabNavigator = () => {
  return (
    <TabSearch.Navigator
      screenOptions={{
        headerShown: false,
        cardStyle: {
          backgroundColor: 'white'
        }
      }}
    >
      <TabSearch.Screen name="HomeScreen" component={ SearchScreen } />
      <TabSearch.Screen name="PokemonScreen" component={ PokemonScreen } />
    </TabSearch.Navigator>
  );
}