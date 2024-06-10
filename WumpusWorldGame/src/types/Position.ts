export type Position = [number, number];

interface Cell {
  id: Position;
}

export function arePositionsEqual(pos1: Position, pos2: Position): boolean {
    return pos1[0] === pos2[0] && pos1[1] === pos2[1];
}

export function isPositionInArray(pos: Position, posArray: Position[]): boolean {
    return posArray.some(arrayPos => arePositionsEqual(pos, arrayPos));
}

export function getAdjacentCells(positions: Position[], dim: number): Position[] {
  const adj: Set<string> = new Set();

  positions.forEach(([x, y]) => {
    if (x > 0) adj.add(JSON.stringify([x - 1, y]));
    if (y > 0) adj.add(JSON.stringify([x, y - 1]));
    if (x < dim) adj.add(JSON.stringify([x + 1, y]));
    if (y < dim) adj.add(JSON.stringify([x, y + 1]));
  });

  return Array.from(adj).map((pos) => JSON.parse(pos) as Position);
}