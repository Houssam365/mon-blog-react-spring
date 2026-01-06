import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { LogOut, PenSquare, LogIn, UserPlus, BookOpen, Search, User as UserIcon, Menu, X } from 'lucide-react';

const Navbar: React.FC = () => {
  const { token, logout } = useAuth();
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const handleLogout = () => {
    logout();
    setIsMobileMenuOpen(false);
    navigate('/login');
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setIsMobileMenuOpen(false);
    navigate(`/?search=${encodeURIComponent(searchQuery)}`);
  };

  return (
    <nav className="bg-white border-b border-slate-200 sticky top-0 z-50">
      <div className="container mx-auto px-4 max-w-5xl">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2 text-primary font-bold text-xl">
            <BookOpen className="w-6 h-6" />
            <span>BlogTester</span>
          </Link>

          {/* Desktop Search Bar */}
          <form onSubmit={handleSearch} className="hidden md:flex flex-grow max-w-md mx-8">
            <div className="relative w-full">
              <input
                type="text"
                placeholder="Search articles..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-slate-300 rounded-full focus:ring-2 focus:ring-primary focus:border-transparent outline-none text-sm bg-slate-50"
              />
              <Search className="absolute left-3 top-2.5 text-slate-400 w-4 h-4" />
            </div>
          </form>

          {/* Desktop Actions */}
          <div className="hidden md:flex items-center space-x-4">
            {token ? (
              <>
                <Link
                  to="/create"
                  className="flex items-center space-x-1 text-slate-600 hover:text-primary transition-colors"
                >
                  <PenSquare className="w-4 h-4" />
                  <span>Write</span>
                </Link>
                <Link
                  to="/profile"
                  className="flex items-center space-x-1 text-slate-600 hover:text-primary transition-colors"
                >
                  <UserIcon className="w-4 h-4" />
                  <span>Profile</span>
                </Link>
                <button
                  onClick={handleLogout}
                  className="flex items-center space-x-1 text-red-500 hover:text-red-700 transition-colors ml-4"
                >
                  <LogOut className="w-4 h-4" />
                  <span>Logout</span>
                </button>
              </>
            ) : (
              <>
                <Link
                  to="/login"
                  className="flex items-center space-x-1 text-slate-600 hover:text-primary transition-colors"
                >
                  <LogIn className="w-4 h-4" />
                  <span>Login</span>
                </Link>
                <Link
                  to="/register"
                  className="px-4 py-2 bg-primary text-white rounded-md hover:bg-indigo-700 transition-colors flex items-center space-x-1"
                >
                  <UserPlus className="w-4 h-4" />
                  <span>Sign Up</span>
                </Link>
              </>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden text-slate-600 hover:text-primary focus:outline-none"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* AI-ASSISTED: LLM suggested the responsive logic (md:hidden) and absolute positioning for the dropdown */}
      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-white border-t border-slate-100 px-4 pt-4 pb-6 shadow-lg absolute w-full left-0">
          <form onSubmit={handleSearch} className="mb-6">
            <div className="relative w-full">
              <input
                type="text"
                placeholder="Search articles..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent outline-none text-base bg-slate-50"
              />
              <Search className="absolute left-3 top-3.5 text-slate-400 w-5 h-5" />
            </div>
          </form>

          <div className="flex flex-col space-y-4">
            {token ? (
              <>
                <Link
                  to="/create"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="flex items-center space-x-3 text-slate-700 hover:text-primary p-2 rounded-lg hover:bg-slate-50"
                >
                  <PenSquare className="w-5 h-5" />
                  <span className="font-medium">Write Article</span>
                </Link>
                <Link
                  to="/profile"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="flex items-center space-x-3 text-slate-700 hover:text-primary p-2 rounded-lg hover:bg-slate-50"
                >
                  <UserIcon className="w-5 h-5" />
                  <span className="font-medium">My Profile</span>
                </Link>
                <button
                  onClick={handleLogout}
                  className="flex items-center space-x-3 text-red-500 hover:text-red-700 p-2 rounded-lg hover:bg-red-50 w-full text-left"
                >
                  <LogOut className="w-5 h-5" />
                  <span className="font-medium">Logout</span>
                </button>
              </>
            ) : (
              <>
                <Link
                  to="/login"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="flex items-center space-x-3 text-slate-700 hover:text-primary p-2 rounded-lg hover:bg-slate-50"
                >
                  <LogIn className="w-5 h-5" />
                  <span className="font-medium">Login</span>
                </Link>
                <Link
                  to="/register"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="flex items-center space-x-3 text-primary font-medium p-2 rounded-lg hover:bg-indigo-50"
                >
                  <UserPlus className="w-5 h-5" />
                  <span>Sign Up</span>
                </Link>
              </>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;