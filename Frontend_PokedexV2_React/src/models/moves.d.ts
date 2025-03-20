export type Move = {
  name: string;
  description: string;
  effect: string;
  type: string;
  damage: number;
  accuracy: number;
  pp: number;
  otherPokemons: number; //Pokemons who learn the move
};
