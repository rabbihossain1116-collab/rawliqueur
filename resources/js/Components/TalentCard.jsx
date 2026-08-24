export default function TalentCard({ talent, lang = 'bn', onClick }) {
    return (
        <button
            onClick={() => onClick && onClick(talent)}
            className="group relative bg-white rounded-2xl overflow-hidden border border-gray-100 hover:border-[#C41E3A]/20 transition-all duration-300 hover:shadow-xl hover:shadow-[#C41E3A]/5 text-left w-full"
        >
            <div className="relative aspect-[4/5] overflow-hidden">
                <img
                    src={talent.image}
                    alt={talent.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />

                {talent.badge && (
                    <div className="absolute top-1.5 left-1.5 px-2 py-0.5 bg-[#C9A84C] text-[#1a1a1a] text-[10px] font-bold rounded-full flex items-center gap-0.5">
                        <svg className="w-2.5 h-2.5" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                        </svg>
                        {talent.badge}
                    </div>
                )}

                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <div className="w-10 h-10 rounded-full bg-[#C41E3A]/90 flex items-center justify-center shadow-lg">
                        <svg className="w-4 h-4 text-white ml-0.5" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M8 5v14l11-7z" />
                        </svg>
                    </div>
                </div>
            </div>

            <div className="p-2.5">
                <div className="flex items-center justify-between mb-1">
                    <h3 className="text-[#1a1a1a] font-semibold text-xs truncate">
                        {talent.name}
                    </h3>
                    <span className="text-[#C41E3A] text-[10px] font-semibold">
                        {talent.category}
                    </span>
                </div>

                <p className="text-gray-500 text-[10px] mb-1.5">
                    {talent.location}
                </p>

                <div className="flex items-center gap-3 text-[10px] text-gray-400">
                    <span className="flex items-center gap-1">
                        <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                        </svg>
                        {talent.likes}
                    </span>
                    <span className="flex items-center gap-1">
                        <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                        </svg>
                        {talent.views}
                    </span>
                </div>
            </div>
        </button>
    );
}
