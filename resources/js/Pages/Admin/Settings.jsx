import { useState } from 'react';
import AdminLayout from '@/Layouts/AdminLayout';

export default function Settings({ settings }) {
    const [formData, setFormData] = useState(settings);
    const [saved, setSaved] = useState(false);

    const handleSubmit = (e) => {
        e.preventDefault();
        // Save settings logic here
        setSaved(true);
        setTimeout(() => setSaved(false), 3000);
    };

    return (
        <AdminLayout title="Settings">
            <form onSubmit={handleSubmit}>
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    {/* General Settings */}
                    <div className="lg:col-span-2 space-y-6">
                        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
                            <h3 className="text-lg font-bold text-[#1a1425] mb-6">General Settings</h3>
                            <div className="space-y-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">Site Name</label>
                                    <input
                                        type="text"
                                        value={formData.site_name}
                                        onChange={(e) => setFormData({ ...formData, site_name: e.target.value })}
                                        className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#ec1e63] focus:border-transparent"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">Site Description</label>
                                    <textarea
                                        value={formData.site_description}
                                        onChange={(e) => setFormData({ ...formData, site_description: e.target.value })}
                                        rows={3}
                                        className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#ec1e63] focus:border-transparent resize-none"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">Contact Email</label>
                                    <input
                                        type="email"
                                        value={formData.contact_email}
                                        onChange={(e) => setFormData({ ...formData, contact_email: e.target.value })}
                                        className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#ec1e63] focus:border-transparent"
                                    />
                                </div>
                            </div>
                        </div>

                        {/* Social Links */}
                        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
                            <h3 className="text-lg font-bold text-[#1a1425] mb-6">Social Media Links</h3>
                            <div className="space-y-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">Facebook URL</label>
                                    <input
                                        type="url"
                                        value={formData.social_facebook}
                                        onChange={(e) => setFormData({ ...formData, social_facebook: e.target.value })}
                                        placeholder="https://facebook.com/..."
                                        className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#ec1e63] focus:border-transparent"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">YouTube URL</label>
                                    <input
                                        type="url"
                                        value={formData.social_youtube}
                                        onChange={(e) => setFormData({ ...formData, social_youtube: e.target.value })}
                                        placeholder="https://youtube.com/..."
                                        className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#ec1e63] focus:border-transparent"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">Instagram URL</label>
                                    <input
                                        type="url"
                                        value={formData.social_instagram}
                                        onChange={(e) => setFormData({ ...formData, social_instagram: e.target.value })}
                                        placeholder="https://instagram.com/..."
                                        className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#ec1e63] focus:border-transparent"
                                    />
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Sidebar */}
                    <div className="space-y-6">
                        {/* Publish */}
                        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
                            <h3 className="text-lg font-bold text-[#1a1425] mb-6">Publish</h3>
                            <button
                                type="submit"
                                className="w-full px-5 py-3 bg-gradient-to-r from-[#ec1e63] to-[#f7941e] text-white font-medium text-sm rounded-xl hover:shadow-lg hover:shadow-pink-200 transition-all"
                            >
                                {saved ? '✓ Saved!' : 'Save Settings'}
                            </button>
                        </div>

                        {/* Toggles */}
                        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
                            <h3 className="text-lg font-bold text-[#1a1425] mb-6">Options</h3>
                            <div className="space-y-4">
                                <label className="flex items-center justify-between cursor-pointer">
                                    <span className="text-sm text-gray-700">Maintenance Mode</span>
                                    <div className="relative">
                                        <input
                                            type="checkbox"
                                            checked={formData.maintenance_mode}
                                            onChange={(e) => setFormData({ ...formData, maintenance_mode: e.target.checked })}
                                            className="sr-only peer"
                                        />
                                        <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-[#ec1e63] rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#ec1e63]" />
                                    </div>
                                </label>
                                <label className="flex items-center justify-between cursor-pointer">
                                    <span className="text-sm text-gray-700">Allow Submissions</span>
                                    <div className="relative">
                                        <input
                                            type="checkbox"
                                            checked={formData.allow_submissions}
                                            onChange={(e) => setFormData({ ...formData, allow_submissions: e.target.checked })}
                                            className="sr-only peer"
                                        />
                                        <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-[#ec1e63] rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#ec1e63]" />
                                    </div>
                                </label>
                            </div>
                        </div>

                        {/* Help */}
                        <div className="bg-gradient-to-br from-[#1a1425] to-[#3a3548] rounded-2xl p-6 text-white">
                            <h3 className="font-bold mb-2">Need Help?</h3>
                            <p className="text-white/70 text-sm mb-4">Contact our support team for assistance with the admin panel.</p>
                            <a href="/contact" className="inline-block px-4 py-2 bg-white/10 hover:bg-white/20 text-white text-sm font-medium rounded-lg transition-colors">
                                Contact Support
                            </a>
                        </div>
                    </div>
                </div>
            </form>
        </AdminLayout>
    );
}
