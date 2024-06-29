// FavoriteGamesHandler.ts
import { Position } from '@/types/Position';
import { Game } from '@/types/Game';
import { Direction } from '@/types/enums/Direction';

interface FavoriteGame {
  pits: Position[];
  wumpus: Position;
  gold: Position;
}

export class FavoriteGamesHandler {
  private myFavorites: FavoriteGame[];
  private myFavoritesIndex: number;
  private game: Game;

  constructor(game: Game) {
    this.game = game;
    this.myFavoritesIndex = 0;
    this.myFavorites = [
      {
        pits: [[0, 3], [0, 2], [3, 0]],
        wumpus: [3, 2],
        gold: [1, 3]
      },
      {
        pits: [[0, 3], [1, 2], [3, 2]],
        wumpus: [2, 2],
        gold: [3, 3]
      },
      {
        pits: [[0, 3], [2, 0], [3, 2]],
        wumpus: [1, 2],
        gold: [3, 3]
      },
      {
        pits: [[1, 3], [2, 3], [2, 0]],
        wumpus: [3, 1],
        gold: [2, 2]
      },
      {
        pits: [[2, 3], [2, 1], [2, 0]],
        wumpus: [3, 3],
        gold: [3, 1]
      },
      {
        pits: [[0, 2], [1, 3], [3, 0]],
        wumpus: [2, 2],
        gold: [3, 3]
      }
    ];
  }

  next(): void {
    this.myFavoritesIndex++;
    if (this.myFavoritesIndex >= this.myFavorites.length) {
      this.myFavoritesIndex = 0;
    }

    const favorite = this.myFavorites[this.myFavoritesIndex];
    this.game.goldPosition = favorite.gold;
    this.game.pitsPositions = favorite.pits;
    this.game.wumpusPosition = favorite.wumpus;
    this.game.wumpusIsDead = false;
    this.game.player.position = [0, 0];
    this.game.player.direction = Direction.Down;
    this.game.player.arrow = true;
    this.game.player.gold = false;
    this.game.visitedCells = [[0, 0]];
    this.game.score = 0;
  }
}
