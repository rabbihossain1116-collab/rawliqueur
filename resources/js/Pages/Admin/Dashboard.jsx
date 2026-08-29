import AdminLayout from '@/Layouts/AdminLayout';

const statusColors = {
    pending: 'bg-yellow-100 text-yellow-700',
    approved: 'bg-green-100 text-green-700',
    published: 'bg-green-100 text-green-700',
    unread: 'bg-blue-100 text-blue-700',
    completed: 'bg-purple-100 text-purple-700',
};

const typeIcons = {
    submission: '📝',
    artist: '🎤',
    blog: '✍️',
    contact: '📬',
    winner: '🏆',
};

export default function Dashboard({ stats, recentActivity, chartData }) {
    return (
        <AdminLayout title="Dashboard">
            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-sm font-medium text-gray-500">Total Artists</p>
                            <p className="text-3xl font-bold text-[#1a1425] mt-1">{stats.totalArtists}</p>
                        </div>
                        <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#ec1e63] to-[#f7941e] flex items-center justify-center">
                            <span className="text-2xl">🎤</span>
                        </div>
                    </div>
                    <div className="mt-4 flex items-center text-sm">
                        <span className="text-green-500 font-medium">{stats.monthlyGrowth}</span>
                        <span className="text-gray-400 ml-2">vs last month</span>
                    </div>
                </div>

                <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-sm font-medium text-gray-500">Total Submissions</p>
                            <p className="text-3xl font-bold text-[#1a1425] mt-1">{stats.totalSubmissions}</p>
                        </div>
                        <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#8b2fc9] to-[#ec1e63] flex items-center justify-center">
                            <span className="text-2xl">📝</span>
                        </div>
                    </div>
                    <div className="mt-4 flex items-center text-sm">
                        <span className="text-green-500 font-medium">+156</span>
                        <span className="text-gray-400 ml-2">this week</span>
                    </div>
                </div>

                <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-sm font-medium text-gray-500">Total Views</p>
                            <p className="text-3xl font-bold text-[#1a1425] mt-1">{stats.totalViews}</p>
                        </div>
                        <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#f7941e] to-[#ec1e63] flex items-center justify-center">
                            <span className="text-2xl">👁️</span>
                        </div>
                    </div>
                    <div className="mt-4 flex items-center text-sm">
                        <span className="text-green-500 font-medium">+18.2%</span>
                        <span className="text-gray-400 ml-2">vs last month</span>
                    </div>
                </div>

                <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-sm font-medium text-gray-500">Pending Reviews</p>
                            <p className="text-3xl font-bold text-[#1a1425] mt-1">{stats.pendingReviews}</p>
                        </div>
                        <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-yellow-400 to-orange-400 flex items-center justify-center">
                            <span className="text-2xl">⏳</span>
                        </div>
                    </div>
                    <div className="mt-4 flex items-center text-sm">
                        <span className="text-orange-500 font-medium">Requires attention</span>
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Chart Placeholder */}
                <div className="lg:col-span-2 bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
                    <div className="flex items-center justify-between mb-6">
                        <h3 className="text-lg font-bold text-[#1a1425]">Performance Overview</h3>
                        <select className="px-3 py-1.5 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#ec1e63]">
                            <option>Last 12 months</option>
                            <option>Last 6 months</option>
                            <option>Last 30 days</option>
                        </select>
                    </div>
                    <div className="h-64 flex items-end justify-between gap-2">
                        {chartData.submissions.map((value, index) => (
                            <div key={index} className="flex-1 flex flex-col items-center gap-2">
                                <div
                                    className="w-full bg-gradient-to-t from-[#ec1e63] to-[#f7941e] rounded-t-lg transition-all hover:opacity-80"
                                    style={{ height: `${(value / 400) * 100}%` }}
                                />
                                <span className="text-xs text-gray-500">{chartData.labels[index]}</span>
                            </div>
                        ))}
                    </div>
                    <div className="mt-4 flex items-center justify-center gap-6">
                        <div className="flex items-center gap-2">
                            <div className="w-3 h-3 rounded-full bg-gradient-to-r from-[#ec1e63] to-[#f7941e]" />
                            <span className="text-sm text-gray-600">Submissions</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <div className="w-3 h-3 rounded-full bg-gradient-to-r from-[#8b2fc9] to-[#ec1e63]" />
                            <span className="text-sm text-gray-600">Views</span>
                        </div>
                    </div>
                </div>

                {/* Recent Activity */}
                <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
                    <h3 className="text-lg font-bold text-[#1a1425] mb-6">Recent Activity</h3>
                    <div className="space-y-4">
                        {recentActivity.map((activity) => (
                            <div key={activity.id} className="flex items-start gap-3 p-3 rounded-xl hover:bg-gray-50 transition-colors">
                                <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center flex-shrink-0">
                                    <span className="text-lg">{typeIcons[activity.type]}</span>
                                </div>
                                <div className="flex-1 min-w-0">
                                    <p className="text-sm font-medium text-[#1a1425] truncate">{activity.name}</p>
                                    <p className="text-xs text-gray-500 truncate">{activity.action}</p>
                                    <div className="flex items-center gap-2 mt-1">
                                        <span className="text-xs text-gray-400">{activity.time}</span>
                                        <span className={`text-xs px-2 py-0.5 rounded-full ${statusColors[activity.status]}`}>
                                            {activity.status}
                                        </span>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Quick Actions */}
            <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
                <a
                    href="/admin/talent"
                    className="bg-gradient-to-br from-[#ec1e63] to-[#f7941e] rounded-2xl p-6 text-white hover:shadow-lg hover:shadow-pink-200 transition-all"
                >
                    <div className="text-3xl mb-3">📝</div>
                    <h4 className="font-bold text-lg">Review Submissions</h4>
                    <p className="text-white/80 text-sm mt-1">{stats.pendingReviews} pending reviews</p>
                </a>
                <a
                    href="/admin/blog"
                    className="bg-gradient-to-br from-[#8b2fc9] to-[#ec1e63] rounded-2xl p-6 text-white hover:shadow-lg hover:shadow-purple-200 transition-all"
                >
                    <div className="text-3xl mb-3">✍️</div>
                    <h4 className="font-bold text-lg">Write Article</h4>
                    <p className="text-white/80 text-sm mt-1">Create new blog post</p>
                </a>
                <a
                    href="/admin/artists"
                    className="bg-gradient-to-br from-[#1a1425] to-[#3a3548] rounded-2xl p-6 text-white hover:shadow-lg hover:shadow-gray-200 transition-all"
                >
                    <div className="text-3xl mb-3">🎤</div>
                    <h4 className="font-bold text-lg">Manage Artists</h4>
                    <p className="text-white/80 text-sm mt-1">{stats.totalArtists} total artists</p>
                </a>
            </div>
        </AdminLayout>
    );
}
