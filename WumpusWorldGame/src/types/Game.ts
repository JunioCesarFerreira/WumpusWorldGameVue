import { Position } from './Position';
import { Player } from "./Player";

export interface Game {
  wumpusPosition: Position;
  pitsPositions: Position[];
  goldPosition: Position;
  player: Player;
  visitedCells: Position[];
  wumpusIsDead: boolean;
  score: number;
}
