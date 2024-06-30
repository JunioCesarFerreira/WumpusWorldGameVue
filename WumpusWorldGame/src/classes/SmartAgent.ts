import { Position, arePositionsEqual, getAdjacentCells } from '@/types/Position';
import { Game } from '@/types/Game';
import { HazardProbabilityDistribution } from '@/classes/HazardProbabilityDistribution';
import { Direction } from '@/types/enums/Direction';
import { GameHandler } from '@/classes/GameHandler';
import { PathFinder } from '@/classes/PathFinder';

export enum WumpusHuntState {
    None,
    Hunting,
    Shooting,
    Finished
}

const DIMENSION: number = 4;

type FinishCallback = (message: string) => void;

export class SmartAgent {
    private player: Game["player"];
    private game: Game;
    private gameHandler: GameHandler;
    private hazardProbDist: HazardProbabilityDistribution;
    private wumpusProbDist: number[][];
    private pitsProbDist: number[][];
    private visited: boolean[][];
    private path: Position[] = [];
    private huntingWumpus: WumpusHuntState = WumpusHuntState.None;
    private wumpusPosition: Position | null = null;
    private possibleWumpusPositions: Position[] = [];
    private targetToShoot: Position;
    private finishCallback: FinishCallback;

    constructor(game: Game, gameHandler: GameHandler, hazardProbDist: HazardProbabilityDistribution, finishCallback: FinishCallback) {
        this.game = game;
        this.gameHandler = gameHandler;
        this.player = game.player;
        this.hazardProbDist = hazardProbDist;
        this.visited = Array.from({ length: DIMENSION }, () => Array(DIMENSION).fill(false));
        this.finishCallback = finishCallback;
    }

    public step(): boolean {
        let resultStep = true;
        this.visited[this.player.position[0]][this.player.position[1]] = true;

        this.updateProbDist();

        if (arePositionsEqual(this.player.position, this.game.goldPosition) && !this.player.gold) {
            this.collectGold();
        } else if (this.player.gold) {
            resultStep = this.followPathToExit();
        } else {
            resultStep = this.exploreOrHuntWumpus();
        }

        if (!resultStep) {
            this.finishCallback("Process completed.");
        }

        return resultStep;
    }

    private exploreOrHuntWumpus(): boolean {
        const nextMove = this.findUnexploredSafeCell();
        console.log("nextMove", nextMove);
        if (nextMove) {
            this.redirect(this.player.position, nextMove);
            this.gameHandler.go();
        } else if (!this.game.wumpusIsDead) {
            if (!this.wumpusHuntStateMachine()) {
                if (this.tryFindPossibleWumpusPositions()) {
                    const safePositions = this.getSafePositionsForHunt();
                    if (safePositions.length > 0) {
                        return this.preparePathToHunt(safePositions);
                    }
                }
                console.log("There are no more moves without the risk of death.");
                return false;
            }
        } else {
            console.log("There are no more moves without the risk of death.");
            return false;
        }
        return true;
    }

    private findUnexploredSafeCell(): Position | null {
        const adj = getAdjacentCells([this.player.position], DIMENSION - 1);
        console.log("adj", JSON.stringify(adj));
        for (const cell of adj) {
            if (this.isSafeAndUnvisited(cell)) return cell;
        }

        const unexploredSafeCells: Position[] = [];
        for (let i = 0; i < DIMENSION; i++) {
            for (let j = 0; j < DIMENSION; j++) {
                if (this.isSafeAndUnvisited([i, j])) unexploredSafeCells.push([i, j]);
            }
        }

        console.log("unexploredSafeCells", JSON.stringify(unexploredSafeCells));
        if (unexploredSafeCells.length > 0) 
            return this.findClosestUnexploredSafeCell(unexploredSafeCells);

        return null;
    }

    private redirect(current: Position, target: Position): void {
        console.log(`redirect (${current[0]},${current[1]})->(${target[0]},${target[1]})`);
        if (current[1] === target[1]) {
            if (current[0] > target[0]) {
                console.log("left");
                this.gameHandler.move(Direction.Left);
            } else {
                console.log("right");
                this.gameHandler.move(Direction.Right);
            }
        } else if (current[0] === target[0]) {
            if (target[1] > current[1]) {
                console.log("up");
                this.gameHandler.move(Direction.Up);
            } else {
                console.log("down");
                this.gameHandler.move(Direction.Down);
            }
        }
    }

    private updateProbDist() {
        if (this.game.wumpusIsDead) {
            this.wumpusProbDist = this.hazardProbDist.zeroMatrix();
        } else if (this.wumpusPosition){
            this.wumpusProbDist =this.hazardProbDist.zeroMatrix();
            let p = this.wumpusPosition;
            this.wumpusProbDist[p[0]][p[1]] = 1;
        } else {
            this.wumpusProbDist = this.hazardProbDist.calculateWumpusProbabilities();
        }

        this.pitsProbDist = this.hazardProbDist.calculatePitsProbabilities();
    }

