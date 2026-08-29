import { useState } from 'react';
import AdminLayout from '@/Layouts/AdminLayout';

const statusColors = {
    active: 'bg-green-100 text-green-700',
    inactive: 'bg-gray-100 text-gray-700',
    pending: 'bg-yellow-100 text-yellow-700',
};

export default function Artists({ artists }) {
    const [search, setSearch] = useState('');
    const [filter, setFilter] = useState('all');

    const filteredArtists = artists.filter((artist) => {
        const matchesSearch = artist.name.toLowerCase().includes(search.toLowerCase());
        const matchesFilter = filter === 'all' || artist.status === filter;
        return matchesSearch && matchesFilter;
    });

    return (
        <AdminLayout title="Artists">
            {/* Header Actions */}
            <div className="flex flex-col sm:flex-row gap-4 mb-6">
                <div className="flex-1 relative">
                    <input
                        type="text"
                        placeholder="Search artists..."
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
                    <option value="all">All Status</option>
                    <option value="active">Active</option>
                    <option value="inactive">Inactive</option>
                    <option value="pending">Pending</option>
                </select>
                <a
                    href="/admin/artists/create"
                    className="inline-flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-[#ec1e63] to-[#f7941e] text-white font-medium text-sm rounded-xl hover:shadow-lg hover:shadow-pink-200 transition-all"
                >
                    + Add Artist
                </a>
            </div>

            {/* Artists Table */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full">
                        <thead>
                            <tr className="bg-gray-50 border-b border-gray-100">
                                <th className="text-left px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">Artist</th>
                                <th className="text-left px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">Category</th>
                                <th className="text-left px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">Status</th>
                                <th className="text-left px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">Uploads</th>
                                <th className="text-left px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">Views</th>
                                <th className="text-left px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">Joined</th>
                                <th className="text-right px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100">
                            {filteredArtists.map((artist) => (
                                <tr key={artist.id} className="hover:bg-gray-50 transition-colors">
                                    <td className="px-6 py-4">
                                        <div className="flex items-center gap-3">
                                            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#ec1e63] to-[#f7941e] flex items-center justify-center">
                                                <span className="text-white font-semibold text-sm">{artist.name.charAt(0)}</span>
                                            </div>
                                            <div>
                                                <p className="font-semibold text-[#1a1425]">{artist.name}</p>
                                                <p className="text-xs text-gray-500">ID: {artist.id}</p>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4">
                                        <span className="px-3 py-1 bg-gray-100 text-gray-700 text-xs font-medium rounded-full">{artist.category}</span>
                                    </td>
                                    <td className="px-6 py-4">
                                        <span className={`px-3 py-1 text-xs font-medium rounded-full ${statusColors[artist.status]}`}>
                                            {artist.status}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 text-sm text-gray-600">{artist.uploads}</td>
                                    <td className="px-6 py-4 text-sm font-medium text-[#1a1425]">{artist.views}</td>
                                    <td className="px-6 py-4 text-sm text-gray-500">{artist.joined}</td>
                                    <td className="px-6 py-4 text-right">
                                        <div className="flex items-center justify-end gap-2">
                                            <a
                                                href={`/admin/artists/${artist.id}/edit`}
                                                className="p-2 text-gray-400 hover:text-[#ec1e63] hover:bg-pink-50 rounded-lg transition-colors"
                                            >
                                                ✏️
                                            </a>
                                            <button className="p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors">
                                                🗑️
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
                {filteredArtists.length === 0 && (
                    <div className="p-12 text-center">
                        <p className="text-gray-500">No artists found.</p>
                    </div>
                )}
            </div>
        </AdminLayout>
    );
}
