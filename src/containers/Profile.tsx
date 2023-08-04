import React, { useEffect, useState } from 'react';
import {
  Image,
  View,
  Text,
  StyleSheet,
  ScrollView,
  useWindowDimensions,
  Alert,
} from 'react-native';
import { Loader } from '../components/Loader';
import {
  changePokemonCaughtState,
  cropFullUrlToEndpoint,
  firstLetterToUppercase,
} from '../helpers/common';
import { PokemonFeatures, PokemonType } from '../helpers/interfaces';
import { ProfileProps } from '../helpers/types';
import useFetch from '../hooks/useFetch';
import { PrimaryButton } from '../components/PrimaryButton';
import { setPokemons } from '../store/pokemon/pokemonSlice';
import { useAppDispatch, useAppSelector } from '../store/hooks';

interface Ability {
  name: string;
  url: string;
}

interface Abilities {
  ability: Ability;
  is_hidden: boolean;
  slot: number;
}

const Profile = ({ navigation, route }: ProfileProps): JSX.Element => {
  const dispatch = useAppDispatch();
  const croppedUrl: string = cropFullUrlToEndpoint(route.params.pokemon.url);
  const { fetchHookData, fetchHookError, fetchHookLoading } =
    useFetch<any>(croppedUrl);
  const pokemons: PokemonType[] = useAppSelector(
    state => state.pokemon.pokemons,
  );
  const { height, width } = useWindowDimensions();
  const [pokemonFeatures, setPokemonFeatures] = useState<PokemonFeatures | null>(null);
  const [isCaught, setIsCaught] = useState<boolean>(
    route.params.pokemon.caught ? route.params.pokemon.caught : false,
  );
  const [filteredPokemons, setFilteredPokemons] = useState<
    PokemonType[] | null
  >(null);

  const handleCatch = (): void => {
    setIsCaught(!isCaught);
  };

  const callErrorAlert = (errorMessage: string): void => {
    return Alert.alert('Error!', errorMessage, [
      {
        text: 'Close',
        onPress: () => {
          navigation.goBack();
        },
      },
    ]);
  };

  useEffect((): void => {
    if (fetchHookData) {
      let tempPokemonFeatures: PokemonFeatures = {
        imageUrl: '',
        showableAbilities: [],
        name: '',
        height: 0,
        weight: 0,
      };
      // image: sprites.front_default
      if (fetchHookData.sprites.front_default) {
        tempPokemonFeatures.imageUrl = fetchHookData.sprites.front_default;
      }
      if (fetchHookData.abilities) {
        const tempShowableAbilities: string[] = [];
        fetchHookData.abilities.map((ability: Abilities) => {
          if (!ability.is_hidden) {
            tempShowableAbilities.push(ability.ability.name);
          }
        });

        tempPokemonFeatures.showableAbilities = tempShowableAbilities;
      }
      if (fetchHookData.name) {
        tempPokemonFeatures.name = fetchHookData.name;
      }
      if (fetchHookData.height) {
        tempPokemonFeatures.height = fetchHookData.height;
      }
      if (fetchHookData.weight) {
        tempPokemonFeatures.weight = fetchHookData.weight;
      }

      setPokemonFeatures(tempPokemonFeatures);
    }
  }, [fetchHookData]);

  useEffect((): void => {
    if (fetchHookError) {
      callErrorAlert('This pokemon is not available on the server');
    }
  }, [fetchHookError]);

  useEffect((): void => {
    if (pokemonFeatures) {
      const newPokemons = changePokemonCaughtState(
        pokemons,
        pokemonFeatures.name,
      );
      setFilteredPokemons(newPokemons);
    }
  }, [isCaught]);

  useEffect((): void => {
    if (filteredPokemons) {
      dispatch(setPokemons(filteredPokemons));
    }
  }, [filteredPokemons]);

  return (
    <>
      {fetchHookLoading && <Loader />}
      <ScrollView style={styles.container}>
        <View
          style={[
            styles.imageContainer,
            {
              height: height > width ? height * 0.5 : height * 0.8,
              borderColor: isCaught ? '#FFCB03' : '#2F6EB5',
            },
          ]}>
          {pokemonFeatures?.imageUrl && (
            <Image
              style={styles.image}
              source={{
                uri: pokemonFeatures.imageUrl,
              }}
            />
          )}
        </View>
        <View style={[styles.row, { backgroundColor: '#CEDDEE' }]}>
          <View style={styles.rowElement}>
            <Text style={styles.text}>Name</Text>
          </View>
          <View style={styles.rowElement}>
            <Text style={[styles.text, styles.textBolded]}>
              {pokemonFeatures?.name
                ? firstLetterToUppercase(pokemonFeatures.name)
                : ''}
            </Text>
          </View>
        </View>
        <View style={[styles.row, { backgroundColor: '#FFF3C3' }]}>
          <View style={styles.rowElement}>
            <Text style={styles.text}>Weight</Text>
          </View>
          <View style={styles.rowElement}>
            <Text style={[styles.text, styles.textBolded]}>
              {pokemonFeatures?.weight}
            </Text>
          </View>
        </View>
        <View style={[styles.row, { backgroundColor: '#CEDDEE' }]}>
          <View style={styles.rowElement}>
            <Text style={styles.text}>Height</Text>
          </View>
          <View style={styles.rowElement}>
            <Text style={[styles.text, styles.textBolded]}>
              {pokemonFeatures?.height}
            </Text>
          </View>
        </View>
        {pokemonFeatures?.showableAbilities && (
          <>
            <View style={[styles.row, { backgroundColor: '#FFF3C3' }]}>
              <View style={styles.rowElement}>
                <Text style={styles.text}>Abilities</Text>
              </View>
              <View style={styles.rowElement}>
                {pokemonFeatures.showableAbilities.map(
                  (ability: string, index: number): JSX.Element => {
                    return (
                      <Text
                        key={`ability-${index}`}
                        style={[styles.text, styles.textBolded]}>
                        {firstLetterToUppercase(ability)}
                      </Text>
                    );
                  },
                )}
              </View>
            </View>
          </>
        )}
      </ScrollView>
      {pokemonFeatures && (
        <View style={styles.buttonContainer}>
          <PrimaryButton
            pokemon={pokemonFeatures}
            isCaught={isCaught}
            onButtonPress={handleCatch}
          />
        </View>
      )}
    </>
  );
};

export default Profile;

const styles = StyleSheet.create({
  container: {
    padding: 10,
  },
  imageContainer: {
    borderWidth: 4,
    marginBottom: 15,
  },
  image: {
    flex: 1,
    height: undefined,
    width: undefined,
  },
  row: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingVertical: 15,
  },
  rowElement: {
    width: '50%',
    paddingLeft: 25,
  },
  text: {
    fontSize: 20,
  },
  textBolded: {
    fontWeight: 'bold',
  },
  buttonContainer: {
    paddingHorizontal: 10,
  },
});
