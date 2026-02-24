import React, { useState, useEffect } from 'react';
import { useLocation, Link } from 'react-router-dom';
import { useSelector } from 'react-redux';

const SearchPage = () => {
    const location = useLocation();
    const { library } = useSelector((state) => state.books);
    const [books, setBooks] = useState([]);
    const query = new URLSearchParams(location.search).get('q') || '';

    useEffect(() => {
        if (query) {
            const filtered = library.filter(book =>
                book.title.toLowerCase().includes(query.toLowerCase()) ||
                book.author.toLowerCase().includes(query.toLowerCase()) ||
                book.isbn.includes(query)
            );
            setBooks(filtered);
        }
    }, [query, library]);

    return (
        <div className="min-h-screen pt-32 pb-24 px-6 lg:px-12">
            <div className="max-w-7xl mx-auto mb-16">
                <Link to="/" className="text-indigo-500 text-sm font-black uppercase tracking-[0.3em] mb-4 inline-block">← Return</Link>
                <h1 className="text-4xl md:text-6xl font-black text-white italic uppercase tracking-tighter mb-4">
                    SEARCH RESULTS: <span className="text-indigo-500">{query}</span>
                </h1>
                <p className="text-slate-500 font-medium">Found {books.length} matches in the archive.</p>
            </div>

            {books.length > 0 ? (
                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-y-16 gap-x-8">
                    {books.map((book, idx) => (
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
                                        e.target.src = `https://via.placeholder.com/400x600?text=${encodeURIComponent(book.title)}`;
                                    }}
                                />
                                <div className="absolute inset-0 bg-indigo-600/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                                    <span className="text-xs font-black uppercase tracking-widest text-white px-4 py-2 bg-indigo-600 rounded-full shadow-lg">View Details</span>
                                </div>
                            </div>
                            <h3 className="text-sm font-black text-white mb-1 uppercase tracking-tight group-hover:text-indigo-400 transition-colors line-clamp-2">{book.title}</h3>
                            <p className="text-xs font-bold text-slate-500 italic uppercase tracking-wider">{book.author}</p>
                        </Link>
                    ))}
                </div>
            ) : (
                <div className="text-center py-24 bg-white/5 rounded-3xl border border-white/5 mt-12">
                    <p className="text-slate-500 font-bold italic uppercase tracking-tighter text-2xl">No records found for this query.</p>
                </div>
            )}
        </div>
    );
};

export default SearchPage;
