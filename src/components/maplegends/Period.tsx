interface Props {
    period: string;
}

export default function Period({period} : Props) {
    return (
        <div className="pointer-events-none absolute bottom-6 left-6 z-[1000] rounded-xl bg-white/95 px-5 py-3 shadow-lg backdrop-blur-sm">
                <p className="text-[10px] font-bold tracking-widest text-slate-400 uppercase">Geselecteerde Periode</p>
                <p className="mt-1 text-lg font-black text-slate-800">{period}</p>
            </div>
    )
}