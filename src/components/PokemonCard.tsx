import React, { useEffect, useRef, useState } from 'react';
import { Dimensions, Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import ImageColors from 'react-native-image-colors';
// Hooks
import { useNavigation } from '@react-navigation/native';
// Types
import { RootStackParams } from '../navigator/TabList';
import { ImageColorsResult } from 'react-native-image-colors/lib/typescript/types';
// Components
import { FadeInImage } from './FadeInImage';
// Interfaces
import { SimplePokemon } from '../interface/pokemon.interface';


const windowWidth = Dimensions.get('window').width;

interface Props {
    pokemon: SimplePokemon;
}

export const PokemonCard = ({ pokemon }: Props ) => {

    const [bgColor, setBgColor] = useState('grey');
    const isMounted = useRef(true);
    const navigation = useNavigation<StackNavigationProp<RootStackParams>>();

    const getColorsFromPicture = () => {
      ImageColors.getColors(pokemon.picture, {
        fallback: 'grey',
        cache: true,
        key: pokemon.picture,
      }).then((colors: ImageColorsResult) => {

        if ( !isMounted.current ) return;

        switch (colors.platform) {
          case 'android':
            setBgColor(colors.dominant || bgColor);
            break;
          case 'ios':
            setBgColor(colors.background || bgColor);
            break;
          case 'web':
            setBgColor(colors.dominant || bgColor);
            break;
          default:
            setBgColor(bgColor);
            break;
        }
      });
    }

    const capitalizeName = (name: string) => {
      const nameConverted = name.charAt(0).toUpperCase() + name.slice(1);
      return nameConverted;
    }

    useEffect(() => {
      getColorsFromPicture();

      return () => {
        isMounted.current = false;
      }
    }, []);
    
    
  return (
    <TouchableOpacity 
        activeOpacity={ 0.9 }
        onPress={
          () => { navigation.navigate('PokemonScreen', { 
            simplePokemon: pokemon,
            color: bgColor
          })} }
    >
        <View style= {{
            ...styles.cardContainer,
            width: windowWidth * 0.4,
            backgroundColor: bgColor
        }}>
            {/* Pokemon Name and ID */}
            <View>
                <Text style={ styles.name }>
                    { capitalizeName(pokemon.name) }
                    { '\n#' + pokemon.id }
                </Text>
            </View>
            {/* Pokemon Image */}
            <View style={ styles.pokebolaContainer}>
                <Image
                    source={ require('../assets/pokebola-blanca.png') }
                    style={ styles.pokebola }
                />

            </View>
            <FadeInImage
                uri= {pokemon.picture}
                style={ styles.pokemonImage}
            />
        </View>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
    cardContainer: {
        marginHorizontal: 10,
        height: 120,
        width: 160,
        marginBottom: 25,
        borderRadius: 10,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 3,
        },
        shadowOpacity: 0.27,
        shadowRadius: 4.65,

        elevation: 6,
    },
    name: {
        color: 'white',
        fontSize: 20,
        fontWeight: 'bold',
        top: 20,
        left: 10
    },
    pokebolaContainer: {
        width: 100,
        height: 100,
        position: 'absolute',
        bottom: 0,
        right: 0,
        overflow: 'hidden',
        opacity: 0.5
    },
    pokebola: {
        width: 100,
        height: 100,
        position: 'absolute',
        right: -25,
        bottom: -25
    },
    pokemonImage: {
        width: 100,
        height: 100,
        position: 'absolute',
        right: -3,
        bottom: -5
    }
});