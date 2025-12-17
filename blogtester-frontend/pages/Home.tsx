import React, { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { articleService } from '../services/api';
import { Article } from '../types';
import { ArrowRight, Calendar, User as UserIcon } from 'lucide-react';

import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

const Home: React.FC = () => {
  const [articles, setArticles] = useState<Article[]>([]);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const location = useLocation();

  const fetchArticles = async (query?: string) => {
    setLoading(true);
    try {
      const data = await articleService.getAll(query);
      // Assuming backend returns array directly or { articles: [] }
      if (Array.isArray(data)) {
        setArticles(data);
      } else if (data.articles && Array.isArray(data.articles)) {
        setArticles(data.articles);
      } else {
        setArticles([]);
      }
    } catch (err: any) {
      setError(err.message || 'Failed to load articles');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const query = searchParams.get('search') || '';
    fetchArticles(query);
  }, [location.search]);

  if (loading) return <div className="text-center py-20">Loading articles...</div>;
  if (error) return <div className="text-center py-20 text-red-500">{error}</div>;

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-slate-900">Latest Posts</h1>
        <p className="text-slate-500 mt-2">Explore the latest updates from our community.</p>


      </div>

      {articles.length === 0 ? (
        <div className="text-center py-20 bg-white rounded-lg border border-dashed border-slate-300">
          <p className="text-slate-500">No articles found.</p>
          <Link to="/create" className="text-primary hover:underline mt-2 inline-block">
            Write the first one!
          </Link>
        </div>
      ) : (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {articles.map((article) => (
            <article
              key={article._id}
              className="bg-white rounded-xl border border-slate-200 overflow-hidden hover:shadow-md transition-shadow flex flex-col"
            >
              <div className="p-6 flex-grow">
                <h2 className="text-xl font-bold text-slate-900 mb-2 line-clamp-2">
                  <Link to={`/article/${article._id}`} className="hover:text-primary transition-colors">
                    {article.title}
                  </Link>
                </h2>
                <div className="text-slate-600 mb-4 line-clamp-3 text-sm prose prose-sm max-w-none">
                  <ReactMarkdown remarkPlugins={[remarkGfm]} allowedElements={['p', 'strong', 'em', 'span']}>{article.content}</ReactMarkdown>
                </div>
                {article.tags && article.tags.length > 0 && (
                  <div className="flex flex-wrap gap-2 mb-4">
                    {article.tags.map((tag, index) => (
                      <span key={index} className="bg-slate-100 text-slate-600 px-2 py-1 rounded-md text-xs">
                        #{tag}
                      </span>
                    ))}
                  </div>
                )}
              </div>

              <div className="px-6 py-4 bg-slate-50 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
                <div className="flex items-center space-x-4">
                  <div className="flex items-center space-x-1">
                    <Calendar className="w-3 h-3" />
                    <span>{new Date(article.createdAt).toLocaleDateString()}</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <UserIcon className="w-3 h-3" />
                    <span>{typeof article.author === 'object' ? (article.author as any).username : 'Unknown'}</span>
                  </div>
                </div>
                <Link
                  to={`/article/${article._id}`}
                  className="flex items-center text-primary font-medium hover:text-indigo-700"
                >
                  Read more <ArrowRight className="w-3 h-3 ml-1" />
                </Link>
              </div>
            </article>
          ))}
        </div>
      )}
    </div>
  );
};

export default Home;