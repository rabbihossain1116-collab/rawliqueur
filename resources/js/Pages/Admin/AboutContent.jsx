import AdminLayout from '@/Layouts/AdminLayout';
import { useForm, usePage } from '@inertiajs/react';
import { useState } from 'react';

export default function AboutContent({ content }) {
    const { flash } = usePage().props;
    const [activeTab, setActiveTab] = useState('hero');
    const [uploading, setUploading] = useState(false);

    const { data, setData, put, processing } = useForm({
        hero: content?.hero || {
            bgImage: '/images/aboutuse.png',
            title: 'প্রতিভা ও কবিতা গানে',
            subtitle: 'RAW LIQUEUR রাজনির প্রানে',
        },
        voice_pairs_1: content?.voice_pairs_1 || [
            {
                left: { image: '/images/kumar-sanu.webp', name: 'Kumar Sanu', role: 'Playback Singer', quote: '' },
                right: { image: '/images/lata-mangeshkar.webp', name: 'Lata Mangeshkar', role: 'Playback Singer', quote: '' },
            },
        ],
        features: content?.features || [],
        voice_pairs_2: content?.voice_pairs_2 || [
            {
                left: { image: '/images/hemant-kumar.webp', name: 'Hemanta Mukhopadhyay', role: 'Singer & Composer', quote: '' },
                right: { image: '/images/jibanananda-das.webp', name: 'Jibanananda Das', role: 'Poet', quote: '' },
            },
        ],
        journey: content?.journey || {
            subtitle: 'Our Journey',
            title: 'A Journey Towards Real Recognition',
            description: '',
            buttonText: 'Join Our Journey',
            stats: [],
            impactStat: { icon: '📣', value: '1M+', label: 'Lives Impacted', description: '' },
        },
        community_1: content?.community_1 || [],
        values: content?.values || [],
        community_2: content?.community_2 || [],
        cta: content?.cta || {
            icon: '🎙',
            subtitle: 'Be Part of Our Mission',
            title: 'Help Us Celebrate Real Talent',
            description: '',
            buttonText: '✎ Submit Your Talent →',
        },
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        put('/admin/about-content');
    };

    const handleFileUpload = async (e, path) => {
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
                return result.url;
            }
        } catch (error) {
            console.error('Upload failed:', error);
        } finally {
            setUploading(false);
        }
        return null;
    };

    const tabs = [
        { id: 'hero', name: 'Hero', icon: '🎯' },
        { id: 'voice_pairs_1', name: 'Voice of Bengal 1', icon: '🎵' },
        { id: 'features', name: 'Features', icon: '✨' },
        { id: 'voice_pairs_2', name: 'Voice of Bengal 2', icon: '🎶' },
        { id: 'journey', name: 'Journey', icon: '🚀' },
        { id: 'community_1', name: 'Community 1', icon: '👥' },
        { id: 'values', name: 'Values', icon: '💎' },
        { id: 'community_2', name: 'Community 2', icon: '🤝' },
        { id: 'cta', name: 'CTA', icon: '📢' },
    ];

    return (
        <AdminLayout title="About Content Editor">
            {flash?.success && (
                <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-xl text-green-700 text-sm">
                    {flash.success}
                </div>
            )}

            <form onSubmit={handleSubmit}>
                <div className="flex gap-2 mb-6 overflow-x-auto pb-2">
                    {tabs.map((tab) => (
                        <button
                            key={tab.id}
                            type="button"
                            onClick={() => setActiveTab(tab.id)}
                            className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium whitespace-nowrap transition-all ${
                                activeTab === tab.id
                                    ? 'bg-gradient-to-r from-[#ec1e63] to-[#f7941e] text-white shadow-lg'
                                    : 'bg-white text-gray-600 hover:bg-gray-50 border border-gray-200'
                            }`}
                        >
                            <span>{tab.icon}</span>
                            {tab.name}
                        </button>
                    ))}
                </div>

                <div className="space-y-6">
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
                                                onChange={async (e) => {
                                                    const url = await handleFileUpload(e);
                                                    if (url) setData('hero', { ...data.hero, bgImage: url });
                                                }}
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
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">Title</label>
                                    <input
                                        type="text"
                                        value={data.hero.title}
                                        onChange={(e) => setData('hero', { ...data.hero, title: e.target.value })}
                                        className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#ec1e63]"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">Subtitle</label>
                                    <input
                                        type="text"
                                        value={data.hero.subtitle}
                                        onChange={(e) => setData('hero', { ...data.hero, subtitle: e.target.value })}
                                        className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#ec1e63]"
                                    />
                                </div>
                            </div>
                        </div>
                    )}

                    {/* Voice Pairs 1 */}
                    {activeTab === 'voice_pairs_1' && (
                        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
                            <div className="flex items-center justify-between mb-6">
                                <h3 className="text-lg font-bold text-[#1a1425]">Voice of Bengal 1</h3>
                                <button
                                    type="button"
                                    onClick={() => setData('voice_pairs_1', [...data.voice_pairs_1, {
                                        left: { image: '', name: '', role: '', quote: '' },
                                        right: { image: '', name: '', role: '', quote: '' },
                                    }])}
                                    className="px-4 py-2 bg-[#ec1e63] text-white text-sm font-medium rounded-lg hover:bg-[#d1185a]"
                                >
                                    + Add Pair
                                </button>
                            </div>
                            <div className="space-y-6">
                                {data.voice_pairs_1.map((pair, index) => (
                                    <div key={index} className="p-4 bg-gray-50 rounded-xl space-y-4">
                                        <div className="flex items-center justify-between">
                                            <span className="text-sm font-medium text-gray-500">Pair {index + 1}</span>
                                            <button
                                                type="button"
                                                onClick={() => setData('voice_pairs_1', data.voice_pairs_1.filter((_, i) => i !== index))}
                                                className="p-2 text-red-500 hover:bg-red-50 rounded-lg"
                                            >
                                                🗑️
                                            </button>
                                        </div>
                                        <div className="grid grid-cols-2 gap-4">
                                            {/* Left */}
                                            <div className="space-y-3">
                                                <h4 className="text-xs font-semibold text-gray-500 uppercase">Left</h4>
                                                <input
                                                    type="text"
                                                    placeholder="Name"
                                                    value={pair.left.name}
                                                    onChange={(e) => {
                                                        const newPairs = [...data.voice_pairs_1];
                                                        newPairs[index].left.name = e.target.value;
                                                        setData('voice_pairs_1', newPairs);
                                                    }}
                                                    className="w-full px-4 py-2 bg-white border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#ec1e63]"
                                                />
                                                <input
                                                    type="text"
                                                    placeholder="Role"
                                                    value={pair.left.role}
                                                    onChange={(e) => {
                                                        const newPairs = [...data.voice_pairs_1];
                                                        newPairs[index].left.role = e.target.value;
                                                        setData('voice_pairs_1', newPairs);
                                                    }}
                                                    className="w-full px-4 py-2 bg-white border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#ec1e63]"
                                                />
                                                <input
                                                    type="text"
                                                    placeholder="Image URL"
                                                    value={pair.left.image}
                                                    onChange={(e) => {
                                                        const newPairs = [...data.voice_pairs_1];
                                                        newPairs[index].left.image = e.target.value;
                                                        setData('voice_pairs_1', newPairs);
                                                    }}
                                                    className="w-full px-4 py-2 bg-white border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#ec1e63]"
                                                />
                                                <textarea
                                                    placeholder="Quote"
                                                    value={pair.left.quote}
                                                    onChange={(e) => {
                                                        const newPairs = [...data.voice_pairs_1];
                                                        newPairs[index].left.quote = e.target.value;
                                                        setData('voice_pairs_1', newPairs);
                                                    }}
                                                    className="w-full px-4 py-2 bg-white border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#ec1e63]"
                                                    rows={2}
                                                />
                                            </div>
                                            {/* Right */}
                                            <div className="space-y-3">
                                                <h4 className="text-xs font-semibold text-gray-500 uppercase">Right</h4>
                                                <input
                                                    type="text"
                                                    placeholder="Name"
                                                    value={pair.right.name}
                                                    onChange={(e) => {
                                                        const newPairs = [...data.voice_pairs_1];
                                                        newPairs[index].right.name = e.target.value;
                                                        setData('voice_pairs_1', newPairs);
                                                    }}
                                                    className="w-full px-4 py-2 bg-white border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#ec1e63]"
                                                />
                                                <input
                                                    type="text"
                                                    placeholder="Role"
                                                    value={pair.right.role}
                                                    onChange={(e) => {
                                                        const newPairs = [...data.voice_pairs_1];
                                                        newPairs[index].right.role = e.target.value;
                                                        setData('voice_pairs_1', newPairs);
                                                    }}
                                                    className="w-full px-4 py-2 bg-white border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#ec1e63]"
                                                />
                                                <input
                                                    type="text"
                                                    placeholder="Image URL"
                                                    value={pair.right.image}
                                                    onChange={(e) => {
                                                        const newPairs = [...data.voice_pairs_1];
                                                        newPairs[index].right.image = e.target.value;
                                                        setData('voice_pairs_1', newPairs);
                                                    }}
                                                    className="w-full px-4 py-2 bg-white border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#ec1e63]"
                                                />
                                                <textarea
                                                    placeholder="Quote"
                                                    value={pair.right.quote}
                                                    onChange={(e) => {
                                                        const newPairs = [...data.voice_pairs_1];
                                                        newPairs[index].right.quote = e.target.value;
                                                        setData('voice_pairs_1', newPairs);
                                                    }}
                                                    className="w-full px-4 py-2 bg-white border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#ec1e63]"
                                                    rows={2}
                                                />
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* Features */}
                    {activeTab === 'features' && (
                        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
                            <div className="flex items-center justify-between mb-6">
                                <h3 className="text-lg font-bold text-[#1a1425]">What Makes Us Different</h3>
                                <button
                                    type="button"
                                    onClick={() => setData('features', [...data.features, { icon: '✨', title: '', desc: '' }])}
                                    className="px-4 py-2 bg-[#ec1e63] text-white text-sm font-medium rounded-lg hover:bg-[#d1185a]"
                                >
                                    + Add Feature
                                </button>
                            </div>
                            <div className="space-y-4">
                                {data.features.map((feature, index) => (
                                    <div key={index} className="flex items-start gap-3 p-4 bg-gray-50 rounded-xl">
                                        <input
                                            type="text"
                                            placeholder="Icon"
                                            value={feature.icon}
                                            onChange={(e) => {
                                                const newFeatures = [...data.features];
                                                newFeatures[index].icon = e.target.value;
                                                setData('features', newFeatures);
                                            }}
                                            className="w-16 px-3 py-2 bg-white border border-gray-200 rounded-lg text-sm text-center focus:outline-none focus:ring-2 focus:ring-[#ec1e63]"
                                        />
                                        <input
                                            type="text"
                                            placeholder="Title"
                                            value={feature.title}
                                            onChange={(e) => {
                                                const newFeatures = [...data.features];
                                                newFeatures[index].title = e.target.value;
                                                setData('features', newFeatures);
                                            }}
                                            className="flex-1 px-4 py-2 bg-white border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#ec1e63]"
                                        />
                                        <input
                                            type="text"
                                            placeholder="Description"
                                            value={feature.desc}
                                            onChange={(e) => {
                                                const newFeatures = [...data.features];
                                                newFeatures[index].desc = e.target.value;
                                                setData('features', newFeatures);
                                            }}
                                            className="flex-1 px-4 py-2 bg-white border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#ec1e63]"
                                        />
                                        <button
                                            type="button"
                                            onClick={() => setData('features', data.features.filter((_, i) => i !== index))}
                                            className="p-2 text-red-500 hover:bg-red-50 rounded-lg"
                                        >
                                            🗑️
                                        </button>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* Voice Pairs 2 */}
                    {activeTab === 'voice_pairs_2' && (
                        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
                            <div className="flex items-center justify-between mb-6">
                                <h3 className="text-lg font-bold text-[#1a1425]">Voice of Bengal 2</h3>
                                <button
                                    type="button"
                                    onClick={() => setData('voice_pairs_2', [...data.voice_pairs_2, {
                                        left: { image: '', name: '', role: '', quote: '' },
                                        right: { image: '', name: '', role: '', quote: '' },
                                    }])}
                                    className="px-4 py-2 bg-[#ec1e63] text-white text-sm font-medium rounded-lg hover:bg-[#d1185a]"
                                >
                                    + Add Pair
                                </button>
                            </div>
                            <div className="space-y-6">
                                {data.voice_pairs_2.map((pair, index) => (
                                    <div key={index} className="p-4 bg-gray-50 rounded-xl space-y-4">
                                        <div className="flex items-center justify-between">
                                            <span className="text-sm font-medium text-gray-500">Pair {index + 1}</span>
                                            <button
                                                type="button"
                                                onClick={() => setData('voice_pairs_2', data.voice_pairs_2.filter((_, i) => i !== index))}
                                                className="p-2 text-red-500 hover:bg-red-50 rounded-lg"
                                            >
                                                🗑️
                                            </button>
                                        </div>
                                        <div className="grid grid-cols-2 gap-4">
                                            {/* Left */}
                                            <div className="space-y-3">
                                                <h4 className="text-xs font-semibold text-gray-500 uppercase">Left</h4>
                                                <input
                                                    type="text"
                                                    placeholder="Name"
                                                    value={pair.left.name}
                                                    onChange={(e) => {
                                                        const newPairs = [...data.voice_pairs_2];
                                                        newPairs[index].left.name = e.target.value;
                                                        setData('voice_pairs_2', newPairs);
                                                    }}
                                                    className="w-full px-4 py-2 bg-white border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#ec1e63]"
                                                />
                                                <input
                                                    type="text"
                                                    placeholder="Role"
                                                    value={pair.left.role}
                                                    onChange={(e) => {
                                                        const newPairs = [...data.voice_pairs_2];
                                                        newPairs[index].left.role = e.target.value;
                                                        setData('voice_pairs_2', newPairs);
                                                    }}
                                                    className="w-full px-4 py-2 bg-white border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#ec1e63]"
                                                />
                                                <input
                                                    type="text"
                                                    placeholder="Image URL"
                                                    value={pair.left.image}
                                                    onChange={(e) => {
                                                        const newPairs = [...data.voice_pairs_2];
                                                        newPairs[index].left.image = e.target.value;
                                                        setData('voice_pairs_2', newPairs);
                                                    }}
                                                    className="w-full px-4 py-2 bg-white border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#ec1e63]"
                                                />
                                                <textarea
                                                    placeholder="Quote"
                                                    value={pair.left.quote}
                                                    onChange={(e) => {
                                                        const newPairs = [...data.voice_pairs_2];
                                                        newPairs[index].left.quote = e.target.value;
                                                        setData('voice_pairs_2', newPairs);
                                                    }}
                                                    className="w-full px-4 py-2 bg-white border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#ec1e63]"
                                                    rows={2}
                                                />
                                            </div>
                                            {/* Right */}
                                            <div className="space-y-3">
                                                <h4 className="text-xs font-semibold text-gray-500 uppercase">Right</h4>
                                                <input
                                                    type="text"
                                                    placeholder="Name"
                                                    value={pair.right.name}
                                                    onChange={(e) => {
                                                        const newPairs = [...data.voice_pairs_2];
                                                        newPairs[index].right.name = e.target.value;
                                                        setData('voice_pairs_2', newPairs);
                                                    }}
                                                    className="w-full px-4 py-2 bg-white border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#ec1e63]"
                                                />
                                                <input
                                                    type="text"
                                                    placeholder="Role"
                                                    value={pair.right.role}
                                                    onChange={(e) => {
                                                        const newPairs = [...data.voice_pairs_2];
                                                        newPairs[index].right.role = e.target.value;
                                                        setData('voice_pairs_2', newPairs);
                                                    }}
                                                    className="w-full px-4 py-2 bg-white border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#ec1e63]"
                                                />
                                                <input
                                                    type="text"
                                                    placeholder="Image URL"
                                                    value={pair.right.image}
                                                    onChange={(e) => {
                                                        const newPairs = [...data.voice_pairs_2];
                                                        newPairs[index].right.image = e.target.value;
                                                        setData('voice_pairs_2', newPairs);
                                                    }}
                                                    className="w-full px-4 py-2 bg-white border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#ec1e63]"
                                                />
                                                <textarea
                                                    placeholder="Quote"
                                                    value={pair.right.quote}
                                                    onChange={(e) => {
                                                        const newPairs = [...data.voice_pairs_2];
                                                        newPairs[index].right.quote = e.target.value;
                                                        setData('voice_pairs_2', newPairs);
                                                    }}
                                                    className="w-full px-4 py-2 bg-white border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#ec1e63]"
                                                    rows={2}
                                                />
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* Journey */}
                    {activeTab === 'journey' && (
                        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
                            <h3 className="text-lg font-bold text-[#1a1425] mb-6">Journey Section</h3>
                            <div className="space-y-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">Subtitle</label>
                                    <input
                                        type="text"
                                        value={data.journey.subtitle}
                                        onChange={(e) => setData('journey', { ...data.journey, subtitle: e.target.value })}
                                        className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#ec1e63]"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">Title</label>
                                    <input
                                        type="text"
                                        value={data.journey.title}
                                        onChange={(e) => setData('journey', { ...data.journey, title: e.target.value })}
                                        className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#ec1e63]"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
                                    <textarea
                                        value={data.journey.description}
                                        onChange={(e) => setData('journey', { ...data.journey, description: e.target.value })}
                                        className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#ec1e63]"
                                        rows={4}
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">Button Text</label>
                                    <input
                                        type="text"
                                        value={data.journey.buttonText}
                                        onChange={(e) => setData('journey', { ...data.journey, buttonText: e.target.value })}
                                        className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#ec1e63]"
                                    />
                                </div>
                                <div>
                                    <div className="flex items-center justify-between mb-3">
                                        <label className="block text-sm font-medium text-gray-700">Stats</label>
                                        <button
                                            type="button"
                                            onClick={() => setData('journey', {
                                                ...data.journey,
                                                stats: [...(data.journey.stats || []), { icon: '📊', value: '', label: '' }],
                                            })}
                                            className="px-3 py-1.5 bg-[#ec1e63] text-white text-xs font-medium rounded-lg hover:bg-[#d1185a]"
                                        >
                                            + Add Stat
                                        </button>
                                    </div>
                                    <div className="space-y-3">
                                        {(data.journey.stats || []).map((stat, index) => (
                                            <div key={index} className="flex items-center gap-3">
                                                <input
                                                    type="text"
                                                    placeholder="Icon"
                                                    value={stat.icon}
                                                    onChange={(e) => {
                                                        const newStats = [...data.journey.stats];
                                                        newStats[index].icon = e.target.value;
                                                        setData('journey', { ...data.journey, stats: newStats });
                                                    }}
                                                    className="w-16 px-3 py-2 bg-gray-50 border border-gray-200 rounded-lg text-sm text-center focus:outline-none focus:ring-2 focus:ring-[#ec1e63]"
                                                />
                                                <input
                                                    type="text"
                                                    placeholder="Value"
                                                    value={stat.value}
                                                    onChange={(e) => {
                                                        const newStats = [...data.journey.stats];
                                                        newStats[index].value = e.target.value;
                                                        setData('journey', { ...data.journey, stats: newStats });
                                                    }}
                                                    className="flex-1 px-4 py-2 bg-gray-50 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#ec1e63]"
                                                />
                                                <input
                                                    type="text"
                                                    placeholder="Label"
                                                    value={stat.label}
                                                    onChange={(e) => {
                                                        const newStats = [...data.journey.stats];
                                                        newStats[index].label = e.target.value;
                                                        setData('journey', { ...data.journey, stats: newStats });
                                                    }}
                                                    className="flex-1 px-4 py-2 bg-gray-50 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#ec1e63]"
                                                />
                                                <button
                                                    type="button"
                                                    onClick={() => setData('journey', {
                                                        ...data.journey,
                                                        stats: data.journey.stats.filter((_, i) => i !== index),
                                                    })}
                                                    className="p-2 text-red-500 hover:bg-red-50 rounded-lg"
                                                >
                                                    🗑️
                                                </button>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">Impact Stat</label>
                                    <div className="grid grid-cols-2 gap-3">
                                        <input
                                            type="text"
                                            placeholder="Icon"
                                            value={data.journey.impactStat?.icon || ''}
                                            onChange={(e) => setData('journey', {
                                                ...data.journey,
                                                impactStat: { ...data.journey.impactStat, icon: e.target.value },
                                            })}
                                            className="px-4 py-2 bg-gray-50 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#ec1e63]"
                                        />
                                        <input
                                            type="text"
                                            placeholder="Value"
                                            value={data.journey.impactStat?.value || ''}
                                            onChange={(e) => setData('journey', {
                                                ...data.journey,
                                                impactStat: { ...data.journey.impactStat, value: e.target.value },
                                            })}
                                            className="px-4 py-2 bg-gray-50 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#ec1e63]"
                                        />
                                        <input
                                            type="text"
                                            placeholder="Label"
                                            value={data.journey.impactStat?.label || ''}
                                            onChange={(e) => setData('journey', {
                                                ...data.journey,
                                                impactStat: { ...data.journey.impactStat, label: e.target.value },
                                            })}
                                            className="px-4 py-2 bg-gray-50 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#ec1e63]"
                                        />
                                        <input
                                            type="text"
                                            placeholder="Description"
                                            value={data.journey.impactStat?.description || ''}
                                            onChange={(e) => setData('journey', {
                                                ...data.journey,
                                                impactStat: { ...data.journey.impactStat, description: e.target.value },
                                            })}
                                            className="px-4 py-2 bg-gray-50 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#ec1e63]"
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}

                    {/* Community 1 */}
                    {activeTab === 'community_1' && (
                        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
                            <div className="flex items-center justify-between mb-6">
                                <h3 className="text-lg font-bold text-[#1a1425]">Voices of Community 1</h3>
                                <button
                                    type="button"
                                    onClick={() => setData('community_1', [...data.community_1, { initials: '', name: '', role: '', quote: '' }])}
                                    className="px-4 py-2 bg-[#ec1e63] text-white text-sm font-medium rounded-lg hover:bg-[#d1185a]"
                                >
                                    + Add Member
                                </button>
                            </div>
                            <div className="space-y-4">
                                {data.community_1.map((member, index) => (
                                    <div key={index} className="flex items-start gap-3 p-4 bg-gray-50 rounded-xl">
                                        <input
                                            type="text"
                                            placeholder="Initials"
                                            value={member.initials}
                                            onChange={(e) => {
                                                const newMembers = [...data.community_1];
                                                newMembers[index].initials = e.target.value;
                                                setData('community_1', newMembers);
                                            }}
                                            className="w-20 px-3 py-2 bg-white border border-gray-200 rounded-lg text-sm text-center focus:outline-none focus:ring-2 focus:ring-[#ec1e63]"
                                        />
                                        <input
                                            type="text"
                                            placeholder="Name"
                                            value={member.name}
                                            onChange={(e) => {
                                                const newMembers = [...data.community_1];
                                                newMembers[index].name = e.target.value;
                                                setData('community_1', newMembers);
                                            }}
                                            className="flex-1 px-4 py-2 bg-white border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#ec1e63]"
                                        />
                                        <input
                                            type="text"
                                            placeholder="Role"
                                            value={member.role}
                                            onChange={(e) => {
                                                const newMembers = [...data.community_1];
                                                newMembers[index].role = e.target.value;
                                                setData('community_1', newMembers);
                                            }}
                                            className="flex-1 px-4 py-2 bg-white border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#ec1e63]"
                                        />
                                        <input
                                            type="text"
                                            placeholder="Quote"
                                            value={member.quote}
                                            onChange={(e) => {
                                                const newMembers = [...data.community_1];
                                                newMembers[index].quote = e.target.value;
                                                setData('community_1', newMembers);
                                            }}
                                            className="flex-1 px-4 py-2 bg-white border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#ec1e63]"
                                        />
                                        <button
                                            type="button"
                                            onClick={() => setData('community_1', data.community_1.filter((_, i) => i !== index))}
                                            className="p-2 text-red-500 hover:bg-red-50 rounded-lg"
                                        >
                                            🗑️
                                        </button>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* Values */}
                    {activeTab === 'values' && (
                        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
                            <div className="flex items-center justify-between mb-6">
                                <h3 className="text-lg font-bold text-[#1a1425]">Our Values</h3>
                                <button
                                    type="button"
                                    onClick={() => setData('values', [...data.values, { icon: '💎', title: '', desc: '' }])}
                                    className="px-4 py-2 bg-[#ec1e63] text-white text-sm font-medium rounded-lg hover:bg-[#d1185a]"
                                >
                                    + Add Value
                                </button>
                            </div>
                            <div className="space-y-4">
                                {data.values.map((value, index) => (
                                    <div key={index} className="flex items-start gap-3 p-4 bg-gray-50 rounded-xl">
                                        <input
                                            type="text"
                                            placeholder="Icon"
                                            value={value.icon}
                                            onChange={(e) => {
                                                const newValues = [...data.values];
                                                newValues[index].icon = e.target.value;
                                                setData('values', newValues);
                                            }}
                                            className="w-16 px-3 py-2 bg-white border border-gray-200 rounded-lg text-sm text-center focus:outline-none focus:ring-2 focus:ring-[#ec1e63]"
                                        />
                                        <input
                                            type="text"
                                            placeholder="Title"
                                            value={value.title}
                                            onChange={(e) => {
                                                const newValues = [...data.values];
                                                newValues[index].title = e.target.value;
                                                setData('values', newValues);
                                            }}
                                            className="flex-1 px-4 py-2 bg-white border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#ec1e63]"
                                        />
                                        <input
                                            type="text"
                                            placeholder="Description"
                                            value={value.desc}
                                            onChange={(e) => {
                                                const newValues = [...data.values];
                                                newValues[index].desc = e.target.value;
                                                setData('values', newValues);
                                            }}
                                            className="flex-1 px-4 py-2 bg-white border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#ec1e63]"
                                        />
                                        <button
                                            type="button"
                                            onClick={() => setData('values', data.values.filter((_, i) => i !== index))}
                                            className="p-2 text-red-500 hover:bg-red-50 rounded-lg"
                                        >
                                            🗑️
                                        </button>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* Community 2 */}
                    {activeTab === 'community_2' && (
                        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
                            <div className="flex items-center justify-between mb-6">
                                <h3 className="text-lg font-bold text-[#1a1425]">Voices of Community 2</h3>
                                <button
                                    type="button"
                                    onClick={() => setData('community_2', [...data.community_2, { initials: '', name: '', role: '', quote: '' }])}
                                    className="px-4 py-2 bg-[#ec1e63] text-white text-sm font-medium rounded-lg hover:bg-[#d1185a]"
                                >
                                    + Add Member
                                </button>
                            </div>
                            <div className="space-y-4">
                                {data.community_2.map((member, index) => (
                                    <div key={index} className="flex items-start gap-3 p-4 bg-gray-50 rounded-xl">
                                        <input
                                            type="text"
                                            placeholder="Initials"
                                            value={member.initials}
                                            onChange={(e) => {
                                                const newMembers = [...data.community_2];
                                                newMembers[index].initials = e.target.value;
                                                setData('community_2', newMembers);
                                            }}
                                            className="w-20 px-3 py-2 bg-white border border-gray-200 rounded-lg text-sm text-center focus:outline-none focus:ring-2 focus:ring-[#ec1e63]"
                                        />
                                        <input
                                            type="text"
                                            placeholder="Name"
                                            value={member.name}
                                            onChange={(e) => {
                                                const newMembers = [...data.community_2];
                                                newMembers[index].name = e.target.value;
                                                setData('community_2', newMembers);
                                            }}
                                            className="flex-1 px-4 py-2 bg-white border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#ec1e63]"
                                        />
                                        <input
                                            type="text"
                                            placeholder="Role"
                                            value={member.role}
                                            onChange={(e) => {
                                                const newMembers = [...data.community_2];
                                                newMembers[index].role = e.target.value;
                                                setData('community_2', newMembers);
                                            }}
                                            className="flex-1 px-4 py-2 bg-white border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#ec1e63]"
                                        />
                                        <input
                                            type="text"
                                            placeholder="Quote"
                                            value={member.quote}
                                            onChange={(e) => {
                                                const newMembers = [...data.community_2];
                                                newMembers[index].quote = e.target.value;
                                                setData('community_2', newMembers);
                                            }}
                                            className="flex-1 px-4 py-2 bg-white border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#ec1e63]"
                                        />
                                        <button
                                            type="button"
                                            onClick={() => setData('community_2', data.community_2.filter((_, i) => i !== index))}
                                            className="p-2 text-red-500 hover:bg-red-50 rounded-lg"
                                        >
                                            🗑️
                                        </button>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* CTA */}
                    {activeTab === 'cta' && (
                        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
                            <h3 className="text-lg font-bold text-[#1a1425] mb-6">CTA Section</h3>
                            <div className="space-y-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">Icon</label>
                                    <input
                                        type="text"
                                        value={data.cta.icon}
                                        onChange={(e) => setData('cta', { ...data.cta, icon: e.target.value })}
                                        className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#ec1e63]"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">Subtitle</label>
                                    <input
                                        type="text"
                                        value={data.cta.subtitle}
                                        onChange={(e) => setData('cta', { ...data.cta, subtitle: e.target.value })}
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
                                    <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
                                    <textarea
                                        value={data.cta.description}
                                        onChange={(e) => setData('cta', { ...data.cta, description: e.target.value })}
                                        className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#ec1e63]"
                                        rows={3}
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
                </div>

                <div className="mt-6 flex justify-end">
                    <button
                        type="submit"
                        disabled={processing}
                        className="px-8 py-3 bg-gradient-to-r from-[#ec1e63] to-[#f7941e] text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all disabled:opacity-50"
                    >
                        {processing ? 'Saving...' : 'Save All Changes'}
                    </button>
                </div>
            </form>
        </AdminLayout>
    );
}