    private collectGold() {
        this.gameHandler.getGold();
        this.path = PathFinder.findShortestPath(this.visited, this.player.position, [0, 0]);
        this.path.pop();
    }

    private followPathToExit(): boolean {
        if (this.path.length > 0) {
            this.redirect(this.player.position, this.path.pop()!);
            this.gameHandler.go();
        } else {
            console.log("Completed successfully!");
            this.gameHandler.move(Direction.Down);
            return false;
        }
        return true;
    }

    private isSafeAndUnvisited(cell: Position): boolean {
        console.log(`isSafe: (${cell[0]},${cell[1]})`);
        return (this.wumpusProbDist[cell[0]][cell[1]] + this.pitsProbDist[cell[0]][cell[1]] === 0
            || (this.wumpusPosition && arePositionsEqual(cell, this.wumpusPosition) && this.game.wumpusIsDead))
            && !this.visited[cell[0]][cell[1]];
    }

    private getSafePositionsForHunt(): Position[] {
        const adj1 = getAdjacentCells([this.possibleWumpusPositions[0]], DIMENSION);
        const adj2 = getAdjacentCells([this.possibleWumpusPositions[1]], DIMENSION);
        return adj1.filter(pos1 => adj2.some(pos2 => arePositionsEqual(pos1, pos2)))
            .filter(pos => this.visited[pos[0]][pos[1]]);
    }

    private tryFindPossibleWumpusPositions(): boolean {
        this.possibleWumpusPositions = [];
        if (!this.game.wumpusIsDead && this.player.arrow) {
            for (let i = 0; i < DIMENSION; i++) {
                for (let j = 0; j < DIMENSION; j++) {
                    if (this.wumpusProbDist[i][j] === 0.5) {
                        this.possibleWumpusPositions.push([i, j]);
                    }
                }
            }
        }
        return this.possibleWumpusPositions.length === 2;
    }

    private findClosestUnexploredSafeCell(unexploredSafeCells: Position[]): Position | null {
        for (const cell of unexploredSafeCells) {
            this.visited[cell[0]][cell[1]] = true;
            const path = PathFinder.findShortestPath(this.visited, this.player.position, cell);
            this.visited[cell[0]][cell[1]] = false;
            if (path.length >= 2) {
                path.pop();
                return path.pop();
            }
        }
        return null;
    }

    private preparePathToHunt(dest: Position[]): boolean {
        this.path = PathFinder.findShortestPathToMultiple(this.visited, this.player.position, dest);
        this.path.pop();
        if (this.path.length === 0) {
            this.huntingWumpus = WumpusHuntState.Shooting;
            return this.aimToShoot();
        } else {
            this.huntingWumpus = WumpusHuntState.Hunting;
            this.redirect(this.player.position, this.path.pop()!);
            this.gameHandler.go();
        }
        return true;
    }

    private aimToShoot(): boolean {
        if (this.wumpusPosition) {
            this.redirect(this.player.position, this.wumpusPosition);
        } else if (this.possibleWumpusPositions.length === 2) {
            let targetIndex = Math.floor(Math.random() * 2);
            this.targetToShoot = this.possibleWumpusPositions[targetIndex];
            this.redirect(this.player.position, this.targetToShoot);
        } else return false;
        return true;
    }

    private wumpusHuntStateMachine(): boolean {
        let isRunning = true;
        switch (this.huntingWumpus) {
            case WumpusHuntState.None:
                this.wumpusPosition = this.searchesWumpus();
                if (this.wumpusPosition) {
                    const adj = getAdjacentCells([this.wumpusPosition], DIMENSION);
                    isRunning = this.preparePathToHunt(adj);
                } else isRunning = false;
                break;
            case WumpusHuntState.Hunting:
                if (this.path.length === 0) {
                    this.huntingWumpus = WumpusHuntState.Shooting;
                    isRunning = this.aimToShoot();
                } else {
                    this.redirect(this.player.position, this.path.pop()!);
                    this.gameHandler.go();
                }
                break;
            case WumpusHuntState.Shooting:
                this.gameHandler.playerShootsArrow();
                this.huntingWumpus = WumpusHuntState.Finished;
                if (this.possibleWumpusPositions.length === 2) {
                    if (this.game.wumpusIsDead) {
                        this.wumpusPosition = this.targetToShoot;
                    } else {
                        this.wumpusPosition = this.possibleWumpusPositions
                                                .find((t) => {!arePositionsEqual(t, this.targetToShoot)});
                    }
                }
                break;
            case WumpusHuntState.Finished:
                isRunning = false;
                break;
        }
        return isRunning;
    }

    private searchesWumpus(): Position | null {
        if (!this.game.wumpusIsDead && this.player.arrow) {
            for (let i = 0; i < DIMENSION; i++) {
                for (let j = 0; j < DIMENSION; j++) {
                    if (this.wumpusProbDist[i][j] === 1) {
                        return [i, j];
                    }
                }
            }
        }
        return null;
    }
}
