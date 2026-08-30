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
                <input type="file" className="hidden" accept="image/*" onChange={onChange} disabled={uploading} />
            </label>
            {value && (
                <div className="relative">
                    <img src={value} alt="Preview" className="w-24 h-24 object-cover rounded-xl border border-gray-200" />
                    <button type="button" onClick={() => onChange({ target: { files: [] } })} className="absolute -top-2 -right-2 w-5 h-5 bg-red-500 text-white rounded-full flex items-center justify-center text-[10px] hover:bg-red-600">✕</button>
                </div>
            )}
        </div>
    );
}

export default function WinnersContent({ content }) {
    const { flash } = usePage().props;
    const [activeTab, setActiveTab] = useState('hero');
    const [uploading, setUploading] = useState(false);

    const { data, setData, put, processing } = useForm({
        hero: content?.hero || { bgImage: '/images/slider 1.png', title: 'Celebrating Extraordinary', subtitle: 'RAW LIQUEUR Talent Champions' },
        stats: content?.stats || [],
        featured_winners: content?.featured_winners || [],
        winners_by_season: content?.winners_by_season || [],
        category_winners: content?.category_winners || [],
        testimonials: content?.testimonials || [],
        cta: content?.cta || { icon: '🌟', title: 'Ready to be the next champion?', description: '', buttonText: '★ SUBMIT YOUR TALENT', button2Text: 'View All Artists →' },
    });

    const handleSubmit = (e) => { e.preventDefault(); put('/admin/winners-content'); };

    const handleFileUpload = async (e, callback) => {
        const file = e.target.files[0];
        if (!file) return;
        setUploading(true);
        const formData = new FormData();
        formData.append('file', file);
        try {
            const response = await fetch('/admin/upload', { method: 'POST', body: formData, headers: { 'X-CSRF-TOKEN': document.querySelector('meta[name="csrf-token"]')?.getAttribute('content'), 'Accept': 'application/json' } });
            const result = await response.json();
            if (result.success) callback(result.url);
        } catch (error) { console.error('Upload failed:', error); } finally { setUploading(false); }
    };

    const tabs = [
        { id: 'hero', name: 'Hero', icon: '🎯' },
        { id: 'stats', name: 'Stats', icon: '📊' },
        { id: 'featured_winners', name: 'Featured Winners', icon: '⭐' },
        { id: 'winners_by_season', name: 'By Season', icon: '📅' },
        { id: 'category_winners', name: 'Category Awards', icon: '🏅' },
        { id: 'testimonials', name: 'Testimonials', icon: '💬' },
        { id: 'cta', name: 'CTA', icon: '📢' },
    ];

    return (
        <AdminLayout title="Winners Page Editor">
            {flash?.success && <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-xl text-green-700 text-sm">{flash.success}</div>}
            <form onSubmit={handleSubmit}>
                <div className="flex gap-2 mb-6 overflow-x-auto pb-2">
                    {tabs.map((tab) => (
                        <button key={tab.id} type="button" onClick={() => setActiveTab(tab.id)} className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium whitespace-nowrap transition-all ${activeTab === tab.id ? 'bg-gradient-to-r from-[#ec1e63] to-[#f7941e] text-white shadow-lg' : 'bg-white text-gray-600 hover:bg-gray-50 border border-gray-200'}`}>
                            <span>{tab.icon}</span>{tab.name}
                        </button>
                    ))}
                </div>

                <div className="space-y-6">
                    {/* Hero */}
                    {activeTab === 'hero' && (
                        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
                            <h3 className="text-lg font-bold text-[#1a1425] mb-6">Hero Section</h3>
                            <div className="space-y-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">Background Image</label>
                                    <ImageUpload value={data.hero.bgImage} uploading={uploading} onChange={(e) => handleFileUpload(e, (url) => setData('hero', { ...data.hero, bgImage: url }))} />
                                </div>
                                <div><label className="block text-sm font-medium text-gray-700 mb-2">Title</label><input type="text" value={data.hero.title} onChange={(e) => setData('hero', { ...data.hero, title: e.target.value })} className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#ec1e63]" /></div>
                                <div><label className="block text-sm font-medium text-gray-700 mb-2">Subtitle</label><input type="text" value={data.hero.subtitle} onChange={(e) => setData('hero', { ...data.hero, subtitle: e.target.value })} className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#ec1e63]" /></div>
                            </div>
                        </div>
                    )}

                    {/* Stats */}
                    {activeTab === 'stats' && (
                        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
                            <div className="flex items-center justify-between mb-6">
                                <h3 className="text-lg font-bold text-[#1a1425]">Stats</h3>
                                <button type="button" onClick={() => setData('stats', [...data.stats, { icon: '🏆', value: '', label: '' }])} className="px-4 py-2 bg-[#ec1e63] text-white text-sm font-medium rounded-lg hover:bg-[#d1185a]">+ Add Stat</button>
                            </div>
                            <div className="space-y-3">
                                {data.stats.map((stat, i) => (
                                    <div key={i} className="flex items-center gap-3">
                                        <input type="text" placeholder="Icon" value={stat.icon} onChange={(e) => { const s = [...data.stats]; s[i].icon = e.target.value; setData('stats', s); }} className="w-16 px-3 py-2 bg-gray-50 border border-gray-200 rounded-lg text-sm text-center focus:outline-none focus:ring-2 focus:ring-[#ec1e63]" />
                                        <input type="text" placeholder="Value" value={stat.value} onChange={(e) => { const s = [...data.stats]; s[i].value = e.target.value; setData('stats', s); }} className="flex-1 px-4 py-2 bg-gray-50 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#ec1e63]" />
                                        <input type="text" placeholder="Label" value={stat.label} onChange={(e) => { const s = [...data.stats]; s[i].label = e.target.value; setData('stats', s); }} className="flex-1 px-4 py-2 bg-gray-50 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#ec1e63]" />
                                        <button type="button" onClick={() => setData('stats', data.stats.filter((_, j) => j !== i))} className="p-2 text-red-500 hover:bg-red-50 rounded-lg">🗑️</button>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* Featured Winners */}
                    {activeTab === 'featured_winners' && (
                        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
                            <div className="flex items-center justify-between mb-6">
                                <h3 className="text-lg font-bold text-[#1a1425]">Featured Winners</h3>
                                <button type="button" onClick={() => setData('featured_winners', [...data.featured_winners, { name: '', category: '', achievement: '', image: '', videoId: '', quote: '', season: '', views: '' }])} className="px-4 py-2 bg-[#ec1e63] text-white text-sm font-medium rounded-lg hover:bg-[#d1185a]">+ Add Winner</button>
                            </div>
                            <div className="space-y-4">
                                {data.featured_winners.map((w, i) => (
                                    <div key={i} className="p-4 bg-gray-50 rounded-xl space-y-3">
                                        <div className="flex items-center justify-between"><span className="text-sm font-medium text-gray-500">Winner {i + 1}</span><button type="button" onClick={() => setData('featured_winners', data.featured_winners.filter((_, j) => j !== i))} className="p-2 text-red-500 hover:bg-red-50 rounded-lg">🗑️</button></div>
                                        <div><label className="block text-xs text-gray-500 mb-1">Image</label><ImageUpload value={w.image} uploading={uploading} onChange={(e) => handleFileUpload(e, (url) => { const s = [...data.featured_winners]; s[i].image = url; setData('featured_winners', s); })} /></div>
                                        <div className="grid grid-cols-2 gap-3">
                                            <input type="text" placeholder="Name" value={w.name} onChange={(e) => { const s = [...data.featured_winners]; s[i].name = e.target.value; setData('featured_winners', s); }} className="px-4 py-2 bg-white border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#ec1e63]" />
                                            <input type="text" placeholder="Category" value={w.category} onChange={(e) => { const s = [...data.featured_winners]; s[i].category = e.target.value; setData('featured_winners', s); }} className="px-4 py-2 bg-white border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#ec1e63]" />
                                            <input type="text" placeholder="Achievement" value={w.achievement} onChange={(e) => { const s = [...data.featured_winners]; s[i].achievement = e.target.value; setData('featured_winners', s); }} className="px-4 py-2 bg-white border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#ec1e63]" />
                                            <input type="text" placeholder="YouTube Video ID" value={w.videoId} onChange={(e) => { const s = [...data.featured_winners]; s[i].videoId = e.target.value; setData('featured_winners', s); }} className="px-4 py-2 bg-white border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#ec1e63]" />
                                            <input type="text" placeholder="Season" value={w.season} onChange={(e) => { const s = [...data.featured_winners]; s[i].season = e.target.value; setData('featured_winners', s); }} className="px-4 py-2 bg-white border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#ec1e63]" />
                                            <input type="text" placeholder="Views" value={w.views} onChange={(e) => { const s = [...data.featured_winners]; s[i].views = e.target.value; setData('featured_winners', s); }} className="px-4 py-2 bg-white border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#ec1e63]" />
                                        </div>
                                        <textarea placeholder="Quote" value={w.quote} onChange={(e) => { const s = [...data.featured_winners]; s[i].quote = e.target.value; setData('featured_winners', s); }} className="w-full px-4 py-2 bg-white border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#ec1e63]" rows={2} />
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* Winners by Season */}
                    {activeTab === 'winners_by_season' && (
                        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
                            <div className="flex items-center justify-between mb-6">
                                <h3 className="text-lg font-bold text-[#1a1425]">Winners by Season</h3>
                                <button type="button" onClick={() => setData('winners_by_season', [...data.winners_by_season, { season: '', year: '', winners: [] }])} className="px-4 py-2 bg-[#ec1e63] text-white text-sm font-medium rounded-lg hover:bg-[#d1185a]">+ Add Season</button>
                            </div>
                            <div className="space-y-6">
                                {data.winners_by_season.map((s, si) => (
                                    <div key={si} className="p-4 bg-gray-50 rounded-xl space-y-4">
                                        <div className="flex items-center justify-between"><span className="text-sm font-medium text-gray-500">Season {s.season}</span><button type="button" onClick={() => setData('winners_by_season', data.winners_by_season.filter((_, j) => j !== si))} className="p-2 text-red-500 hover:bg-red-50 rounded-lg">🗑️</button></div>
                                        <div className="grid grid-cols-2 gap-3">
                                            <input type="text" placeholder="Season #" value={s.season} onChange={(e) => { const ss = [...data.winners_by_season]; ss[si].season = e.target.value; setData('winners_by_season', ss); }} className="px-4 py-2 bg-white border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#ec1e63]" />
                                            <input type="text" placeholder="Year" value={s.year} onChange={(e) => { const ss = [...data.winners_by_season]; ss[si].year = e.target.value; setData('winners_by_season', ss); }} className="px-4 py-2 bg-white border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#ec1e63]" />
                                        </div>
                                        <div className="flex items-center justify-between"><span className="text-xs font-medium text-gray-500">Winners in this season</span><button type="button" onClick={() => { const ss = [...data.winners_by_season]; ss[si].winners = [...ss[si].winners, { name: '', category: '', image: '' }]; setData('winners_by_season', ss); }} className="px-3 py-1 bg-[#ec1e63] text-white text-xs font-medium rounded-lg hover:bg-[#d1185a]">+ Add Winner</button></div>
                                        <div className="space-y-3">
                                            {s.winners.map((w, wi) => (
                                                <div key={wi} className="p-3 bg-white rounded-lg space-y-2">
                                                    <div className="flex items-center justify-between">
                                                        <span className="text-xs font-medium text-gray-500">Winner {wi + 1}</span>
                                                        <button type="button" onClick={() => { const ss = [...data.winners_by_season]; ss[si].winners = ss[si].winners.filter((_, j) => j !== wi); setData('winners_by_season', ss); }} className="p-1 text-red-500 hover:bg-red-50 rounded text-xs">🗑️</button>
                                                    </div>
                                                    <div><label className="block text-xs text-gray-500 mb-1">Image</label><ImageUpload value={w.image} uploading={uploading} onChange={(e) => handleFileUpload(e, (url) => { const ss = [...data.winners_by_season]; ss[si].winners[wi].image = url; setData('winners_by_season', ss); })} /></div>
                                                    <div className="grid grid-cols-2 gap-2">
                                                        <input type="text" placeholder="Name" value={w.name} onChange={(e) => { const ss = [...data.winners_by_season]; ss[si].winners[wi].name = e.target.value; setData('winners_by_season', ss); }} className="px-3 py-2 bg-gray-50 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#ec1e63]" />
                                                        <input type="text" placeholder="Category" value={w.category} onChange={(e) => { const ss = [...data.winners_by_season]; ss[si].winners[wi].category = e.target.value; setData('winners_by_season', ss); }} className="px-3 py-2 bg-gray-50 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#ec1e63]" />
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* Category Winners */}
                    {activeTab === 'category_winners' && (
                        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
                            <div className="flex items-center justify-between mb-6">
                                <h3 className="text-lg font-bold text-[#1a1425]">Category Awards</h3>
                                <button type="button" onClick={() => setData('category_winners', [...data.category_winners, { icon: '🏅', category: '', winner: '', season: '' }])} className="px-4 py-2 bg-[#ec1e63] text-white text-sm font-medium rounded-lg hover:bg-[#d1185a]">+ Add Category</button>
                            </div>
                            <div className="space-y-3">
                                {data.category_winners.map((c, i) => (
                                    <div key={i} className="flex items-center gap-3">
                                        <input type="text" placeholder="Icon" value={c.icon} onChange={(e) => { const s = [...data.category_winners]; s[i].icon = e.target.value; setData('category_winners', s); }} className="w-16 px-3 py-2 bg-gray-50 border border-gray-200 rounded-lg text-sm text-center focus:outline-none focus:ring-2 focus:ring-[#ec1e63]" />
                                        <input type="text" placeholder="Category" value={c.category} onChange={(e) => { const s = [...data.category_winners]; s[i].category = e.target.value; setData('category_winners', s); }} className="flex-1 px-4 py-2 bg-gray-50 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#ec1e63]" />
                                        <input type="text" placeholder="Winner" value={c.winner} onChange={(e) => { const s = [...data.category_winners]; s[i].winner = e.target.value; setData('category_winners', s); }} className="flex-1 px-4 py-2 bg-gray-50 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#ec1e63]" />
                                        <input type="text" placeholder="Season" value={c.season} onChange={(e) => { const s = [...data.category_winners]; s[i].season = e.target.value; setData('category_winners', s); }} className="w-20 px-4 py-2 bg-gray-50 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#ec1e63]" />
                                        <button type="button" onClick={() => setData('category_winners', data.category_winners.filter((_, j) => j !== i))} className="p-2 text-red-500 hover:bg-red-50 rounded-lg">🗑️</button>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* Testimonials */}
                    {activeTab === 'testimonials' && (
                        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
                            <div className="flex items-center justify-between mb-6">
                                <h3 className="text-lg font-bold text-[#1a1425]">Testimonials</h3>
                                <button type="button" onClick={() => setData('testimonials', [...data.testimonials, { name: '', role: '', text: '', image: '' }])} className="px-4 py-2 bg-[#ec1e63] text-white text-sm font-medium rounded-lg hover:bg-[#d1185a]">+ Add Testimonial</button>
                            </div>
                            <div className="space-y-4">
                                {data.testimonials.map((t, i) => (
                                    <div key={i} className="p-4 bg-gray-50 rounded-xl space-y-3">
                                        <div className="flex items-center justify-between"><span className="text-sm font-medium text-gray-500">Testimonial {i + 1}</span><button type="button" onClick={() => setData('testimonials', data.testimonials.filter((_, j) => j !== i))} className="p-2 text-red-500 hover:bg-red-50 rounded-lg">🗑️</button></div>
                                        <div><label className="block text-xs text-gray-500 mb-1">Image</label><ImageUpload value={t.image} uploading={uploading} onChange={(e) => handleFileUpload(e, (url) => { const s = [...data.testimonials]; s[i].image = url; setData('testimonials', s); })} /></div>
                                        <div className="grid grid-cols-2 gap-3">
                                            <input type="text" placeholder="Name" value={t.name} onChange={(e) => { const s = [...data.testimonials]; s[i].name = e.target.value; setData('testimonials', s); }} className="px-4 py-2 bg-white border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#ec1e63]" />
                                            <input type="text" placeholder="Role" value={t.role} onChange={(e) => { const s = [...data.testimonials]; s[i].role = e.target.value; setData('testimonials', s); }} className="px-4 py-2 bg-white border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#ec1e63]" />
                                        </div>
                                        <textarea placeholder="Text" value={t.text} onChange={(e) => { const s = [...data.testimonials]; s[i].text = e.target.value; setData('testimonials', s); }} className="w-full px-4 py-2 bg-white border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#ec1e63]" rows={2} />
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
                                <div><label className="block text-sm font-medium text-gray-700 mb-2">Icon</label><input type="text" value={data.cta.icon} onChange={(e) => setData('cta', { ...data.cta, icon: e.target.value })} className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#ec1e63]" /></div>
                                <div><label className="block text-sm font-medium text-gray-700 mb-2">Title</label><input type="text" value={data.cta.title} onChange={(e) => setData('cta', { ...data.cta, title: e.target.value })} className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#ec1e63]" /></div>
                                <div><label className="block text-sm font-medium text-gray-700 mb-2">Description</label><textarea value={data.cta.description} onChange={(e) => setData('cta', { ...data.cta, description: e.target.value })} className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#ec1e63]" rows={3} /></div>
                                <div><label className="block text-sm font-medium text-gray-700 mb-2">Button Text</label><input type="text" value={data.cta.buttonText} onChange={(e) => setData('cta', { ...data.cta, buttonText: e.target.value })} className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#ec1e63]" /></div>
                                <div><label className="block text-sm font-medium text-gray-700 mb-2">Button 2 Text</label><input type="text" value={data.cta.button2Text} onChange={(e) => setData('cta', { ...data.cta, button2Text: e.target.value })} className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#ec1e63]" /></div>
                            </div>
                        </div>
                    )}
                </div>

                <div className="mt-6 flex justify-end">
                    <button type="submit" disabled={processing} className="px-8 py-3 bg-gradient-to-r from-[#ec1e63] to-[#f7941e] text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all disabled:opacity-50">{processing ? 'Saving...' : 'Save All Changes'}</button>
                </div>
            </form>
        </AdminLayout>
    );
}
