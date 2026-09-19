// ==========================================
// قسم أحدث المقالات والدراسات (Latest Posts)
// ==========================================

import React, { useState, useMemo } from 'react';
import { Clock, Calendar, ArrowLeft, BookOpen, Sparkles, Filter } from 'lucide-react';
import { ARTICLES_DATA } from '../data/blogData';
import { Article } from '../types';

interface LatestPostsProps {
  onReadArticle: (article: Article) => void;
  selectedCategoryFilter: string | null;
  onClearCategoryFilter: () => void;
}

export const LatestPosts: React.FC<LatestPostsProps> = ({
  onReadArticle,
  selectedCategoryFilter,
  onClearCategoryFilter,
}) => {
  const [activeFilter, setActiveFilter] = useState<string>(selectedCategoryFilter || 'الكل');

  // مزامنة الفلتر الخارجي مع الفلتر الداخلي عند نقر المستخدم على بطاقة التصنيفات
  React.useEffect(() => {
    if (selectedCategoryFilter) {
      setActiveFilter(selectedCategoryFilter);
    }
  }, [selectedCategoryFilter]);

  const categoriesList = ['الكل', 'الشعر الملتزم', 'النقد الأدبي (شعر، قصة، رواية)', 'المقامات الأدبية', 'ميزان القصيد'];

  const filteredArticles = useMemo(() => {
    if (activeFilter === 'الكل') {
      return ARTICLES_DATA;
    }
    return ARTICLES_DATA.filter((item) => item.category.includes(activeFilter) || activeFilter.includes(item.category));
  }, [activeFilter]);

  return (
    <section
      id="latest-posts"
      aria-label="أحدث مقالات ودراسات مدونة بوح"
      className="py-16 sm:py-24 bg-[#F5F0E5]/50 border-b border-[#E8DEC8]"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* رأس القسم */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 pb-6 border-b border-[#DFD3BE] gap-4">
          <div>
            <div className="inline-flex items-center gap-2 text-xs font-bold text-[#8C2D38] tracking-wider uppercase mb-2">
              <Sparkles className="w-3.5 h-3.5" />
              <span>أحدث ما جادت به أقلامنا</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold font-amiri text-[#1F1916]">
              دراسات، قصائد، ومقامات جديدة
            </h2>
            <p className="text-sm sm:text-base text-[#68594E] font-tajawal mt-1">
              مختارات أدبية وقراءات نقدية رصينة تواكب قضايا العصر وتستحضر فصاحة التراث.
            </p>
          </div>

          {/* تصفية سريعة حسب الأقسام */}
          <div className="flex flex-wrap items-center gap-1.5 pt-2">
            {categoriesList.map((cat) => (
              <button
                key={cat}
                onClick={() => {
                  setActiveFilter(cat);
                  if (cat === 'الكل') {
                    onClearCategoryFilter();
                  }
                }}
                className={`px-3 py-1.5 text-xs rounded-lg font-medium transition-colors cursor-pointer ${
                  activeFilter === cat
                    ? 'bg-[#8C2D38] text-white shadow-2xs'
                    : 'bg-[#EAE1CF] text-[#4F4339] hover:bg-[#E0D5BE]'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* شبكة المقالات (Grid) المطلوبة */}
        {filteredArticles.length === 0 ? (
          <div className="text-center py-16 bg-[#FAF7F0] rounded-2xl border border-[#DFD3BC]">
            <BookOpen className="w-10 h-10 text-[#A89886] mx-auto mb-3" />
            <h3 className="text-lg font-bold font-amiri text-[#3A3029]">لا توجد مقالات في هذا القسم حالياً</h3>
            <p className="text-sm text-[#736458] mt-1">يرجى اختيار تصنيف آخر أو العودة لعرض كافة المقالات.</p>
            <button
              onClick={() => setActiveFilter('الكل')}
              className="mt-4 px-4 py-2 bg-[#8C2D38] text-white text-xs rounded-lg"
            >
              عرض كافة المقالات
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredArticles.map((article) => (
              <article
                key={article.id}
                id={`article-card-${article.id}`}
                className="group flex flex-col justify-between bg-[#FAF7F0] border border-[#DDD0B8] hover:border-[#8C2D38]/50 rounded-2xl overflow-hidden shadow-xs hover:shadow-xl transition-all duration-300"
              >
                {/* الحاوية العلوية: الصورة والشارة */}
                <div>
                  {/* الصورة النائبة الأدبية الراقية */}
                  <div className="relative aspect-16/10 overflow-hidden bg-[#E7DECB]">
                    <img
                      src={article.imageUrl}
                      alt={article.title}
                      loading="lazy"
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-60" />
                    
                    {/* شارة التصنيف فوق الصورة */}
                    <div className="absolute top-3.5 right-3.5">
                      <span className="px-3 py-1 text-xs font-semibold rounded-md bg-[#8C2D38]/90 text-white backdrop-blur-xs shadow-xs">
                        {article.category}
                      </span>
                    </div>

                    {/* وقت القراءة */}
                    <div className="absolute bottom-3 right-3.5 flex items-center gap-1.5 text-xs text-white/90 font-medium">
                      <Clock className="w-3.5 h-3.5" />
                      <span>{article.readTime}</span>
                    </div>
                  </div>

                  {/* المحتوى النصي للبطاقة */}
                  <div className="p-6">
                    {/* التاريخ والكاتب */}
                    <div className="flex items-center gap-3 text-xs text-[#706256] mb-3 font-tajawal">
                      <span className="flex items-center gap-1">
                        <Calendar className="w-3.5 h-3.5 text-[#8C2D38]" />
                        <span>{article.date}</span>
                      </span>
                      <span>•</span>
                      <span className="font-medium text-[#4D4036]">{article.author.name}</span>
                    </div>

                    {/* عنوان المقال بخط الأميري الرصين */}
                    <h3 className="text-xl font-bold font-amiri text-[#1F1916] group-hover:text-[#8C2D38] transition-colors line-clamp-2 leading-snug mb-3">
                      {article.title}
                    </h3>

                    {/* مقتطف قصير من النص (Excerpt) */}
                    <p className="text-sm text-[#54473D] font-cairo leading-relaxed line-clamp-3 mb-4">
                      {article.excerpt}
                    </p>
                  </div>
                </div>

                {/* الحاوية السفلية: الكاتب وزر "اقرأ المزيد" */}
                <div className="px-6 pb-6 pt-2 border-t border-[#ECE3D2] flex items-center justify-between">
                  <div className="flex items-center gap-2.5">
                    <img
                      src={article.author.avatar}
                      alt={article.author.name}
                      className="w-8 h-8 rounded-full object-cover border border-[#D5C6AA]"
                    />
                    <div className="text-right">
                      <p className="text-xs font-bold text-[#2C2420]">{article.author.name}</p>
                      <p className="text-[10px] text-[#7A6D61]">{article.author.role}</p>
                    </div>
                  </div>

                  {/* زر اقرأ المزيد المطلوب نصاً */}
                  <button
                    onClick={() => onReadArticle(article)}
                    id={`btn-read-more-${article.id}`}
                    className="inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-semibold text-[#8C2D38] hover:text-white bg-[#EFE8D6] hover:bg-[#8C2D38] rounded-lg transition-all duration-200 cursor-pointer shadow-2xs"
                    aria-label={`اقرأ المزيد عن ${article.title}`}
                  >
                    <span>اقرأ المزيد</span>
                    <ArrowLeft className="w-3.5 h-3.5 transform group-hover:-translate-x-1 transition-transform" />
                  </button>
                </div>
              </article>
            ))}
          </div>
        )}

      </div>
    </section>
  );
};
