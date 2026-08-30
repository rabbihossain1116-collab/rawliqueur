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

export default function ContactContent({ content }) {
    const { flash } = usePage().props;
    const [activeTab, setActiveTab] = useState('hero');
    const [uploading, setUploading] = useState(false);

    const { data, setData, put, processing } = useForm({
        hero: content?.hero || { bgImage: '/images/slider 1.png', label: 'Get in Touch', title: "We'd Love to Hear", subtitle: 'From You — RAW LIQUEUR', button1Text: '✉️ Send a Message', button2Text: '❓ FAQ' },
        contact_info: content?.contact_info || [],
        form: content?.form || { heading: 'SEND US A MESSAGE', title: "Let's start a conversation", subjects: [], mapEmbedUrl: '' },
        faqs: content?.faqs || [],
        social_links: content?.social_links || [],
        business_hours: content?.business_hours || { title: '🕐 Business Hours', hours: [] },
        cta: content?.cta || { icon: '🎤', title: 'Ready to showcase your', titleHighlight: ' talent', titleSuffix: '?', description: '', button1Text: '★ SUBMIT YOUR TALENT', button2Text: 'View Winners 🏆', button2Link: '/winners' },
    });

    const handleSubmit = (e) => { e.preventDefault(); put('/admin/contact-content'); };

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
        { id: 'contact_info', name: 'Contact Info', icon: '📇' },
        { id: 'form', name: 'Form Settings', icon: '📝' },
        { id: 'faqs', name: 'FAQs', icon: '❓' },
        { id: 'social_links', name: 'Social Links', icon: '🔗' },
        { id: 'business_hours', name: 'Business Hours', icon: '🕐' },
        { id: 'cta', name: 'CTA', icon: '📢' },
    ];

    return (
        <AdminLayout title="Contact Page Editor">
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
                                <div><label className="block text-sm font-medium text-gray-700 mb-2">Label</label><input type="text" value={data.hero.label} onChange={(e) => setData('hero', { ...data.hero, label: e.target.value })} className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#ec1e63]" /></div>
                                <div><label className="block text-sm font-medium text-gray-700 mb-2">Title</label><input type="text" value={data.hero.title} onChange={(e) => setData('hero', { ...data.hero, title: e.target.value })} className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#ec1e63]" /></div>
                                <div><label className="block text-sm font-medium text-gray-700 mb-2">Subtitle</label><input type="text" value={data.hero.subtitle} onChange={(e) => setData('hero', { ...data.hero, subtitle: e.target.value })} className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#ec1e63]" /></div>
                                <div><label className="block text-sm font-medium text-gray-700 mb-2">Button 1 Text</label><input type="text" value={data.hero.button1Text} onChange={(e) => setData('hero', { ...data.hero, button1Text: e.target.value })} className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#ec1e63]" /></div>
                                <div><label className="block text-sm font-medium text-gray-700 mb-2">Button 2 Text</label><input type="text" value={data.hero.button2Text} onChange={(e) => setData('hero', { ...data.hero, button2Text: e.target.value })} className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#ec1e63]" /></div>
                            </div>
                        </div>
                    )}

                    {/* Contact Info */}
                    {activeTab === 'contact_info' && (
                        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
                            <div className="flex items-center justify-between mb-6">
                                <h3 className="text-lg font-bold text-[#1a1425]">Contact Info Cards</h3>
                                <button type="button" onClick={() => setData('contact_info', [...data.contact_info, { icon: '📍', title: '', details: [''] }])} className="px-4 py-2 bg-[#ec1e63] text-white text-sm font-medium rounded-lg hover:bg-[#d1185a]">+ Add Card</button>
                            </div>
                            <div className="space-y-4">
                                {data.contact_info.map((info, i) => (
                                    <div key={i} className="p-4 bg-gray-50 rounded-xl space-y-3">
                                        <div className="flex items-center justify-between"><span className="text-sm font-medium text-gray-500">Card {i + 1}</span><button type="button" onClick={() => setData('contact_info', data.contact_info.filter((_, j) => j !== i))} className="p-2 text-red-500 hover:bg-red-50 rounded-lg">🗑️</button></div>
                                        <div className="grid grid-cols-2 gap-3">
                                            <div><label className="block text-xs text-gray-500 mb-1">Icon</label><input type="text" value={info.icon} onChange={(e) => { const s = [...data.contact_info]; s[i].icon = e.target.value; setData('contact_info', s); }} className="w-full px-4 py-2 bg-white border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#ec1e63]" /></div>
                                            <div><label className="block text-xs text-gray-500 mb-1">Title</label><input type="text" value={info.title} onChange={(e) => { const s = [...data.contact_info]; s[i].title = e.target.value; setData('contact_info', s); }} className="w-full px-4 py-2 bg-white border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#ec1e63]" /></div>
                                        </div>
                                        <div><label className="block text-xs text-gray-500 mb-1">Details (one per line)</label><textarea value={info.details?.join('\n') || ''} onChange={(e) => { const s = [...data.contact_info]; s[i].details = e.target.value.split('\n'); setData('contact_info', s); }} className="w-full px-4 py-2 bg-white border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#ec1e63]" rows={3} /></div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* Form Settings */}
                    {activeTab === 'form' && (
                        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
                            <h3 className="text-lg font-bold text-[#1a1425] mb-6">Form Settings</h3>
                            <div className="space-y-4">
                                <div><label className="block text-sm font-medium text-gray-700 mb-2">Section Heading</label><input type="text" value={data.form.heading} onChange={(e) => setData('form', { ...data.form, heading: e.target.value })} className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#ec1e63]" /></div>
                                <div><label className="block text-sm font-medium text-gray-700 mb-2">Section Title</label><input type="text" value={data.form.title} onChange={(e) => setData('form', { ...data.form, title: e.target.value })} className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#ec1e63]" /></div>
                                <div><label className="block text-sm font-medium text-gray-700 mb-2">Google Maps Embed URL</label><input type="text" value={data.form.mapEmbedUrl} onChange={(e) => setData('form', { ...data.form, mapEmbedUrl: e.target.value })} className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#ec1e63]" /></div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">Subject Options</label>
                                    <div className="space-y-2">
                                        {data.form.subjects?.map((subj, i) => (
                                            <div key={i} className="flex items-center gap-3">
                                                <input type="text" placeholder="Value" value={subj.value} onChange={(e) => { const s = { ...data.form, subjects: [...data.form.subjects] }; s.subjects[i].value = e.target.value; setData('form', s); }} className="w-32 px-4 py-2 bg-gray-50 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#ec1e63]" />
                                                <input type="text" placeholder="Label" value={subj.label} onChange={(e) => { const s = { ...data.form, subjects: [...data.form.subjects] }; s.subjects[i].label = e.target.value; setData('form', s); }} className="flex-1 px-4 py-2 bg-gray-50 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#ec1e63]" />
                                                <button type="button" onClick={() => { const s = { ...data.form, subjects: data.form.subjects.filter((_, j) => j !== i) }; setData('form', s); }} className="p-2 text-red-500 hover:bg-red-50 rounded-lg">🗑️</button>
                                            </div>
                                        ))}
                                        <button type="button" onClick={() => { const s = { ...data.form, subjects: [...(data.form.subjects || []), { value: '', label: '' }] }; setData('form', s); }} className="px-4 py-2 bg-gray-100 text-gray-600 text-sm font-medium rounded-lg hover:bg-gray-200">+ Add Subject</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}

                    {/* FAQs */}
                    {activeTab === 'faqs' && (
                        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
                            <div className="flex items-center justify-between mb-6">
                                <h3 className="text-lg font-bold text-[#1a1425]">FAQs</h3>
                                <button type="button" onClick={() => setData('faqs', [...data.faqs, { question: '', answer: '' }])} className="px-4 py-2 bg-[#ec1e63] text-white text-sm font-medium rounded-lg hover:bg-[#d1185a]">+ Add FAQ</button>
                            </div>
                            <div className="space-y-4">
                                {data.faqs.map((faq, i) => (
                                    <div key={i} className="p-4 bg-gray-50 rounded-xl space-y-3">
                                        <div className="flex items-center justify-between"><span className="text-sm font-medium text-gray-500">FAQ {i + 1}</span><button type="button" onClick={() => setData('faqs', data.faqs.filter((_, j) => j !== i))} className="p-2 text-red-500 hover:bg-red-50 rounded-lg">🗑️</button></div>
                                        <div><label className="block text-xs text-gray-500 mb-1">Question</label><input type="text" value={faq.question} onChange={(e) => { const s = [...data.faqs]; s[i].question = e.target.value; setData('faqs', s); }} className="w-full px-4 py-2 bg-white border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#ec1e63]" /></div>
                                        <div><label className="block text-xs text-gray-500 mb-1">Answer</label><textarea value={faq.answer} onChange={(e) => { const s = [...data.faqs]; s[i].answer = e.target.value; setData('faqs', s); }} className="w-full px-4 py-2 bg-white border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#ec1e63]" rows={3} /></div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* Social Links */}
                    {activeTab === 'social_links' && (
                        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
                            <div className="flex items-center justify-between mb-6">
                                <h3 className="text-lg font-bold text-[#1a1425]">Social Links</h3>
                                <button type="button" onClick={() => setData('social_links', [...data.social_links, { name: '', icon: '', url: '#', color: 'hover:bg-gray-500 hover:text-white' }])} className="px-4 py-2 bg-[#ec1e63] text-white text-sm font-medium rounded-lg hover:bg-[#d1185a]">+ Add Link</button>
                            </div>
                            <div className="space-y-3">
                                {data.social_links.map((social, i) => (
                                    <div key={i} className="flex items-center gap-3">
                                        <input type="text" placeholder="Icon" value={social.icon} onChange={(e) => { const s = [...data.social_links]; s[i].icon = e.target.value; setData('social_links', s); }} className="w-16 px-4 py-2 bg-gray-50 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#ec1e63]" />
                                        <input type="text" placeholder="Name" value={social.name} onChange={(e) => { const s = [...data.social_links]; s[i].name = e.target.value; setData('social_links', s); }} className="w-32 px-4 py-2 bg-gray-50 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#ec1e63]" />
                                        <input type="text" placeholder="URL" value={social.url} onChange={(e) => { const s = [...data.social_links]; s[i].url = e.target.value; setData('social_links', s); }} className="flex-1 px-4 py-2 bg-gray-50 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#ec1e63]" />
                                        <input type="text" placeholder="Color class" value={social.color} onChange={(e) => { const s = [...data.social_links]; s[i].color = e.target.value; setData('social_links', s); }} className="w-48 px-4 py-2 bg-gray-50 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#ec1e63]" />
                                        <button type="button" onClick={() => setData('social_links', data.social_links.filter((_, j) => j !== i))} className="p-2 text-red-500 hover:bg-red-50 rounded-lg">🗑️</button>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* Business Hours */}
                    {activeTab === 'business_hours' && (
                        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
                            <h3 className="text-lg font-bold text-[#1a1425] mb-6">Business Hours</h3>
                            <div className="space-y-4">
                                <div><label className="block text-sm font-medium text-gray-700 mb-2">Section Title</label><input type="text" value={data.business_hours.title} onChange={(e) => setData('business_hours', { ...data.business_hours, title: e.target.value })} className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#ec1e63]" /></div>
                                <div className="space-y-3">
                                    {data.business_hours.hours?.map((hour, i) => (
                                        <div key={i} className="flex items-center gap-3">
                                            <input type="text" placeholder="Days" value={hour.days} onChange={(e) => { const s = { ...data.business_hours, hours: [...data.business_hours.hours] }; s.hours[i].days = e.target.value; setData('business_hours', s); }} className="flex-1 px-4 py-2 bg-gray-50 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#ec1e63]" />
                                            <input type="text" placeholder="Time" value={hour.time} onChange={(e) => { const s = { ...data.business_hours, hours: [...data.business_hours.hours] }; s.hours[i].time = e.target.value; setData('business_hours', s); }} className="flex-1 px-4 py-2 bg-gray-50 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#ec1e63]" />
                                            <label className="flex items-center gap-2"><input type="checkbox" checked={hour.isOpen} onChange={(e) => { const s = { ...data.business_hours, hours: [...data.business_hours.hours] }; s.hours[i].isOpen = e.target.checked; setData('business_hours', s); }} className="rounded border-gray-300 text-[#ec1e63] focus:ring-[#ec1e63]" /><span className="text-xs text-gray-500">Open</span></label>
                                            <button type="button" onClick={() => { const s = { ...data.business_hours, hours: data.business_hours.hours.filter((_, j) => j !== i) }; setData('business_hours', s); }} className="p-2 text-red-500 hover:bg-red-50 rounded-lg">🗑️</button>
                                        </div>
                                    ))}
                                    <button type="button" onClick={() => { const s = { ...data.business_hours, hours: [...(data.business_hours.hours || []), { days: '', time: '', isOpen: true }] }; setData('business_hours', s); }} className="px-4 py-2 bg-gray-100 text-gray-600 text-sm font-medium rounded-lg hover:bg-gray-200">+ Add Hours</button>
                                </div>
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
                                <div><label className="block text-sm font-medium text-gray-700 mb-2">Title Highlight</label><input type="text" value={data.cta.titleHighlight} onChange={(e) => setData('cta', { ...data.cta, titleHighlight: e.target.value })} className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#ec1e63]" /></div>
                                <div><label className="block text-sm font-medium text-gray-700 mb-2">Title Suffix</label><input type="text" value={data.cta.titleSuffix} onChange={(e) => setData('cta', { ...data.cta, titleSuffix: e.target.value })} className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#ec1e63]" /></div>
                                <div><label className="block text-sm font-medium text-gray-700 mb-2">Description</label><textarea value={data.cta.description} onChange={(e) => setData('cta', { ...data.cta, description: e.target.value })} className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#ec1e63]" rows={3} /></div>
                                <div><label className="block text-sm font-medium text-gray-700 mb-2">Button 1 Text</label><input type="text" value={data.cta.button1Text} onChange={(e) => setData('cta', { ...data.cta, button1Text: e.target.value })} className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#ec1e63]" /></div>
                                <div><label className="block text-sm font-medium text-gray-700 mb-2">Button 2 Text</label><input type="text" value={data.cta.button2Text} onChange={(e) => setData('cta', { ...data.cta, button2Text: e.target.value })} className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#ec1e63]" /></div>
                                <div><label className="block text-sm font-medium text-gray-700 mb-2">Button 2 Link</label><input type="text" value={data.cta.button2Link} onChange={(e) => setData('cta', { ...data.cta, button2Link: e.target.value })} className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#ec1e63]" /></div>
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
