import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { articleService, commentService } from '../services/api';
import { Article, Comment } from '../types';
import { Calendar, MessageCircle, ArrowRight, User as UserIcon } from 'lucide-react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

const Profile: React.FC = () => {
    const { user, token } = useAuth();
    const navigate = useNavigate();

    const [articles, setArticles] = useState<Article[]>([]);
    const [comments, setComments] = useState<Comment[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        if (!token || !user) {
            navigate('/login');
            return;
        }

        const fetchData = async () => {
            setLoading(true);
            try {
                const [articlesData, commentsData] = await Promise.all([
                    articleService.getAll(undefined, user._id),
                    commentService.getByAuthor(user._id)
                ]);

                // Normalize articles
                if (Array.isArray(articlesData)) {
                    setArticles(articlesData);
                } else if (articlesData.articles && Array.isArray(articlesData.articles)) {
                    setArticles(articlesData.articles);
                } else {
                    setArticles([]);
                }

                // Normalize comments
                if (Array.isArray(commentsData)) {
                    setComments(commentsData);
                } else {
                    setComments([]);
                }

            } catch (err: any) {
                setError(err.message || 'Failed to load profile data');
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [user, token, navigate]);

    if (loading) return <div className="text-center py-20">Loading profile...</div>;
    if (error) return <div className="text-center py-20 text-red-500">{error}</div>;

    return (
        <div className="max-w-6xl mx-auto px-4">
            <div className="mb-8 border-b border-slate-200 pb-6">
                <h1 className="text-3xl font-bold text-slate-900 flex items-center">
                    <UserIcon className="w-8 h-8 mr-3 text-primary" />
                    {user?.username}'s Profile
                </h1>
                <p className="text-slate-500 mt-2 ml-11">{user?.email}</p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Main Content: My Articles */}
                <div className="lg:col-span-2 space-y-6">
                    <h2 className="text-2xl font-bold text-slate-800 mb-4">My Articles ({articles.length})</h2>

                    {articles.length === 0 ? (
                        <div className="bg-white p-8 rounded-xl border border-dashed border-slate-300 text-center">
                            <p className="text-slate-500 mb-4">You haven't written any articles yet.</p>
                            <Link to="/create" className="text-primary font-medium hover:underline">Create your first article</Link>
                        </div>
                    ) : (
                        articles.map((article) => (
                            <article key={article._id} className="bg-white rounded-xl border border-slate-200 overflow-hidden hover:shadow-md transition-shadow">
                                <div className="p-6">
                                    <h3 className="text-xl font-bold text-slate-900 mb-2">
                                        <Link to={`/article/${article._id}`} className="hover:text-primary transition-colors">
                                            {article.title}
                                        </Link>
                                    </h3>
                                    <div className="flex items-center text-xs text-slate-500 mb-4">
                                        <Calendar className="w-3 h-3 mr-1" />
                                        {new Date(article.createdAt).toLocaleDateString()}
                                        <span className="mx-2">•</span>
                                        <span className="bg-slate-100 px-2 py-0.5 rounded-full">
                                            {article.tags?.join(', ') || 'No tags'}
                                        </span>
                                    </div>
                                    <div className="text-slate-600 mb-4 line-clamp-2 text-sm prose prose-sm max-w-none">
                                        <ReactMarkdown remarkPlugins={[remarkGfm]} allowedElements={['p', 'strong', 'em', 'span']}>{article.content}</ReactMarkdown>
                                    </div>
                                    <div className="flex justify-end space-x-3">
                                        <Link to={`/edit/${article._id}`} className="text-sm text-blue-600 hover:underline">Edit</Link>
                                        <Link to={`/article/${article._id}`} className="text-sm text-primary hover:underline flex items-center">
                                            Read <ArrowRight className="w-3 h-3 ml-1" />
                                        </Link>
                                    </div>
                                </div>
                            </article>
                        ))
                    )}
                </div>

                {/* Sidebar: My Comments */}
                <div className="lg:col-span-1">
                    <div className="bg-slate-50 rounded-xl p-6 border border-slate-200 sticky top-6">
                        <h2 className="text-xl font-bold text-slate-800 mb-4 flex items-center">
                            <MessageCircle className="w-5 h-5 mr-2" />
                            My Comments ({comments.length})
                        </h2>

                        <div className="space-y-4 max-h-[600px] overflow-y-auto pr-2 custom-scrollbar">
                            {comments.length === 0 ? (
                                <p className="text-slate-500 text-sm italic">No comments yet.</p>
                            ) : (
                                comments.map((comment) => (
                                    <div key={comment._id} className="bg-white p-4 rounded-lg border border-slate-200 shadow-sm text-sm">
                                        <div className="mb-2 text-xs text-slate-500 flex justify-between">
                                            <span>On: <Link to={`/article/${(comment.article as any)._id || comment.article}`} className="text-primary hover:underline font-medium">{(comment.article as any).title || 'Article'}</Link></span>
                                            <span>{new Date(comment.createdAt).toLocaleDateString()}</span>
                                        </div>
                                        <div className="text-slate-700 prose prose-sm max-w-none">
                                            <ReactMarkdown remarkPlugins={[remarkGfm]} allowedElements={['p', 'strong', 'em', 'code']}>{comment.content}</ReactMarkdown>
                                        </div>
                                    </div>
                                ))
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Profile;
