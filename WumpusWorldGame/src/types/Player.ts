import { Position } from "./Position";
import { Direction } from "./enums/Direction";

export type Player = {
    position: Position;
    direction: Direction;
    arrow: boolean;
    gold: boolean;
}