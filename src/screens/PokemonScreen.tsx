import { StackScreenProps } from '@react-navigation/stack';
import React from 'react';
import { ActivityIndicator, Dimensions, Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
// Hooks
import { useSafeAreaInsets } from 'react-native-safe-area-context';
// Type
import { RootStackParams } from '../navigator/Navigator';
// Components
import { FadeInImage } from '../components/FadeInImage';
import { usePokemon } from '../hooks/usePokemon';

const { width: windowWidth, height: windowHeight } = Dimensions.get('window');


interface Props extends StackScreenProps<RootStackParams, 'PokemonScreen'> {};

export const PokemonScreen = ( { navigation, route }: Props ) => {

  const { simplePokemon, color } = route.params;
  const { name, id, picture } = simplePokemon;
  
  // Hooks
  const { top } = useSafeAreaInsets();
  const { isLoading, pokemon} = usePokemon( id );

  console.log(pokemon.moves);


  return (
    <View style={{ flex: 1 }}>
      {/* Header Container */}
      <View style= {{
          ...styles.headerContainer,
          backgroundColor: color,
        }}>
          {/* Back Button */}
          <TouchableOpacity
            onPress={ () => { navigation.goBack() }}
            activeOpacity={0.8}
            style={{
              ...styles.backButton,
              top: top + 5
            }}
          >
            <Icon
              name='arrow-back-outline'
              color='white'
              size={ 35 }
            />
          </TouchableOpacity>

          {/* Pokemon name */}
          <Text
            style={{
              ...styles.pokemonName,
              top: top + 45
            }}
          >
            { name + '\n'} #{ id }
          </Text>

          {/* Pokeball */}
          <Image
            source={ require('../assets/pokebola-blanca.png') }
            style={{ 
              ...styles.pokeball,
              width: windowWidth * 0.5,
              height: windowHeight * 0.24
            }}
          />

          <FadeInImage
            uri={ picture }
            style= {{ 
              ...styles.pokemonImage,
              width: windowWidth * 0.6,
              height: windowHeight * 0.25

            }}
          />
      </View>

      {/* Details and loading */}
      {
        isLoading && (
          <View style={ styles.loading }>
            <ActivityIndicator
              color={ color }
              size={ 50 }
            />
          </View>
        )
      }


    </View>
  )
}

const styles = StyleSheet.create({
    headerContainer: {
      height: 370,
      zIndex: 999,
      alignItems: 'center',
      borderBottomRightRadius: 200,
      borderBottomLeftRadius: 200,
    },
    backButton: {
      position: 'absolute',
      left: 20
    },
    pokemonName: {
      color: 'white',
      fontSize: 40,
      alignSelf: 'flex-start',
      left: 20
    },
    pokeball: {
      bottom: -65,
      opacity: 0.7
    },
    pokemonImage: {
      position: 'absolute',
      bottom: -20
    },
    loading: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center'
    }
});