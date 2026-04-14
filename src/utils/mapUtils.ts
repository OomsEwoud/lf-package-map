import type { FeatureCollection, Geometry, Feature } from 'geojson';
import type { Layer } from 'leaflet';
import type { Selected } from '../types/map';

interface MapFeatureProperties {
    name: string;
    rate: number | string; 
}

export interface RawMapData {
    name: string;
    rate: number;
    boundary: Geometry;
}

export const transformToGeoJSON = (data: RawMapData[]): FeatureCollection => {
    return {
        type: 'FeatureCollection',
        features: data.map((area) => ({
            type: 'Feature',
            properties: {
                name: area.name,
                rate: area.rate,
            },
            geometry: area.boundary,
        })),
    };
};

export const handleMapInteractions = (
    feature: Feature<Geometry, MapFeatureProperties>, 
    layer: Layer, 
    onSelect: (data: Selected) => void,
    valueSuffix: string = '%' 
) => {
    const { name, rate } = feature.properties;
    const hasData = rate !== null && rate !== undefined && rate !== '';
    const displayRate = hasData ? `${rate}${valueSuffix}` : 'Geen data';

    layer.bindTooltip(`<strong>${name}</strong>: ${displayRate}`, {
        sticky: true, 
        direction: 'top'
    });

    layer.on('click', () => {
        const selected: Selected = {
            name: name,
        };
        onSelect(selected);
    });
};

export interface ColorThreshold {
    min: number;
    color: string;
}

export const getRateColor = (rate: number | string | null | undefined, thresholds: ColorThreshold[]) => {
    let numericRate: number;
    
    if (typeof rate === 'string') {
        numericRate = parseFloat(rate);
    } else if (typeof rate === 'number') {
        numericRate = rate;
    } else {
        return '#D1D5DB'; 
    }

    if (isNaN(numericRate) || numericRate <= 0) {
        return '#D1D5DB'; 
    }
    
    const sortedThresholds = [...thresholds].sort((a, b) => b.min - a.min);

    for (const threshold of sortedThresholds) {
        if (numericRate >= threshold.min) {
            return threshold.color;
        }
    }
    
    return sortedThresholds[sortedThresholds.length - 1]?.color || '#7DD3FC';
};