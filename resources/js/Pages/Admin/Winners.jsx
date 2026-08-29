import { useState } from 'react';
import AdminLayout from '@/Layouts/AdminLayout';

export default function Winners({ winners }) {
    const [search, setSearch] = useState('');
    const [filter, setFilter] = useState('all');

    const filteredWinners = winners.filter((w) => {
        const matchesSearch = w.name.toLowerCase().includes(search.toLowerCase());
        const matchesFilter = filter === 'all' || w.season === filter;
        return matchesSearch && matchesFilter;
    });

    const seasons = [...new Set(winners.map((w) => w.season))];

    return (
        <AdminLayout title="Winners">
            {/* Header Actions */}
            <div className="flex flex-col sm:flex-row gap-4 mb-6">
                <div className="flex-1 relative">
                    <input
                        type="text"
                        placeholder="Search winners..."
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        className="w-full pl-10 pr-4 py-2.5 bg-white border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#ec1e63] focus:border-transparent"
                    />
                    <svg className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                    </svg>
                </div>
                <select
                    value={filter}
                    onChange={(e) => setFilter(e.target.value)}
                    className="px-4 py-2.5 bg-white border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#ec1e63]"
                >
                    <option value="all">All Seasons</option>
                    {seasons.map((s) => (
                        <option key={s} value={s}>Season {s}</option>
                    ))}
                </select>
                <a
                    href="/admin/winners/create"
                    className="inline-flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-[#ec1e63] to-[#f7941e] text-white font-medium text-sm rounded-xl hover:shadow-lg hover:shadow-pink-200 transition-all"
                >
                    + Add Winner
                </a>
            </div>

            {/* Winners Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredWinners.map((winner) => (
                    <div key={winner.id} className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-md transition-shadow">
                        <div className="relative h-32 bg-gradient-to-br from-yellow-400 via-yellow-500 to-orange-500 flex items-center justify-center">
                            <span className="text-6xl">🏆</span>
                            <div className="absolute top-3 left-3 px-3 py-1 bg-white/90 text-[#1a1425] text-xs font-bold rounded-full">
                                Season {winner.season}
                            </div>
                        </div>
                        <div className="p-5">
                            <div className="flex items-center gap-3 mb-3">
                                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[#ec1e63] to-[#f7941e] flex items-center justify-center">
                                    <span className="text-white font-bold text-lg">{winner.name.charAt(0)}</span>
                                </div>
                                <div>
                                    <h4 className="font-bold text-[#1a1425]">{winner.name}</h4>
                                    <p className="text-xs text-gray-500">{winner.category}</p>
                                </div>
                            </div>
                            <div className="bg-gradient-to-r from-orange-50 to-pink-50 rounded-xl px-4 py-3 mb-4">
                                <p className="text-sm font-semibold text-[#f7941e]">{winner.achievement}</p>
                            </div>
                            <div className="flex items-center justify-between text-sm">
                                <span className="text-gray-500">Views: <span className="font-medium text-[#1a1425]">{winner.views}</span></span>
                                <div className="flex gap-2">
                                    <a
                                        href={`/admin/winners/${winner.id}/edit`}
                                        className="p-2 text-gray-400 hover:text-[#ec1e63] hover:bg-pink-50 rounded-lg transition-colors"
                                    >
                                        ✏️
                                    </a>
                                    <button className="p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors">
                                        🗑️
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {filteredWinners.length === 0 && (
                <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-12 text-center">
                    <p className="text-gray-500">No winners found.</p>
                </div>
            )}
        </AdminLayout>
    );
}
