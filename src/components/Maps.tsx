import type { Feature, Geometry } from 'geojson';
import { useState, useMemo } from 'react';
import { MapContainer, TileLayer, GeoJSON } from 'react-leaflet';

import { useEscapeKey } from '../hooks/useEscapeKey';
import type { Selected, RateData, Boundary } from '../types/map';
import { transformToGeoJSON, handleMapInteractions, getRateColor, type ColorThreshold } from '../utils/mapUtils';
import FullscreenToggle from './buttons/FullscreenToggle';
import MapLegend, { type LegendStage } from './maplegends/Legend';
import Period from './maplegends/Period';
import MapModal from './modals/MapModal';

type Props = {
    mapData: Boundary[];
    stats: RateData[];
    areaType: string;
    activeYear?: string;
    activeMonth?: string;
    center?: [number, number];
    zoom?: number;
    valueSuffix?: string; 
    colorThresholds: ColorThreshold[];
    legendTitle: string;
    legendStages: LegendStage[];
    renderModalContent?: (selected: Selected) => React.ReactNode;
};

interface MapProperties {
    id: number;
    name: string;
    rate: string | number;
    type: string;
}

export default function Maps({
    mapData,
    stats,
    areaType,
    activeYear = String(new Date().getFullYear() - 1),
    activeMonth = '0',
    center = [50.7, 4.5],
    zoom = 8,
    valueSuffix = '%',
    colorThresholds,
    legendTitle,
    legendStages,
    renderModalContent,
}: Props) {
    const [isFullscreen, setIsFullscreen] = useState(false);
    const [selected, setSelected] = useState<Selected>(null);

    const fullData = mapData.map((place) => {
        const otherData = stats.find((item) => item.name === place.name);
        return {
            ...place,
            rate: otherData?.rate ?? 0,
        };
    });

    useEscapeKey(() => {
        if (isFullscreen && !selected) {
            setIsFullscreen(false);
        }
    });

    const mapKey = useMemo(() => {
        return `geojson-${areaType}-${activeYear}-${activeMonth}-${JSON.stringify(stats).length}`;
    }, [areaType, activeYear, activeMonth, stats]);

    const geoData = useMemo(() => {
        return fullData.length ? transformToGeoJSON(fullData) : null;
    }, [fullData]);

    const mapStyle = (feature?: Feature<Geometry, MapProperties>) => {
        const rateValue = feature?.properties?.rate ?? 0;
        const rate = typeof rateValue === 'string' ? parseFloat(rateValue) : rateValue;

        return {
            fillColor: getRateColor(rate, colorThresholds),
            weight: 1,
            opacity: 1,
            color: 'white',
            fillOpacity: 0.8,
        };
    };

    let period;
    if (activeMonth === '0') {
        period = activeYear;
    } else {
        period = `${activeMonth}/${activeYear}`;
    }

    return (
        <>
            <div
                className={
                    isFullscreen
                        ? 'fixed inset-0 z-[100] bg-white'
                        : 'relative z-10 mt-10 h-72 w-full overflow-hidden rounded-2xl sm:h-80 md:h-[420px] lg:h-[520px] xl:h-[620px]'
                }
            >
                <FullscreenToggle isFullscreen={isFullscreen} onToggle={() => setIsFullscreen((v) => !v)} />
                
                {isFullscreen && (
                    <div className="sm:hidden">
                        <MapLegend title={legendTitle} stages={legendStages} />
                        <Period period={period} />
                    </div>
                )}
                
                <div className="hidden sm:block">
                    <MapLegend title={legendTitle} stages={legendStages} />
                    <Period period={period} />
                </div>
                
                <MapContainer center={center} zoom={zoom} scrollWheelZoom={false} className="h-full w-full">
                    <TileLayer url="https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png" />
                    {geoData && (
                        <GeoJSON 
                            key={mapKey} 
                            data={geoData} 
                            style={mapStyle} 
                            onEachFeature={(f, l) => handleMapInteractions(f, l, setSelected, valueSuffix)} 
                        />
                    )}
                </MapContainer>
                
                {selected && (
                    <MapModal
                        selected={selected}
                        onClose={() => setSelected(null)}
                        renderContent={renderModalContent}
                    />
                )}
            </div>
            
            {!isFullscreen && (
                <div className="mt-4 flex flex-col gap-4 px-4 sm:hidden">
                    <Period period={period} />
                    <div className="w-full">
                        <MapLegend title={legendTitle} stages={legendStages} />
                    </div>
                </div>
            )}
        </>
    );
}