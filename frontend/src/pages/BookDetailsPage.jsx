import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchBookDetails, addReview, deleteReview } from '../features/books/booksSlice';

const BookDetailsPage = () => {
    const { isbn } = useParams();
    const dispatch = useDispatch();
    const { currentBook, loading, error } = useSelector((state) => state.books);
    const { user, isAuthenticated } = useSelector((state) => state.auth);
    const [reviewText, setReviewText] = useState('');

    useEffect(() => {
        if (isbn) dispatch(fetchBookDetails(isbn));
    }, [dispatch, isbn]);

    const handleReview = async (e) => {
        e.preventDefault();
        if (reviewText.trim()) {
            await dispatch(addReview({ isbn, review: reviewText }));
            setReviewText('');
            dispatch(fetchBookDetails(isbn));
        }
    };

    const handleDelete = async () => {
        if (window.confirm("Permanent deletion of this critique?")) {
            await dispatch(deleteReview(isbn));
            dispatch(fetchBookDetails(isbn));
        }
    };

    if (loading) return (
        <div className="min-h-screen flex items-center justify-center">
            <div className="w-12 h-12 border-2 border-indigo-500/20 border-t-indigo-500 rounded-full animate-spin"></div>
        </div>
    );

    if (error || !currentBook) return (
        <div className="min-h-screen flex flex-col items-center justify-center gap-6 px-4 text-center">
            <div className="text-6xl">📔</div>
            <h2 className="text-2xl font-black text-white italic tracking-tighter uppercase">Archive Entry Unavailable</h2>
            <p className="text-slate-500 max-w-sm">The records for ISBN {isbn} could not be retrieved. It may have been redacted or never existed.</p>
            <Link to="/" className="btn-primary">Return to Library</Link>
        </div>
    );

    const reviews = currentBook.reviews ? (Array.isArray(currentBook.reviews) ? currentBook.reviews : Object.values(currentBook.reviews)) : [];
    const hasReviewed = reviews.some(r => r.reviewer === user || r.username === user);

    return (
        <div className="pt-32 pb-24 px-6 lg:px-12 max-w-7xl mx-auto animate-fade-in">
            <div className="grid lg:grid-cols-12 gap-16 items-start">
                {/* Image Column */}
                <div className="lg:col-span-5 stagger-item">
                    <div className="sticky top-32">
                        <div className="premium-card aspect-[3/4.5] group lg:max-h-[700px]">
                            <img
                                src={currentBook.cover || currentBook.imageLink}
                                className="w-full h-full object-cover"
                                alt={currentBook.title}
                                onError={(e) => {
                                    e.target.onerror = null;
                                    e.target.src = `https://via.placeholder.com/600x900?text=${encodeURIComponent(currentBook.title)}`;
                                }}
                            />
                            <div className="absolute inset-0 ring-1 ring-inset ring-white/10"></div>
                        </div>
                    </div>
                </div>

                {/* Content Column */}
                <div className="lg:col-span-7 space-y-12 stagger-item" style={{ animationDelay: '200ms' }}>
                    <div>
                        <span className="text-xs font-black text-indigo-500 uppercase tracking-[0.2em] mb-4 block">Archive Record #{currentBook.isbn}</span>
                        <h1 className="text-5xl md:text-7xl font-black text-white italic leading-tight mb-6 uppercase tracking-tighter">{currentBook.title}</h1>
                        <p className="text-xl font-bold text-slate-400 italic">by {currentBook.author}</p>
                    </div>

                    <div className="space-y-6">
                        <h3 className="text-xs font-black text-white uppercase tracking-widest border-b border-white/10 pb-4">Synopsis</h3>
                        <p className="text-lg text-slate-400 leading-relaxed font-medium">{currentBook.description}</p>
                    </div>

                    {/* Review Section */}
                    <div className="space-y-8 pt-12 border-t border-white/5">
                        <h3 className="text-xs font-black text-white uppercase tracking-widest">The Critique</h3>

                        {isAuthenticated ? (
                            <form onSubmit={handleReview} className="space-y-4">
                                <textarea
                                    value={reviewText}
                                    onChange={(e) => setReviewText(e.target.value)}
                                    placeholder="Write your contribution to the archive..."
                                    className="w-full h-32 bg-white/5 border border-white/10 rounded-2xl p-6 text-white text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/50 transition-all placeholder:text-slate-600"
                                />
                                <div className="flex justify-end">
                                    <button type="submit" className="glass-button btn-primary py-3 px-10">Post Review</button>
                                </div>
                            </form>
                        ) : (
                            <div className="bg-[#18181b] p-12 rounded-3xl border border-white/5 text-center">
                                <p className="text-slate-400 font-bold mb-6 italic uppercase tracking-tighter">You must be part of our circle to contribute.</p>
                                <Link to="/login" className="text-sm font-black text-indigo-400 uppercase tracking-widest hover:text-indigo-300">Sign in to Review</Link>
                            </div>
                        )}

                        <div className="space-y-6">
                            {Object.entries(currentBook.reviews || {}).length > 0 ? (
                                Object.entries(currentBook.reviews).map(([reviewer, text], i) => (
                                    <div key={i} className="bg-white/5 p-8 rounded-2xl border border-white/5">
                                        <div className="flex justify-between items-start mb-4">
                                            <div className="flex flex-col">
                                                <span className="text-[10px] font-black text-indigo-500 uppercase tracking-widest mb-1">Contributor</span>
                                                <span className="font-bold text-white uppercase tracking-tighter italic">{reviewer}</span>
                                            </div>
                                            {reviewer === user && (
                                                <button onClick={handleDelete} className="text-xs font-black text-red-500/60 hover:text-red-500 uppercase tracking-widest transition-colors">Delete</button>
                                            )}
                                        </div>
                                        <p className="text-slate-400 leading-relaxed font-medium italic">"{text}"</p>
                                    </div>
                                ))
                            ) : (
                                <p className="text-slate-600 font-bold italic text-center py-12 uppercase tracking-tighter lg:text-3xl opacity-20">Silence. Be the first to break the ice.</p>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default BookDetailsPage;
