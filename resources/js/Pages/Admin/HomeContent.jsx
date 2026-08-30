import { useState } from 'react';
import { useForm } from '@inertiajs/react';
import AdminLayout from '@/Layouts/AdminLayout';

export default function HomeContent({ content }) {
    const { data, setData, put, processing, errors } = useForm({
        hero: content.hero || {
            title: 'প্রতিভা ও কবিতা গানে',
            highlight: 'RAW LIQUEUR',
            subtitle: 'বাংলার প্রাণে',
            description: 'গানের মাঝে ফুটে বির থাগসাব সেরা প্রতিভা সবাইকে বেধান, সবাইকে শোনান।',
            buttonText: '♫ EXPLORE TALENTS',
            secondButtonText: 'HOW IT WORKS',
            bgImage: '/images/slider 1.png',
        },
        categories: content.categories || [
            { icon: '🎚️', label: 'All' },
            { icon: '🎵', label: 'Singing' },
            { icon: '💃', label: 'Dance' },
            { icon: '📖', label: 'Storytelling' },
            { icon: '🖋️', label: 'Poetry' },
            { icon: '🎸', label: 'Instrumental' },
            { icon: '▦', label: 'Others' },
        ],
        top_talents: content.top_talents || [],
        stats: content.stats || [],
        videos: content.videos || [],
        cta: content.cta || {
            tagline: 'BE THE NEXT FEATURED ARTIST',
            title: 'Show us your raw talent.',
            highlight: 'No AI, No Edit, Just You.',
            buttonText: '★ SUBMIT YOUR TALENT →',
        },
    });

    const [activeTab, setActiveTab] = useState('hero');
    const [uploading, setUploading] = useState(false);

    const handleSubmit = (e) => {
        e.preventDefault();
        put('/admin/home-content');
    };

    const handleFileUpload = async (e, section) => {
        const file = e.target.files[0];
        if (!file) return;

        setUploading(true);
        const formData = new FormData();
        formData.append('file', file);

        try {
            const response = await fetch('/admin/upload', {
                method: 'POST',
                body: formData,
                headers: {
                    'X-CSRF-TOKEN': document.querySelector('meta[name="csrf-token"]')?.getAttribute('content'),
                    'Accept': 'application/json',
                },
            });

            const result = await response.json();
            if (result.success) {
                if (section === 'hero') {
                    setData('hero', { ...data.hero, bgImage: result.url });
                } else if (section === 'cta') {
                    setData('cta', { ...data.cta, bgImage: result.url });
                }
            }
        } catch (error) {
            console.error('Upload failed:', error);
        } finally {
            setUploading(false);
        }
    };

    const tabs = [
        { id: 'hero', name: 'Hero Section', icon: '🎯' },
        { id: 'categories', name: 'Categories', icon: '📂' },
        { id: 'top_talents', name: 'Top Talents', icon: '⭐' },
        { id: 'stats', name: 'Statistics', icon: '📊' },
        { id: 'videos', name: 'Videos', icon: '🎬' },
        { id: 'cta', name: 'CTA Banner', icon: '📢' },
    ];

    return (
        <AdminLayout title="Home Page Content">
            <form onSubmit={handleSubmit}>
                <div className="flex flex-col lg:flex-row gap-6">
                    {/* Tabs Sidebar */}
                    <div className="lg:w-64 flex-shrink-0">
                        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-4 sticky top-24">
                            <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-4">Sections</h3>
                            <div className="space-y-1">
                                {tabs.map((tab) => (
                                    <button
                                        key={tab.id}
                                        type="button"
                                        onClick={() => setActiveTab(tab.id)}
                                        className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all ${
                                            activeTab === tab.id
                                                ? 'bg-gradient-to-r from-[#ec1e63] to-[#f7941e] text-white'
                                                : 'text-gray-600 hover:bg-gray-50'
                                        }`}
                                    >
                                        <span>{tab.icon}</span>
                                        {tab.name}
                                    </button>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Content Area */}
                    <div className="flex-1">
                        {/* Hero Section */}
                        {activeTab === 'hero' && (
                            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
                                <h3 className="text-lg font-bold text-[#1a1425] mb-6">Hero Section</h3>
                                <div className="space-y-4">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">Background Image</label>
                                        <div className="flex items-center gap-4">
                                            <label className="flex-1 flex flex-col items-center justify-center w-full h-32 border-2 border-dashed border-gray-300 rounded-xl cursor-pointer hover:border-[#ec1e63] hover:bg-pink-50/50 transition-all">
                                                <div className="flex flex-col items-center justify-center pt-5 pb-6">
                                                    {uploading ? (
                                                        <div className="text-center">
                                                            <div className="w-8 h-8 border-4 border-[#ec1e63] border-t-transparent rounded-full animate-spin mx-auto mb-2" />
                                                            <p className="text-sm text-gray-500">Uploading...</p>
                                                        </div>
                                                    ) : (
                                                        <>
                                                            <svg className="w-10 h-10 mb-3 text-gray-400" fill="none" viewBox="0 0 20 16">
                                                                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2" />
                                                            </svg>
                                                            <p className="text-sm text-gray-500"><span className="font-semibold">Click to upload</span></p>
                                                            <p className="text-xs text-gray-400">PNG, JPG, WEBP (MAX. 5MB)</p>
                                                        </>
                                                    )}
                                                </div>
                                                <input
                                                    type="file"
                                                    className="hidden"
                                                    accept="image/*"
                                                    onChange={(e) => handleFileUpload(e, 'bgImage')}
                                                    disabled={uploading}
                                                />
                                            </label>
                                            {data.hero.bgImage && (
                                                <div className="relative">
                                                    <img src={data.hero.bgImage} alt="Preview" className="w-40 h-32 object-cover rounded-xl border border-gray-200" />
                                                    <button
                                                        type="button"
                                                        onClick={() => setData('hero', { ...data.hero, bgImage: '' })}
                                                        className="absolute -top-2 -right-2 w-6 h-6 bg-red-500 text-white rounded-full flex items-center justify-center text-xs hover:bg-red-600"
                                                    >
                                                        ✕
                                                    </button>
                                                </div>
                                            )}
                                        </div>
                                        <p className="mt-2 text-xs text-gray-500">Upload a new background image for the hero section</p>
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">Title (Bengali)</label>
                                        <input
                                            type="text"
                                            value={data.hero.title}
                                            onChange={(e) => setData('hero', { ...data.hero, title: e.target.value })}
                                            className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#ec1e63]"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">Highlight Text</label>
                                        <input
                                            type="text"
                                            value={data.hero.highlight}
                                            onChange={(e) => setData('hero', { ...data.hero, highlight: e.target.value })}
                                            className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#ec1e63]"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">Subtitle (Bengali)</label>
                                        <input
                                            type="text"
                                            value={data.hero.subtitle}
                                            onChange={(e) => setData('hero', { ...data.hero, subtitle: e.target.value })}
                                            className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#ec1e63]"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
                                        <textarea
                                            rows={3}
                                            value={data.hero.description}
                                            onChange={(e) => setData('hero', { ...data.hero, description: e.target.value })}
                                            className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#ec1e63] resize-none"
                                        />
                                    </div>
                                    <div className="grid grid-cols-2 gap-4">
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-2">Primary Button</label>
                                            <input
                                                type="text"
                                                value={data.hero.buttonText}
                                                onChange={(e) => setData('hero', { ...data.hero, buttonText: e.target.value })}
                                                className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#ec1e63]"
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-2">Secondary Button</label>
                                            <input
                                                type="text"
                                                value={data.hero.secondButtonText}
                                                onChange={(e) => setData('hero', { ...data.hero, secondButtonText: e.target.value })}
                                                className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#ec1e63]"
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}

                        {/* Categories Section */}
                        {activeTab === 'categories' && (
                            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
                                <div className="flex items-center justify-between mb-6">
                                    <h3 className="text-lg font-bold text-[#1a1425]">Categories</h3>
                                    <button
                                        type="button"
                                        onClick={() => setData('categories', [...data.categories, { icon: '📁', label: 'New Category' }])}
                                        className="px-4 py-2 bg-[#ec1e63] text-white text-sm font-medium rounded-lg hover:bg-[#d1185a]"
                                    >
                                        + Add Category
                                    </button>
                                </div>
                                <div className="space-y-3">
                                    {data.categories.map((cat, index) => (
                                        <div key={index} className="flex items-center gap-4 p-4 bg-gray-50 rounded-xl">
                                            <input
                                                type="text"
                                                value={cat.icon}
                                                onChange={(e) => {
                                                    const newCategories = [...data.categories];
                                                    newCategories[index].icon = e.target.value;
                                                    setData('categories', newCategories);
                                                }}
                                                className="w-20 px-3 py-2 bg-white border border-gray-200 rounded-lg text-center text-lg focus:outline-none focus:ring-2 focus:ring-[#ec1e63]"
                                            />
                                            <input
                                                type="text"
                                                value={cat.label}
                                                onChange={(e) => {
                                                    const newCategories = [...data.categories];
                                                    newCategories[index].label = e.target.value;
                                                    setData('categories', newCategories);
                                                }}
                                                className="flex-1 px-4 py-2 bg-white border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#ec1e63]"
                                            />
                                            <button
                                                type="button"
                                                onClick={() => setData('categories', data.categories.filter((_, i) => i !== index))}
                                                className="p-2 text-red-500 hover:bg-red-50 rounded-lg"
                                            >
                                                🗑️
                                            </button>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}

                        {/* Top Talents Section */}
                        {activeTab === 'top_talents' && (
                            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
                                <div className="flex items-center justify-between mb-6">
                                    <h3 className="text-lg font-bold text-[#1a1425]">Top Talents</h3>
                                    <button
                                        type="button"
                                        onClick={() => setData('top_talents', [...data.top_talents, { rank: String(data.top_talents.length + 1).padStart(2, '0'), name: '', type: 'Singing', desc: '', likes: '0', videoId: '' }])}
                                        className="px-4 py-2 bg-[#ec1e63] text-white text-sm font-medium rounded-lg hover:bg-[#d1185a]"
                                    >
                                        + Add Talent
                                    </button>
                                </div>
                                <div className="space-y-4">
                                    {data.top_talents.map((talent, index) => (
                                        <div key={index} className="p-4 bg-gray-50 rounded-xl space-y-3">
                                            <div className="flex items-center justify-between">
                                                <span className="text-lg font-bold text-[#ec1e63]">#{talent.rank}</span>
                                                <button
                                                    type="button"
                                                    onClick={() => setData('top_talents', data.top_talents.filter((_, i) => i !== index))}
                                                    className="p-2 text-red-500 hover:bg-red-50 rounded-lg"
                                                >
                                                    🗑️
                                                </button>
                                            </div>
                                            <div className="grid grid-cols-2 gap-3">
                                                <input
                                                    type="text"
                                                    placeholder="Name"
                                                    value={talent.name}
                                                    onChange={(e) => {
                                                        const newTalents = [...data.top_talents];
                                                        newTalents[index].name = e.target.value;
                                                        setData('top_talents', newTalents);
                                                    }}
                                                    className="px-4 py-2 bg-white border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#ec1e63]"
                                                />
                                                <select
                                                    value={talent.type}
                                                    onChange={(e) => {
                                                        const newTalents = [...data.top_talents];
                                                        newTalents[index].type = e.target.value;
                                                        setData('top_talents', newTalents);
                                                    }}
                                                    className="px-4 py-2 bg-white border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#ec1e63]"
                                                >
                                                    <option value="Singing">Singing</option>
                                                    <option value="Dance">Dance</option>
                                                    <option value="Poetry">Poetry</option>
                                                    <option value="Instrumental">Instrumental</option>
                                                </select>
                                            </div>
                                            <input
                                                type="text"
                                                placeholder="Description"
                                                value={talent.desc}
                                                onChange={(e) => {
                                                    const newTalents = [...data.top_talents];
                                                    newTalents[index].desc = e.target.value;
                                                    setData('top_talents', newTalents);
                                                }}
                                                className="w-full px-4 py-2 bg-white border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#ec1e63]"
                                            />
                                            <div className="grid grid-cols-2 gap-3">
                                                <input
                                                    type="text"
                                                    placeholder="YouTube Video ID"
                                                    value={talent.videoId}
                                                    onChange={(e) => {
                                                        const newTalents = [...data.top_talents];
                                                        newTalents[index].videoId = e.target.value;
                                                        setData('top_talents', newTalents);
                                                    }}
                                                    className="px-4 py-2 bg-white border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#ec1e63]"
                                                />
                                                <input
                                                    type="text"
                                                    placeholder="Likes (e.g., 380K)"
                                                    value={talent.likes}
                                                    onChange={(e) => {
                                                        const newTalents = [...data.top_talents];
                                                        newTalents[index].likes = e.target.value;
                                                        setData('top_talents', newTalents);
                                                    }}
                                                    className="px-4 py-2 bg-white border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#ec1e63]"
                                                />
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}

                        {/* Stats Section */}
                        {activeTab === 'stats' && (
                            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
                                <div className="flex items-center justify-between mb-6">
                                    <h3 className="text-lg font-bold text-[#1a1425]">Statistics</h3>
                                    <button
                                        type="button"
                                        onClick={() => setData('stats', [...data.stats, { icon: '📊', value: '0', label: 'New Stat' }])}
                                        className="px-4 py-2 bg-[#ec1e63] text-white text-sm font-medium rounded-lg hover:bg-[#d1185a]"
                                    >
                                        + Add Stat
                                    </button>
                                </div>
                                <div className="space-y-3">
                                    {data.stats.map((stat, index) => (
                                        <div key={index} className="flex items-center gap-4 p-4 bg-gray-50 rounded-xl">
                                            <input
                                                type="text"
                                                value={stat.icon}
                                                onChange={(e) => {
                                                    const newStats = [...data.stats];
                                                    newStats[index].icon = e.target.value;
                                                    setData('stats', newStats);
                                                }}
                                                className="w-20 px-3 py-2 bg-white border border-gray-200 rounded-lg text-center text-lg focus:outline-none focus:ring-2 focus:ring-[#ec1e63]"
                                            />
                                            <input
                                                type="text"
                                                placeholder="Value (e.g., 25K+)"
                                                value={stat.value}
                                                onChange={(e) => {
                                                    const newStats = [...data.stats];
                                                    newStats[index].value = e.target.value;
                                                    setData('stats', newStats);
                                                }}
                                                className="w-32 px-4 py-2 bg-white border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#ec1e63]"
                                            />
                                            <input
                                                type="text"
                                                placeholder="Label"
                                                value={stat.label}
                                                onChange={(e) => {
                                                    const newStats = [...data.stats];
                                                    newStats[index].label = e.target.value;
                                                    setData('stats', newStats);
                                                }}
                                                className="flex-1 px-4 py-2 bg-white border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#ec1e63]"
                                            />
                                            <button
                                                type="button"
                                                onClick={() => setData('stats', data.stats.filter((_, i) => i !== index))}
                                                className="p-2 text-red-500 hover:bg-red-50 rounded-lg"
                                            >
                                                🗑️
                                            </button>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}

                        {/* Videos Section */}
                        {activeTab === 'videos' && (
                            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
                                <div className="flex items-center justify-between mb-6">
                                    <h3 className="text-lg font-bold text-[#1a1425]">Latest Performances</h3>
                                    <button
                                        type="button"
                                        onClick={() => setData('videos', [...data.videos, { tag: 'Singing', title: '', by: '', dur: '00:00', views: '0', likes: '0', videoId: '' }])}
                                        className="px-4 py-2 bg-[#ec1e63] text-white text-sm font-medium rounded-lg hover:bg-[#d1185a]"
                                    >
                                        + Add Video
                                    </button>
                                </div>
                                <div className="space-y-4">
                                    {data.videos.map((video, index) => (
                                        <div key={index} className="p-4 bg-gray-50 rounded-xl space-y-3">
                                            <div className="flex items-center justify-between">
                                                <span className="text-sm font-medium text-gray-500">Video {index + 1}</span>
                                                <button
                                                    type="button"
                                                    onClick={() => setData('videos', data.videos.filter((_, i) => i !== index))}
                                                    className="p-2 text-red-500 hover:bg-red-50 rounded-lg"
                                                >
                                                    🗑️
                                                </button>
                                            </div>
                                            <div className="grid grid-cols-2 gap-3">
                                                <input
                                                    type="text"
                                                    placeholder="Title"
                                                    value={video.title}
                                                    onChange={(e) => {
                                                        const newVideos = [...data.videos];
                                                        newVideos[index].title = e.target.value;
                                                        setData('videos', newVideos);
                                                    }}
                                                    className="px-4 py-2 bg-white border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#ec1e63]"
                                                />
                                                <input
                                                    type="text"
                                                    placeholder="Artist Name"
                                                    value={video.by}
                                                    onChange={(e) => {
                                                        const newVideos = [...data.videos];
                                                        newVideos[index].by = e.target.value;
                                                        setData('videos', newVideos);
                                                    }}
                                                    className="px-4 py-2 bg-white border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#ec1e63]"
                                                />
                                            </div>
                                            <div className="grid grid-cols-4 gap-3">
                                                <input
                                                    type="text"
                                                    placeholder="YouTube Video ID"
                                                    value={video.videoId}
                                                    onChange={(e) => {
                                                        const newVideos = [...data.videos];
                                                        newVideos[index].videoId = e.target.value;
                                                        setData('videos', newVideos);
                                                    }}
                                                    className="col-span-2 px-4 py-2 bg-white border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#ec1e63]"
                                                />
                                                <input
                                                    type="text"
                                                    placeholder="Duration"
                                                    value={video.dur}
                                                    onChange={(e) => {
                                                        const newVideos = [...data.videos];
                                                        newVideos[index].dur = e.target.value;
                                                        setData('videos', newVideos);
                                                    }}
                                                    className="px-4 py-2 bg-white border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#ec1e63]"
                                                />
                                                <input
                                                    type="text"
                                                    placeholder="Views"
                                                    value={video.views}
                                                    onChange={(e) => {
                                                        const newVideos = [...data.videos];
                                                        newVideos[index].views = e.target.value;
                                                        setData('videos', newVideos);
                                                    }}
                                                    className="px-4 py-2 bg-white border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#ec1e63]"
                                                />
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}

                        {/* CTA Section */}
                        {activeTab === 'cta' && (
                            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
                                <h3 className="text-lg font-bold text-[#1a1425] mb-6">CTA Banner</h3>
                                <div className="space-y-4">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">Background Image</label>
                                        <div className="flex items-center gap-4">
                                            <label className="flex-1 flex flex-col items-center justify-center w-full h-32 border-2 border-dashed border-gray-300 rounded-xl cursor-pointer hover:border-[#ec1e63] hover:bg-pink-50/50 transition-all">
                                                <div className="flex flex-col items-center justify-center pt-5 pb-6">
                                                    {uploading ? (
                                                        <div className="text-center">
                                                            <div className="w-8 h-8 border-4 border-[#ec1e63] border-t-transparent rounded-full animate-spin mx-auto mb-2" />
                                                            <p className="text-sm text-gray-500">Uploading...</p>
                                                        </div>
                                                    ) : (
                                                        <>
                                                            <svg className="w-10 h-10 mb-3 text-gray-400" fill="none" viewBox="0 0 20 16">
                                                                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2" />
                                                            </svg>
                                                            <p className="text-sm text-gray-500"><span className="font-semibold">Click to upload</span></p>
                                                            <p className="text-xs text-gray-400">PNG, JPG, WEBP (MAX. 5MB)</p>
                                                        </>
                                                    )}
                                                </div>
                                                <input
                                                    type="file"
                                                    className="hidden"
                                                    accept="image/*"
                                                    onChange={(e) => handleFileUpload(e, 'cta')}
                                                    disabled={uploading}
                                                />
                                            </label>
                                            {data.cta.bgImage && (
                                                <div className="relative">
                                                    <img src={data.cta.bgImage} alt="Preview" className="w-40 h-32 object-cover rounded-xl border border-gray-200" />
                                                    <button
                                                        type="button"
                                                        onClick={() => setData('cta', { ...data.cta, bgImage: '' })}
                                                        className="absolute -top-2 -right-2 w-6 h-6 bg-red-500 text-white rounded-full flex items-center justify-center text-xs hover:bg-red-600"
                                                    >
                                                        ✕
                                                    </button>
                                                </div>
                                            )}
                                        </div>
                                        <p className="mt-2 text-xs text-gray-500">Upload a background image for the CTA banner</p>
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">Tagline</label>
                                        <input
                                            type="text"
                                            value={data.cta.tagline}
                                            onChange={(e) => setData('cta', { ...data.cta, tagline: e.target.value })}
                                            className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#ec1e63]"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">Title</label>
                                        <input
                                            type="text"
                                            value={data.cta.title}
                                            onChange={(e) => setData('cta', { ...data.cta, title: e.target.value })}
                                            className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#ec1e63]"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">Highlight Text</label>
                                        <input
                                            type="text"
                                            value={data.cta.highlight}
                                            onChange={(e) => setData('cta', { ...data.cta, highlight: e.target.value })}
                                            className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#ec1e63]"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">Button Text</label>
                                        <input
                                            type="text"
                                            value={data.cta.buttonText}
                                            onChange={(e) => setData('cta', { ...data.cta, buttonText: e.target.value })}
                                            className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#ec1e63]"
                                        />
                                    </div>
                                </div>
                            </div>
                        )}

                        {/* Save Button */}
                        <div className="mt-6 flex justify-end">
                            <button
                                type="submit"
                                disabled={processing}
                                className="px-8 py-3 bg-gradient-to-r from-[#ec1e63] to-[#f7941e] text-white font-semibold rounded-xl hover:shadow-lg hover:shadow-pink-200 transition-all disabled:opacity-50"
                            >
                                {processing ? 'Saving...' : 'Save All Changes'}
                            </button>
                        </div>
                    </div>
                </div>
            </form>
        </AdminLayout>
    );
}
