import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { logout } from '../../features/auth/authSlice';

const Navbar = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { user, isAuthenticated } = useSelector((state) => state.auth);
    const [scrolled, setScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => setScrolled(window.scrollY > 20);
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const handleLogout = () => {
        dispatch(logout());
        navigate('/login');
    };

    return (
        <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${scrolled ? 'py-4 bg-[#09090b]/80 backdrop-blur-xl border-b border-white/5 shadow-2xl' : 'py-8 bg-transparent'
            }`}>
            <div className="max-w-7xl mx-auto px-6 lg:px-12 flex items-center justify-between">
                {/* Brand */}
                <Link to="/" className="flex items-center gap-3 group">
                    <div className="w-10 h-10 bg-indigo-600 rounded-xl flex items-center justify-center shadow-lg shadow-indigo-500/20 group-hover:rotate-12 transition-transform duration-300">
                        <span className="text-white text-xl font-black">📖</span>
                    </div>
                    <span className="text-xl font-black text-white tracking-tighter uppercase italic group-hover:text-indigo-400 transition-colors">
                        Shelfwise
                    </span>
                </Link>

                {/* Navigation */}
                <div className="flex items-center gap-8">
                    {isAuthenticated ? (
                        <div className="flex items-center gap-8">
                            <div className="flex flex-col items-end">
                                <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Collector</span>
                                <span className="text-sm font-bold text-white uppercase tracking-tight">{user}</span>
                            </div>
                            <button
                                onClick={handleLogout}
                                className="text-xs font-black text-slate-400 hover:text-white uppercase tracking-widest transition-colors"
                            >
                                Sign Out
                            </button>
                        </div>
                    ) : (
                        <div className="flex items-center gap-8">
                            <Link to="/login" className="text-xs font-black text-slate-400 hover:text-white uppercase tracking-widest transition-colors">Sign In</Link>
                            <Link to="/register" className="glass-button btn-primary py-2 px-6">Explore</Link>
                        </div>
                    )}
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
