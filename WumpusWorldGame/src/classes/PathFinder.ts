import { Position } from '@/types/Position';

class Node {
    public x: number;
    public y: number;
    public parent: Node | null;

    constructor(x: number, y: number, parent: Node | null) {
        this.x = x;
        this.y = y;
        this.parent = parent;
    }
}

export class PathFinder {
    private static rowOffsets = [-1, 1, 0, 0];
    private static colOffsets = [0, 0, -1, 1];

    public static findShortestPath(visited: boolean[][], start: Position, end: Position): Position[] {
        const rows = visited.length;
        const cols = visited[0].length;

        if (!this.isValid(start[0], start[1], visited) || !this.isValid(end[0], end[1], visited)) {
            return [];
        }

        const visitedNodes = Array.from({ length: rows }, () => Array(cols).fill(false));
        const queue: Node[] = [new Node(start[0], start[1], null)];
        visitedNodes[start[0]][start[1]] = true;

        while (queue.length > 0) {
            const current = queue.shift()!;

            if (current.x === end[0] && current.y === end[1]) {
                return this.constructPath(current);
            }

            for (let i = 0; i < 4; i++) {
                const newRow = current.x + this.rowOffsets[i];
                const newCol = current.y + this.colOffsets[i];

                if (this.isValid(newRow, newCol, visited) && !visitedNodes[newRow][newCol]) {
                    queue.push(new Node(newRow, newCol, current));
                    visitedNodes[newRow][newCol] = true;
                }
            }
        }

        return [];
    }

    public static findShortestPathToMultiple(visited: boolean[][], start: Position, ends: Position[]): Position[] {
        const rows = visited.length;
        const cols = visited[0].length;

        if (!this.isValid(start[0], start[1], visited)) {
            return [];
        }

        const visitedNodes = Array.from({ length: rows }, () => Array(cols).fill(false));
        const queue: Node[] = [new Node(start[0], start[1], null)];
        visitedNodes[start[0]][start[1]] = true;

        while (queue.length > 0) {
            const current = queue.shift()!;

            if (ends.some(end => current.x === end[0] && current.y === end[1])) {
                return this.constructPath(current);
            }

            for (let i = 0; i < 4; i++) {
                const newRow = current.x + this.rowOffsets[i];
                const newCol = current.y + this.colOffsets[i];

                if (this.isValid(newRow, newCol, visited) && !visitedNodes[newRow][newCol]) {
                    queue.push(new Node(newRow, newCol, current));
                    visitedNodes[newRow][newCol] = true;
                }
            }
        }

        return [];
    }

    private static isValid(row: number, col: number, visited: boolean[][]): boolean {
        return row >= 0 && row < visited.length && col >= 0 && col < visited[0].length && visited[row][col];
    }

    private static constructPath(endNode: Node): Position[] {
        const path: Position[] = [];
        let current: Node | null = endNode;

        while (current !== null) {
            path.push([current.x, current.y]);
            current = current.parent;
        }
        console.log("path", JSON.stringify(path.reverse()));
        return path.reverse();
    }
}
