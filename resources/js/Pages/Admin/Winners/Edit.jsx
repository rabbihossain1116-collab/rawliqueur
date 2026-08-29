import AdminLayout from '@/Layouts/AdminLayout';

export default function Edit({ winner }) {
    return (
        <AdminLayout title="Edit Winner">
            <div className="max-w-2xl">
                <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
                    <form className="space-y-6">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">Full Name *</label>
                            <input
                                type="text"
                                required
                                defaultValue={winner.name}
                                className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#ec1e63] focus:border-transparent"
                            />
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">Category *</label>
                                <select
                                    required
                                    defaultValue={winner.category}
                                    className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#ec1e63]"
                                >
                                    <option value="Singing">Singing</option>
                                    <option value="Dance">Dance</option>
                                    <option value="Poetry">Poetry</option>
                                    <option value="Instrumental">Instrumental</option>
                                    <option value="Storytelling">Storytelling</option>
                                </select>
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">Season *</label>
                                <select
                                    required
                                    defaultValue={winner.season}
                                    className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#ec1e63]"
                                >
                                    <option value="1">Season 1</option>
                                    <option value="2">Season 2</option>
                                    <option value="3">Season 3</option>
                                    <option value="4">Season 4</option>
                                    <option value="5">Season 5</option>
                                    <option value="6">Season 6</option>
                                </select>
                            </div>
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">Achievement *</label>
                            <input
                                type="text"
                                required
                                defaultValue={winner.achievement}
                                className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#ec1e63] focus:border-transparent"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">Quote</label>
                            <textarea
                                rows={3}
                                defaultValue={winner.quote}
                                className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#ec1e63] focus:border-transparent resize-none"
                            />
                        </div>
                        <div className="flex gap-4">
                            <button
                                type="submit"
                                className="px-6 py-2.5 bg-gradient-to-r from-[#ec1e63] to-[#f7941e] text-white font-medium text-sm rounded-xl hover:shadow-lg hover:shadow-pink-200 transition-all"
                            >
                                Update Winner
                            </button>
                            <a
                                href="/admin/winners"
                                className="px-6 py-2.5 bg-gray-100 text-gray-700 font-medium text-sm rounded-xl hover:bg-gray-200 transition-colors"
                            >
                                Cancel
                            </a>
                        </div>
                    </form>
                </div>
            </div>
        </AdminLayout>
    );
}
