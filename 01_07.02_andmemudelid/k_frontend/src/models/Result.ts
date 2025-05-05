import { Athlete } from "./Athlete";

export type Result = {
    id: number,
    event: string,
    performance: number,
    points: number,
    athlete: Athlete
};