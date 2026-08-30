import AdminLayout from '@/Layouts/AdminLayout';
import { useForm, usePage } from '@inertiajs/react';
import { useState } from 'react';

function ImageUpload({ value, onChange, uploading }) {
    return (
        <div className="flex items-center gap-3">
            <label className="flex-1 flex flex-col items-center justify-center w-full h-24 border-2 border-dashed border-gray-300 rounded-xl cursor-pointer hover:border-[#ec1e63] hover:bg-pink-50/50 transition-all">
                <div className="flex flex-col items-center justify-center pt-2 pb-2">
                    {uploading ? (
                        <div className="text-center">
                            <div className="w-6 h-6 border-4 border-[#ec1e63] border-t-transparent rounded-full animate-spin mx-auto mb-1" />
                            <p className="text-xs text-gray-500">Uploading...</p>
                        </div>
                    ) : (
                        <>
                            <svg className="w-8 h-8 mb-1 text-gray-400" fill="none" viewBox="0 0 20 16">
                                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2" />
                            </svg>
                            <p className="text-xs text-gray-500"><span className="font-semibold">Upload</span></p>
                        </>
                    )}
                </div>
                <input
                    type="file"
                    className="hidden"
                    accept="image/*"
                    onChange={onChange}
                    disabled={uploading}
                />
            </label>
            {value && (
                <div className="relative">
                    <img src={value} alt="Preview" className="w-24 h-24 object-cover rounded-xl border border-gray-200" />
                    <button
                        type="button"
                        onClick={() => onChange({ target: { files: [] } })}
                        className="absolute -top-2 -right-2 w-5 h-5 bg-red-500 text-white rounded-full flex items-center justify-center text-[10px] hover:bg-red-600"
                    >
                        ✕
                    </button>
                </div>
            )}
        </div>
    );
}

