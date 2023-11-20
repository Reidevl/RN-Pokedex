import React, { useEffect, useState } from 'react';
import { Dimensions, Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { SimplePokemon } from '../interface/pokemonInterface';
import { FadeInImage } from './FadeInImage';
import ImageColors from 'react-native-image-colors';

const windowWidth = Dimensions.get('window').width;

interface Props {
    pokemon: SimplePokemon;
}

export const PokemonCard = ({ pokemon }: Props ) => {

    const [bgColor, setBgColor] = useState('grey');

    const getColorsFromPicture = () => {
      ImageColors.getColors(pokemon.picture, {
        fallback: 'grey',
        cache: true,
        key: pokemon.picture,
      }).then((colors: any) => {
        colors.platform === 'ios';
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

    useEffect(() => {
      getColorsFromPicture();
    }, []);
    
    
  return (
    <TouchableOpacity 
        activeOpacity={ 0.9 }
    >
        <View style= {{
            ...styles.cardContainer,
            width: windowWidth * 0.4,
            backgroundColor: bgColor
        }}>
            {/* Pokemon Name and ID */}
            <View>
                <Text style={ styles.name }>
                    { pokemon.name }
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