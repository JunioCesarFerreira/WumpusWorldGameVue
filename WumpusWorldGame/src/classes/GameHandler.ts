import { Position, arePositionsEqual, isPositionInArray } from '@/types/Position';
import { Game } from '@/types/Game';
import { Direction } from '@/types/enums/Direction';

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
      [0, 0],
      [0, 1],
      [1, 0]
    ];

    while (positions.length < 5) {
      const x = Math.floor(Math.random() * this.dimX);
      const y = Math.floor(Math.random() * this.dimY);

      const p: Position = [x, y];

      if (!isPositionInArray(p, restrictions) && !isPositionInArray(p, positions)) {
        positions.push(p);
      }
    }

    this.game.goldPosition = positions[0];
    this.game.pitsPositions = positions.slice(1, 4);
    this.game.wumpusPosition = positions[4];
    this.game.player.position = [0,0]
    this.game.player.direction = Direction.Down;
    this.game.player.arrow = true;
    this.game.player.gold = false;
    this.game.visitedCells = [[0,0]];
    this.game.wumpusIsDead = false;
    this.game.score = 0;
    console.log(JSON.stringify(this.game))
  }

  private updateScore(value: number) {
    this.game.score += value;
  }
  
  move(direction: Direction) {
    this.game.player.direction = direction;
  }

  go(): string {
    switch(this.game.player.direction){
      case Direction.Up:
        if (this.game.player.position[1] + 1 < this.dimY) {
          this.game.player.position[1]++;
          this.updateScore(-1)
        }
        break;
      case Direction.Down:
        if (this.game.player.position[1] - 1 >= 0) {
          this.game.player.position[1]--;
          this.updateScore(-1)
        }
        break;
      case Direction.Left:
        if (this.game.player.position[0] - 1 >= 0) {
          this.game.player.position[0]--;
          this.updateScore(-1)
        }
        break;
      case Direction.Right:
        if (this.game.player.position[0] + 1 < this.dimX) {
          this.game.player.position[0]++;
          this.updateScore(-1)
        }
        break;
    }    
    if (!isPositionInArray(this.game.player.position, this.game.visitedCells)) {
      const pos = { ...this.game.player.position } as Position;
      this.game.visitedCells.push(pos);
    }
    if (this.isPit(this.game.player.position)) {
      this.updateScore(-1000);
      return "you fell into the pit and died!";
    }
    if (this.isWumpus(this.game.player.position) && !this.game.wumpusIsDead) {
      this.updateScore(-1000);
      return "you were devoured by the Wumpus!";
    }
    return "safe";
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
      this.updateScore(1000);
    }
  }

  playerShootsArrow(): void {
    const [playerX, playerY] = this.game.player.position;
    const [wumpusX, wumpusY] = this.game.wumpusPosition;
    if (this.game.player.arrow) {
      this.game.player.arrow = false;
      this.updateScore(-10);
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
  }
}