export default function ArtistsContent({ content }) {
    const { flash } = usePage().props;
    const [activeTab, setActiveTab] = useState('hero');
    const [uploading, setUploading] = useState(false);

    const { data, setData, put, processing } = useForm({
        hero: content?.hero || {
            bgImage: '/images/Artist.png',
            title: 'সম্মানে ও ইতিহাসে',
            subtitle: 'আমার প্রতিভা বিশ্ব মাঝে',
        },
        section_header: content?.section_header || {
            subtitle: 'OUR ARTISTS',
            title: 'Meet the Raw Talent',
            description: 'A platform for real talent and performances. Discover amazing artists from different categories and backgrounds.',
        },
        artists: content?.artists || [],
        cta: content?.cta || {
            subtitle: 'BE THE NEXT FEATURED ARTIST',
            title: 'Show us your raw talent. No AI, No Edit, Just You.',
            description: 'Submit your talent or support others. Together, we celebrate real art and real people.',
            buttonText: '👤 Submit Your Talent →',
        },
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        put('/admin/artists-content');
    };

    const handleFileUpload = async (e, callback) => {
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
                callback(result.url);
            }
        } catch (error) {
            console.error('Upload failed:', error);
        } finally {
            setUploading(false);
        }
    };

    const tabs = [
        { id: 'hero', name: 'Hero', icon: '🎯' },
        { id: 'section_header', name: 'Section Header', icon: '📝' },
        { id: 'artists', name: 'Artists', icon: '👤' },
        { id: 'cta', name: 'CTA', icon: '📢' },
    ];

    const roles = ['SINGER', 'POET', 'MUSICIAN', 'DANCER', 'STORYTELLER'];
    const gradients = [
        'from-[#5b2a52] to-[#1c0e22]',
        'from-[#3a2440] to-[#0c0810]',
        'from-[#3f4750] to-[#12161a]',
        'from-[#141414] to-black',
        'from-[#3a2018] to-[#160b07]',
        'from-[#5b6270] to-[#1c2027]',
        'from-[#6b4a1c] to-[#241608]',
        'from-[#7a2436] to-[#220a10]',
        'from-[#312a24] to-[#0e0a08]',
        'from-[#8c2f3a] to-[#220b0e]',
        'from-[#454545] to-[#0a0a0a]',
        'from-[#c98a2e] to-[#3a2408]',
    ];

    return (
        <AdminLayout title="Artists Page Editor">
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
                                    <ImageUpload
                                        value={data.hero.bgImage}
                                        uploading={uploading}
                                        onChange={(e) => handleFileUpload(e, (url) => setData('hero', { ...data.hero, bgImage: url }))}
                                    />
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

                    {/* Section Header */}
                    {activeTab === 'section_header' && (
                        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
                            <h3 className="text-lg font-bold text-[#1a1425] mb-6">Section Header</h3>
                            <div className="space-y-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">Subtitle</label>
                                    <input
                                        type="text"
                                        value={data.section_header.subtitle}
                                        onChange={(e) => setData('section_header', { ...data.section_header, subtitle: e.target.value })}
                                        className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#ec1e63]"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">Title</label>
                                    <input
                                        type="text"
                                        value={data.section_header.title}
                                        onChange={(e) => setData('section_header', { ...data.section_header, title: e.target.value })}
                                        className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#ec1e63]"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
                                    <textarea
                                        value={data.section_header.description}
                                        onChange={(e) => setData('section_header', { ...data.section_header, description: e.target.value })}
                                        className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#ec1e63]"
                                        rows={3}
                                    />
                                </div>
                            </div>
                        </div>
                    )}

                    {/* Artists */}
                    {activeTab === 'artists' && (
                        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
                            <div className="flex items-center justify-between mb-6">
                                <h3 className="text-lg font-bold text-[#1a1425]">Artists</h3>
                                <button
                                    type="button"
                                    onClick={() => setData('artists', [...data.artists, {
                                        name: '', loc: '', role: 'SINGER', uploads: 0,
                                        g: 'from-[#5b2a52] to-[#1c0e22]', img: '',
                                    }])}
                                    className="px-4 py-2 bg-[#ec1e63] text-white text-sm font-medium rounded-lg hover:bg-[#d1185a]"
                                >
                                    + Add Artist
                                </button>
                            </div>
                            <div className="space-y-4">
                                {data.artists.map((artist, index) => (
                                    <div key={index} className="p-4 bg-gray-50 rounded-xl space-y-3">
                                        <div className="flex items-center justify-between">
                                            <span className="text-sm font-medium text-gray-500">Artist {index + 1}</span>
                                            <button
                                                type="button"
                                                onClick={() => setData('artists', data.artists.filter((_, i) => i !== index))}
                                                className="p-2 text-red-500 hover:bg-red-50 rounded-lg"
                                            >
                                                🗑️
                                            </button>
                                        </div>
                                        <div>
                                            <label className="block text-xs text-gray-500 mb-1">Image</label>
                                            <ImageUpload
                                                value={artist.img}
                                                uploading={uploading}
                                                onChange={(e) => handleFileUpload(e, (url) => {
                                                    const newArtists = [...data.artists];
                                                    newArtists[index].img = url;
                                                    setData('artists', newArtists);
                                                })}
                                            />
                                        </div>
                                        <div className="grid grid-cols-2 gap-3">
                                            <input
                                                type="text"
                                                placeholder="Name"
                                                value={artist.name}
                                                onChange={(e) => {
                                                    const newArtists = [...data.artists];
                                                    newArtists[index].name = e.target.value;
                                                    setData('artists', newArtists);
                                                }}
                                                className="px-4 py-2 bg-white border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#ec1e63]"
                                            />
                                            <input
                                                type="text"
                                                placeholder="Location"
                                                value={artist.loc}
                                                onChange={(e) => {
                                                    const newArtists = [...data.artists];
                                                    newArtists[index].loc = e.target.value;
                                                    setData('artists', newArtists);
                                                }}
                                                className="px-4 py-2 bg-white border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#ec1e63]"
                                            />
                                            <select
                                                value={artist.role}
                                                onChange={(e) => {
                                                    const newArtists = [...data.artists];
                                                    newArtists[index].role = e.target.value;
                                                    setData('artists', newArtists);
                                                }}
                                                className="px-4 py-2 bg-white border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#ec1e63]"
                                            >
                                                {roles.map((r) => <option key={r} value={r}>{r}</option>)}
                                            </select>
                                            <input
                                                type="number"
                                                placeholder="Uploads"
                                                value={artist.uploads}
                                                onChange={(e) => {
                                                    const newArtists = [...data.artists];
                                                    newArtists[index].uploads = parseInt(e.target.value) || 0;
                                                    setData('artists', newArtists);
                                                }}
                                                className="px-4 py-2 bg-white border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#ec1e63]"
                                            />
                                            <select
                                                value={artist.g}
                                                onChange={(e) => {
                                                    const newArtists = [...data.artists];
                                                    newArtists[index].g = e.target.value;
                                                    setData('artists', newArtists);
                                                }}
                                                className="col-span-2 px-4 py-2 bg-white border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#ec1e63]"
                                            >
                                                {gradients.map((g) => <option key={g} value={g}>{g}</option>)}
                                            </select>
                                        </div>
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
