import { useState } from 'react';


export interface LegendStage {
    label: string;
    color: string;
    text?: string;
}

export interface MapLegendProps {
    title: string;
    stages: LegendStage[];
}

export default function Legend({ title, stages }: MapLegendProps) {
    const [isExpanded, setIsExpanded] = useState(true);

    return (
        <div className="absolute bottom-6 right-6 z-[1000] flex flex-col items-end gap-2">
            <div className={`
                overflow-hidden rounded-2xl border border-slate-200 bg-white/90 p-4 shadow-xl backdrop-blur-md transition-all duration-300
                ${isExpanded ? 'max-h-[500px] w-64 opacity-100' : 'max-h-0 w-0 opacity-0 p-0 border-none'}
            `}>
                <h3 className="mb-3 text-xs font-bold uppercase tracking-wider text-slate-500">
                    {title}
                </h3>
                
                <div className="space-y-2">
                    {stages.map((stage) => (
                        <div key={stage.label} className="flex items-center gap-3">
                            <div 
                                className="h-3 w-3 shrink-0 rounded-full shadow-sm" 
                                style={{ backgroundColor: stage.color }} 
                            />
                            <span className="text-xs font-medium text-slate-700">{stage.label}</span>
                            {stage.text && (
                                <span className="ml-auto text-[10px] text-slate-400 italic">{stage.text}</span>
                            )}
                        </div>
                    ))}
                </div>
            </div>

            <button
                onClick={() => setIsExpanded(!isExpanded)}
                className="flex h-10 items-center gap-2 rounded-full bg-slate-900 px-4 text-sm font-bold text-white shadow-lg transition-transform hover:scale-105 active:scale-95"
            >
                <span className="text-xs uppercase tracking-widest">
                    {isExpanded ? 'Sluit Legenda' : 'Toon Legenda'}
                </span>
                <span className={`transition-transform duration-300 ${isExpanded ? 'rotate-180' : ''}`}>
                    ▲
                </span>
            </button>
        </div>
    );
}