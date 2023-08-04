interface Caught {
  caught: boolean;
}

export interface PokemonType extends Caught {
  id?: string;
  type?: string;
  name: string;
  url: string;
}

export interface PokemonFeatures {
  imageUrl: string;
  showableAbilities: string[];
  name: string;
  height: number;
  weight: number;
}
