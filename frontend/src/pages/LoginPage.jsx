import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, Link } from 'react-router-dom';
import { loginUser } from '../features/auth/authSlice';

const LoginPage = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { loading, error } = useSelector((state) => state.auth);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const result = await dispatch(loginUser({ username, password }));
        if (loginUser.fulfilled.match(result)) {
            navigate('/');
        }
    };

    return (
        <div className="min-h-screen grid lg:grid-cols-2">
            {/* Visual Column */}
            <div className="hidden lg:block relative bg-[#09090b]">
                <img
                    src="https://images.unsplash.com/photo-1516979187457-637abb4f9353?q=80&w=2070&auto=format&fit=crop"
                    className="absolute inset-0 w-full h-full object-cover opacity-60 grayscale hover:grayscale-0 transition-all duration-1000"
                    alt="Library"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#09090b] via-transparent to-transparent"></div>
                <div className="absolute bottom-16 left-16 max-w-lg">
                    <h2 className="text-5xl font-black text-white italic tracking-tighter mb-6 uppercase">"Access the archives of human thought."</h2>
                    <p className="text-slate-400 font-medium tracking-widest uppercase text-xs">Shelfwise Collective © 2025</p>
                </div>
            </div>

            {/* Form Column */}
            <div className="flex items-center justify-center p-8 bg-[#09090b]">
                <div className="w-full max-w-md space-y-12 stagger-item">
                    <div className="text-center lg:text-left">
                        <Link to="/" className="text-indigo-500 text-sm font-black uppercase tracking-[0.3em] mb-4 inline-block">← Library</Link>
                        <h1 className="text-5xl font-black text-white italic uppercase tracking-tighter mb-2">Identify Yourself.</h1>
                        <p className="text-slate-500 uppercase tracking-widest text-[10px] font-bold">Secure Access Gateway</p>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div className="space-y-1">
                            <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest ml-1">Username</label>
                            <input
                                type="text"
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                                className="input-premium w-full"
                                placeholder="THE_COLLECTOR"
                                required
                            />
                        </div>
                        <div className="space-y-1">
                            <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest ml-1">Password</label>
                            <input
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className="input-premium w-full"
                                placeholder="••••••••"
                                required
                            />
                        </div>

                        {error && (
                            <div className="bg-red-500/10 border border-red-500/20 rounded-2xl p-4 text-red-500 text-xs font-bold uppercase tracking-widest italic text-center">
                                Authentication Denied: {error}
                            </div>
                        )}

                        <button
                            type="submit"
                            disabled={loading}
                            className="glass-button btn-primary w-full py-5"
                        >
                            {loading ? 'Validating...' : 'Enter the Archive'}
                        </button>
                    </form>

                    <p className="text-center text-slate-600 text-xs font-bold uppercase tracking-widest">
                        New seeker? <Link to="/register" className="text-white hover:text-indigo-400 transition-colors">Join our circle</Link>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default LoginPage;
