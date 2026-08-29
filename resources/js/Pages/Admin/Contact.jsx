import { useState } from 'react';
import AdminLayout from '@/Layouts/AdminLayout';

const statusColors = {
    unread: 'bg-blue-100 text-blue-700',
    read: 'bg-gray-100 text-gray-700',
    replied: 'bg-green-100 text-green-700',
};

export default function Contact({ messages }) {
    const [search, setSearch] = useState('');
    const [filter, setFilter] = useState('all');
    const [selectedMessage, setSelectedMessage] = useState(null);

    const filteredMessages = messages.filter((msg) => {
        const matchesSearch = msg.name.toLowerCase().includes(search.toLowerCase()) || msg.subject.toLowerCase().includes(search.toLowerCase());
        const matchesFilter = filter === 'all' || msg.status === filter;
        return matchesSearch && matchesFilter;
    });

    return (
        <AdminLayout title="Contact Messages">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Messages List */}
                <div className="lg:col-span-1 bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
                    <div className="p-4 border-b border-gray-100">
                        <div className="relative mb-3">
                            <input
                                type="text"
                                placeholder="Search messages..."
                                value={search}
                                onChange={(e) => setSearch(e.target.value)}
                                className="w-full pl-10 pr-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#ec1e63] focus:border-transparent"
                            />
                            <svg className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                            </svg>
                        </div>
                        <select
                            value={filter}
                            onChange={(e) => setFilter(e.target.value)}
                            className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#ec1e63]"
                        >
                            <option value="all">All Messages</option>
                            <option value="unread">Unread</option>
                            <option value="read">Read</option>
                            <option value="replied">Replied</option>
                        </select>
                    </div>
                    <div className="divide-y divide-gray-100 max-h-[600px] overflow-y-auto">
                        {filteredMessages.map((msg) => (
                            <button
                                key={msg.id}
                                onClick={() => setSelectedMessage(msg)}
                                className={`w-full p-4 text-left hover:bg-gray-50 transition-colors ${
                                    selectedMessage?.id === msg.id ? 'bg-pink-50 border-l-4 border-[#ec1e63]' : ''
                                }`}
                            >
                                <div className="flex items-center justify-between mb-1">
                                    <span className="font-semibold text-[#1a1425] text-sm">{msg.name}</span>
                                    <span className={`px-2 py-0.5 text-xs font-medium rounded-full ${statusColors[msg.status]}`}>
                                        {msg.status}
                                    </span>
                                </div>
                                <p className="text-sm text-gray-600 truncate">{msg.subject}</p>
                                <p className="text-xs text-gray-400 mt-1">{msg.received}</p>
                            </button>
                        ))}
                    </div>
                </div>

                {/* Message Detail */}
                <div className="lg:col-span-2 bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
                    {selectedMessage ? (
                        <>
                            <div className="p-6 border-b border-gray-100">
                                <div className="flex items-center justify-between mb-4">
                                    <div className="flex items-center gap-3">
                                        <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[#8b2fc9] to-[#ec1e63] flex items-center justify-center">
                                            <span className="text-white font-bold text-lg">{selectedMessage.name.charAt(0)}</span>
                                        </div>
                                        <div>
                                            <h3 className="font-bold text-[#1a1425] text-lg">{selectedMessage.name}</h3>
                                            <p className="text-sm text-gray-500">{selectedMessage.email}</p>
                                        </div>
                                    </div>
                                    <span className={`px-3 py-1 text-xs font-medium rounded-full ${statusColors[selectedMessage.status]}`}>
                                        {selectedMessage.status}
                                    </span>
                                </div>
                                <div className="flex items-center gap-4 text-sm text-gray-500">
                                    <span>Subject: <span className="font-medium text-[#1a1425]">{selectedMessage.subject}</span></span>
                                    <span>•</span>
                                    <span>{selectedMessage.received}</span>
                                </div>
                            </div>
                            <div className="p-6">
                                <p className="text-gray-700 leading-relaxed">{selectedMessage.message}</p>
                            </div>
                            <div className="p-6 border-t border-gray-100 bg-gray-50">
                                <div className="flex gap-3">
                                    <button className="px-5 py-2.5 bg-gradient-to-r from-[#ec1e63] to-[#f7941e] text-white font-medium text-sm rounded-xl hover:shadow-lg hover:shadow-pink-200 transition-all">
                                        Reply
                                    </button>
                                    <button className="px-5 py-2.5 bg-gray-200 text-gray-700 font-medium text-sm rounded-xl hover:bg-gray-300 transition-colors">
                                        Mark as Read
                                    </button>
                                    <button className="px-5 py-2.5 text-red-500 font-medium text-sm rounded-xl hover:bg-red-50 transition-colors">
                                        Delete
                                    </button>
                                </div>
                            </div>
                        </>
                    ) : (
                        <div className="p-12 text-center">
                            <div className="text-6xl mb-4">📬</div>
                            <p className="text-gray-500">Select a message to view details</p>
                        </div>
                    )}
                </div>
            </div>
        </AdminLayout>
    );
}
