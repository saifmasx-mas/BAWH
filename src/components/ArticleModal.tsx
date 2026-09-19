// ========================================================
// نافذة قراءة المقال بالكامل (Full Article Reading Modal)
// ========================================================

import React, { useState, useEffect } from 'react';
import { X, Clock, Calendar, Bookmark, Share2, ZoomIn, ZoomOut, Check, Feather } from 'lucide-react';
import { Article } from '../types';

interface ArticleModalProps {
  article: Article | null;
  onClose: () => void;
}

export const ArticleModal: React.FC<ArticleModalProps> = ({ article, onClose }) => {
  const [fontSize, setFontSize] = useState<'normal' | 'large' | 'xl'>('normal');
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [copiedLink, setCopiedLink] = useState(false);

  // إغلاق النافذة عند الضغط على مفتاح Escape
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (article) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => {
      document.body.style.overflow = 'auto';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [article, onClose]);

  if (!article) return null;

  const handleShare = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2000);
  };

  const getFontSizeClass = () => {
    switch (fontSize) {
      case 'large':
        return 'text-lg sm:text-xl leading-loose';
      case 'xl':
        return 'text-xl sm:text-2xl leading-loose';
      default:
        return 'text-base sm:text-lg leading-relaxed';
    }
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="article-modal-title"
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/60 backdrop-blur-xs animate-fadeIn"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-3xl max-h-[90vh] bg-[#FBF9F5] border border-[#DDD0B9] rounded-2xl shadow-2xl overflow-hidden flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* شريط الأدوات العلوي */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-[#E8DEC9] bg-[#F6F1E5]">
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-1 text-xs font-semibold rounded-md bg-[#8C2D38] text-white">
              {article.category}
            </span>
            <span className="text-xs text-[#7A6C5E] hidden sm:inline-block">
              {article.readTime}
            </span>
          </div>

          <div className="flex items-center gap-2">
            {/* أدوات التحكم بحجم الخط */}
            <div className="flex items-center bg-[#ECE3D2] rounded-lg p-0.5 text-xs text-[#4F4238]">
              <button
                onClick={() => setFontSize('normal')}
                className={`px-2 py-1 rounded-md transition-colors ${
                  fontSize === 'normal' ? 'bg-[#FAF8F2] font-bold text-[#8C2D38] shadow-2xs' : ''
                }`}
                title="خط عادي"
              >
                أ
              </button>
              <button
                onClick={() => setFontSize('large')}
                className={`px-2 py-1 rounded-md transition-colors ${
                  fontSize === 'large' ? 'bg-[#FAF8F2] font-bold text-[#8C2D38] shadow-2xs' : ''
                }`}
                title="خط كبير"
              >
                أ+
              </button>
              <button
                onClick={() => setFontSize('xl')}
                className={`px-2 py-1 rounded-md transition-colors ${
                  fontSize === 'xl' ? 'bg-[#FAF8F2] font-bold text-[#8C2D38] shadow-2xs' : ''
                }`}
                title="خط ضخم"
              >
                أ++
              </button>
            </div>

            {/* حفظ المقال */}
            <button
              onClick={() => setIsBookmarked(!isBookmarked)}
              className={`p-2 rounded-lg transition-colors cursor-pointer ${
                isBookmarked ? 'text-[#8C2D38] bg-[#EAE0CD]' : 'text-[#645549] hover:bg-[#EAE0CD]'
              }`}
              title={isBookmarked ? 'تم الحفظ في المحفوظات' : 'حفظ المقال للقراءة لاحقاً'}
            >
              <Bookmark className="w-4 h-4" />
            </button>

            {/* مشاركة الرابط */}
            <button
              onClick={handleShare}
              className="p-2 text-[#645549] hover:text-[#8C2D38] hover:bg-[#EAE0CD] rounded-lg transition-colors cursor-pointer"
              title="مشاركة رابط المقال"
            >
              {copiedLink ? <Check className="w-4 h-4 text-emerald-600" /> : <Share2 className="w-4 h-4" />}
            </button>

            {/* زر الإغلاق */}
            <button
              onClick={onClose}
              id="btn-close-article-modal"
              className="p-2 text-[#4A3D33] hover:text-[#8C2D38] hover:bg-[#EAE0CD] rounded-lg transition-colors cursor-pointer"
              aria-label="إغلاق المقال"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* جسم المقال المخصص للقراءة المطولة والمريحة */}
        <div className="overflow-y-auto px-6 sm:px-10 py-8 space-y-6">
          
          {/* عنوان المقال */}
          <h2
            id="article-modal-title"
            className="text-2xl sm:text-3xl md:text-4xl font-bold font-amiri text-[#1F1916] leading-tight"
          >
            {article.title}
          </h2>

          {/* بيانات الكاتب والتاريخ */}
          <div className="flex items-center justify-between flex-wrap gap-4 py-3 border-y border-[#EAE0CE] text-xs text-[#6B5C50]">
            <div className="flex items-center gap-3">
              <img
                src={article.author.avatar}
                alt={article.author.name}
                className="w-10 h-10 rounded-full object-cover border border-[#D5C7AF]"
              />
              <div>
                <p className="font-bold text-sm text-[#271F1B]">{article.author.name}</p>
                <p className="text-[#786A5E]">{article.author.role}</p>
              </div>
            </div>

            <div className="flex items-center gap-4 text-[#75675B]">
              <span className="flex items-center gap-1.5">
                <Calendar className="w-4 h-4 text-[#8C2D38]" />
                <span>{article.date}</span>
              </span>
              <span className="flex items-center gap-1.5">
                <Clock className="w-4 h-4 text-[#8C2D38]" />
                <span>{article.readTime}</span>
              </span>
            </div>
          </div>

          {/* صورة المقال التوضيحية */}
          <div className="rounded-xl overflow-hidden border border-[#E0D4BE]">
            <img
              src={article.imageUrl}
              alt={article.title}
              className="w-full max-h-80 object-cover"
            />
            <p className="py-2 px-3 text-center text-xs text-[#7E6F62] bg-[#F2ECDD] italic font-tajawal">
              {article.imageCaption}
            </p>
          </div>

          {/* فقرة المقدمة البارزة */}
          <div className="p-4 rounded-xl bg-[#F6F0E4] border-r-4 border-[#8C2D38] text-base sm:text-lg font-amiri italic text-[#302621]">
            {article.excerpt}
          </div>

          {/* نص المقال والفقرات */}
          <div className={`space-y-4 font-cairo text-[#332A24] ${getFontSizeClass()}`}>
            {article.content.map((paragraph, index) => (
              <p key={index} className="leading-relaxed">
                {paragraph}
              </p>
            ))}
          </div>

          {/* الشاهد الشعري إن وجد في المقال */}
          {article.featuredPoem && (
            <div className="my-8 p-6 rounded-2xl bg-[#F4EDE0] border border-[#DDD0B9] text-center">
              <div className="flex items-center justify-center gap-1.5 text-xs font-bold text-[#8C2D38] mb-4">
                <Feather className="w-4 h-4" />
                <span>أبيات شاهدة ({article.featuredPoem.bahr})</span>
              </div>
              <div className="space-y-3 font-amiri font-bold text-lg sm:text-xl text-[#1E1815]">
                {article.featuredPoem.verses.map((verse, vIdx) => (
                  <div key={vIdx} className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-6">
                    <span>{verse.shatr1}</span>
                    <span className="text-[#A37E2C] hidden sm:inline">✤</span>
                    <span>{verse.shatr2}</span>
                  </div>
                ))}
              </div>
              <div className="mt-4 text-xs text-[#706254] font-semibold">
                الشاعر: {article.featuredPoem.poet}
              </div>
            </div>
          )}

          {/* الوسوم الأدبية */}
          <div className="pt-4 border-t border-[#EAE0CE] flex flex-wrap items-center gap-2">
            <span className="text-xs font-semibold text-[#66574B]">وسوم ذات صلة:</span>
            {article.tags.map((tag) => (
              <span
                key={tag}
                className="px-2.5 py-1 rounded-md text-xs bg-[#EFE8D6] text-[#4F4135] hover:bg-[#E3D9C4] transition-colors"
              >
                #{tag}
              </span>
            ))}
          </div>

        </div>

        {/* أسفل النافذة */}
        <div className="px-6 py-4 bg-[#F6F1E5] border-t border-[#E8DEC9] flex items-center justify-between">
          <p className="text-xs text-[#7A6C5E]">
            مدونة بوح © 2026 - الكلمة أمانة ونبض الأمة
          </p>
          <button
            onClick={onClose}
            className="px-5 py-2 text-xs font-bold bg-[#8C2D38] text-white rounded-lg hover:bg-[#731F29] transition-colors cursor-pointer"
          >
            إغلاق القراءة
          </button>
        </div>

      </div>
    </div>
  );
};
