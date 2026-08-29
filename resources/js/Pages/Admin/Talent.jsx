import { useState } from 'react';
import AdminLayout from '@/Layouts/AdminLayout';

const statusColors = {
    pending: 'bg-yellow-100 text-yellow-700',
    approved: 'bg-green-100 text-green-700',
    rejected: 'bg-red-100 text-red-700',
};

export default function Talent({ submissions }) {
    const [search, setSearch] = useState('');
    const [filter, setFilter] = useState('all');

    const filteredSubmissions = submissions.filter((sub) => {
        const matchesSearch = sub.name.toLowerCase().includes(search.toLowerCase());
        const matchesFilter = filter === 'all' || sub.status === filter;
        return matchesSearch && matchesFilter;
    });

    return (
        <AdminLayout title="Talent Submissions">
            {/* Header Actions */}
            <div className="flex flex-col sm:flex-row gap-4 mb-6">
                <div className="flex-1 relative">
                    <input
                        type="text"
                        placeholder="Search submissions..."
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
                    <option value="pending">Pending</option>
                    <option value="approved">Approved</option>
                    <option value="rejected">Rejected</option>
                </select>
            </div>

            {/* Submissions Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredSubmissions.map((sub) => (
                    <div key={sub.id} className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-md transition-shadow">
                        {/* Video Thumbnail Placeholder */}
                        <div className="relative h-40 bg-gradient-to-br from-[#1a1425] to-[#3a3548] flex items-center justify-center">
                            <div className="w-16 h-16 rounded-full bg-white/20 flex items-center justify-center">
                                <span className="text-3xl text-white ml-1">▶</span>
                            </div>
                            <span className={`absolute top-3 right-3 px-3 py-1 text-xs font-medium rounded-full ${statusColors[sub.status]}`}>
                                {sub.status}
                            </span>
                        </div>
                        <div className="p-5">
                            <div className="flex items-center gap-3 mb-3">
                                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#8b2fc9] to-[#ec1e63] flex items-center justify-center">
                                    <span className="text-white font-semibold text-sm">{sub.name.charAt(0)}</span>
                                </div>
                                <div>
                                    <h4 className="font-semibold text-[#1a1425]">{sub.name}</h4>
                                    <p className="text-xs text-gray-500">{sub.email}</p>
                                </div>
                            </div>
                            <div className="flex items-center gap-2 mb-3">
                                <span className="px-3 py-1 bg-gray-100 text-gray-700 text-xs font-medium rounded-full">{sub.category}</span>
                                <span className="text-xs text-gray-400">{sub.submitted}</span>
                            </div>
                            <p className="text-sm text-gray-600 line-clamp-2 mb-4">{sub.videoUrl}</p>
                            <div className="flex gap-2">
                                {sub.status === 'pending' && (
                                    <>
                                        <button className="flex-1 px-4 py-2 bg-green-500 text-white text-sm font-medium rounded-lg hover:bg-green-600 transition-colors">
                                            ✓ Approve
                                        </button>
                                        <button className="flex-1 px-4 py-2 bg-red-500 text-white text-sm font-medium rounded-lg hover:bg-red-600 transition-colors">
                                            ✕ Reject
                                        </button>
                                    </>
                                )}
                                {sub.status !== 'pending' && (
                                    <button className="flex-1 px-4 py-2 bg-gray-100 text-gray-700 text-sm font-medium rounded-lg hover:bg-gray-200 transition-colors">
                                        View Details
                                    </button>
                                )}
                                <button className="px-4 py-2 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors">
                                    🗑️
                                </button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {filteredSubmissions.length === 0 && (
                <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-12 text-center">
                    <p className="text-gray-500">No submissions found.</p>
                </div>
            )}
        </AdminLayout>
    );
}
