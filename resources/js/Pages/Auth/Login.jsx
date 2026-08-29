import { useState } from 'react';
import { useForm, Head } from '@inertiajs/react';

export default function Login() {
    const { data, setData, post, processing, errors } = useForm({
        email: '',
        password: '',
        remember: false,
    });

    const submit = (e) => {
        e.preventDefault();
        post('/login');
    };

    return (
        <>
            <Head title="Login" />
            <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#fdf8f5] via-white to-[#fff9f4] px-4">
                {/* Background Decorations */}
                <div className="absolute inset-0 overflow-hidden">
                    <div className="absolute top-20 left-[10%] w-72 h-72 bg-[#ec1e63]/10 rounded-full blur-[100px]" />
                    <div className="absolute bottom-20 right-[15%] w-96 h-96 bg-[#f7941e]/10 rounded-full blur-[120px]" />
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-[#8b2fc9]/10 rounded-full blur-[80px]" />
                </div>

                <div className="relative w-full max-w-md">
                    {/* Logo */}
                    <div className="text-center mb-8">
                        <div className="inline-flex items-center gap-3 mb-4">
                            <img src="/image/rllogo.png" alt="RAW LIQUEUR" className="h-[70px] w-auto" />
                        </div>
                        <h1 className="text-3xl font-bold text-[#1a1425] mb-2">Welcome Back</h1>
                        <p className="text-[#7a7488]">Sign in to access the admin panel</p>
                    </div>

                    {/* Login Form */}
                    <div className="bg-white rounded-3xl p-8 border border-gray-100 shadow-[0_20px_60px_-15px_rgba(0,0,0,.1)]">
                        <form onSubmit={submit} className="space-y-6">
                            <div>
                                <label className="block text-sm font-medium text-[#1a1425] mb-2">Email Address</label>
                                <input
                                    type="email"
                                    value={data.email}
                                    onChange={(e) => setData('email', e.target.value)}
                                    className="w-full px-4 py-3 bg-[#fdf8f5] border border-gray-200 rounded-xl text-[#1a1425] placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#ec1e63] focus:border-transparent transition-all"
                                    placeholder="admin@rawliqueur.com"
                                    autoComplete="username"
                                />
                                {errors.email && (
                                    <p className="mt-2 text-sm text-red-500">{errors.email}</p>
                                )}
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-[#1a1425] mb-2">Password</label>
                                <input
                                    type="password"
                                    value={data.password}
                                    onChange={(e) => setData('password', e.target.value)}
                                    className="w-full px-4 py-3 bg-[#fdf8f5] border border-gray-200 rounded-xl text-[#1a1425] placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#ec1e63] focus:border-transparent transition-all"
                                    placeholder="••••••••"
                                    autoComplete="current-password"
                                />
                                {errors.password && (
                                    <p className="mt-2 text-sm text-red-500">{errors.password}</p>
                                )}
                            </div>

                            <div className="flex items-center justify-between">
                                <label className="flex items-center gap-3 cursor-pointer">
                                    <input
                                        type="checkbox"
                                        checked={data.remember}
                                        onChange={(e) => setData('remember', e.target.checked)}
                                        className="w-4 h-4 rounded border-gray-300 text-[#ec1e63] focus:ring-[#ec1e63]"
                                    />
                                    <span className="text-sm text-[#7a7488]">Remember me</span>
                                </label>
                                <a href="#" className="text-sm text-[#ec1e63] hover:text-[#f7941e] transition-colors">
                                    Forgot password?
                                </a>
                            </div>

                            <button
                                type="submit"
                                disabled={processing}
                                className="w-full py-3 px-4 bg-gradient-to-r from-[#ec1e63] to-[#f7941e] text-white font-semibold rounded-xl shadow-lg shadow-pink-200 hover:shadow-xl hover:shadow-pink-300 hover:brightness-110 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                {processing ? (
                                    <span className="flex items-center justify-center gap-2">
                                        <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                                        </svg>
                                        Signing in...
                                    </span>
                                ) : (
                                    'Sign In'
                                )}
                            </button>
                        </form>

                        {/* Demo Credentials */}
                        <div className="mt-6 p-4 bg-[#fdf8f5] rounded-xl border border-gray-100">
                            <p className="text-xs text-[#7a7488] text-center mb-2">Demo Credentials</p>
                            <p className="text-xs text-[#7a7488] text-center">
                                Email: <span className="text-[#ec1e63] font-medium">admin@rawliqueur.com</span>
                                <br />
                                Password: <span className="text-[#ec1e63] font-medium">password</span>
                            </p>
                        </div>
                    </div>

                    {/* Back to Site */}
                    <div className="text-center mt-6">
                        <a href="/" className="text-sm text-[#7a7488] hover:text-[#1a1425] transition-colors">
                            ← Back to RAW LIQUEUR
                        </a>
                    </div>
                </div>
            </div>
        </>
    );
}
