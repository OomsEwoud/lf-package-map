import { Maximize2, Minimize2 } from 'lucide-react';

type Props = {
    isFullscreen : boolean;
    onToggle: () => void;
};

export default function FullscreenToggle({isFullscreen, onToggle}: Props) {
    return (
        <button
            type="button"
            onClick={onToggle}
            className="absolute top-3 right-3 z-[10000] cursor-pointer rounded-xl bg-white/95 px-3 py-2 shadow hover:bg-white"
        >
            {isFullscreen ? (
                <span className="flex items-center gap-2 text-sm font-semibold">
                    <Minimize2 size={18} />
                    Sluiten
                </span>
            ) : (
                <span className="flex items-center gap-2 text-sm font-semibold">
                    <Maximize2 size={18} />
                    Fullscreen
                </span>
            )}
        </button>
    );
}
