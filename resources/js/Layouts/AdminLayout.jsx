import { useState } from 'react';
import { Link, usePage } from '@inertiajs/react';

const navigation = [
    { name: 'Dashboard', href: '/admin', icon: '📊' },
    { name: 'Home Content', href: '/admin/home-content', icon: '🏠' },
    { name: 'About Content', href: '/admin/about-content', icon: '📖' },
    { name: 'Artists Content', href: '/admin/artists-content', icon: '🎤' },
    { name: 'Artists', href: '/admin/artists', icon: '👤' },
    { name: 'Talent Submissions', href: '/admin/talent', icon: '📝' },
    { name: 'Blog Posts', href: '/admin/blog', icon: '✍️' },
    { name: 'Winners', href: '/admin/winners', icon: '🏆' },
    { name: 'Contact Messages', href: '/admin/contact', icon: '📬' },
    { name: 'Settings', href: '/admin/settings', icon: '⚙️' },
];

export default function AdminLayout({ children, title }) {
    const [sidebarOpen, setSidebarOpen] = useState(true);
    const { url, props } = usePage();
    const user = props.auth?.user;

    const isActive = (href) => {
        if (href === '/admin') return url === '/admin';
        return url.startsWith(href);
    };

    return (
        <div className="min-h-screen bg-[#f8f9fc]">
            {/* Sidebar */}
            <aside
                className={`fixed top-0 left-0 z-40 h-screen transition-all duration-300 bg-white border-r border-gray-100 ${
                    sidebarOpen ? 'w-64' : 'w-20'
                }`}
            >
                {/* Logo */}
                <div className="flex items-center justify-between h-16 px-4 border-b border-gray-100">
                    <Link href="/admin" className="flex items-center gap-3">
                        <img src="/image/rllogo.png" alt="RAW LIQUEUR" className="h-[45px] w-auto" />
                    </Link>
                    <button
                        onClick={() => setSidebarOpen(!sidebarOpen)}
                        className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
                    >
                        <svg className="w-5 h-5 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            {sidebarOpen ? (
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 19l-7-7 7-7m8 14l-7-7 7-7" />
                            ) : (
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 5l7 7-7 7M5 5l7 7-7 7" />
                            )}
                        </svg>
                    </button>
                </div>

                {/* Navigation */}
                <nav className="p-4 space-y-1">
                    {navigation.map((item) => (
                        <Link
                            key={item.name}
                            href={item.href}
                            className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all ${
                                isActive(item.href)
                                    ? 'bg-gradient-to-r from-[#ec1e63] to-[#f7941e] text-white shadow-lg shadow-pink-200'
                                    : 'text-gray-600 hover:bg-gray-50 hover:text-[#1a1425]'
                            }`}
                        >
                            <span className="text-lg">{item.icon}</span>
                            {sidebarOpen && <span>{item.name}</span>}
                        </Link>
                    ))}
                </nav>

                {/* User Section */}
                <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-gray-100">
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#8b2fc9] to-[#ec1e63] flex items-center justify-center">
                            <span className="text-white font-semibold text-sm">
                                {user?.name?.charAt(0) || 'A'}
                            </span>
                        </div>
                        {sidebarOpen && (
                            <div className="flex-1 min-w-0">
                                <p className="text-sm font-semibold text-[#1a1425] truncate">
                                    {user?.name || 'Admin'}
                                </p>
                                <p className="text-xs text-gray-500 truncate">
                                    {user?.email || 'admin@rawliqueur.com'}
                                </p>
                            </div>
                        )}
                    </div>
                </div>
            </aside>

            {/* Main Content */}
            <div className={`transition-all duration-300 ${sidebarOpen ? 'ml-64' : 'ml-20'}`}>
                {/* Header */}
                <header className="sticky top-0 z-30 h-16 bg-white/80 backdrop-blur-lg border-b border-gray-100">
                    <div className="flex items-center justify-between h-full px-6">
                        <h1 className="text-xl font-bold text-[#1a1425]">{title}</h1>
                        <div className="flex items-center gap-4">
                            <Link
                                href="/"
                                className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-gray-600 hover:text-[#1a1425] hover:bg-gray-100 rounded-lg transition-colors"
                            >
                                🌐 View Site
                            </Link>
                            <div className="w-px h-6 bg-gray-200" />
                            <button className="relative p-2 text-gray-500 hover:text-[#1a1425] hover:bg-gray-100 rounded-lg transition-colors">
                                🔔
                                <span className="absolute top-1 right-1 w-2 h-2 bg-[#ec1e63] rounded-full" />
                            </button>
                        </div>
                    </div>
                </header>

                {/* Page Content */}
                <main className="p-6">
                    {children}
                </main>
            </div>
        </div>
    );
}
