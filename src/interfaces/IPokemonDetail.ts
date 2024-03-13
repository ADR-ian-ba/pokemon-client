interface Move {
    name: string; 
  }
  
export default interface IPokemonDetail {
    name: string;
    height: number;
    weight: number;
    official: string;
    sprite: string;
    move: Move[]
  }