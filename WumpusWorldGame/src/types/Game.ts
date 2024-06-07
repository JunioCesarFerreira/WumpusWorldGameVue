type Position = [number, number];

export interface Game {
  WumpusPosition: Position;
  PitsPositions: Position[];
  GoldPosition: Position;
}

export function arePositionsEqual(pos1: Position, pos2: Position): boolean {
    return pos1[0] === pos2[0] && pos1[1] === pos2[1];
}

export function isPositionInArray(pos: Position, posArray: Position[]): boolean {
    return posArray.some(arrayPos => arePositionsEqual(pos, arrayPos));
}