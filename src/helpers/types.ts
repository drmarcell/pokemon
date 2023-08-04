import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { PokemonType } from './interfaces';

export type StackParamList = {
  Home: undefined;
  Profile: { pokemon: PokemonType; filteredPokemons: PokemonType[] };
};

export type HomeProps = NativeStackScreenProps<StackParamList, 'Home'>;
export type ProfileProps = NativeStackScreenProps<StackParamList, 'Profile'>;
