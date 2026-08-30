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

export default function BlogContent({ content }) {
    const { flash } = usePage().props;
    const [activeTab, setActiveTab] = useState('hero');
    const [uploading, setUploading] = useState(false);

    const { data, setData, put, processing } = useForm({
        hero: content?.hero || { bgImage: '/images/slider 1.png', title: 'Stories, Tips &', subtitle: 'Inspiration — RAW LIQUEUR' },
        featured_post: content?.featured_post || { title: '', excerpt: '', image: '', author: '', authorImage: '', date: '', readTime: '', category: '' },
        blog_posts: content?.blog_posts || [],
        categories: content?.categories || [],
        trending_posts: content?.trending_posts || [],
        tags: content?.tags || [],
        newsletter: content?.newsletter || { icon: '✉️', title: 'Stay in the loop', description: '', buttonText: 'Subscribe Now' },
        cta: content?.cta || { icon: '🎤', title: 'Got a story to share?', description: '', buttonText: '★ SUBMIT YOUR TALENT', button2Text: 'Learn More About Us →' },
    });

    const handleSubmit = (e) => { e.preventDefault(); put('/admin/blog-content'); };

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
        { id: 'featured_post', name: 'Featured Post', icon: '⭐' },
        { id: 'blog_posts', name: 'Blog Posts', icon: '📝' },
        { id: 'categories', name: 'Categories', icon: '📁' },
        { id: 'trending_posts', name: 'Trending', icon: '🔥' },
        { id: 'tags', name: 'Tags', icon: '🏷️' },
        { id: 'newsletter', name: 'Newsletter', icon: '✉️' },
        { id: 'cta', name: 'CTA', icon: '📢' },
    ];

    return (
        <AdminLayout title="Blog Page Editor">
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
                                <div><label className="block text-sm font-medium text-gray-700 mb-2">Background Image</label><ImageUpload value={data.hero.bgImage} uploading={uploading} onChange={(e) => handleFileUpload(e, (url) => setData('hero', { ...data.hero, bgImage: url }))} /></div>
                                <div><label className="block text-sm font-medium text-gray-700 mb-2">Title</label><input type="text" value={data.hero.title} onChange={(e) => setData('hero', { ...data.hero, title: e.target.value })} className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#ec1e63]" /></div>
                                <div><label className="block text-sm font-medium text-gray-700 mb-2">Subtitle</label><input type="text" value={data.hero.subtitle} onChange={(e) => setData('hero', { ...data.hero, subtitle: e.target.value })} className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#ec1e63]" /></div>
                            </div>
                        </div>
                    )}

                    {/* Featured Post */}
                    {activeTab === 'featured_post' && (
                        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
                            <h3 className="text-lg font-bold text-[#1a1425] mb-6">Featured Post</h3>
                            <div className="space-y-4">
                                <div><label className="block text-sm font-medium text-gray-700 mb-2">Image</label><ImageUpload value={data.featured_post.image} uploading={uploading} onChange={(e) => handleFileUpload(e, (url) => setData('featured_post', { ...data.featured_post, image: url }))} /></div>
                                <div><label className="block text-sm font-medium text-gray-700 mb-2">Title</label><input type="text" value={data.featured_post.title} onChange={(e) => setData('featured_post', { ...data.featured_post, title: e.target.value })} className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#ec1e63]" /></div>
                                <div><label className="block text-sm font-medium text-gray-700 mb-2">Excerpt</label><textarea value={data.featured_post.excerpt} onChange={(e) => setData('featured_post', { ...data.featured_post, excerpt: e.target.value })} className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#ec1e63]" rows={3} /></div>
                                <div className="grid grid-cols-2 gap-4">
                                    <div><label className="block text-sm font-medium text-gray-700 mb-2">Author</label><input type="text" value={data.featured_post.author} onChange={(e) => setData('featured_post', { ...data.featured_post, author: e.target.value })} className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#ec1e63]" /></div>
                                    <div><label className="block text-sm font-medium text-gray-700 mb-2">Author Image</label><ImageUpload value={data.featured_post.authorImage} uploading={uploading} onChange={(e) => handleFileUpload(e, (url) => setData('featured_post', { ...data.featured_post, authorImage: url }))} /></div>
                                    <div><label className="block text-sm font-medium text-gray-700 mb-2">Date</label><input type="text" value={data.featured_post.date} onChange={(e) => setData('featured_post', { ...data.featured_post, date: e.target.value })} className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#ec1e63]" /></div>
                                    <div><label className="block text-sm font-medium text-gray-700 mb-2">Read Time</label><input type="text" value={data.featured_post.readTime} onChange={(e) => setData('featured_post', { ...data.featured_post, readTime: e.target.value })} className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#ec1e63]" /></div>
                                    <div><label className="block text-sm font-medium text-gray-700 mb-2">Category</label><input type="text" value={data.featured_post.category} onChange={(e) => setData('featured_post', { ...data.featured_post, category: e.target.value })} className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#ec1e63]" /></div>
                                </div>
                            </div>
                        </div>
                    )}

                    {/* Blog Posts */}
                    {activeTab === 'blog_posts' && (
                        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
                            <div className="flex items-center justify-between mb-6">
                                <h3 className="text-lg font-bold text-[#1a1425]">Blog Posts</h3>
                                <button type="button" onClick={() => setData('blog_posts', [...data.blog_posts, { title: '', excerpt: '', image: '', author: '', authorImage: '', date: '', readTime: '', category: '' }])} className="px-4 py-2 bg-[#ec1e63] text-white text-sm font-medium rounded-lg hover:bg-[#d1185a]">+ Add Post</button>
                            </div>
                            <div className="space-y-4">
                                {data.blog_posts.map((post, i) => (
                                    <div key={i} className="p-4 bg-gray-50 rounded-xl space-y-3">
                                        <div className="flex items-center justify-between"><span className="text-sm font-medium text-gray-500">Post {i + 1}</span><button type="button" onClick={() => setData('blog_posts', data.blog_posts.filter((_, j) => j !== i))} className="p-2 text-red-500 hover:bg-red-50 rounded-lg">🗑️</button></div>
                                        <div><label className="block text-xs text-gray-500 mb-1">Image</label><ImageUpload value={post.image} uploading={uploading} onChange={(e) => handleFileUpload(e, (url) => { const s = [...data.blog_posts]; s[i].image = url; setData('blog_posts', s); })} /></div>
                                        <div className="grid grid-cols-2 gap-3">
                                            <input type="text" placeholder="Title" value={post.title} onChange={(e) => { const s = [...data.blog_posts]; s[i].title = e.target.value; setData('blog_posts', s); }} className="px-4 py-2 bg-white border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#ec1e63]" />
                                            <input type="text" placeholder="Category" value={post.category} onChange={(e) => { const s = [...data.blog_posts]; s[i].category = e.target.value; setData('blog_posts', s); }} className="px-4 py-2 bg-white border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#ec1e63]" />
                                            <input type="text" placeholder="Author" value={post.author} onChange={(e) => { const s = [...data.blog_posts]; s[i].author = e.target.value; setData('blog_posts', s); }} className="px-4 py-2 bg-white border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#ec1e63]" />
                                            <input type="text" placeholder="Date" value={post.date} onChange={(e) => { const s = [...data.blog_posts]; s[i].date = e.target.value; setData('blog_posts', s); }} className="px-4 py-2 bg-white border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#ec1e63]" />
                                            <input type="text" placeholder="Read Time" value={post.readTime} onChange={(e) => { const s = [...data.blog_posts]; s[i].readTime = e.target.value; setData('blog_posts', s); }} className="px-4 py-2 bg-white border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#ec1e63]" />
                                        </div>
                                        <div><label className="block text-xs text-gray-500 mb-1">Author Image</label><ImageUpload value={post.authorImage} uploading={uploading} onChange={(e) => handleFileUpload(e, (url) => { const s = [...data.blog_posts]; s[i].authorImage = url; setData('blog_posts', s); })} /></div>
                                        <textarea placeholder="Excerpt" value={post.excerpt} onChange={(e) => { const s = [...data.blog_posts]; s[i].excerpt = e.target.value; setData('blog_posts', s); }} className="w-full px-4 py-2 bg-white border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#ec1e63]" rows={2} />
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* Categories */}
                    {activeTab === 'categories' && (
                        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
                            <div className="flex items-center justify-between mb-6">
                                <h3 className="text-lg font-bold text-[#1a1425]">Categories</h3>
                                <button type="button" onClick={() => setData('categories', [...data.categories, { name: '', count: 0 }])} className="px-4 py-2 bg-[#ec1e63] text-white text-sm font-medium rounded-lg hover:bg-[#d1185a]">+ Add Category</button>
                            </div>
                            <div className="space-y-3">
                                {data.categories.map((cat, i) => (
                                    <div key={i} className="flex items-center gap-3">
                                        <input type="text" placeholder="Name" value={cat.name} onChange={(e) => { const s = [...data.categories]; s[i].name = e.target.value; setData('categories', s); }} className="flex-1 px-4 py-2 bg-gray-50 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#ec1e63]" />
                                        <input type="number" placeholder="Count" value={cat.count} onChange={(e) => { const s = [...data.categories]; s[i].count = parseInt(e.target.value) || 0; setData('categories', s); }} className="w-24 px-4 py-2 bg-gray-50 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#ec1e63]" />
                                        <button type="button" onClick={() => setData('categories', data.categories.filter((_, j) => j !== i))} className="p-2 text-red-500 hover:bg-red-50 rounded-lg">🗑️</button>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* Trending */}
                    {activeTab === 'trending_posts' && (
                        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
                            <div className="flex items-center justify-between mb-6">
                                <h3 className="text-lg font-bold text-[#1a1425]">Trending Posts</h3>
                                <button type="button" onClick={() => setData('trending_posts', [...data.trending_posts, { title: '', views: '', date: '' }])} className="px-4 py-2 bg-[#ec1e63] text-white text-sm font-medium rounded-lg hover:bg-[#d1185a]">+ Add Post</button>
                            </div>
                            <div className="space-y-3">
                                {data.trending_posts.map((post, i) => (
                                    <div key={i} className="flex items-center gap-3">
                                        <input type="text" placeholder="Title" value={post.title} onChange={(e) => { const s = [...data.trending_posts]; s[i].title = e.target.value; setData('trending_posts', s); }} className="flex-1 px-4 py-2 bg-gray-50 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#ec1e63]" />
                                        <input type="text" placeholder="Views" value={post.views} onChange={(e) => { const s = [...data.trending_posts]; s[i].views = e.target.value; setData('trending_posts', s); }} className="w-24 px-4 py-2 bg-gray-50 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#ec1e63]" />
                                        <input type="text" placeholder="Date" value={post.date} onChange={(e) => { const s = [...data.trending_posts]; s[i].date = e.target.value; setData('trending_posts', s); }} className="w-32 px-4 py-2 bg-gray-50 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#ec1e63]" />
                                        <button type="button" onClick={() => setData('trending_posts', data.trending_posts.filter((_, j) => j !== i))} className="p-2 text-red-500 hover:bg-red-50 rounded-lg">🗑️</button>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* Tags */}
                    {activeTab === 'tags' && (
                        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
                            <h3 className="text-lg font-bold text-[#1a1425] mb-6">Tags</h3>
                            <div className="space-y-4">
                                <div className="flex gap-2">
                                    <input type="text" placeholder="Add new tag" id="newTag" className="flex-1 px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#ec1e63]" />
                                    <button type="button" onClick={() => { const val = document.getElementById('newTag').value; if (val) { setData('tags', [...data.tags, val]); document.getElementById('newTag').value = ''; } }} className="px-4 py-2 bg-[#ec1e63] text-white text-sm font-medium rounded-lg hover:bg-[#d1185a]">Add</button>
                                </div>
                                <div className="flex flex-wrap gap-2">
                                    {data.tags.map((tag, i) => (
                                        <span key={i} className="flex items-center gap-2 px-3 py-1.5 bg-gray-100 rounded-full text-sm">
                                            {tag}
                                            <button type="button" onClick={() => setData('tags', data.tags.filter((_, j) => j !== i))} className="text-red-500 hover:text-red-700 text-xs">✕</button>
                                        </span>
                                    ))}
                                </div>
                            </div>
                        </div>
                    )}

                    {/* Newsletter */}
                    {activeTab === 'newsletter' && (
                        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
                            <h3 className="text-lg font-bold text-[#1a1425] mb-6">Newsletter</h3>
                            <div className="space-y-4">
                                <div><label className="block text-sm font-medium text-gray-700 mb-2">Icon</label><input type="text" value={data.newsletter.icon} onChange={(e) => setData('newsletter', { ...data.newsletter, icon: e.target.value })} className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#ec1e63]" /></div>
                                <div><label className="block text-sm font-medium text-gray-700 mb-2">Title</label><input type="text" value={data.newsletter.title} onChange={(e) => setData('newsletter', { ...data.newsletter, title: e.target.value })} className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#ec1e63]" /></div>
                                <div><label className="block text-sm font-medium text-gray-700 mb-2">Description</label><textarea value={data.newsletter.description} onChange={(e) => setData('newsletter', { ...data.newsletter, description: e.target.value })} className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#ec1e63]" rows={3} /></div>
                                <div><label className="block text-sm font-medium text-gray-700 mb-2">Button Text</label><input type="text" value={data.newsletter.buttonText} onChange={(e) => setData('newsletter', { ...data.newsletter, buttonText: e.target.value })} className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#ec1e63]" /></div>
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
