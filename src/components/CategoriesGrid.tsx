// ====================================================
// قسم شبكة التصنيفات الأدبية (Categories Grid Section)
// ====================================================

import React from 'react';
import { Feather, BookOpen, Scroll, Scale, ArrowLeft, Sparkles } from 'lucide-react';
import { CATEGORIES_DATA } from '../data/blogData';
import { Category } from '../types';

interface CategoriesGridProps {
  onSelectCategory: (categoryTitle: string) => void;
  onNavigateToMeter: () => void;
}

export const CategoriesGrid: React.FC<CategoriesGridProps> = ({
  onSelectCategory,
  onNavigateToMeter,
}) => {
  // دالة مساعدة لربط اسم الأيقونة بالمكون الرسومي
  const renderCategoryIcon = (iconName: string) => {
    const props = { className: 'w-6 h-6 text-[#8C2D38]' };
    switch (iconName) {
      case 'Feather':
        return <Feather {...props} />;
      case 'BookOpen':
        return <BookOpen {...props} />;
      case 'Scroll':
        return <Scroll {...props} />;
      case 'Scale':
        return <Scale {...props} />;
      default:
        return <BookOpen {...props} />;
    }
  };

  const handleCardClick = (cat: Category) => {
    if (cat.id === 'cat-arood') {
      onNavigateToMeter();
    } else {
      onSelectCategory(cat.title);
    }
  };

  return (
    <section
      id="categories"
      aria-label="أقسام وتصنيفات مدونة بوح"
      className="py-16 sm:py-20 bg-[#FBF9F5] border-b border-[#E8DEC8]"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* رأس القسم مع لمسة جمالية */}
        <div className="text-center max-w-2xl mx-auto mb-12 sm:mb-16">
          <div className="inline-flex items-center gap-1.5 text-xs font-bold text-[#8C2D38] tracking-wider uppercase mb-2">
            <Sparkles className="w-3.5 h-3.5" />
            <span>محاور الفكر والأدب</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold font-amiri text-[#1F1916] mb-4">
            أروقة الكلمة وميادين البيان
          </h2>
          <p className="text-base text-[#66584E] font-tajawal">
            أربعة فضاءات تتكامل فيها روح الشعر الملتزم، وصرامة النقد التحليلي، وسحر السجع في المقامات، وضبط إيقاع العروض.
          </p>
        </div>

        {/* شبكة البطاقات الأربع المطلوبة */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {CATEGORIES_DATA.map((cat, index) => (
            <article
              key={cat.id}
              id={`card-${cat.slug}`}
              onClick={() => handleCardClick(cat)}
              className="group relative flex flex-col justify-between bg-[#F8F5ED] hover:bg-[#F3EFE4] border border-[#DDD1BA] hover:border-[#8C2D38]/40 rounded-2xl p-6 transition-all duration-300 hover:shadow-lg hover:-translate-y-1 cursor-pointer"
            >
              {/* الرأس: الأيقونة والشارة */}
              <div>
                <div className="flex items-center justify-between mb-5">
                  <div className="w-12 h-12 rounded-xl bg-[#EBE3D0] group-hover:bg-[#E3D8BF] flex items-center justify-center transition-colors border border-[#D5C6AA]">
                    {renderCategoryIcon(cat.iconName)}
                  </div>
                  <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-[#EAE0CD] text-[#71252F] border border-[#D8C7A9]">
                    {cat.badge}
                  </span>
                </div>

                {/* عنوان القسم */}
                <h3 className="text-xl font-bold font-amiri text-[#211A16] group-hover:text-[#8C2D38] transition-colors mb-2.5">
                  {cat.title}
                </h3>

                {/* الوصف الأدبي الدقيق */}
                <p className="text-sm text-[#574B41] font-tajawal leading-relaxed mb-4">
                  {cat.description}
                </p>
              </div>

              {/* ذيل البطاقة: الشاهد أو الاقتباس وزر التصفح */}
              <div className="pt-4 border-t border-[#E5DBCA] mt-2">
                <blockquote className="text-xs text-[#7A6C60] font-amiri italic mb-4 line-clamp-2">
                  {cat.quote}
                </blockquote>

                <div className="flex items-center justify-between text-xs font-semibold text-[#8C2D38] group-hover:text-[#6E1C25] transition-colors">
                  <span>تصفح المنشورات</span>
                  <ArrowLeft className="w-4 h-4 transform group-hover:-translate-x-1 transition-transform" />
                </div>
              </div>
            </article>
          ))}
        </div>

      </div>
    </section>
  );
};
