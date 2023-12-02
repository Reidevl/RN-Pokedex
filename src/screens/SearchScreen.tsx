import React, {useEffect, useState} from 'react';
import {Dimensions, FlatList, Platform, Text, View} from 'react-native';
// Hooks
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {usePokemonSearch} from '../hooks/usePokemonSearch';
// Components
import {Loading} from '../components/Loading';
import {PokemonCard} from '../components/PokemonCard';
import {SearchInput} from '../components/SearchInput';
// Interfaces
import {SimplePokemon} from '../interface/pokemon.interface';
// Themes
import {styles} from '../theme/appTheme';

const screenWidth = Dimensions.get('window').width;

export const SearchScreen = () => {
  const {top} = useSafeAreaInsets();
  const {isFetching, simplePokemonList} = usePokemonSearch();
  const [pokemonFiltered, setPokemonFiltered] = useState<SimplePokemon[]>([]);

  const [term, setTerm] = useState('');

  const searchPokemon = (value: string) => {
    if (value.length === 0) {
      return setPokemonFiltered([]);
    }

    if (isNaN(Number(value))) {
      setPokemonFiltered(
        simplePokemonList.filter((pokemon: SimplePokemon) =>
          pokemon.name.toLowerCase().includes(value.toLowerCase()),
        ) || [],
      );
    } else {
      const pokemonById = simplePokemonList.find(
        (pokemon: SimplePokemon) => pokemon.id === term,
      );
      setPokemonFiltered(pokemonById ? [pokemonById] : []);
    }
  };

  useEffect(() => {
    searchPokemon(term);
  }, [term]);

  if (isFetching) {
    return <Loading />;
  }

  return (
    <View
      style={{
        flex: 1,
        marginHorizontal: 20,
      }}>
      <SearchInput
        onDebounce={value => setTerm(value)}
        style={{
          position: 'absolute',
          zIndex: 999,
          width: screenWidth - 40,
          top: Platform.OS === 'ios' ? top : top + 20,
        }}
      />

      <FlatList
        data={pokemonFiltered}
        keyExtractor={pokemon => pokemon.id}
        showsVerticalScrollIndicator={false}
        numColumns={2}
        // Header
        ListHeaderComponent={
          <Text
            style={{
              ...styles.title,
              ...styles.globalMargin,
              paddingBottom: 10,
              marginTop: Platform.OS === 'ios' ? top + 50 : top + 70,
            }}>
            {term}
          </Text>
        }
        renderItem={({item}) => <PokemonCard pokemon={item} />}
      />
    </View>
  );
};
