// ==========================================
// نافذة البحث السريع في المقالات والقصائد
// ==========================================

import React, { useState, useMemo, useEffect } from 'react';
import { Search, X, BookOpen, Feather, ArrowLeft } from 'lucide-react';
import { ARTICLES_DATA, POETIC_METERS_DATA } from '../data/blogData';
import { Article } from '../types';

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectArticle: (article: Article) => void;
}

export const SearchModal: React.FC<SearchModalProps> = ({ isOpen, onClose, onSelectArticle }) => {
  const [query, setQuery] = useState('');

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (isOpen) {
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  const filteredResults = useMemo(() => {
    if (!query.trim()) return [];
    const q = query.toLowerCase().trim();
    return ARTICLES_DATA.filter(
      (a) =>
        a.title.toLowerCase().includes(q) ||
        a.excerpt.toLowerCase().includes(q) ||
        a.category.toLowerCase().includes(q) ||
        a.tags.some((t) => t.toLowerCase().includes(q))
    );
  }, [query]);

  if (!isOpen) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      className="fixed inset-0 z-50 flex items-start justify-center pt-16 px-4 bg-black/60 backdrop-blur-xs animate-fadeIn"
      onClick={onClose}
    >
      <div
        className="w-full max-w-2xl bg-[#FBF9F5] border border-[#DDD0B8] rounded-2xl shadow-2xl overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* حقل البحث */}
        <div className="flex items-center px-4 py-3.5 border-b border-[#E8DEC9] bg-[#FAF6ED]">
          <Search className="w-5 h-5 text-[#8C2D38] shrink-0" />
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="ابحث عن مقال، قصيدة، بحر شعري، أو كاتب..."
            autoFocus
            className="w-full px-3 py-1 bg-transparent text-sm sm:text-base text-[#2C2420] placeholder-[#8A7B6E] focus:outline-hidden font-cairo"
          />
          <button
            onClick={onClose}
            className="p-1.5 text-[#6D5E53] hover:text-[#8C2D38] rounded-lg transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* النتائج */}
        <div className="max-h-96 overflow-y-auto p-4 space-y-2">
          {!query.trim() ? (
            <div className="py-8 text-center text-xs sm:text-sm text-[#7F7063]">
              <p className="font-semibold text-[#44372F] mb-1">اكتب كلمة البحث للبدء</p>
              <p>جرّب: "المقاومة"، "المقامة"، "الكامل"، "الشعر الملتزم"</p>
            </div>
          ) : filteredResults.length === 0 ? (
            <div className="py-8 text-center text-xs sm:text-sm text-[#7F7063]">
              لم نعثر على نتائج مطابقة لـ «{query}»
            </div>
          ) : (
            filteredResults.map((article) => (
              <div
                key={article.id}
                onClick={() => {
                  onSelectArticle(article);
                  onClose();
                }}
                className="p-3.5 rounded-xl hover:bg-[#F3EDE0] border border-transparent hover:border-[#DDD0BA] cursor-pointer transition-all flex items-center justify-between"
              >
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-[10px] px-2 py-0.5 rounded-sm bg-[#8C2D38] text-white">
                      {article.category}
                    </span>
                    <span className="text-xs text-[#7A6C5F]">{article.author.name}</span>
                  </div>
                  <h4 className="text-sm font-bold font-amiri text-[#1F1916]">{article.title}</h4>
                </div>
                <ArrowLeft className="w-4 h-4 text-[#8C2D38] shrink-0 mr-2" />
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};
