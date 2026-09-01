import { useState, useEffect } from 'react';
import AdminLayout from '@/Layouts/AdminLayout';
import { useForm, usePage } from '@inertiajs/react';

export default function Settings({ settings, emailSettings }) {
    const { flash, errors } = usePage().props;
    const [activeTab, setActiveTab] = useState(() => {
        const params = new URLSearchParams(window.location.search);
        return params.get('tab') || 'general';
    });
    const [showFlash, setShowFlash] = useState({ success: null, error: null });

    useEffect(() => {
        if (flash?.success) {
            setShowFlash({ success: flash.success, error: null });
            const timer = setTimeout(() => setShowFlash({ success: null, error: null }), 5000);
            return () => clearTimeout(timer);
        }
        if (flash?.error) {
            setShowFlash({ success: null, error: flash.error });
            const timer = setTimeout(() => setShowFlash({ success: null, error: null }), 5000);
            return () => clearTimeout(timer);
        }
    }, [flash]);

    const { data: generalData, setData: setGeneralData, put: putGeneral, processing: generalProcessing } = useForm({
        site_name: settings.site_name,
        site_description: settings.site_description,
        contact_email: settings.contact_email,
        social_facebook: settings.social_facebook,
        social_youtube: settings.social_youtube,
        social_instagram: settings.social_instagram,
        maintenance_mode: settings.maintenance_mode,
        allow_submissions: settings.allow_submissions,
    });

    const { data: emailData, setData: setEmailData, put: putEmail, processing: emailProcessing } = useForm({
        mail_driver: emailSettings?.mail_driver || 'smtp',
        mail_host: emailSettings?.mail_host || 'smtp.mailtrap.io',
        mail_port: emailSettings?.mail_port || 587,
        mail_username: emailSettings?.mail_username || '',
        mail_password: emailSettings?.mail_password || '',
        mail_encryption: emailSettings?.mail_encryption || 'tls',
        mail_from_address: emailSettings?.mail_from_address || '',
        mail_from_name: emailSettings?.mail_from_name || 'RAW LIQUEUR',
        submissions_to: emailSettings?.submissions_to || '',
        notifications_enabled: emailSettings?.notifications_enabled || false,
    });

    const { data: testData, setData: setTestData, post: postTest, processing: testProcessing } = useForm({
        test_email: '',
    });

    const handleGeneralSubmit = (e) => {
        e.preventDefault();
        putGeneral('/admin/settings?tab=general');
    };

    const handleEmailSubmit = (e) => {
        e.preventDefault();
        putEmail('/admin/settings/email?tab=email');
    };

    const handleTestEmail = (e) => {
        e.preventDefault();
        postTest('/admin/settings/test-email?tab=email');
    };

    return (
        <AdminLayout title="Settings">
            {showFlash.success && <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-xl text-green-700 text-sm">{showFlash.success}</div>}
            {showFlash.error && <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-xl text-red-700 text-sm">{showFlash.error}</div>}
            {Object.keys(errors || {}).length > 0 && (
                <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-xl text-red-700 text-sm">
                    <ul className="list-disc list-inside">
                        {Object.entries(errors).map(([field, message]) => (
                            <li key={field}>{message}</li>
                        ))}
                    </ul>
                </div>
            )}

            {/* Tabs */}
            <div className="flex gap-2 mb-6 overflow-x-auto pb-2">
                <button onClick={() => setActiveTab('general')} className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium whitespace-nowrap transition-all ${activeTab === 'general' ? 'bg-gradient-to-r from-[#ec1e63] to-[#f7941e] text-white shadow-lg' : 'bg-white text-gray-600 hover:bg-gray-50 border border-gray-200'}`}>
                    ⚙️ General
                </button>
                <button onClick={() => setActiveTab('email')} className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium whitespace-nowrap transition-all ${activeTab === 'email' ? 'bg-gradient-to-r from-[#ec1e63] to-[#f7941e] text-white shadow-lg' : 'bg-white text-gray-600 hover:bg-gray-50 border border-gray-200'}`}>
                    ✉️ Email Configuration
                </button>
            </div>

            {/* General Settings */}
            {activeTab === 'general' && (
                <form onSubmit={handleGeneralSubmit}>
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                        <div className="lg:col-span-2 space-y-6">
                            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
                                <h3 className="text-lg font-bold text-[#1a1425] mb-6">General Settings</h3>
                                <div className="space-y-4">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">Site Name</label>
                                        <input type="text" value={generalData.site_name} onChange={(e) => setGeneralData('site_name', e.target.value)} className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#ec1e63]" />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">Site Description</label>
                                        <textarea value={generalData.site_description} onChange={(e) => setGeneralData('site_description', e.target.value)} rows={3} className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#ec1e63] resize-none" />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">Contact Email</label>
                                        <input type="email" value={generalData.contact_email} onChange={(e) => setGeneralData('contact_email', e.target.value)} className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#ec1e63]" />
                                    </div>
                                </div>
                            </div>

                            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
                                <h3 className="text-lg font-bold text-[#1a1425] mb-6">Social Media Links</h3>
                                <div className="space-y-4">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">Facebook URL</label>
                                        <input type="url" value={generalData.social_facebook} onChange={(e) => setGeneralData('social_facebook', e.target.value)} placeholder="https://facebook.com/..." className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#ec1e63]" />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">YouTube URL</label>
                                        <input type="url" value={generalData.social_youtube} onChange={(e) => setGeneralData('social_youtube', e.target.value)} placeholder="https://youtube.com/..." className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#ec1e63]" />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">Instagram URL</label>
                                        <input type="url" value={generalData.social_instagram} onChange={(e) => setGeneralData('social_instagram', e.target.value)} placeholder="https://instagram.com/..." className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#ec1e63]" />
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="space-y-6">
                            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
                                <h3 className="text-lg font-bold text-[#1a1425] mb-6">Publish</h3>
                                <button type="submit" disabled={generalProcessing} className="w-full px-5 py-3 bg-gradient-to-r from-[#ec1e63] to-[#f7941e] text-white font-medium text-sm rounded-xl hover:shadow-lg hover:shadow-pink-200 transition-all disabled:opacity-50">
                                    {generalProcessing ? 'Saving...' : 'Save Settings'}
                                </button>
                            </div>

                            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
                                <h3 className="text-lg font-bold text-[#1a1425] mb-6">Options</h3>
                                <div className="space-y-4">
                                    <label className="flex items-center justify-between cursor-pointer">
                                        <span className="text-sm text-gray-700">Maintenance Mode</span>
                                        <div className="relative">
                                            <input type="checkbox" checked={generalData.maintenance_mode} onChange={(e) => setGeneralData('maintenance_mode', e.target.checked)} className="sr-only peer" />
                                            <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-[#ec1e63] rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#ec1e63]" />
                                        </div>
                                    </label>
                                    <label className="flex items-center justify-between cursor-pointer">
                                        <span className="text-sm text-gray-700">Allow Submissions</span>
                                        <div className="relative">
                                            <input type="checkbox" checked={generalData.allow_submissions} onChange={(e) => setGeneralData('allow_submissions', e.target.checked)} className="sr-only peer" />
                                            <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-[#ec1e63] rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#ec1e63]" />
                                        </div>
                                    </label>
                                </div>
                            </div>

                            <div className="bg-gradient-to-br from-[#1a1425] to-[#3a3548] rounded-2xl p-6 text-white">
                                <h3 className="font-bold mb-2">Need Help?</h3>
                                <p className="text-white/70 text-sm mb-4">Contact our support team for assistance with the admin panel.</p>
                                <a href="/contact" className="inline-block px-4 py-2 bg-white/10 hover:bg-white/20 text-white text-sm font-medium rounded-lg transition-colors">Contact Support</a>
                            </div>
                        </div>
                    </div>
                </form>
            )}

            {/* Email Settings */}
            {activeTab === 'email' && (
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    <div className="lg:col-span-2 space-y-6">
                        <form id="emailSettingsForm" onSubmit={handleEmailSubmit}>
                            {/* SMTP Configuration */}
                            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
                                <h3 className="text-lg font-bold text-[#1a1425] mb-6">SMTP Configuration</h3>
                                <div className="space-y-4">
                                    <div className="grid grid-cols-2 gap-4">
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-2">Mail Driver</label>
                                            <select value={emailData.mail_driver} onChange={(e) => setEmailData('mail_driver', e.target.value)} className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#ec1e63]">
                                                <option value="smtp">SMTP</option>
                                                <option value="sendmail">Sendmail</option>
                                                <option value="mailgun">Mailgun</option>
                                                <option value="ses">Amazon SES</option>
                                            </select>
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-2">Encryption</label>
                                            <select value={emailData.mail_encryption} onChange={(e) => setEmailData('mail_encryption', e.target.value)} className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#ec1e63]">
                                                <option value="tls">TLS</option>
                                                <option value="ssl">SSL</option>
                                            </select>
                                        </div>
                                    </div>
                                    <div className="grid grid-cols-2 gap-4">
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-2">SMTP Host</label>
                                            <input type="text" value={emailData.mail_host} onChange={(e) => setEmailData('mail_host', e.target.value)} placeholder="smtp.gmail.com" className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#ec1e63]" />
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-2">SMTP Port</label>
                                            <input type="number" value={emailData.mail_port} onChange={(e) => setEmailData('mail_port', parseInt(e.target.value) || 587)} className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#ec1e63]" />
                                        </div>
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">Username</label>
                                        <input type="text" value={emailData.mail_username} onChange={(e) => setEmailData('mail_username', e.target.value)} placeholder="your-email@gmail.com" className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#ec1e63]" />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">Password</label>
                                        <input type="password" value={emailData.mail_password} onChange={(e) => setEmailData('mail_password', e.target.value)} placeholder="••••••••" className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#ec1e63]" />
                                    </div>
                                </div>
                            </div>

                            {/* Sender Settings */}
                            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
                                <h3 className="text-lg font-bold text-[#1a1425] mb-6">Sender Settings</h3>
                                <div className="space-y-4">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">From Email Address</label>
                                        <input type="email" value={emailData.mail_from_address} onChange={(e) => setEmailData('mail_from_address', e.target.value)} placeholder="noreply@rawliqueur.com" className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#ec1e63]" />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">From Name</label>
                                        <input type="text" value={emailData.mail_from_name} onChange={(e) => setEmailData('mail_from_name', e.target.value)} placeholder="RAW LIQUEUR" className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#ec1e63]" />
                                    </div>
                                </div>
                            </div>

                            {/* Notification Settings */}
                            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
                                <h3 className="text-lg font-bold text-[#1a1425] mb-6">Notification Settings</h3>
                                <div className="space-y-4">
                                    <label className="flex items-center justify-between cursor-pointer">
                                        <div>
                                            <span className="text-sm font-medium text-gray-700">Enable Email Notifications</span>
                                            <p className="text-xs text-gray-500 mt-1">Send email when new talent is submitted</p>
                                        </div>
                                        <div className="relative">
                                            <input type="checkbox" checked={emailData.notifications_enabled} onChange={(e) => setEmailData('notifications_enabled', e.target.checked)} className="sr-only peer" />
                                            <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-[#ec1e63] rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#ec1e63]" />
                                        </div>
                                    </label>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">Submission Notification Email</label>
                                        <input type="email" value={emailData.submissions_to} onChange={(e) => setEmailData('submissions_to', e.target.value)} placeholder="admin@rawliqueur.com" className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#ec1e63]" />
                                        <p className="text-xs text-gray-500 mt-1">Email address to receive talent submission notifications</p>
                                    </div>
                                </div>
                            </div>
                        </form>
                    </div>

                    {/* Sidebar */}
                    <div className="space-y-6">
                        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
                            <h3 className="text-lg font-bold text-[#1a1425] mb-6">Publish</h3>
                            <button type="submit" form="emailSettingsForm" disabled={emailProcessing} className="w-full px-5 py-3 bg-gradient-to-r from-[#ec1e63] to-[#f7941e] text-white font-medium text-sm rounded-xl hover:shadow-lg hover:shadow-pink-200 transition-all disabled:opacity-50">
                                {emailProcessing ? 'Saving...' : 'Save Email Settings'}
                            </button>
                        </div>

                        {/* Test Email - OUTSIDE the email form */}
                        <form onSubmit={handleTestEmail} className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 space-y-3">
                            <h3 className="text-lg font-bold text-[#1a1425] mb-4">Test Email</h3>
                            <p className="text-xs text-gray-500 mb-4">Send a test email to verify your configuration is working.</p>
                            <input type="email" value={testData.test_email} onChange={(e) => setTestData('test_email', e.target.value)} placeholder="test@example.com" required className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#ec1e63]" />
                            <button type="submit" disabled={testProcessing} className="w-full px-5 py-2.5 bg-gray-900 text-white font-medium text-sm rounded-xl hover:bg-gray-800 transition-all disabled:opacity-50">
                                {testProcessing ? 'Sending...' : 'Send Test Email'}
                            </button>
                        </form>

                        {/* SMTP Providers */}
                        <div className="bg-gradient-to-br from-[#1a1425] to-[#3a3548] rounded-2xl p-6 text-white">
                            <h3 className="font-bold mb-3">Popular SMTP Providers</h3>
                            <div className="space-y-2 text-sm text-white/70">
                                <p><strong className="text-white">Gmail:</strong> smtp.gmail.com:587</p>
                                <p><strong className="text-white">Mailtrap:</strong> smtp.mailtrap.io:587</p>
                                <p><strong className="text-white">SendGrid:</strong> smtp.sendgrid.net:587</p>
                                <p><strong className="text-white">Outlook:</strong> smtp.office365.com:587</p>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </AdminLayout>
    );
}
