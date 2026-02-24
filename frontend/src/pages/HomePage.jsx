import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { fetchBooks } from '../features/books/booksSlice';

const HomePage = () => {
    const dispatch = useDispatch();
    const { library, loading } = useSelector((state) => state.books);
    const [searchTerm, setSearchTerm] = useState('');

    useEffect(() => {
        dispatch(fetchBooks());
    }, [dispatch]);

    if (loading && library.length === 0) return (
        <div className="min-h-screen flex items-center justify-center">
            <div className="w-12 h-12 border-2 border-indigo-500/20 border-t-indigo-500 rounded-full animate-spin"></div>
        </div>
    );

    return (
        <div className="min-h-screen pt-32 pb-24 px-6 lg:px-12">
            {/* Hero Section */}
            <div className="max-w-7xl mx-auto mb-24 text-center">
                <h1 className="text-6xl md:text-8xl font-black text-white italic tracking-tighter mb-8 animate-shimmer">
                    ALMOST <br />LEGENDARY.
                </h1>
                <p className="text-slate-400 text-lg md:text-xl max-w-2xl mx-auto font-medium leading-relaxed uppercase tracking-widest opacity-80">
                    The curated archive for seekers of fine literature. <br />
                    Discover, critique, and immortalize.
                </p>
            </div>

            {/* Book Grid */}
            <div className="max-w-7xl mx-auto">
                <div className="flex items-center justify-between mb-12">
                    <h2 className="text-2xl font-black text-white uppercase tracking-tight italic">The Archive</h2>
                    <div className="h-px flex-1 mx-8 bg-white/10 hidden md:block"></div>
                    <span className="text-xs font-bold text-slate-500 uppercase tracking-widest">{library.length} ENTRIES FOUND</span>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-y-16 gap-x-8">
                    {library.map((book, idx) => (
                        <Link
                            key={book.isbn || idx}
                            to={`/book/${book.isbn}`}
                            className="group stagger-item flex flex-col"
                            style={{ animationDelay: `${(idx % 10) * 50}ms` }}
                        >
                            <div className="relative aspect-[2/3] rounded-2xl overflow-hidden shadow-2xl mb-6 bg-white/5 transition-all duration-500 group-hover:scale-105 group-hover:-translate-y-4">
                                <img
                                    src={book.cover || book.imageLink}
                                    className="w-full h-full object-cover"
                                    alt={book.title}
                                    loading="lazy"
                                    onError={(e) => {
                                        e.target.onerror = null;
                                        e.target.src = `https://via.placeholder.com/300x450?text=${encodeURIComponent(book.title)}`;
                                    }}
                                />
                                <div className="absolute inset-0 ring-1 ring-inset ring-white/10 rounded-2xl"></div>
                                <div className="absolute inset-0 bg-indigo-600/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                                    <span className="text-xs font-black uppercase tracking-widest text-white px-4 py-2 bg-indigo-600 rounded-full shadow-lg">View Details</span>
                                </div>
                            </div>
                            <h3 className="text-sm font-black text-white mb-1 uppercase tracking-tight group-hover:text-indigo-400 transition-colors line-clamp-2">{book.title}</h3>
                            <p className="text-xs font-bold text-slate-500 italic uppercase tracking-wider">{book.author}</p>
                        </Link>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default HomePage;
