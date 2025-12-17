import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { articleService } from '../services/api';
import { useAuth } from '../context/AuthContext';
import { Save, X } from 'lucide-react';

const ArticleForm: React.FC = () => {
  const { id } = useParams<{ id: string }>(); // If id exists, it's Edit mode
  const navigate = useNavigate();
  const { token } = useAuth();

  const [title, setTitle] = useState('');

  const [content, setContent] = useState('');
  const [tags, setTags] = useState('');
  const [loading, setLoading] = useState(false);
  const [initialLoading, setInitialLoading] = useState(!!id);
  const [error, setError] = useState('');

  useEffect(() => {
    if (id) {
      const fetchArticle = async () => {
        try {
          const data = await articleService.getOne(id);
          setTitle(data.title);
          setContent(data.content);
          setTags(data.tags ? data.tags.join(', ') : '');
        } catch (err: any) {
          setError('Failed to fetch article data');
        } finally {
          setInitialLoading(false);
        }
      };
      fetchArticle();
    }
  }, [id]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!token) return;

    setLoading(true);
    setError('');

    try {
      const tagsArray = tags.split(',').map(tag => tag.trim()).filter(tag => tag !== '');
      const articleData = { title, content, tags: tagsArray };

      if (id) {
        await articleService.update(id, articleData, token);
      } else {
        await articleService.create(articleData, token);
      }

      navigate('/');
    } catch (err: any) {
      setError(err.message || 'Operation failed');
    } finally {
      setLoading(false);
    }
  };

  if (initialLoading) return <div className="text-center py-20">Loading editor...</div>;

  return (
    <div className="max-w-2xl mx-auto">
      <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-8">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold text-slate-900">
            {id ? 'Edit Article' : 'New Article'}
          </h1>
          <button
            onClick={() => navigate('/')}
            className="text-slate-400 hover:text-slate-600"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {error && (
          <div className="bg-red-50 text-red-600 p-3 rounded-lg text-sm mb-6 border border-red-100">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">Title</label>
            <input
              type="text"
              required
              className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary outline-none transition-all text-lg font-medium"
              placeholder="Enter a catchy title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">Content</label>
            <textarea
              required
              className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary outline-none transition-all min-h-[300px] font-mono text-sm leading-relaxed"
              placeholder="Write your story here..."
              value={content}
              onChange={(e) => setContent(e.target.value)}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">Tags (comma separated)</label>
            <input
              type="text"
              className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary outline-none transition-all"
              placeholder="tech, coding, react"
              value={tags}
              onChange={(e) => setTags(e.target.value)}
            />
          </div>

          <div className="flex justify-end space-x-3 pt-4 border-t border-slate-100">
            <button
              type="button"
              onClick={() => navigate('/')}
              className="px-4 py-2 text-slate-600 hover:bg-slate-50 rounded-lg transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading}
              className="px-6 py-2 bg-primary text-white rounded-lg hover:bg-indigo-700 transition-colors flex items-center disabled:opacity-50"
            >
              <Save className="w-4 h-4 mr-2" />
              {loading ? 'Saving...' : 'Publish'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ArticleForm;