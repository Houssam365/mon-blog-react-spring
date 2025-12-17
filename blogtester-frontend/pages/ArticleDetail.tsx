import React, { useEffect, useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { articleService, commentService } from '../services/api';
import { useAuth } from '../context/AuthContext';
import { Article, Comment } from '../types';
import { Calendar, MessageCircle, Trash2, Edit2, Send } from 'lucide-react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

const ArticleDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { token, user } = useAuth();

  const [article, setArticle] = useState<Article | null>(null);
  const [comments, setComments] = useState<Comment[]>([]);
  const [newComment, setNewComment] = useState('');

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      if (!id) return;
      try {
        const [articleData, commentsData] = await Promise.all([
          articleService.getOne(id),
          commentService.getByArticle(id)
        ]);
        setArticle(articleData);
        // Normalize comments (backend might return array or object)
        const commentsList = Array.isArray(commentsData) ? commentsData : (commentsData.comments || []);
        setComments(commentsList);
      } catch (err: any) {
        setError(err.message || 'Failed to load data');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [id]);

  const handleDeleteArticle = async () => {
    if (!id || !token || !window.confirm('Are you sure you want to delete this article?')) return;
    try {
      await articleService.delete(id, token);
      navigate('/');
    } catch (err: any) {
      alert(err.message || 'Failed to delete');
    }
  };

  const handleAddComment = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!id || !token || !newComment.trim()) return;

    setSubmitting(true);
    try {
      await commentService.add({ articleId: id, content: newComment }, token);

      // Refresh comments
      const updatedComments = await commentService.getByArticle(id);
      setComments(Array.isArray(updatedComments) ? updatedComments : (updatedComments.comments || []));
      setNewComment('');
    } catch (err: any) {
      alert(err.message || 'Failed to post comment');
    } finally {
      setSubmitting(false);
    }
  };

  const handleDeleteComment = async (commentId: string) => {
    if (!token || !window.confirm('Delete this comment?')) return;
    try {
      await commentService.delete(commentId, token);
      setComments(comments.filter(c => c._id !== commentId));
    } catch (err: any) {
      alert(err.message || 'Failed to delete comment');
    }
  };

  if (loading) return <div className="text-center py-20">Loading...</div>;
  if (error || !article) return <div className="text-center py-20 text-red-500">{error || 'Article not found'}</div>;

  return (
    <div className="max-w-3xl mx-auto">
      {/* Article Content */}
      <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden mb-8">
        <div className="p-8">
          <h1 className="text-3xl font-bold text-slate-900 mb-4">{article.title}</h1>
          <div className="flex items-center text-sm text-slate-500 mb-8 pb-6 border-b border-slate-100">
            <Calendar className="w-4 h-4 mr-1" />
            <span className="mr-4">{new Date(article.createdAt).toLocaleDateString()}</span>
            <span className="mr-4 text-slate-400">|</span>
            <span className="mr-4 font-medium text-primary">
              By {typeof article.author === 'object' ? (article.author as any).username : 'Unknown'}
            </span>

            {/* Check if user is the author */}
            {user && article.author && (
              (typeof article.author === 'string' && article.author === user._id) ||
              (typeof article.author === 'object' && (article.author as any)._id === user._id)
            ) && (
                <div className="flex items-center ml-auto space-x-3">
                  <Link to={`/edit/${article._id}`} className="text-blue-600 hover:text-blue-800 flex items-center">
                    <Edit2 className="w-4 h-4 mr-1" /> Edit
                  </Link>
                  <button onClick={handleDeleteArticle} className="text-red-500 hover:text-red-700 flex items-center">
                    <Trash2 className="w-4 h-4 mr-1" /> Delete
                  </button>
                </div>
              )}
          </div>

          <div className="prose prose-slate max-w-none text-slate-800 leading-relaxed mb-6">
            <ReactMarkdown remarkPlugins={[remarkGfm]}>{article.content}</ReactMarkdown>
          </div>

          {article.tags && article.tags.length > 0 && (
            <div className="flex flex-wrap gap-2 pt-6 border-t border-slate-100">
              {article.tags.map((tag, index) => (
                <span key={index} className="bg-slate-100 text-slate-600 px-3 py-1 rounded-full text-sm font-medium">
                  #{tag}
                </span>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Comments Section */}
      <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-8">
        <h3 className="text-xl font-bold text-slate-900 mb-6 flex items-center">
          <MessageCircle className="w-5 h-5 mr-2" /> Comments ({comments.length})
        </h3>

        {/* Comment Form */}
        {token ? (
          <form onSubmit={handleAddComment} className="mb-8">
            <textarea
              className="w-full p-4 border border-slate-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary outline-none transition-all resize-y min-h-[100px]"
              placeholder="Add to the discussion... (Markdown supported)"
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
              required
            />
            <div className="flex justify-end mt-2">
              <button
                type="submit"
                disabled={submitting}
                className="bg-primary text-white px-4 py-2 rounded-md hover:bg-indigo-700 transition-colors flex items-center disabled:opacity-50"
              >
                <Send className="w-4 h-4 mr-2" />
                {submitting ? 'Posting...' : 'Post Comment'}
              </button>
            </div>
          </form>
        ) : (
          <div className="bg-slate-50 p-4 rounded-lg mb-8 text-center text-slate-600">
            <Link to="/login" className="text-primary font-medium hover:underline">Log in</Link> to join the discussion.
          </div>
        )}

        {/* Comments List */}
        <div className="space-y-6">
          {comments.map((comment) => (
            <div key={comment._id} className="border-b border-slate-100 last:border-0 pb-6 last:pb-0">
              <div className="flex justify-between items-start mb-2">
                <div className="text-sm font-semibold text-slate-900">
                  {/* Handle author being populated object or string id */}
                  {typeof comment.author === 'object' ? (comment.author?.username || comment.author?.email) : 'User'}
                </div>
                <div className="text-xs text-slate-400">
                  {new Date(comment.createdAt).toLocaleDateString()}
                </div>
              </div>
              <div className="text-slate-700 text-sm mb-2 prose prose-sm max-w-none">
                <ReactMarkdown>{comment.content}</ReactMarkdown>
              </div>
              {user && comment.author && (
                (typeof comment.author === 'string' && comment.author === user._id) ||
                (typeof comment.author === 'object' && (comment.author as any)._id === user._id)
              ) && (
                  <button
                    onClick={() => handleDeleteComment(comment._id)}
                    className="text-xs text-red-400 hover:text-red-600"
                  >
                    Delete
                  </button>
                )}
            </div>
          ))}
          {comments.length === 0 && (
            <p className="text-slate-500 italic text-center text-sm">No comments yet.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default ArticleDetail;