import React from 'react'
import { ScrollView, Text, View, StyleSheet, Image } from 'react-native';
import { FullPokemon, Type } from '../interface/pokemon.interface'
import { FadeInImage } from './FadeInImage';

interface Props {
    pokemon: FullPokemon
}

export const PokemonDetails = ( { pokemon }: Props ) => {

  return (
    <ScrollView 
        showsVerticalScrollIndicator= { false }
        style={{
            ...StyleSheet.absoluteFillObject,
        }}
    >
        {/* Types and Weight*/}
        <View style={{
            ...styles.container,
            marginTop: 370
        }}>
            <Text style={ styles.title }>Types</Text>
            <View style={{ flexDirection: 'row' }}>
                {
                    pokemon.types.map(({ type }, index) => (
                        <Text
                            key={ type.name }
                            style={{ 
                                ...styles.regularText,
                                marginRight: 10
                            }}
                        >
                            { type.name }
                            {index < pokemon.types.length - 1 && <Text>,</Text>}
                        </Text>
                    ))
                }
            </View>

            {/* Weight */}
            <Text style={ styles.title }>Weight</Text>
            <Text style={ styles.regularText }>{ pokemon.weight } lb</Text>

        </View>

        {/* Sprites */}
        <View style={ styles.container }>
            <Text style={ styles.title }>Sprites</Text>
        </View>
        
        <ScrollView
            // style
            horizontal= { true }
            showsHorizontalScrollIndicator={ false }
        >
            <FadeInImage
                uri={ pokemon.sprites.front_default }
                style={ styles.basicSprite }
            />
            <FadeInImage
                uri={ pokemon.sprites.back_default }
                style={ styles.basicSprite }
            />
            <FadeInImage
                uri={ pokemon.sprites.front_shiny }
                style={ styles.basicSprite }
            />
            <FadeInImage
                uri={ pokemon.sprites.back_shiny }
                style={ styles.basicSprite }
            />
        </ScrollView>

        {/*  Habilities */}
        <View style={ styles.container }>
            <Text style={ styles.title }>Skills</Text>
            <View style={{ flexDirection: 'row' }}>
                {
                    pokemon.abilities.map(({ ability }, index) => (
                        <Text
                            key={ ability.name }
                            style={{ 
                                ...styles.regularText,
                                marginRight: 10
                            }}
                        >
                            { ability.name }
                            {index < pokemon.abilities.length - 1 && <Text>,</Text>}
                        </Text>
                    ))
                }
            </View>
        </View>

        {/*  Movements */}
        <View style={ styles.container }>
            <Text style={ styles.title }>Movements</Text>
            <View style={{ flexWrap: 'wrap', flexDirection: 'row' }}>
                {
                    pokemon.moves.map(({ move }, index) => (
                        <Text
                            key={ move.name }
                            style={{ 
                                ...styles.regularText,
                                marginRight: 10
                            }}
                        >
                            { move.name }
                            {index < pokemon.moves.length - 1 && <Text>,</Text>}
                        </Text>
                    ))
                }
            </View>
        </View>

        {/*  Stats */}
        <View style={ styles.container }>
            <Text style={ styles.title }>Stats</Text>
            <View style={{ flexWrap: 'wrap', flexDirection: 'row' }}>
                {
                    pokemon.stats.map(( stat , index) => (
                       <View 
                            key={ stat.stat.name + index }
                            style= {{ flexDirection: 'row'}}
                        >
                             <Text
                                style={{ 
                                    ...styles.regularText,
                                    marginRight: 10,
                                    width: 150
                                }}
                                key={ stat.stat.name }
                            >
                                { stat.stat.name }
                            </Text>
                             <Text
                                style={{ 
                                    ...styles.regularText,
                                    fontWeight: 'bold'
                                }}
                            >
                                { stat.base_stat }
                            </Text>
                       </View>
                    ))
                }
            </View>
            {/* Sprite final */}
            <View style= {{
                marginBottom: 20,
                alignItems: 'center'
            }}>

                <FadeInImage
                    uri={ pokemon.sprites.front_default }
                    style={ styles.basicSprite }
                    />
            </View>
        </View>
        
    </ScrollView>
  )
}

const styles = StyleSheet.create({
    container: {
        marginHorizontal: 20
    },
    title: {
        fontSize: 22,
        fontWeight: 'bold',
        marginTop: 20
    },
    regularText: {
        fontSize: 19,
    },
    basicSprite: {
        width: 100,
        height: 100
    }
});
