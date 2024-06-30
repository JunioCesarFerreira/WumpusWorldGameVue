import { Position, arePositionsEqual, isPositionInArray, getAdjacentCells } from '@/types/Position';
import { Game } from '@/types/Game';

export enum HazardType {
    Wumpus, Pit
}

export class HazardProbabilityDistribution {
    private game: Game;
    private dimension: number;

    constructor(game: Game, dimension: number) {
        this.game = game;
        this.dimension = dimension;
    }

    zeroMatrix():number[][]{
        const probDist = Array.from({ length: this.dimension }, () => Array(this.dimension).fill(0));
        return probDist;
    }

    calculateWumpusProbabilities(): number[][] {    
        if (this.game.wumpusIsDead){
            return Array.from({ length: this.dimension }, () => Array(this.dimension).fill(0));
        }
        const adj = getAdjacentCells([this.game.wumpusPosition], this.dimension) as Position[];
        const taggedSet = this.game.visitedCells
            .filter(cell => isPositionInArray(cell, adj));

        return this.calculateHazardProbabilities(taggedSet, 1);
    }

    
    calculatePitsProbabilities(): number[][] {        
        const adj = getAdjacentCells(this.game.pitsPositions, this.dimension) as Position[];
        const taggedSet = this.game.visitedCells
            .filter(cell => isPositionInArray(cell, adj));

        return this.calculateHazardProbabilities(taggedSet, this.game.pitsPositions.length);
    }

    calculateHazardProbabilities(taggedSet: Position[], numberHazards: number): number[][] {     
        const safe = this.getSafeSet(taggedSet);

        const unsafeSet = this.getUnsafeSet(safe) as Position[];
        
        const allCombinations = this.getCombinations(unsafeSet, numberHazards);
        
        const validCombinations = [] as Position[][];      
        for (const combination of allCombinations){
            if (this.isValidCombination(combination, taggedSet)) {
                validCombinations.push(combination)
            }
        }
        
        const probDist = Array.from({ length: this.dimension }, () => Array(this.dimension).fill(0));
        
        for (const cell of unsafeSet) {
            const count = validCombinations
                .filter(combination => combination.some(c => arePositionsEqual(cell, c)))
                .length;

            probDist[cell[0]][cell[1]] = count / validCombinations.length;
        }

        return probDist;
    }

    
    private getSafeSet(taggedSet: Position[]): Position[] {
        const safe: Position[] = [];
        for (let pos of this.game.visitedCells) {
            if (!isPositionInArray(pos, taggedSet)) {
                if (pos[0] - 1 >= 0) safe.push([pos[0] - 1, pos[1]]);
                if (pos[0] + 1 < this.dimension) safe.push([pos[0] + 1, pos[1]]);
                if (pos[1] - 1 >= 0) safe.push([pos[0], pos[1] - 1]);
                if (pos[1] + 1 < this.dimension) safe.push([pos[0], pos[1] + 1]);
            }
        }
        return safe;
    }
    

    private getUnsafeSet(safe: Position[]): Position[] {
        const unsafe = [] as Position[];
        for (let i=0; i < this.dimension; i++){
            for(let j=0; j < this.dimension; j++){
                let pos = [i,j] as Position;
                if (!isPositionInArray(pos, this.game.visitedCells) 
                    && !isPositionInArray(pos, safe)) {
                    unsafe.push(pos);
                }
            }
        }
        return unsafe;
    }

    private getCombinations<T>(list: T[], length: number): T[][] {
        if (length === 0) return [[]];
        if (list.length === 0) return [];
    
        const result: T[][] = [];
        const head = list[0];
        const tail = list.slice(1);
    
        for (const combination of this.getCombinations(tail, length - 1)) {
            combination.unshift(head);
            result.push(combination);
        }
    
        result.push(...this.getCombinations(tail, length));
    
        return result;
    }
    
    private isValidCombination(combination: Position[], taggedSet: Position[]): boolean {    
        const neighborhood = getAdjacentCells(combination, this.dimension)
        const complement = []
        for (let i = 0; i < this.dimension; i++) {
            for (let j = 0; j < this.dimension; j++) {
                const pos = [i,j] as Position;
                if (!isPositionInArray(pos, neighborhood)) {
                    complement.push(pos);
                }
            }
        }
    
        for (let i = 0; i < this.dimension; i++) {
            for (let j = 0; j < this.dimension; j++) {
                let pos = [i,j] as Position;
                if ( isPositionInArray(pos, complement) &&
                    isPositionInArray(pos, taggedSet)) {
                    return false;
                }
            }
        }
    
        return true;
    }  
}