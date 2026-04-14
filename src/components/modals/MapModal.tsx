import { createPortal } from 'react-dom';
import { useEscapeKey } from '../../hooks/useEscapeKey';
import { useScrollLock } from '../../hooks/useScrollLock';
import type { Selected } from '../../types/map';

type Props = {
    selected: Selected;
    onClose: () => void;
    renderContent?: (selected: Selected) => React.ReactNode;
};

export default function MapModal({ selected, onClose, renderContent }: Props) {
    useEscapeKey(onClose);
    useScrollLock(!!selected);

    if (!selected) return null;

    return createPortal(
        <div className="fixed inset-0 z-[10001] flex items-center justify-center bg-black/40 p-4 backdrop-blur-sm" onClick={onClose}>
            <div className="max-h-[90vh] w-[min(1100px,95vw)] overflow-auto rounded-3xl bg-white shadow-2xl" onClick={(e) => e.stopPropagation()}>
                <div className="sticky top-0 z-10 flex items-center justify-between bg-gradient-to-r from-indigo-500 to-purple-600 px-6 py-5">
                    <h2 className="text-3xl font-extrabold text-white">{selected.name}</h2>
                    <button
                        onClick={onClose}
                        className="grid h-10 w-10 cursor-pointer place-items-center rounded-xl bg-white/15 text-white hover:bg-white/25"
                        aria-label="Sluiten"
                    >
                        ✕
                    </button>
                </div>
                <div className="p-6">
                    {renderContent ? (
                        renderContent(selected)
                    ) : (
                        <div className="flex h-64 items-center justify-center text-center text-slate-500">
                            <p>Geen detailweergave geconfigureerd voor {selected.name}.</p>
                        </div>
                    )}
                </div>

            </div>
        </div>,
        document.body,
    );
}