interface Move {
    name: string; 
  }
  
export default interface IPokemonDetail {
    id: number;
    name: string;
    height: number;
    weight: number;
    official: string;
    sprite: string;
    move: Move[]
  }