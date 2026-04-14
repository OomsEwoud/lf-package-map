import type { Geometry } from "geojson";

export type Boundary = {
    id: number;
    name: string;
    boundary: Geometry;
}

export type RateData = {
    id?: number; 
    name: string;
    rate: number;
}

export type Selected = {
    name: string;
} | null;

export type MapData = {
    gemeente: Boundary[];
    provincie: Boundary[];
    gewest: Boundary[];
    land: Boundary[];
};