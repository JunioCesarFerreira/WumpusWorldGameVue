import { Position, arePositionsEqual, isPositionInArray } from '../Position';
import { Game } from '../Game';
import { Direction } from '../enums/Direction';

export class GameHandler {
  private dimX: number;
  private dimY: number;
  private game: Game;

  constructor(game: Game) {
    this.dimX = 4;
    this.dimY = 4;
    this.game = game;
    this.game.visitedCells.push({...game.player.position});
  }

  newGame(): void {
    const positions: Position[] = [];
    const restrictions: Position[] = [
      [1, 1],
      [1, 2],
      [2, 1]
    ];

    while (positions.length < 5) {
      const x = Math.floor(Math.random() * this.dimX + 1);
      const y = Math.floor(Math.random() * this.dimY + 1);

      const p: Position = [x, y];

      if (!isPositionInArray(p, restrictions) && !isPositionInArray(p, positions)) {
        positions.push(p);
      }
    }

    this.game.goldPosition = positions[0];
    this.game.pitsPositions = positions.slice(1, 4);
    this.game.wumpusPosition = positions[4];
    this.game.player.position = [1,1]
    this.game.player.direction = Direction.Down;
    this.game.player.arrow = true;
    this.game.player.gold = false;
    this.game.visitedCells = [[1,1]];
    this.game.wumpusIsDead = false;
    console.log(JSON.stringify(this.game))
  }

  isWumpus(pos: Position): boolean {
    return arePositionsEqual(pos, this.game.wumpusPosition) && !this.game.wumpusIsDead;
  }

  isPit(pos: Position): boolean {
    return isPositionInArray(pos, this.game.pitsPositions);
  }  

  getGold(): void{
    if (arePositionsEqual(this.game.player.position, this.game.goldPosition)) {
      this.game.player.gold = true;
    }
  }

  playerShootsArrow(): void {
    console.log(JSON.stringify(this.game));
    const [playerX, playerY] = this.game.player.position;
    const [wumpusX, wumpusY] = this.game.wumpusPosition;
    if (this.game.player.arrow) {
      this.game.player.arrow = false;
      switch (this.game.player.direction) {
        case Direction.Up:
          if (playerX === wumpusX && playerY + 1 === wumpusY) {
            this.game.wumpusIsDead = true;
          }
        break;
        case Direction.Down:
          if (playerX === wumpusX && playerY - 1 === wumpusY) {
            this.game.wumpusIsDead = true;
          }
        break;
        case Direction.Left:
          if (playerX - 1 === wumpusX && playerY === wumpusY) {
            this.game.wumpusIsDead = true;
          }
        break;
        case Direction.Right:
          if (playerX + 1 === wumpusX && playerY === wumpusY) {
            this.game.wumpusIsDead = true;
          }
        break;
      }
    }
    console.log(JSON.stringify(this.game));
  }
}
